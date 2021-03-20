import React, { useRef, useState } from "react"
import { Card, Button, Alert, Form } from "react-bootstrap"
import InputTag from "./InputTag";
import { db, auth }  from '../firebase'

export default function SkillsChooser() {

    const [tags, setTags] = React.useState([]);

    const displayNameRef = useRef()
    const companyRef = useRef()
    const departmentRef = useRef()
    const [error, setError] = useState("")

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
            skills: [].concat.apply([], tags),
            displayName: displayNameRef.current.value,
            company: companyRef.current.value,
            department: departmentRef.current.value
        }).then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            setError("Something went wrong")
        });
    }

    return (
    <Card>
        <Card.Body>
        <h2 className="text-center mb-4">Your Skills</h2>
            <Form onSubmit={writeSkillToFirestore}>
            {error && <Alert variant="danger">{error}</Alert>}
            <div>Type a skill followed by a comma or enter</div>
            <div>
            <InputTag
                onAddTag={onAddTag}
                onDeleteTag={onDeleteTag}
                defaultTags={tags}
            />
            </div>
            <Form.Group id="Display Name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={displayNameRef} required />
            </Form.Group>
            <Form.Group id="Company">
              <Form.Label>Comapny</Form.Label>
              <Form.Control type="text" ref={companyRef} required />
            </Form.Group>
            <Form.Group id="Department">
              <Form.Label>Department</Form.Label>
              <Form.Control type="text" ref={departmentRef} required />
            </Form.Group>
            <Button className="w-100" onMouseDown={writeSkillToFirestore}>Submit</Button>
            </Form>



        </Card.Body>
    </Card>

  );
}
