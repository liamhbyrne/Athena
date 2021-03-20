import React from "react";
import TagList from "./TagList";

const cStyle = {
  position: "relative",
  display: "inline-block",
  width: "300px",
  border: "1px solid lightblue",
  overflow: "auto"
};
const iStyle = {
  display: "inline-block",
  fontSize: "0.9em",
  margin: "5px",
  width: "90%",
  border: "0"
};

function InputTag({ defaultTags, onAddTag, onDeleteTag, placeHolder }) {
  const onKeyUp = e => {
    //console.log(e.key);
    // codice 188 per la virgola, 13 per invio
    if (e.key === "," || e.key === "Enter") {
      let input = e.target.value.trim().split(",");
      //esci se non ci sono tag
      if (input.length === 0 || input[0] === "") return;
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
