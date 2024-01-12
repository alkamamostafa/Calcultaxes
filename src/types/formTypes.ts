interface BaseTaxRow {
    year: number;
}

export interface PermanentTaxesRow extends BaseTaxRow {
    monthlySalary: number;
}

export interface Taxes  {
    rows: PermanentTaxesRow[];
}
