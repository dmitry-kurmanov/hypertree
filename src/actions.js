const actions = {
  getState: () => state => {
    return state;
  },
  toggleNodeVisibility: id => state => {
    let node = state.nodes[id];
    node.isVisible = !node.isVisible;
    return { ...state, id: node };
  }
};

export default actions;
