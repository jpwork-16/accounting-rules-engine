const { normalizeTrialBalance } = require("./engine/normalize");
const { computeProfitAndLoss } = require("./engine/compute");
const { closeIncomeAndExpenses } = require("./engine/closing");
const { buildBalanceSheet } = require("./statements/balanceSheet");
const { AccountingState, STATES } = require("./engine/state");

const input = require("../data/input.json");

// 1️⃣ Initialize accounting state
const accountingState = new AccountingState(STATES.OPENING);

// 2️⃣ Normalize opening balances
const accounts = normalizeTrialBalance(input.trialBalance);

// Move to DURING_PERIOD
accountingState.transitionTo(STATES.DURING_PERIOD);

// 3️⃣ Compute P&L (allowed only during period)
const pl = computeProfitAndLoss(accounts);

// Move to PRE_CLOSING
accountingState.transitionTo(STATES.PRE_CLOSING);

// 4️⃣ Close books
accountingState.transitionTo(STATES.CLOSING);
const netProfit = closeIncomeAndExpenses(accounts);

// Move to POST_CLOSING
accountingState.transitionTo(STATES.POST_CLOSING);

// 5️⃣ Build Balance Sheet (ONLY allowed post-closing)
const balanceSheet = buildBalanceSheet(accounts);

console.log("ACCOUNTING STATE HISTORY");
console.log(accountingState.history);

console.log("\nPROFIT & LOSS");
console.log(pl);

console.log("\nNET PROFIT (CLOSED)");
console.log(netProfit);

console.log("\nBALANCE SHEET (POST-CLOSING)");
console.log(JSON.stringify(balanceSheet, null, 2));
