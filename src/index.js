import { h, app } from "hyperapp";

import TreeItem from "./components/TreeItem.js";
import TreeNode from "./components/TreeNode.js";

export const render = settings => {
  const state = {
    title: settings.title,
    items: settings.items
  };

  const actions = {
    getState: () => state => {
      return state;
    }
  };

  const generateTreeMarkup = items => {
    return items.map(item => {
      if (Array.isArray(item.items)) {
        var markup = generateTreeMarkup(item.items);
        return <TreeNode text={item.text}>{markup}</TreeNode>;
      }
      return <TreeItem text={item.text} />;
    });
  };

  const view = (state, actions) => {
    return (
      <div>
        <h1>{state.title}</h1>
        {generateTreeMarkup(state.items)}
      </div>
    );
  };

  const wiredActions = app(state, actions, view, document.body);

  return {
    ...wiredActions
  };
};
