import { h, app } from "hyperapp";

import { TreeNode } from "./components/TreeNode.js";
import { actions } from "./actions.js";

export const normalize = (nodes, nodesCount) => {
  let id, node;
  let stack = nodes;
  let normalizedTree = {};

  const addNodeToSiblings = (node, nodes) => {
    nodes.forEach((siblingNode, siblingIndex) => {
      if (!Array.isArray(siblingNode.siblingsIds)) siblingNode.siblingsIds = [];
      if (siblingIndex === node.index - 1) return;
      siblingNode.siblingsIds.push(node.id);
    });
  };

  stack.forEach((node, index) => {
    node.parentId = "root";
    node.index = index + 1;
    node.id = "ht-node-" + nodesCount++;
    addNodeToSiblings(node, stack);
  });

  while (stack.length > 0) {
    node = stack.shift();
    id = node.id;

    /* defaults */
    if (typeof node.isExpand !== typeof true) node.isExpand = true;
    if (typeof node.isSelected !== typeof true) node.isSelected = false;
    /* EO defaults */

    if (Array.isArray(node.children)) {
      node.children.forEach((subnode, index) => {
        subnode.parentId = id;
        subnode.index = index + 1;
        subnode.id = "ht-node-" + nodesCount++;

        if (nodesCount === 1) {
          node.isSelected = true;
        }

        if (!Array.isArray(node.childrenIds)) node.childrenIds = [];
        node.childrenIds.push(subnode.id);

        addNodeToSiblings(subnode, node.children);

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

export const generateMarkup = (normalizedTree, callAction) => {
  let stack = [];
  let markup = [];
  let nodeMarkup, nodeConfig, childConfig, childMarkup;

  for (let nodeId in normalizedTree) {
    nodeConfig = normalizedTree[nodeId];
    if (nodeConfig.parentId === "root") {
      nodeMarkup = <TreeNode config={nodeConfig} callAction={callAction} />;
      stack.push(nodeMarkup);
      markup.push(nodeMarkup);
    }
  }

  while (stack.length > 0) {
    nodeMarkup = stack.shift();
    nodeConfig = normalizedTree[nodeMarkup.attributes.key];

    if (nodeConfig.childrenIds.length !== 0) {
      nodeConfig.childrenIds.forEach(childId => {
        childConfig = normalizedTree[childId];
        childMarkup = <TreeNode config={childConfig} callAction={callAction} />;
        nodeMarkup.children[1].children.push(childMarkup); //bad code

        if (childConfig.childrenIds.length !== 0) stack.push(childMarkup);
      });
    }
  }

  return markup;
};

export const callAction = (actionName, payload, actions) => {
  if (!actions[actionName]) {
    console.warn("you try to call wrong action!");
    return;
  }
  const newState = actions[actionName](payload);
  newState.subscribeHandler({
    actionName,
    newState
  });
};

export const view = (state, actions) => {
  const doCallAction = (actionName, payload) =>
    callAction(actionName, payload, actions);
  let markup = generateMarkup(state.nodes, doCallAction);

  return (
    <div>
      <h1>{state.title}</h1>
      {markup}
    </div>
  );
};

export const render = (config, container) => {
  const state = {
    title: config.title,
    actionHandlers: {},
    subscribeHandler: () => {},
    nodes: normalize(config.nodes, 1),
    selectedNodeId: "ht-node-1"
  };

  const wiredActions = app(state, actions, view, container);

  return {
    //doc: {actionName: "description"}, // TODO
    getState: wiredActions.getState,
    callAction: (actionName, payload) =>
      callAction(actionName, payload, wiredActions),
    subscribe: wiredActions.subscribe
  };
};
