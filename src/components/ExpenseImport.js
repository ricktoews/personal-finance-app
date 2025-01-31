import React, { useState } from "react";
import * as XLSX from "xlsx";

const MONTHLY_EXPENSES = 'Monthly Expenses';

const ExpenseImport = ({ onImport }) => {
    const [rows, setRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState(new Set());
    const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames.find(name => name === MONTHLY_EXPENSES);
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

            setRows(jsonData.slice(1)); // Assuming first row is headers
            setSelectedRows(new Set()); // Reset selection
        };
        reader.readAsArrayBuffer(file);
    };

    const toggleRowSelection = (index, event) => {
        const newSelection = new Set(selectedRows);

        if (event.shiftKey && lastSelectedIndex !== null) {
            const [start, end] = [lastSelectedIndex, index].sort((a, b) => a - b);
            for (let i = start; i <= end; i++) {
                newSelection.add(i);
            }
        } else {
            if (newSelection.has(index)) {
                newSelection.delete(index);
            } else {
                newSelection.add(index);
            }
            setLastSelectedIndex(index);
        }

        setSelectedRows(newSelection);
    };

    const handleImport = () => {
        const selectedData = rows.filter((_, index) => selectedRows.has(index));
        console.log('====> handleImport', selectedData);
        const expenseData = [];
        selectedData.forEach(row => {
            const label = row[0];
            const amount = row[1];
            const expenseItem = {
                label,
                amount,
                necessity: 'flexible',
                frequency: 'monthly'
            }
            if (amount > 0) {
                expenseData.push(expenseItem);
            }
        })
        console.log('====> expenseData', expenseData);
        onImport(expenseData);
    };

    return (
        <div>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            {rows.length > 0 && (
                <table style={{ borderCollapse: "collapse", marginTop: "10px" }}>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr
                                key={index}
                                onClick={(event) => toggleRowSelection(index, event)}
                                style={{
                                    cursor: "pointer",
                                    backgroundColor: selectedRows.has(index) ? "#d3d3d3" : "transparent",
                                }}
                            >
                                {row.map((cell, cellIndex) => (
                                    <td key={cellIndex} style={{ padding: "5px", border: "1px solid #ccc" }}>
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {selectedRows.size > 0 && (
                <button onClick={handleImport} style={{ marginTop: "10px" }}>
                    Import Selected Expenses
                </button>
            )}
        </div>
    );
};

export default ExpenseImport;
