const actions = {
  getState: () => state => {
    return state;
  },
  toggleNodeVisibility: id => state => {
    state.nodes[id].isVisible = !state.nodes[id].isVisible;
    return { ...state };
  }
};

export default actions;
