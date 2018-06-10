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

window.hypertree = new HyperTree.render(config);

// hypertree.addOnCompleteEventListener(() =>
//   console.log("onComplete evetasddasn!!!")
// );
