import { h, app } from "hyperapp";

import TreeItem from "./components/TreeItem.js";
import TreeNode from "./components/TreeNode.js";
import actions from "./actions.js";

export const render = settings => {
  let itemsCount = 0;

  const normalize = items => {
    let id, item;
    let stack = items;
    let normalizedItems = {};

    while (stack.length > 0) {
      item = stack.pop();
      id = "ht-item-" + itemsCount++;

      if (Array.isArray(item.items)) {
        item.items.forEach(subitem => {
          subitem.parent = id;
          stack.push(subitem);
        });

        item.items = [];
      }

      item.id = id;
      normalizedItems[id] = item;
    }

    Object.keys(normalizedItems).forEach(itemId => {
      let parentId = normalizedItems[itemId].parent;
      if (parentId) normalizedItems[parentId].items.push(itemId);
    });
    return normalizedItems;
  };

  const generateMarkup = normalizedItems => {
    return normalizedItems;
    // debugger;
    // let normalizedItem = null;
    // let normalizedArray = [];
    // let treeItem = null;
    // let treeArray = [];
    // let stack = null;

    // Object.keys(normalizedItems).forEach(key => {
    //   normalizedArray.push(normalizedItems[key]); //init stack array
    // });

    // while (normalizedArray.length > 0) {
    //   normalizedItem = normalizedArray.shift();

    //   if (!normalizedItem.parent) {
    //     treeArray.push(normalizedItem);
    //   } else {
    //     let isChildInserted = false;
    //     stack = treeArray;

    //     treeArray.forEach((treeItem, index) => {
    //       // need to recursiv need to get nested children
    //       if (normalizedItem.parent === treeItem.id) {
    //         treeItem.items.push(normalizedItem);
    //         isChildInserted = true;
    //       }
    //     });

    //     if (!isChildInserted) normalizedArray.push(normalizedItem);
    //   }
    // }

    // for (let i = 0; i < stack.length; i++) {
    //   item = stack[i];
    //   // arr = arr.filter(item => item !== value)

    //   if (item.parent) {
    //     //try to insert
    //     markup.forEach(() => {});
    //   } else {
    //     markup.push(item);
    //   }
    // }

    // if (item.parent) {
    //   var markup = generateTreeMarkup(item.items, actions);
    //   return (
    //     <TreeNode item={item} actions={actions}>
    //       {markup}
    //     </TreeNode>
    //   );
    // }
    // return <TreeItem text={item.text} />;

    // return treeArray;
  };

  const view = (state, actions) => {
    let markup = generateMarkup(state.items);

    return (
      <div>
        <h1>{state.title}</h1>
        {markup}
      </div>
    );
  };

  const state = {
    title: settings.title,
    items: normalize(settings.items)
  };

  const wiredActions = app(state, actions, view, document.body);

  return {
    ...wiredActions
  };
};
