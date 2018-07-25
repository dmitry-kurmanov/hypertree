const actions = {
  getState: () => state => {
    return state;
  },
  changeTitle: title => state => {
    const newState = { ...state, title: title };
    state.subscribeHandler({
      actionName: "changeTitle",
      newState: newState
    });
    return newState;
  },
  toggleExpandCollapse: id => (state, actions) => {
    const node = state.nodes[id];
    const isExpand = !node.isExpand;
    const newState = {
      ...state,
      nodes: {
        ...state.nodes,
        [id]: {
          ...node,
          isExpand
        }
      }
    };
    state.subscribeHandler({
      actionName: "toggleExpandCollapse",
      newState: newState
    });

    state.actionHandlers.toggleExpandCollapse &&
      state.actionHandlers.toggleExpandCollapse();

    // setTimeout(()=>{
    //   state.actionHandlers.toggleExpandCollapse &&
    //   state.actionHandlers.toggleExpandCollapse();
    // }) //TODO need to implement custom event

    return newState;
  },
  addActionHandler: config => state => {
    let actionName = config.actionName;
    let handler = config.handler;

    return {
      ...state,
      actionHandlers: {
        ...state.actionHandlers,
        [actionName]: handler
      }
    };
  },
  subscribe: handler => state => {
    return { ...state, subscribeHandler: handler };
  }

};

export default actions;
