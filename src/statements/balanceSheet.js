function buildBalanceSheet(accounts) {
  const assets = {};
  const liabilities = {};
  const capital = {};

  let totalAssets = 0;
  let totalLiabilities = 0;
  let totalCapital = 0;

  for (const accountName in accounts) {
    const account = accounts[accountName];

    if (account.category === "Asset") {
      assets[accountName] = account.balance;
      totalAssets += account.balance;
    }

    if (account.category === "Liability") {
      liabilities[accountName] = account.balance;
      totalLiabilities += account.balance;
    }

    if (account.category === "Capital") {
      capital[accountName] = account.balance;
      totalCapital += account.balance;
    }
  }

  const isBalanced = totalAssets === (totalCapital + totalLiabilities);

  if (!isBalanced) {
    throw new Error(
      `Balance Sheet does not balance: Assets (${totalAssets}) ≠ Capital + Liabilities (${totalCapital + totalLiabilities})`
    );
  }

  return {
    assets,
    liabilities,
    capital,
    totals: {
      assets: totalAssets,
      capitalAndLiabilities: totalCapital + totalLiabilities
    },
    balanced: true
  };
}

module.exports = { buildBalanceSheet };
