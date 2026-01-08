const STATES = {
  OPENING: "opening",
  DURING_PERIOD: "during_period",
  PRE_CLOSING: "pre_closing",
  CLOSING: "closing",
  POST_CLOSING: "post_closing"
};

const ALLOWED_TRANSITIONS = {
  opening: ["during_period"],
  during_period: ["pre_closing"],
  pre_closing: ["closing"],
  closing: ["post_closing"],
  post_closing: []
};

class AccountingState {
  constructor(initialState = STATES.OPENING) {
    this.state = initialState;
    this.history = [];
  }

  transitionTo(nextState) {
    const allowed = ALLOWED_TRANSITIONS[this.state];

    if (!allowed.includes(nextState)) {
      throw new Error(
        `Invalid state transition: ${this.state} → ${nextState}`
      );
    }

    this.history.push({
      from: this.state,
      to: nextState,
      timestamp: new Date().toISOString()
    });

    this.state = nextState;
  }
}

module.exports = {
  STATES,
  AccountingState
};
