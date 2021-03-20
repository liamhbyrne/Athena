import React from 'react'
import firebase from "firebase/app"
import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"


export default function CreateTask() {

    const nameRef = useRef()
    const descRef = useRef()
    const skillsRef = useRef()
    const priorityRef = useRef()
    const dateCreatedRef = useRef()
    const createdByRef = useRef()

    /** ADD FUNCTIONALITY TO CREATE A NEW TASK. NEED TO FIND A WAY TO GET CURRENT USER'S NAME (ID BETTER) FOR CREATED BY */

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        history.push("/")
        } catch {
        setError("Failed to log in")
        }

        setLoading(false)
    }

    return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Create Task</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>

            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>

        </Card.Body>
      </Card>
    </>
    )
}

