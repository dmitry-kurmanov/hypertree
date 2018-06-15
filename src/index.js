import { h, app } from "hyperapp";

import TreeNode from "./components/TreeNode.js";
import actions from "./actions.js";

let nodesCount = 1;

export const normalize = nodes => {
  let id, node;
  let stack = nodes;
  let normalizedTree = {};

  stack.forEach((node, index) => {
    node.parentId = "root";
    node.index = index + 1;
    node.id = "ht-node-" + nodesCount++;
    stack.forEach((siblingNode, siblingIndex) => {
      if (!Array.isArray(siblingNode.siblingsIds)) siblingNode.siblingsIds = [];

      if (siblingIndex !== index) {
        siblingNode.siblingsIds.push(node.id);
      }
    });
  });

  while (stack.length > 0) {
    node = stack.shift();
    id = node.id;

    if (Array.isArray(node.children)) {
      node.children.forEach((subnode, index) => {
        subnode.id = "ht-node-" + nodesCount++;
        subnode.parentId = id;
        subnode.index = index + 1;
        if (!Array.isArray(node.childrenIds)) node.childrenIds = [];
        node.childrenIds.push(subnode.id);

        node.children.forEach((siblingNode, siblingIndex) => {
          if (!Array.isArray(siblingNode.siblingsIds))
            siblingNode.siblingsIds = [];

          if (siblingIndex !== index) {
            siblingNode.siblingsIds.push(subnode.id);
          }
        });

        stack.push(subnode);
      });

      delete node.children;
    } else {
      node.childrenIds = [];
    }

    normalizedTree[id] = node;
  }

  return normalizedTree;
};

export const render = config => {
  const generateMarkup = normalizedTree => {
    let stack = [];
    let markup = [];
    let nodeMarkup, nodeConfig, parentConfig, parentMarkup;

    for (let nodeId in normalizedTree) {
      nodeConfig = normalizedTree[nodeId];
      if (nodeConfig.childrenIds.length === 0)
        stack.push(<TreeNode config={nodeConfig} />);
    }

    while (stack.length > 0) {
      nodeMarkup = stack.shift();
      nodeConfig = normalizedTree[nodeMarkup.attributes.key];

      if (nodeConfig.parentId === "root") {
        markup.push(nodeMarkup);
      } else {
        parentConfig = normalizedTree[nodeConfig.parentId];
        parentMarkup = <TreeNode config={parentConfig}>{nodeMarkup}</TreeNode>;
        stack.push(parentMarkup);
      }
    }

    return markup;
  };

  const view = (state, actions) => {
    let markup = generateMarkup(state.nodes);

    return (
      <div>
        <h1>{state.title}</h1>
        {markup}
      </div>
    );
  };

  const state = {
    title: config.title,
    nodes: normalize(config.nodes)
  };

  const wiredActions = app(state, actions, view, document.body);

  return {
    ...wiredActions
  };
};
