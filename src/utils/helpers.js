const formatCurrency = (amount) => {
    return amount.toFixed(2).toLocaleString('en-US');

}

export { formatCurrency };