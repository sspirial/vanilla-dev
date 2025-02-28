export class Table extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.headers = this.dataset.headers.split(',');
        this._data = [];
        console.log(this.headers)
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/components/table/table.css">
            <table>
                <thead>
                    <tr>
                        ${this.headers.map(header => `<th>${header}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${this._data.map(row => `
                        <tr>
                            ${this.headers.map(header => `<td>${row[header]}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    set data(data) {
        this._data = data;
        this.render();
    }
}