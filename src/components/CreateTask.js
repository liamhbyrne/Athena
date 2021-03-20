import React, { useRef, useState } from "react"
import { Card, Button, Form } from "react-bootstrap"
import { auth, db}  from '../firebase'
import InputTag from "./InputTag";
import Select from 'react-select'
import { useHistory } from "react-router-dom";
import "../css/CreateTask.css"

export default function CreateTask() {

    // Constants
    const nameRef = useRef()
    const descRef = useRef()
    const [priority, setPriority] = useState("High");
    const history = useHistory()
    const [tags, setTags] = React.useState([]);

    // Function to add the tag
    const onAddTag = tag => {
        setTags([...tags, tag]);
      };

    // Function to delete the tag
    const onDeleteTag = tag => {
      let remainingTags = tags.filter(t => {
        return t !== tag;
      });
      setTags([...remainingTags]);
    };


    const options = [
      { value: 'High', label: 'High' },
      { value: 'Medium', label: 'Medium' },
      { value: 'Low', label: 'Low' }
    ]

    // Main Return function
    return (
    <>
      <Card>
        <Card.Body>
          <div id="cont">
          <h2 className="text-center mb-4">Create Task</h2>

          <Form>
            <Form.Label style={{color: "white"}}>Type a skill followed by a comma or enter:</Form.Label>
            <div>
            <InputTag
                onAddTag={onAddTag}
                onDeleteTag={onDeleteTag}
                defaultTags={tags}
            />
            </div>

            {/* Name field */}
            <Form.Group id="name">
              <Form.Label style={{color: "white"}}>Task Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>

            {/* Description field */}
            <Form.Group id="desc">
              <Form.Label style={{color: "white"}}>Description</Form.Label>
              <Form.Control type="textarea" rows="5" ref={descRef} required />
            </Form.Group>

            {/* Priority field */}
            <Form.Group id="pri">
              <Form.Label style={{color: "white"}}>Priority</Form.Label>
              <Select
                options={options}
                onChange={setPriority}
                placeholder={'priority'}
                clearable={false}
            />
        
            </Form.Group>
            
            {/* Create the task */}
            <Button className="w-100" type="button" onClick={writeTaskToFirestore}>
              Create
            </Button>
          </Form>
          </div>
        </Card.Body>
      </Card>
    </>
    )
    
    function uid() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Attemps to write the tak information to the Cloud Firestore
    function writeTaskToFirestore() {

        db.collection("task").doc(uid()).set({
            userUID: auth.currentUser.uid,
            name: nameRef.current.value,
            desc: descRef.current.value,
            priority: priority.value,
            date: new Date(),
            skills: [].concat.apply([], tags),
            recipientUID: null
            
        }).then(function() {
            console.log("Document successfully written!");
            history.push("/dashboard")
            window.location.reload();
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

}

