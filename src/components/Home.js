import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { NavigationBar } from './NavigationBar';
import "../css/Home.css"

export default function Home() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
            <div id="header">
                <h2>TaskPool</h2>
            </div>
            <div id="content">
                <p>This page will store all of the information on TaskPool. Basically just the homepage before the user signs in</p>
            </div>
        </Card.Body>
      </Card>
    </>
  )
}