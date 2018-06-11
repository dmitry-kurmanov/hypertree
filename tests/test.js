import { normalize } from "../src/index.js";

var config = {
  title: "Hello Hyper Tree !",
  children: [
    {
      text: "Node1",
      children: [
        {
          text: "Node2"
        }
      ]
    },
    {
      text: "Node3",
      children: [
        {
          text: "Node4",
          children: [
            {
              text: "Node5"
            }
          ]
        },
        {
          text: "Node6"
        }
      ]
    },
    {
      text: "Node7",
      children: [
        {
          text: "Node8"
        },
        {
          text: "Node9",
          children: [
            {
              text: "Node10"
            },
            {
              text: "Node11"
            },
            {
              text: "Node12"
            }
          ]
        }
      ]
    },
    {
      text: "Node13"
    }
  ]
};

const normalizedTree = {
  "ht-node-1": {
    id: "ht-node-1",
    text: "Node1",
    index: 1,
    parentId: "root",
    childrenIds: ["ht-node-2"],
    siblingsIds: ["ht-node-3", "ht-node-7", "ht-node-13"]
  },
  "ht-node-2": {
    id: "ht-node-2",
    text: "Node2",
    index: 1,
    parentId: "ht-node-1",
    childrenIds: [],
    siblingsIds: []
  },
  "ht-node-3": {
    id: "ht-node-3",
    text: "Node3",
    index: 2,
    parentId: "root",
    childrenIds: ["ht-node-4", "ht-node-6"],
    siblingsIds: ["ht-node-1", "ht-node-7", "ht-node-13"]
  },
  "ht-node-4": {
    id: "ht-node-4",
    text: "Node4",
    index: 1,
    parentId: "ht-node-3",
    childrenIds: ["ht-node-5"],
    siblingsIds: ["ht-node-6"]
  },
  "ht-node-5": {
    id: "ht-node-5",
    text: "Node5",
    index: 1,
    parentId: "ht-node-4",
    childrenIds: [],
    siblingsIds: []
  },
  "ht-node-6": {
    id: "ht-node-6",
    text: "Node6",
    index: 2,
    parentId: "ht-node-3",
    childrenIds: [],
    siblingsIds: ["ht-node-4"]
  },
  "ht-node-7": {
    id: "ht-node-7",
    text: "Node7",
    index: 3,
    parentId: "root",
    childrenIds: ["ht-node-8", "ht-node-9"],
    siblingsIds: ["ht-node-1", "ht-node-3", "ht-node-13"]
  },
  "ht-node-8": {
    id: "ht-node-8",
    text: "Node8",
    index: 1,
    parentId: "ht-node-7",
    childrenIds: [],
    siblingsIds: ["ht-node-9"]
  },
  "ht-node-9": {
    id: "ht-node-9",
    text: "Node9",
    index: 2,
    parentId: "ht-node-7",
    childrenIds: ["ht-node-10", "ht-node-11", "ht-node-12"],
    siblingsIds: ["ht-node-8"]
  },
  "ht-node-10": {
    id: "ht-node-10",
    text: "Node10",
    index: 1,
    parentId: "ht-node-9",
    childrenIds: [],
    siblingsIds: ["ht-node-11", "ht-node-12"]
  },
  "ht-node-11": {
    id: "ht-node-11",
    text: "Node11",
    index: 2,
    parentId: "ht-node-9",
    childrenIds: [],
    siblingsIds: ["ht-node-10", "ht-node-12"]
  },
  "ht-node-12": {
    id: "ht-node-12",
    text: "Node12",
    index: 3,
    parentId: "ht-node-9",
    childrenIds: [],
    siblingsIds: ["ht-node-10", "ht-node-11"]
  },
  "ht-node-13": {
    id: "ht-node-13",
    text: "Node13",
    index: 4,
    parentId: "root",
    childrenIds: [],
    siblingsIds: ["ht-node-1", "ht-node-3", "ht-node-7"]
  }
};

test("normalize", () => {
  const result = normalize(config.children);

  expect(result).toEqual(normalizedTree);
});
