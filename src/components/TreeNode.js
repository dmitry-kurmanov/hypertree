import { h } from "hyperapp";

const TreeNode = ({ item, actions }, children) => {
  const clickHandler = event => {
    item.isExpand ? actions.collapseNode(item.id) : actions.expandNode(item.id);
    event.stopPropagation();
  };

  const style = {
    marginLeft: "10px",
    display: item.isExpand ? "block" : "none"
  };

  return (
    <div
      oncreate={() => console.log("Radiogroup created!")}
      onupdate={() => console.log("Radiogroup updated!")}
      onremove={() => console.log("Radiogroup removed!")}
      onclick={clickHandler}
    >
      <h4>{item.text}</h4>
      <div style={style}>{children}</div>
    </div>
  );
};

export default TreeNode;
