function normalizeTrialBalance(trialBalance) {
  const normalizedAccounts = {};

  for (const accountName in trialBalance) {
    const account = trialBalance[accountName];

    normalizedAccounts[accountName] = {
      name: accountName,
      category: account.type,
      balance: account.balance,
      history: []
    };
  }

  return normalizedAccounts;
}

module.exports = { normalizeTrialBalance };
