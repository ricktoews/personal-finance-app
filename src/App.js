import React, { useState } from 'react';
import './styles/App.css';
import ExpenseForm from './components/ExpenseForm';
import Totals from './components/Totals';
import ExpenseImport from './components/ExpenseImport';

function App() {
  const [expenses, setExpenses] = useState([]);

  const handleImport = (importedExpenses) => {
    setExpenses([...expenses, ...importedExpenses]);
  };


  // Calculate total monthly and yearly expenses
  const totalMonthly = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="App">
      <Totals totalMonthly={totalMonthly}></Totals>
      <h1>Personal Finance Tracker</h1>
      <ExpenseForm expenses={expenses} setExpenses={setExpenses} />

      <ExpenseImport onImport={handleImport} />
    </div>
  );
}

export default App;

