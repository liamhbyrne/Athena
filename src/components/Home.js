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
          <div class="mainPage">
            <div class="section">
              <div class="titleSection">
                <h1 id="heading1" style={{fontSize: 150}}>Athena</h1>
                <h3 id="heading2">Democratising Remote Workflows</h3>
                <h6 id="heading3">Scroll Down for more Information</h6>
              </div>
            </div>
            <div class="section">
              <div class="column">
                <h2><b>Heading 1</b></h2>
                <p><b>Introduction to what Athena does, and why companies/public should use it.</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sollicitudin finibus risus nec faucibus. Sed aliquam nisl a nunc malesuada, vel consectetur diam congue. Curabitur suscipit erat sem, nec egestas libero tempus et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et mattis felis. Nullam nisi nulla, pharetra non convallis nec, placerat at nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
              </div>
              <div class="column">
                <img className="img-fluid" src={`${process.env.PUBLIC_URL}/home1.jpg`} id="image1"></img>
              </div>
            </div>
            <div class="section">
              <div class="column">
                <img className="img-fluid" src={`${process.env.PUBLIC_URL}/home2.PNG`} id="image2"></img>
              </div>
              <div class="column">
                <h2><b>Heading 2</b></h2>
                <p><b>Describing how the filters work and the process the tasks can go through.</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sollicitudin finibus risus nec faucibus. Sed aliquam nisl a nunc malesuada, vel consectetur diam congue. Curabitur suscipit erat sem, nec egestas libero tempus et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et mattis felis. Nullam nisi nulla, pharetra non convallis nec, placerat at nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
              </div>
            </div>
            <div class="section">
              <div class="column">
                <h2><b>Heading 3</b></h2>
                <p><b>Explains that the UI is easy to use and isn't complicated for the users. Also states that you can easily manage your tasks.</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sollicitudin finibus risus nec faucibus. Sed aliquam nisl a nunc malesuada, vel consectetur diam congue. Curabitur suscipit erat sem, nec egestas libero tempus et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et mattis felis. Nullam nisi nulla, pharetra non convallis nec, placerat at nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
              </div>
              <div class="column">
                <img className="img-fluid" src={`${process.env.PUBLIC_URL}/home3.PNG`} id="image3"></img>
              </div>
            </div>
            <div class="section">
              <div class="column">
                <p>PICTURE OF THE DASHBOARD</p>
              </div>
              <div class="column">
                <h2><b>Heading 4</b></h2>
                <p><b>Explanation of how the dashboard looks, the features which are most comman and it's simplicity.</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sollicitudin finibus risus nec faucibus. Sed aliquam nisl a nunc malesuada, vel consectetur diam congue. Curabitur suscipit erat sem, nec egestas libero tempus et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent et mattis felis. Nullam nisi nulla, pharetra non convallis nec, placerat at nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}