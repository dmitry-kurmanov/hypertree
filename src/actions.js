const actions = {
  getState: () => state => {
    return state;
  },
  toggleNodeExpandCollapse: id => state => {
    let node = state.nodes[id];
    node.isExpand = !node.isExpand;
    return { ...state, id: node };
  }
};

export default actions;
