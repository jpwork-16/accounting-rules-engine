function computeProfitAndLoss(accounts) {
  let totalIncome = 0;
  let totalExpenses = 0;

  for (const accountName in accounts) {
    const account = accounts[accountName];

    if (account.category === "Income") {
      totalIncome += account.balance;
    }

    if (account.category === "Expense") {
      totalExpenses += account.balance;
    }
  }

  const profit = totalIncome - totalExpenses;

  return {
    totalIncome,
    totalExpenses,
    profit
  };
}

module.exports = { computeProfitAndLoss };
