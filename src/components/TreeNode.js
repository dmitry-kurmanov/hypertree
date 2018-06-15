import { h } from "hyperapp";

const TreeNode = ({ config, actions }, children) => {
  // const clickHandler = event => {
  //   config.isExpand ? actions.collapseNode(config.id) : actions.expandNode(config.id);
  //   event.stopPropagation();
  // };

  const clickHandler = event => {
    console.log("click " + config.id);
  };

  const style = {
    marginLeft: "10px"
    // display: item.isExpand ? "block" : "none"
  };

  return (
    <div
      oncreate={() => console.log("Radiogroup created!")}
      onupdate={() => console.log("Radiogroup updated!")}
      onremove={() => console.log("Radiogroup removed!")}
      onclick={clickHandler}
      key={config.id}
    >
      <h4>{config.text}</h4>
      <div style={style}>{children}</div>
    </div>
  );
};

export default TreeNode;
