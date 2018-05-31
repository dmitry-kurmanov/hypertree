import { h } from "hyperapp";

const TreeNode = ({ item }, children) => {
  const state = {
    isExpand: true
  };

  const actions = {};

  return (
    <div
      oncreate={() => console.log("Radiogroup created!")}
      onupdate={() => console.log("Radiogroup updated!")}
      onremove={() => console.log("Radiogroup removed!")}
      style={{ marginLeft: "10px" }}
    >
      <h4>{item.text}</h4>
      {children}
    </div>
  );
};

export default TreeNode;
