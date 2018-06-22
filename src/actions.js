const actions = {
  getState: () => state => {
    return state;
  },
  toggleNodeExpandCollapse: id => state => {
    let node = state.nodes[id];
    node.isExpand = !node.isExpand;
    return { ...state, id: node };
  },
  changeTitle: title => state => {
    return { ...state, title: title };
  }
};

export default actions;
