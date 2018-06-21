var config = {
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

// for (let i = 0; i < 1000; i++) {
//   config.nodes[0].children.push({
//     text: "generated node " + i
//   });
// }

window.hypertree = new HyperTree.render(config);

// hypertree.addOnCompleteEventListener(() =>
//   console.log("onComplete evetasddasn!!!")
// );
