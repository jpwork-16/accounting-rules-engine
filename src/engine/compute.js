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
  let capitalAccount = null;
  let totalAssets = 0;

  for (const name in accounts) {
    const acc = accounts[name];

    if (acc.category === "Capital") {
      capitalAccount = acc;
    }

    if (acc.category === "Asset") {
      totalAssets += acc.balance;
    }
  }

  if (!capitalAccount) {
    throw new Error("Capital account missing");
  }

  if (totalAssets < capitalAccount.balance + profit) {
    throw new Error(
      "Invalid state: Assets do not support profit transfer to capital"
    );
  }

  capitalAccount.balance += profit;

  capitalAccount.history.push({
    effect: "credited",
    amount: profit,
    reason: "Profit transferred at period end"
  });
}

module.exports = {
  computeProfitAndLoss,
  updateCapital
};

