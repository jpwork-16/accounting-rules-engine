function closeIncomeAndExpenses(accounts) {
  let netProfit = 0;
  let capitalAccount = null;

  // Find capital account
  for (const name in accounts) {
    if (accounts[name].category === "Capital") {
      capitalAccount = accounts[name];
      break;
    }
  }

  if (!capitalAccount) {
    throw new Error("Capital account not found for closing entries");
  }

  // Close income & expense accounts
  for (const name in accounts) {
    const account = accounts[name];

    if (account.category === "Income") {
      netProfit += account.balance;

      account.history.push({
        effect: "debited",
        amount: account.balance,
        reason: "Income account closed to Capital"
      });

      account.balance = 0;
    }

    if (account.category === "Expense") {
      netProfit -= account.balance;

      account.history.push({
        effect: "credited",
        amount: account.balance,
        reason: "Expense account closed to Capital"
      });

      account.balance = 0;
    }
  }

  // Transfer net profit to capital
  capitalAccount.balance += netProfit;

  capitalAccount.history.push({
    effect: "credited",
    amount: netProfit,
    reason: "Net profit transferred via closing entries"
  });

  return netProfit;
}

module.exports = { closeIncomeAndExpenses };
