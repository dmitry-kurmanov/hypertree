import { h } from "hyperapp";

const Radiogroup = ({ doComplete }) => {
  return (
    <div
      oncreate={() => console.log("Radiogroup created!")}
      onupdate={() => console.log("Radiogroup updated!")}
      onremove={() => console.log("Radiogroup removed!")}
    >
      <button
        onclick={() => {
          doComplete();
        }}
      >
        Done!
      </button>
    </div>
  );
};

export default Radiogroup;
