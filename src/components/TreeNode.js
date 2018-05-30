import { h } from "hyperapp";

const TreeNode = ({ text }, children) => {
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
      <h4>{text}</h4>
      if (state.isExpand) {{ children }}
    </div>
  );
};

export default TreeNode;
