import React from 'react';

function Totals({ totalMonthly }) {
    const totalYearly = totalMonthly * 12;

    // Estimate gross income needed based on tax rate
    const taxRate = 0.25; // placeholder for the tax rate, could be an input field
    const grossIncomeNeeded = totalYearly / (1 - taxRate);

    return (
        <div className="totals">
            <div>Total Monthly: ${totalMonthly.toFixed(2)}</div>
            <div>Total Yearly: ${totalYearly.toFixed(2)}</div>
            <div>Tax Rate: {taxRate * 100}%</div>
            <div>Gross Income Needed: ${grossIncomeNeeded.toFixed(2)}</div>
        </div>
    );
}

export default Totals;

