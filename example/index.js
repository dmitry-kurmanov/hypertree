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

window.hypertree = new HyperTree.render(config);

// hypertree.addOnCompleteEventListener(() =>
//   console.log("onComplete evetasddasn!!!")
// );
