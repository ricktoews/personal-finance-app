import { formatCurrency } from "../utils/helpers";

function Totals({ totalMonthly }) {
    const totalYearly = totalMonthly * 12;

    // Estimate gross income needed based on tax rate
    const taxRate = 0.24; // placeholder for the tax rate, could be an input field
    const grossIncomeNeeded = totalYearly / (1 - taxRate);

    return (
        <table className="totals">
            <tbody>
                <tr><td>Total Monthly:</td><td>${formatCurrency(totalMonthly)}</td></tr>
                <tr><td>Total Yearly:</td><td>${formatCurrency(totalYearly)}</td></tr>
                <tr><td>Tax Rate:</td><td>{taxRate * 100}%</td></tr>
                <tr><td>Gross Income Needed:</td><td>${formatCurrency(grossIncomeNeeded)}</td></tr>
            </tbody>
        </table>
    );
}

export default Totals;

