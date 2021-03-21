import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "../css/Profile.css"

export default function Profile() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      window.location.href="/login";
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <div id="cont">
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <p class="text"><strong>Email:</strong> {currentUser.email}</p>
          <p class="text"><strong>UID:</strong> {currentUser.uid}</p>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      </div>
        </Card.Body>
      </Card>
    </>
  )
}