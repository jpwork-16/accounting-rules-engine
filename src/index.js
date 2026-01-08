const { normalizeTrialBalance } = require("./engine/normalize");
const { computeProfitAndLoss } = require("./engine/compute");
const { closeIncomeAndExpenses } = require("./engine/closing");
const { buildBalanceSheet } = require("./statements/balanceSheet");

const input = require("../data/input.json");

const accounts = normalizeTrialBalance(input.trialBalance);

// Optional: still useful for reporting
const pl = computeProfitAndLoss(accounts);

// REAL accounting happens here
const netProfit = closeIncomeAndExpenses(accounts);

const balanceSheet = buildBalanceSheet(accounts);

console.log("PROFIT & LOSS");
console.log(pl);

console.log("\nNET PROFIT (CLOSED)");
console.log(netProfit);

console.log("\nBALANCE SHEET (POST-CLOSING)");
console.log(JSON.stringify(balanceSheet, null, 2));
