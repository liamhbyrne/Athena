import React from "react";
import Tag from "./Tag";

// componente <TagList />
function TagList({ tags, onDeleteTag }) {
  let tagsUI = tags.map(tag => {
    return <Tag onDeleteTag={() => onDeleteTag(tag)} key={tag} value={tag} />;
  });
  return <div className="tag-list">{tagsUI}</div>;
}

export default TagList;
