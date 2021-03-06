import React from "react";
import TagList from "./TagList";

// Constants
const cStyle = {
  position: "relative",
  display: "inline-block",
  width: "300px",
  overflow: "auto"
};
const iStyle = {
  display: "inline-block",
  fontSize: "0.9em",
  margin: "5px",
  width: "90%",
  border: "0"
};

// Addes a tag
function InputTag({ defaultTags, onAddTag, onDeleteTag, placeHolder }) {
  const onKeyUp = e => {
    if (e.key === "," || e.key === "Enter") {
      let input = e.target.value.trim();
      input = input.replace(",", "");
      if (input === "") return;
      onAddTag(input);
      e.target.value = "";
    }
  };
  
  const _onDeleteTag = tag => {
    onDeleteTag(tag);
  };

  return (
    <div style={cStyle}>
      <TagList tags={defaultTags} onDeleteTag={_onDeleteTag} />
      <input
        style={iStyle}
        onKeyUp={e => onKeyUp(e)}
        type="text"
        placeholder={placeHolder}
      />
    </div>
  );
}

export default InputTag;