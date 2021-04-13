const State = require('../helpers/states.json');

module.exports = {
  find: () => {
    return State.states;
  },
  getUFs: () => {
    const states = [];
    State.states.forEach(state => {
      states.push({
        uf: state.uf,
      });
    });
    return states;
  },
};