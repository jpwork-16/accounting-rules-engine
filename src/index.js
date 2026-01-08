const { normalizeTrialBalance } = require("./engine/normalize");
const { computeProfitAndLoss } = require("./engine/compute");
const input = require("../data/input.json");

const accounts = normalizeTrialBalance(input.trialBalance);
const pl = computeProfitAndLoss(accounts);

console.log("PROFIT & LOSS");
console.log(pl);

console.log("\nWORKINGS");
console.log(JSON.stringify(accounts, null, 2));
