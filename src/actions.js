const actions = {
  getState: () => state => {
    return state;
  },
  changeTitle: title => state => {
    return { ...state, title: title };
  },
  toggleExpandCollapse: id => (state, actions) => {
    state.actionHandlers.toggleExpandCollapse &&
      state.actionHandlers.toggleExpandCollapse();

    // setTimeout(()=>{
    //   state.actionHandlers.toggleExpandCollapse &&
    //   state.actionHandlers.toggleExpandCollapse();
    // }) //TODO need to implement custom event

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

    return {
      ...state,
      actionHandlers: {
        ...state.actionHandlers,
        [actionName]: handler
      }
    };
  }
};

export default actions;
