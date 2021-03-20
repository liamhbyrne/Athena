import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { NavigationBar } from './NavigationBar';
import "../css/Dashboard.css"
import ReactDOM from 'react-dom'
import { auth, db, app}  from '../firebase'

// Display Functions
function resetContent() {
  var mainContent = document.getElementById("mainContent");
  while (mainContent.lastElementChild) {
    mainContent.removeChild(mainContent.lastElementChild);
  }
}

async function openActiveTasks() {
  resetContent();
  const taskRef = db.collection("task");
  const myTasks = await taskRef.where("created_by", "==", auth.currentUser.email).get();
  myTasks.forEach(doc => {
    createActiveTask(doc.get("created_by"), doc.get("name"), doc.get("desc"));
  })
}

async function openTaskPool() {
  resetContent();
  const taskRef = db.collection("task");
  const myTasks = await taskRef.where("created_by", "!=", auth.currentUser.email).get();
  myTasks.forEach(doc => {
    createPoolTask(doc.get("created_by"), doc.get("name"), doc.get("desc"));
  });
}

var activeTaskCount = 0;
function createActiveTask (email, name, desc) {
  var elements = <div id="activeTask">
    <h2>{name}</h2>
    <h4>Owner: {email}</h4>
    <p>{desc}</p>
  </div>;
  var mainDiv = document.getElementById("mainContent");
  var tempDiv = document.createElement("div");
  tempDiv.id = activeTaskCount;
  mainDiv.appendChild(tempDiv);
  mainDiv.appendChild(document.createElement("p"));
  ReactDOM.render(elements, document.getElementById(activeTaskCount));
  activeTaskCount++;
}

function createPoolTask (email, name, desc) {
  var elements = <div id="poolTask">
    <h2>{name}</h2>
    <h4>Owner: {email}</h4>
    <p>{desc}</p>
  </div>;
  var mainDiv = document.getElementById("mainContent");
  var tempDiv = document.createElement("div");
  tempDiv.id = activeTaskCount;
  mainDiv.appendChild(tempDiv);
  mainDiv.appendChild(document.createElement("p"));
  ReactDOM.render(elements, document.getElementById(activeTaskCount));
  activeTaskCount++;
}

function calculateRelevancy (userSkills, requiredSkils) {
  var total = requiredSkils.length;
  var same = 0;
  requiredSkils.forEach(skill => {
    userSkills.forEach(userSkill => {
      if (skill.valueOf() == userSkill.valueOf()) {
        same++;
      }
    })
  });
  return (Math.round((same / total) * 100) / 100) * 100
}

// Main Code
export default function Dashboard() {
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
          <div class="tabBar">
            <div id="tab" onClick={openActiveTasks}>
              <h1>Active Tasks</h1>
            </div>
            <div id="tab" onClick={openTaskPool}>
              <h1>Task Pool</h1>
            </div>
          </div>

          <div id="mainContent" onLoad={openActiveTasks}></div>
        </Card.Body>
      </Card>
    </>
  )
}