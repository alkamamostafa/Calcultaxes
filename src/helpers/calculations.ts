import { PermanentTaxRate, FreelancerTaxRate } from "../constants/taxRates";
import { Taxes } from "../types/formTypes";
import { sum } from 'lodash';


export function getAnnualizedMonthlySalary(amount: number): number {
    console.log('Rows CDI:', amount);
    return amount * 12;
}

export function getAnnualizedMonthlySalaryAfterTaxes(row: Taxes["rows"][0]): number {
    const annualizedRevenue = getAnnualizedMonthlySalary(row);
    return annualizedRevenue*(1-PermanentTaxRate);
}

export function getFreelancerAnnualizedRevenue(row: Taxes["rows"][0]): number {
    console.log('Row Freelance:', row); // Change 'rows' to 'row' here
    return row.hourlyRate * row.hoursPerDay * row.daysPerYear;
}

export function getFreelancerAnnualizedRevenueAfterTaxes(row: Taxes["rows"][0]): number {
    const annualizedRevenue = getFreelancerAnnualizedRevenue(row);
    return annualizedRevenue*(1-FreelancerTaxRate);
}


export function getPermanentTaxesAnnualizedTotal(rows: Taxes["rows"]): number {
    return sum(rows.map((row) => {
        if (row.incomeType === 'monthly') {
            return getAnnualizedMonthlySalary(row.monthlySalary);
        } else if (row.incomeType === 'freelance') {
            return getFreelancerAnnualizedRevenue(row);
        }
        return 0; 
    }));
}

export function getPermanentTaxesAnnualizedTotalAfterTaxes(rows: Taxes["rows"]): number {
    return sum(rows.map((row) => {
        if (row.incomeType === 'monthly') {
            const annualizedMonthlySalary = getAnnualizedMonthlySalary(row.monthlySalary);
            return annualizedMonthlySalary * PermanentTaxRate;
        } else if (row.incomeType === 'freelance') {
            return getFreelancerAnnualizedRevenueAfterTaxes(row);
        }
        return 0; 
    }));
}
