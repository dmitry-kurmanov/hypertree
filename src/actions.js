export const actions = {
  //TODO add setState action
  getState: () => state => {
    return state;
  },

  setState: newState => state => {
    return { ...newState };
  },

  subscribe: handler => state => {
    return { ...state, subscribeHandler: handler };
  },

  changeTitle: title => state => {
    return { ...state, title: title };
  },

  expandNodeById: id => (state, actions) => {
    const node = state.nodes[id];
    const isExpand = true;
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

  collaspeNodeById: id => (state, actions) => {
    const node = state.nodes[id];
    const isExpand = false;
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
  },

  selectNodeById: id => (state, actions) => {
    const oldNodeId = state.selectedNodeId;
    const oldNode = state.nodes[oldNodeId];

    const newNodeId = id;
    const newNode = state.nodes[id];

    return {
      ...state,
      selectedNodeId: newNodeId,
      nodes: {
        ...state.nodes,
        [oldNodeId]: {
          ...oldNode,
          isSelected: false
        },
        [newNodeId]: {
          ...newNode,
          isSelected: true
        }
      }
    };
  }
};
