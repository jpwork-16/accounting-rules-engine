function applyAdjustment(accounts, adjustment, accountingState) {
  if (accountingState.state !== "pre_closing") {
    throw new Error(
      `Adjustments not allowed in state: ${accountingState.state}`
    );
  }

  switch (adjustment.type) {
    case "accrual":
      return applyAccrual(accounts, adjustment);

    case "prepayment":
      return applyPrepayment(accounts, adjustment);

    case "depreciation":
      return applyDepreciation(accounts, adjustment);

    default:
      throw new Error(`Unknown adjustment type: ${adjustment.type}`);
  }
}
function applyAccrual(accounts, adj) {
  const expense = accounts[adj.expenseAccount];
  const liability = accounts[adj.liabilityAccount];

  if (!expense || !liability) {
    throw new Error("Accrual accounts missing");
  }

  // Debit expense
  expense.balance += adj.amount;
  expense.history.push({
    effect: "debited",
    amount: adj.amount,
    reason: `Accrued expense (${adj.description})`,
    standard: "IAS 1 – Matching Principle"
  });

  // Credit liability
  liability.balance += adj.amount;
  liability.history.push({
    effect: "credited",
    amount: adj.amount,
    reason: `Accrued expense payable`,
    standard: "IAS 1 – Matching Principle"
  });
}
function applyPrepayment(accounts, adj) {
  const expense = accounts[adj.expenseAccount];
  const asset = accounts[adj.assetAccount];

  if (!expense || !asset) {
    throw new Error("Prepayment accounts missing");
  }

  // Credit expense
  expense.balance -= adj.amount;
  expense.history.push({
    effect: "credited",
    amount: adj.amount,
    reason: `Prepaid expense (${adj.description})`,
    standard: "IAS 1 – Matching Principle"
  });

  // Debit asset
  asset.balance += adj.amount;
  asset.history.push({
    effect: "debited",
    amount: adj.amount,
    reason: `Prepayment recognized`,
    standard: "IAS 1 – Matching Principle"
  });
}
function applyDepreciation(accounts, adj) {
  const asset = accounts[adj.assetAccount];
  const expense = accounts[adj.expenseAccount];

  if (!asset || !expense) {
    throw new Error("Depreciation accounts missing");
  }

  // Credit asset
  asset.balance -= adj.amount;
  asset.history.push({
    effect: "credited",
    amount: adj.amount,
    reason: "Depreciation charged",
    standard: "IAS 16 – Property, Plant and Equipment"
  });

  // Debit expense
  expense.balance += adj.amount;
  expense.history.push({
    effect: "debited",
    amount: adj.amount,
    reason: "Depreciation expense recognized",
    standard: "IAS 16 – Property, Plant and Equipment"
  });
}
module.exports = { applyAdjustment };
