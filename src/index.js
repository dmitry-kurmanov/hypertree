import { h, app } from "hyperapp";

import TreeItem from "./components/TreeItem.js";
import TreeNode from "./components/TreeNode.js";
import initState from "./initState.js";
import actions from "./actions.js";

export const render = settings => {
  const view = (state, actions) => {
    const generateTreeMarkup = (items, actions) => {
      return items.map(item => {
        if (Array.isArray(item.items)) {
          var markup = generateTreeMarkup(item.items, actions);
          return (
            <TreeNode item={item} actions={actions}>
              {markup}
            </TreeNode>
          );
        }
        return <TreeItem text={item.text} />;
      });
    };

    return (
      <div>
        <h1>{state.title}</h1>
        {generateTreeMarkup(state.items, actions)}
      </div>
    );
  };

  const wiredActions = app(initState(settings), actions, view, document.body);

  return {
    ...wiredActions
  };
};
