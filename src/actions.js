const actions = {
  getState: () => state => {
    return state;
  },
  changeTitle: title => state => {
    return { ...state, title: title };
  },
  toggleExpandCollapse: id => (state, actions) => {
    actions._toggleExpandCollapse(id);
    state.actionHandlers.toggleExpandCollapse &&
      state.actionHandlers.toggleExpandCollapse.forEach(handler => {
        handler();
      });
  },
  _toggleExpandCollapse: id => state => {
    const node = state.nodes[id];
    const isExpand = !node.isExpand;
    return {
      ...state,
      nodes: {
        ...state.nodes,
        [id]: {
          ...node,
          isExpand
        }
      }
    };
  },
  addActionHandler: config => state => {
    let actionName = config.actionName;
    let handler = config.handler;
    let handlers;
    if (!state.actionHandlers[actionName]) {
      handlers = [];
    } else {
      handlers = state.actionHandlers[actionName].slice();
    }
    handlers.push(handler);

    return {
      ...state,
      actionHandlers: {
        ...state.actionHandlers,
        [actionName]: handlers
      }
    };
  }
};

export default actions;
