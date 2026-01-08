const { normalizeTrialBalance } = require("./engine/normalize");
const {
  computeProfitAndLoss,
  updateCapital
} = require("./engine/compute");

const input = require("../data/input.json");

const accounts = normalizeTrialBalance(input.trialBalance);
const pl = computeProfitAndLoss(accounts);

updateCapital(accounts, pl.profit);

console.log("PROFIT & LOSS");
console.log(pl);

console.log("\nFINAL ACCOUNTS WITH WORKINGS");
console.log(JSON.stringify(accounts, null, 2));
