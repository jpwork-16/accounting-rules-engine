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
