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

/*TODO: aggiungere la possibilità di dare un colore al tag inserendolo dopo il nome del tag con la sintassi {<colore>}
 * modificare il parser all'interno di InputTag per identificare l'eventuale colore e passarlo come prop al componente Tag
 */
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
