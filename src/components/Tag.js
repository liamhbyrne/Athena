import React from "react";

// Constants
const tagStyle = {
  display: "inline-block",
  fontSize: "0.9em",
  margin: "5px",
  border: "2px solid #00b0f0",
  padding: "2px 2px 2px 2px",
  cursor: "pointer",
  color: "white"
};

// Displays the tag
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
