function computeProfitAndLoss(accounts) {
  let totalIncome = 0;
  let totalExpenses = 0;

  for (const accountName in accounts) {
    const account = accounts[accountName];

    if (account.category === "Income") {
      totalIncome += account.balance;

      account.history.push({
        effect: "credited",
        amount: account.balance,
        reason: "Included in Profit & Loss as income"
      });
    }

    if (account.category === "Expense") {
      totalExpenses += account.balance;

      account.history.push({
        effect: "debited",
        amount: account.balance,
        reason: "Included in Profit & Loss as expense"
      });
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
