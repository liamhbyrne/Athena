
  



import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { auth, db, app}  from '../firebase'



export default function CreateTask() {

    const nameRef = useRef()
    const descRef = useRef()
    const skillsRef = useRef()
    const priorityRef = useRef()

    return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Create Task</h2>

          <Form>

            <Form.Group id="name">
              <Form.Label>Task Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>

            <Form.Group id="desc">
              <Form.Label>Description</Form.Label>
              <Form.Control type="textarea" ref={descRef} required />
            </Form.Group>

            <Form.Group id="skills">
              <Form.Label>Skills</Form.Label>
              <Form.Control type="text" ref={skillsRef}  />
            </Form.Group>

            <Form.Group id="priority">
              <Form.Label>Priority</Form.Label>
              <Form.Control type="text" ref={priorityRef}  />
            </Form.Group>

            <Button className="w-100" type="button" onClick={writeTaskToFirestore}>
              Create
            </Button>
          </Form>

        </Card.Body>
      </Card>
    </>
    )
    
    function uid(){
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }


    async function writeTaskToFirestore() {

        db.collection("task").doc(uid()).set({
            name: nameRef.current.value,
            desc: descRef.current.value,
            skills: skillsRef.current.value,
            priority: priorityRef.current.value,
            date: new Date(),
            created_by: auth.currentUser.email
            
        }).then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

}

