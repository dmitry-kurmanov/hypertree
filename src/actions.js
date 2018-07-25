export const actions = {
  getState: () => state => {
    return state;
  },

  subscribe: handler => state => {
    return { ...state, subscribeHandler: handler };
  },

  changeTitle: title => state => {
    return { ...state, title: title };
  },

  toggleExpandCollapse: id => (state, actions) => {
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
  }
};
