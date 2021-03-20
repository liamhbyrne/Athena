import React from 'react'
import { Card, Button, Alert } from "react-bootstrap"
import InputTag from "./InputTag";

export default function SkillsChooser() {

    const [tags, setTags] = React.useState([]);

    const onAddTag = tag => {
        setTags([...tags, tag]);
      };

      const onDeleteTag = tag => {
        let remainingTags = tags.filter(t => {
          return t !== tag;
        });
        setTags([...remainingTags]);
      };



    return (
    <Card>
        <Card.Body>
        <h2 className="text-center mb-4">Your Skills</h2>
        <div>
        <InputTag
            onAddTag={onAddTag}
            onDeleteTag={onDeleteTag}
            defaultTags={tags}
        />

        <div>Type a skill followed by a comma or enter</div>
        </div>
        </Card.Body>
    </Card>
    
  );
}
