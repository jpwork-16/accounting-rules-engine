// Core engine imports
const { normalizeTrialBalance } = require("./engine/normalize");
const { computeProfitAndLoss } = require("./engine/compute");
const { closeIncomeAndExpenses } = require("./engine/closing");
const { applyAdjustment } = require("./engine/adjustments");
const { buildBalanceSheet } = require("./statements/balanceSheet");
const { AccountingState, STATES } = require("./engine/state");
const { applyDrawing } = require("./engine/drawings");

// Input data
const input = require("../data/input.json");

// --------------------------------------------------
// 1️⃣ Initialize accounting state machine
// --------------------------------------------------
const accountingState = new AccountingState(STATES.OPENING);

// --------------------------------------------------
// 2️⃣ Normalize opening trial balance
// --------------------------------------------------
const accounts = normalizeTrialBalance(input.trialBalance);

// --------------------------------------------------
// 3️⃣ Move to DURING_PERIOD
// --------------------------------------------------
accountingState.transitionTo(STATES.DURING_PERIOD);
// Apply drawings (owner withdrawals)
if (Array.isArray(input.drawings)) {
  for (const drawing of input.drawings) {
    applyDrawing(accounts, drawing, accountingState);
  }
}

// --------------------------------------------------
// 4️⃣ Compute Profit & Loss (for reporting only)
// --------------------------------------------------
const profitAndLoss = computeProfitAndLoss(accounts);

// --------------------------------------------------
// 5️⃣ Move to PRE_CLOSING
// --------------------------------------------------
accountingState.transitionTo(STATES.PRE_CLOSING);

// --------------------------------------------------
// 6️⃣ Apply IAS-compliant adjustments (ONLY here)
// --------------------------------------------------
if (Array.isArray(input.adjustments)) {
  for (const adjustment of input.adjustments) {
    applyAdjustment(accounts, adjustment, accountingState);
  }
}

// --------------------------------------------------
// 7️⃣ Move to CLOSING
// --------------------------------------------------
accountingState.transitionTo(STATES.CLOSING);

// --------------------------------------------------
// 8️⃣ Close income & expense accounts
// --------------------------------------------------
const netProfit = closeIncomeAndExpenses(accounts);

// --------------------------------------------------
// 9️⃣ Move to POST_CLOSING
// --------------------------------------------------
accountingState.transitionTo(STATES.POST_CLOSING);

// --------------------------------------------------
// 🔟 Build final Balance Sheet (post-closing ONLY)
// --------------------------------------------------
const balanceSheet = buildBalanceSheet(accounts);

// --------------------------------------------------
// OUTPUT (CI / CLI friendly)
// --------------------------------------------------
console.log("ACCOUNTING STATE HISTORY");
console.log(accountingState.history);

console.log("\nPROFIT & LOSS (PRE-CLOSING)");
console.log(profitAndLoss);

console.log("\nNET PROFIT (FROM CLOSING ENTRIES)");
console.log(netProfit);

console.log("\nBALANCE SHEET (POST-CLOSING)");
console.log(JSON.stringify(balanceSheet, null, 2));
