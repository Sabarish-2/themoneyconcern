import { Tax } from "../models/tax";

async function fetchData(input:RequestInfo, init? : RequestInit) {
    const response = await fetch(input, init);
    if (response.ok){
        return response;
    } else{
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function fetchTax(): Promise<Tax[]>{
    const response = await fetchData("/api/tax", { method : "GET" });
    return response.json();
}

export interface TaxInput {
    basicSalary : number,
    hra? : number,
    spla? : number,
    taxCal? : number,
}

export async function newUserTax( tax: TaxInput) : Promise<Tax> {
    const response = await fetchData("/api/tax/",
    {
        method : "POST" ,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tax),
    });
    return response.json();
}

export async function calculateTax(taxId: string, tax: TaxInput) : Promise<Tax> {
    const response = await fetchData("/api/tax/" + taxId,
    {
        method : "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tax),
    });
    return response.json();
}
