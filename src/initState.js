//https://stackoverflow.com/questions/32798193/how-to-handle-tree-shaped-entities-in-redux-reducers

const initState = settings => {
  let itemsCount = 0;
  let nodesCount = 0;
  let items = settings.items;

  const normalizeItems = items => {
    return items.forEach(item => {
      if (Array.isArray(item.items)) {
        item.id = "ht-node-" + nodesCount++;
        item.isExpand = true;
        normalizeItems(item.items);
      } else {
        item.id = "ht-item-" + itemsCount++;
      }
    });
  };
  normalizeItems(settings.items);

  return {
    title: settings.title,
    items: settings.items
  };
};

export default initState;
