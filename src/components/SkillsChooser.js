import React from 'react'
import { Card, Button, Alert } from "react-bootstrap"
import InputTag from "./InputTag";
import { db, auth }  from '../firebase'

export default function SkillsChooser() {

    const [tags, setTags] = React.useState([]);

    const onAddTag = tag => {
        setTags([...tags, tag]);
        writeSkillToFirestore()
      };

      const onDeleteTag = tag => {
        let remainingTags = tags.filter(t => {
          return t !== tag;
        });
        setTags([...remainingTags]);
      };

      function writeSkillToFirestore() {

        db.collection("user").doc(auth.currentUser.uid).set({
            skills: [].concat.apply([], tags)
        }).then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

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
            <Button className="w-100" onMouseDown={writeSkillToFirestore}>Submit</Button>
        </Card.Body>
    </Card>

  );
}
