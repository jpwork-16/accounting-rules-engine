const { normalizeTrialBalance } = require("./engine/normalize");
const {
  computeProfitAndLoss,
  updateCapital
} = require("./engine/compute");
const { buildBalanceSheet } = require("./statements/balanceSheet");

const input = require("../data/input.json");

const accounts = normalizeTrialBalance(input.trialBalance);
const pl = computeProfitAndLoss(accounts);
if (input.trialBalanceStage === "pre_closing") {
  updateCapital(accounts, pl.profit);
}

const balanceSheet = buildBalanceSheet(accounts);

console.log("PROFIT & LOSS");
console.log(pl);

console.log("\nBALANCE SHEET");
console.log(JSON.stringify(balanceSheet, null, 2));
