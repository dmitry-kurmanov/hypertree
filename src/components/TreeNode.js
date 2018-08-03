import { h } from "hyperapp";

export const TreeNode = ({ config, callAction }, children) => {
  const clickHandler = event => {
    event.stopPropagation();
    if (config.childrenIds.length === 0) return;

    if (config.isExpand) {
      callAction("collaspeNodeById", config.id);
    } else {
      callAction("expandNodeById", config.id);
    }
    callAction("selectNodeById", config.id);
  };

  const style = {
    marginLeft: "10px",
    display: config.isExpand ? "block" : "none"
  };

  let selectedStyle = null;
  if (config.isSelected) {
    selectedStyle = {
      color: "orange"
    };
  }

  const renderHeader = () => {
    if (config.childrenIds.length === 0) return <h4>{config.text}</h4>;
    if (config.isExpand) return <h4>↑ {config.text}</h4>;
    return <h4 style={selectedStyle}>↓ {config.text}</h4>;
  };

  return (
    <div
      oncreate={() => console.log("Node created!")}
      onupdate={() => console.log("Node updated!")}
      onremove={() => console.log("Node removed!")}
      onclick={clickHandler}
      name={config.id}
      key={config.id}
    >
      {renderHeader()}
      <div style={style}>{children}</div>
    </div>
  );
};
