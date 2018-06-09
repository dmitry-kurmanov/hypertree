import { normalize, denormalize } from "../../src/utils/normalize";

const tree = [
  {
    text: "node1",
    items: [
      {
        text: "subitem1"
      },
      {
        text: "subnode1",
        items: [
          {
            text: "subsubitem1"
          }
        ]
      },
      {
        text: "subitem2"
      }
    ]
  },
  {
    text: "item1"
  }
];

const normalizedTree = [
  {
    text: "node1",
    items: [
      {
        text: "subitem1"
      },
      {
        text: "subnode1",
        items: [
          {
            text: "subsubitem1"
          }
        ]
      },
      {
        text: "subitem2"
      }
    ]
  },
  {
    text: "item1"
  }
];

test("setIds", () => {
  const result = normalize(tree);

  expect(Object.keys(result).length).toEqual(6);
});

test("Normalize", () => {
  const result = normalize(tree);

  expect(Object.keys(result).length).toEqual(6);
});

test("Denormalize", () => {
  // const result = denormalize(normalizedTree);
});
