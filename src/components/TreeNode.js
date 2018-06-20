import { h } from "hyperapp";

const TreeNode = ({ config, toggleNodeVisibility }, children) => {
  const clickHandler = event => {
    if (config.childrenIds.length !== 0) toggleNodeVisibility(config.id);
    event.stopPropagation();
  };

  const style = {
    marginLeft: "10px",
    display: config.isVisible ? "block" : "none"
  };

  const renderHeader = () => {
    if (config.childrenIds.length === 0) return <h4>{config.text}</h4>;
    if (config.isVisible) return <h4>↑ {config.text}</h4>;
    return <h4>↓ {config.text}</h4>;
  };

  return (
    <div
      oncreate={() => console.log("Radiogroup created!")}
      onupdate={() => console.log("Radiogroup updated!")}
      onremove={() => console.log("Radiogroup removed!")}
      onclick={clickHandler}
      key={config.id}
    >
      {renderHeader()}
      <div style={style}>{children}</div>
    </div>
  );
};

export default TreeNode;
