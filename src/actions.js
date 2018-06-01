const actions = {
  getState: () => state => {
    return state;
  },
  collapseNode: id => state => {
    
    state.items[0].isExpand = false;
    return { items: state.items };
  },
  expandNode: id => state => {
    state.items[0].isExpand = true;
    return { items: state.items };
  }
};

export default actions;
