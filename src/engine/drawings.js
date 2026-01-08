function applyDrawing(accounts, drawing, accountingState) {
  if (accountingState.state !== "during_period") {
    throw new Error(
      `Drawings not allowed in state: ${accountingState.state}`
    );
  }

  const capital = accounts[drawing.capitalAccount];
  const asset = accounts[drawing.assetAccount];

  if (!capital || !asset) {
    throw new Error("Drawings accounts missing");
  }

  if (asset.balance < drawing.amount) {
    throw new Error("Insufficient assets for drawings");
  }

  // Credit asset (cash/bank/goods taken)
  asset.balance -= drawing.amount;
  asset.history.push({
    effect: "credited",
    amount: drawing.amount,
    reason: "Drawings by owner",
    standard: "IAS 1 – Equity transactions"
  });

  // Debit capital
  capital.balance -= drawing.amount;
  capital.history.push({
    effect: "debited",
    amount: drawing.amount,
    reason: "Owner drawings",
    standard: "IAS 1 – Equity transactions"
  });
}

module.exports = { applyDrawing };
