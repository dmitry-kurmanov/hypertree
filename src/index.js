import { h, app } from "hyperapp";

import Radiogroup from "./components/radiogroup.js";

export const render = (json, settings) => {
  const state = {
    count: 0,
    isComplete: false,
    onComplete: null
  };

  const actions = {
    _down: value => state => ({ count: state.count - value }),
    _up: value => state => ({ count: state.count + value }),
    _doComplete: () => state => {
      state.onComplete();
      return { isComplete: true };
    },
    getState: () => state => {
      return state;
    },
    addOnCompleteEventListener: listener => state => ({ onComplete: listener })
  };

  Object.defineProperty(actions, "test1", {
    get: function() {
      return this.firstName + " " + this.surname;
    }
  });

  const view = (state, actions) => {
    return (
      <div>
        <Radiogroup doComplete={actions._doComplete} />
      </div>
    );
  };

  const wiredActions = app(state, actions, view, document.body);

  return {
    ...wiredActions,
    getTest: () => {
      return wiredActions.getState().count + "test";
    }
  };
};
