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

function updateCapital(accounts, profit) {
  for (const accountName in accounts) {
    const account = accounts[accountName];

    if (account.category === "Capital") {
      account.balance += profit;

      account.history.push({
        effect: "credited",
        amount: profit,
        reason: "Profit transferred from Profit & Loss Account"
      });

      return;
    }
  }

  throw new Error("No Capital account found");
}

module.exports = {
  computeProfitAndLoss,
  updateCapital
};

