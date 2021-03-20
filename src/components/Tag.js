import React from "react";

// componente <Tag />
const tagStyle = {
  display: "inline-block",
  //backgroundColor: "withe",
  fontSize: "0.9em",
  margin: "5px",
  border: "1px solid lightblue",
  padding: "2px",
  cursor: "pointer"
};

function Tag({ onDeleteTag, value, color }) {
  var tag = (
    <div style={tagStyle}>
      <span
        style={{ tagStyle, backgroundColor: color }}
        onClick={e => onDeleteTag(e, value)}
      >
        &#x2716;{" "}
      </span>
      {value}
    </div>
  );
  return <React.Fragment>{tag}</React.Fragment>;
}

export default Tag;
