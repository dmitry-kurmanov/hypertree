import { h } from "hyperapp";

const TreeNode = ({ config, toggleExpandCollapse }, children) => {
  const clickHandler = event => {
    if (config.childrenIds.length !== 0) toggleExpandCollapse(config.id);
    event.stopPropagation();
  };

  const style = {
    marginLeft: "10px",
    display: config.isExpand ? "block" : "none"
  };

  const renderHeader = () => {
    if (config.childrenIds.length === 0) return <h4>{config.text}</h4>;
    if (config.isExpand) return <h4>↑ {config.text}</h4>;
    return <h4>↓ {config.text}</h4>;
  };

  return (
    <div
      oncreate={() => console.log("Radiogroup created!")}
      onupdate={() => console.log("Radiogroup updated!")}
      onremove={() => console.log("Radiogroup removed!")}
      onclick={clickHandler}
      name={config.id}
      key={config.id}
    >
      {renderHeader()}
      <div style={style}>{children}</div>
    </div>
  );
};

export default TreeNode;
