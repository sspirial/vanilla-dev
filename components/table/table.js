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
    `
    template = () => {
        return `
            <table>
                <thead>
                    <tr>${this.headers.map(header => `<th>${header}</th>`)}</tr>
                </thead>
                <tbody>
                    ${this._data.map(row => `
                        <tr>
                            ${this.headers.map(header => `<td>${row[header]}</td>`).join('')}
                        </tr>
                    `).join('')}
                <tbody>
            </table>
        `
    }
    constructor() {
        super();

        this.attachShadow({ mode: "open"});
        this.headers = this.dataset.headers.split(',')
        this._data = [
            { id: "1", name: "John", age: "21" },
            { id: "2", name: "Jane", age: "22" },
            { id: "3", name: "Doe", age: "23" }
        ];
        this.render()
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ${this.css.trim()}
            </style>
            ${this.template().trim()}
        `
    }
}