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

  return (
    <div className="App">
      <Totals expenses={expenses}></Totals>
      <h1>Personal Finance Tracker</h1>
      <ExpenseForm expenses={expenses} setExpenses={setExpenses} />

      <ExpenseImport onImport={handleImport} />
    </div>
  );
}

export default App;

