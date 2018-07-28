import { normalize, view, render } from "../src/index.js";
import actions from "../src/actions.js";

beforeEach(() => {
  jest.resetModules();

  config = {
    title: "Hello Hyper Tree !",
    nodes: [
      {
        text: "Node1",
        children: [
          {
            text: "Node5"
          }
        ]
      },
      {
        text: "Node2",
        children: [
          {
            text: "Node6",
            children: [
              {
                text: "Node10"
              }
            ]
          },
          {
            text: "Node7"
          }
        ]
      },
      {
        text: "Node3",
        children: [
          {
            text: "Node8"
          },
          {
            text: "Node9",
            children: [
              {
                text: "Node11"
              },
              {
                text: "Node12"
              },
              {
                text: "Node13"
              }
            ]
          }
        ]
      },
      {
        text: "Node4"
      }
    ]
  };
});

let config;

test("normalize", () => {
  const normalizedTree = {
    "ht-node-1": {
      id: "ht-node-1",
      text: "Node1",
      index: 1,
      parentId: "root",
      childrenIds: ["ht-node-5"],
      siblingsIds: ["ht-node-2", "ht-node-3", "ht-node-4"],
      isExpand: true
    },
    "ht-node-2": {
      id: "ht-node-2",
      text: "Node2",
      index: 2,
      parentId: "root",
      childrenIds: ["ht-node-6", "ht-node-7"],
      siblingsIds: ["ht-node-1", "ht-node-3", "ht-node-4"],
      isExpand: true
    },
    "ht-node-3": {
      id: "ht-node-3",
      text: "Node3",
      index: 3,
      parentId: "root",
      childrenIds: ["ht-node-8", "ht-node-9"],
      siblingsIds: ["ht-node-1", "ht-node-2", "ht-node-4"],
      isExpand: true
    },
    "ht-node-4": {
      id: "ht-node-4",
      text: "Node4",
      index: 4,
      parentId: "root",
      childrenIds: [],
      siblingsIds: ["ht-node-1", "ht-node-2", "ht-node-3"],
      isExpand: true
    },
    "ht-node-5": {
      id: "ht-node-5",
      text: "Node5",
      index: 1,
      parentId: "ht-node-1",
      childrenIds: [],
      siblingsIds: [],
      isExpand: true
    },
    "ht-node-6": {
      id: "ht-node-6",
      text: "Node6",
      index: 1,
      parentId: "ht-node-2",
      childrenIds: ["ht-node-10"],
      siblingsIds: ["ht-node-7"],
      isExpand: true
    },
    "ht-node-7": {
      id: "ht-node-7",
      text: "Node7",
      index: 2,
      parentId: "ht-node-2",
      childrenIds: [],
      siblingsIds: ["ht-node-6"],
      isExpand: true
    },
    "ht-node-8": {
      id: "ht-node-8",
      text: "Node8",
      index: 1,
      parentId: "ht-node-3",
      childrenIds: [],
      siblingsIds: ["ht-node-9"],
      isExpand: true
    },
    "ht-node-9": {
      id: "ht-node-9",
      text: "Node9",
      index: 2,
      parentId: "ht-node-3",
      childrenIds: ["ht-node-11", "ht-node-12", "ht-node-13"],
      siblingsIds: ["ht-node-8"],
      isExpand: true
    },
    "ht-node-10": {
      id: "ht-node-10",
      text: "Node10",
      index: 1,
      parentId: "ht-node-6",
      childrenIds: [],
      siblingsIds: [],
      isExpand: true
    },
    "ht-node-11": {
      id: "ht-node-11",
      text: "Node11",
      index: 1,
      parentId: "ht-node-9",
      childrenIds: [],
      siblingsIds: ["ht-node-12", "ht-node-13"],
      isExpand: true
    },
    "ht-node-12": {
      id: "ht-node-12",
      text: "Node12",
      index: 2,
      parentId: "ht-node-9",
      childrenIds: [],
      siblingsIds: ["ht-node-11", "ht-node-13"],
      isExpand: true
    },
    "ht-node-13": {
      id: "ht-node-13",
      text: "Node13",
      index: 3,
      parentId: "ht-node-9",
      childrenIds: [],
      siblingsIds: ["ht-node-11", "ht-node-12"],
      isExpand: true
    }
  };

  const result = normalize(config.nodes, 1);

  expect(result).toEqual(normalizedTree);
});

test("main view matches snapshots", () => {
  const state = {
    title: config.title,
    nodes: normalize(config.nodes, 1)
  };

  var snapshot = view(state, actions);

  expect(snapshot).toMatchSnapshot();
});

test("toggleExpandCollapse, expandNodeById, collapseNodeById  test", () => {
  const nodeId = "ht-node-1";
  const hypertree = render(config);

  expect(hypertree.getState().nodes[nodeId].isExpand).toEqual(true);
  hypertree.callAction("toggleExpandCollapse", nodeId);
  expect(hypertree.getState().nodes[nodeId].isExpand).toEqual(false);

  hypertree.callAction("expandNodeById", nodeId);
  expect(hypertree.getState().nodes[nodeId].isExpand).toEqual(true);
  
  hypertree.callAction("collapseNodeById", nodeId);
  expect(hypertree.getState().nodes[nodeId].isExpand).toEqual(true);
});

test("change title test", () => {
  const newTitle = "Hello HyperTree Test!";
  const hypertree = render(config);

  hypertree.callAction("changeTitle", newTitle);
  expect(hypertree.getState().title).toEqual(newTitle);
});

test("subscribe test", () => {
  const nodeId = "ht-node-1";
  const hypertree = render(config);
  let count = 0;
  let newTitle = null;

  hypertree.subscribe(function(data) {
    if (data.actionName === "changeTitle") {
      newTitle = data.newState.title;
    }

    if (data.actionName === "toggleExpandCollapse") {
      count++;
    }
  });

  hypertree.callAction("toggleExpandCollapse", nodeId);
  expect(count).toEqual(1);

  hypertree.callAction("toggleExpandCollapse", nodeId);
  expect(count).toEqual(2);

  hypertree.callAction("toggleExpandCollapse", nodeId);
  expect(count).toEqual(3);

  hypertree.callAction("changeTitle", "New Title!");
  expect(newTitle).toEqual("New Title!");
});
