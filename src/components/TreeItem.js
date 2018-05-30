import { h } from "hyperapp";

const TreeItem = ({ text }) => {
  return (
    <div
      oncreate={() => console.log("Radiogroup created!")}
      onupdate={() => console.log("Radiogroup updated!")}
      onremove={() => console.log("Radiogroup removed!")}
    >
      {text}
    </div>
  );
};

export default TreeItem;
