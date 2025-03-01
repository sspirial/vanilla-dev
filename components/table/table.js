export class Table extends HTMLElement {
    css = `
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 1rem 0;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
            font-weight: bold;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        tr:hover {
            background-color: #f5f5f5;
        }

        .loading {
            text-align: center;
            padding: 20px;
            font-style: italic;
            color: #666;
        }
        
        .error {
            color: #721c24;
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            padding: 10px;
            border-radius: 4px;
            margin: 1rem 0;
        }
    `

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this._data = [];
        this.loading = true;
        this.error = null;
        this.headers = [];
    }

    static get observedAttributes() {
        return ['data-headers'];
    }

    async connectedCallback() {
        try {
            this.headers = this.dataset.headers?.split(',') || [];
            await this.loadData();
        } catch (err) {
            this.error = 'Failed to load table data';
            console.error('Table error:', err);
        } finally {
            this.loading = false;
            this.render();
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-headers' && oldValue !== newValue) {
            this.headers = newValue.split(',');
            this.render();
        }
    }

    async loadData() {
        const response = await fetch('./data/data.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        this._data = data._data;
    }

    template() {
        if (this.loading) {
            return '<div class="loading" role="status">Loading table data...</div>';
        }

        if (this.error) {
            return `<div class="error" role="alert">${this.error}</div>`;
        }

        return `
            <table role="grid" aria-label="Data Table">
                <thead>
                    <tr>
                        ${this.headers.map(header => 
                            `<th scope="col">${header}</th>`
                        ).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${this._data.map(row => `
                        <tr>
                            ${this.headers.map((header, index) => 
                                `<td ${index === 0 ? 'scope="row"' : ''}>${row[header]}</td>`
                            ).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${this.css}</style>
            ${this.template()}
        `;
    }
}