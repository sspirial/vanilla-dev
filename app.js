import { Table } from "/components/table/table.js";

customElements.define("ghetto-table", Table);

const data = [
    { id: "1", name: "John", age: "21" },
    { id: "2", name: "Jane", age: "22" },
    { id: "3", name: "Doe", age: "23" }
];

document.querySelector("ghetto-table").data = data;