import { formatCurrency } from "../utils/helpers";

function Totals({ expenses }) {
    // Calculate total monthly and yearly expenses
    const totalNetMonthly = expenses.reduce((acc, curr) => {
        const amount = curr.preTax ? 0 : curr.frequency === 'yearly' ? curr.amount / 12 : curr.amount;
        return acc + amount;
    }, 0);
    const totalPreTaxMonthly = expenses.reduce((acc, curr) => {
        const amount = !curr.preTax ? 0 : curr.frequency === 'yearly' ? curr.amount / 12 : curr.amount;
        return acc + amount;
    }, 0);

    const totalNetYearly = totalNetMonthly * 12;
    const totalPreTaxYearly = totalPreTaxMonthly * 12;
    console.log('====> Totals, totalTaxedYearly', totalNetYearly);
    console.log('====> Totals, totalYearly', totalPreTaxYearly);

    // Estimate gross income needed based on tax rate
    const taxRate = 0.24; // placeholder for the tax rate, could be an input field
    const taxedYearly = totalNetYearly / (1 - taxRate);
    const grossIncomeNeeded = taxedYearly + totalPreTaxYearly;

    return (
        <table className="totals">
            <tbody>
                <tr><td>Net Monthly:</td><td>${formatCurrency(totalNetMonthly)}</td></tr>
                <tr><td>Net Yearly:</td><td>${formatCurrency(totalNetYearly)}</td></tr>
                <tr><td>Tax Rate:</td><td>{taxRate * 100}%</td></tr>
                <tr><td>Taxed Yearly:</td><td>${formatCurrency(taxedYearly)}</td></tr>
                <tr><td>Pre-tax:</td><td>${formatCurrency(totalPreTaxYearly)}</td></tr>
                <tr><td>Gross Income Needed:</td><td>${formatCurrency(grossIncomeNeeded)}</td></tr>
            </tbody>
        </table>
    );
}

export default Totals;

