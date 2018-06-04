//https://stackoverflow.com/questions/32798193/how-to-handle-tree-shaped-entities-in-redux-reducers

const initState = settings => {
  let itemsCount = 0;
  let items = settings.items;

  const normalizeItems = items => {
    let i, item, subitem, id;
    let stack = items;
    let result = {};

    while (stack.length > 0) {
      item = stack.pop();

      id = "ht-item-" + itemsCount++;

      if (Array.isArray(item.items)) {
        for (i = 0; i < item.items.length; i++) {
          subitem = item.items[i];
          subitem.parent = id;
          stack.push(subitem);
        }
        delete item.items;
      }

      item.id = id;

      result[item.id] = item;
    }

    return result;
  };

  return {
    title: settings.title,
    items: normalizeItems(settings.items)
  };
};

export default initState;
