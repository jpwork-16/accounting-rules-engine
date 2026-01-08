const { normalizeTrialBalance } = require("./engine/normalize");
const input = require("../data/input.json");

const accounts = normalizeTrialBalance(input.trialBalance);

console.log(accounts);
