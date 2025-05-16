import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button';

const products = [
    { code: 'P001', name: 'Product 1', Category: "Category A", quantity: 10},
    { code: 'P002', name: 'Product 2', Category: "Category B", quantity: 15},
    { code: 'P003', name: 'Product 3', Category: "Category C", quantity: 12},
    { code: 'P004', name: 'Product 4', Category: "Category D", quantity: 13},
    { code: 'P005', name: 'Product 5', Category: "Category E", quantity: 17},
]

function AddProducts() {
  return (
    <div>
      <PrimeReactProvider>
        <DataTable value={products} tableStyle={{ minWidth: "50rem" }}>
          <Column field="code" header="Code" sortable style={{ width: '25%' }}></Column>
          <Column field="name" header="Name" sortable style={{ width: '25%' }}></Column>
          <Column field="Category" header="Category" sortable style={{ width: '25%' }}></Column>
          <Column field="quantity" header="Quantity" sortable style={{ width: '25%' }}></Column>
          <Column field="Action" header="Action" sortable style={{ width: '25%' }}> <Button label="Submit" icon="pi pi-check" />
</Column>
        </DataTable>
      </PrimeReactProvider>
      <p>Add products here!</p>
<Button label="Submit" icon="pi pi-check" />
    </div>
  );
}

export default AddProducts;
