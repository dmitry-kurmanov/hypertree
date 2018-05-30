var settings = {
  title: "Hello Hyper Tree !",
  items: [
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
  ]
};

window.hypertree = new HyperTree.render(settings);

// hypertree.addOnCompleteEventListener(() =>
//   console.log("onComplete evetasddasn!!!")
// );
