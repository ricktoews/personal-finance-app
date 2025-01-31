import React, { useState } from "react";
import * as XLSX from "xlsx";

const MONTHLY_EXPENSES = 'Monthly Expenses';

const ExpenseImport = ({ onImport }) => {
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: "binary" });
            const sheetName = workbook.SheetNames.find(name => name === MONTHLY_EXPENSES);
            const sheet = workbook.Sheets[sheetName];
            const parsedData = XLSX.utils.sheet_to_json(sheet);
            console.log('====> onload parsedData', parsedData);
            setData(parsedData);
            setSelectedRows(parsedData.map((_, index) => index));
        };

        reader.readAsBinaryString(file);
    };

    const handleSelectionChange = (index) => {
        setSelectedRows((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    const handleProcess = () => {
        const filteredData = data.filter((_, index) => selectedRows.includes(index));
        console.log('====> filteredData', filteredData);
        onImport(filteredData);
    };

    return (
        <div>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            {data.length > 0 && (
                <div>
                    <h3>Select Expenses to Process</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Select</th>
                                {Object.keys(data[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(index)}
                                            onChange={() => handleSelectionChange(index)}
                                        />
                                    </td>
                                    {Object.values(row).map((value, i) => (
                                        <td key={i}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleProcess}>Process Selected</button>
                </div>
            )}
        </div>
    );
};

export default ExpenseImport;
