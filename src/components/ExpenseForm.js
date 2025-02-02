import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function ExpenseForm({ expenses, setExpenses }) {
  // State for form fields
  const [label, setLabel] = useState('');
  const [amount, setAmount] = useState('');
  const [necessity, setNecessity] = useState('fixed');
  const [frequency, setFrequency] = useState('monthly');
  const [preTax, setPreTax] = useState(false);

  // State for accumulated expenses
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    // If editing an existing expense, update it
    if (editingIndex !== null) {
      const updatedExpenses = expenses.map((expense, index) => {
        if (index === editingIndex) {
          return {
            label,
            amount: parseFloat(amount),
            necessity,
            frequency,
            preTax,
          };
        }
        return expense;
      });

      setExpenses(updatedExpenses);
      setEditingIndex(null); // Clear the editing state
    } else {
      // Otherwise, add a new expense
      const newExpense = {
        label,
        amount: parseFloat(amount),
        necessity,
        frequency,
        preTax,
      };

      setExpenses([...expenses, newExpense]);
    }

    // Reset form fields
    setLabel('');
    setAmount('');
    setNecessity('fixed');
    setFrequency('monthly');
    setPreTax(false);
  };

  const handleEdit = (index) => {
    const expenseToEdit = expenses[index];
    setLabel(expenseToEdit.label);
    setAmount(expenseToEdit.amount.toString());
    setNecessity(expenseToEdit.necessity);
    setFrequency(expenseToEdit.frequency);
    setPreTax(expenseToEdit.preTax);
    setEditingIndex(index); // Mark that we're editing this item
  };

  const handleDelete = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  // Calculate the monthly and yearly totals
  const calculateTotals = () => {
    let monthlyTotal = 0;
    let yearlyTotal = 0;
    console.log('====> calculateTotals, expenses', expenses);
    expenses.forEach((expense) => {
      if (expense.frequency === 'monthly') {
        monthlyTotal += expense.amount;
        yearlyTotal += expense.amount * 12;
      } else if (expense.frequency === 'yearly') {
        yearlyTotal += expense.amount / 12; // Convert yearly expense to monthly equivalent
      }
    });

    return { monthlyTotal, yearlyTotal };
  };

  const { monthlyTotal, yearlyTotal } = calculateTotals();

  return (
    <div>
      <h2>Expense Items</h2>
      <div className="expenses-scrolling">
        <table className="expense-list">
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index} className="expense-item">
                <td>{expense.label}</td>
                <td className="expense-amount">${expense.amount.toFixed(2)}</td>
                <td>{expense.necessity}</td>
                <td>{expense.frequency}</td>
                <td>{expense.preTax ? 'Yes' : 'No'}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{editingIndex !== null ? 'Edit Expense' : 'Add Expense'}</h3>
      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-field">
          <label>Expense Label:</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Necessity:</label>
          <select
            value={necessity}
            onChange={(e) => setNecessity(e.target.value)}
          >
            <option value="fixed">Fixed</option>
            <option value="flexible">Flexible</option>
            <option value="optional">Optional</option>
          </select>
        </div>
        <div className="form-field">
          <label>Frequency:</label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <div className="form-field">
          <label><br />
            <input
              type="checkbox"
              checked={preTax}
              onChange={(e) => setPreTax(e.target.checked)}
            />
            Pre-tax
          </label>
        </div>

        <button type="submit">
          {editingIndex !== null ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
