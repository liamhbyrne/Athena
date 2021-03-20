import React, { useState } from "react"
import { Card } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import "../css/Dashboard.css"
import ReactDOM from 'react-dom'
import { auth, db}  from '../firebase'

// Display Functions
function resetContent() {
  var mainContent = document.getElementById("mainContent");
  while (mainContent.lastElementChild) {
    mainContent.removeChild(mainContent.lastElementChild);
  }
}

// Display all the users Active Tasks
async function openActiveTasks() {
  resetContent();
  const taskRef = db.collection("task");
  const myTasks = await taskRef.where("userUID", "==", auth.currentUser.uid).get();
  myTasks.forEach(doc => {
    createActiveTask(doc.get("priority"), doc.get("name"), doc.get("desc"));
  })
  var mainDiv = document.getElementById("mainContent");
  var tempDiv = document.createElement("div");
  tempDiv.id = 69;
  mainDiv.appendChild(tempDiv);
}

// Display the current Task Pool
async function openTaskPool() {
  console.log("attemptings to open task pool");
  resetContent();
  const taskRef = db.collection("task");
  const myTasks = await taskRef.where("userUID", "!=", auth.currentUser.uid).get();
  myTasks.forEach(doc => {
    createPoolTask(doc.get("priority"), doc.get("name"), doc.get("desc"), doc.get("skills"));
  });
}

// Creates each individual Active Task 
var activeTaskCount = 0;
function createActiveTask (priority, name, desc) {
  var elements = <div class={`task-container ${priority}`}>
    <div class="task-name">{name}</div>
    <div class="task-body">
      <div class="task-desc">{desc}</div>
    </div>
  </div>;
  var mainDiv = document.getElementById("mainContent");
  var tempDiv = document.createElement("div");
  tempDiv.id = activeTaskCount;
  mainDiv.appendChild(tempDiv);
  mainDiv.appendChild(document.createElement("p"));
  ReactDOM.render(elements, document.getElementById(activeTaskCount));
  activeTaskCount++;
}


// Creates each individual Pool Task
var poolTaskCount = 0;
var colorMap = ["#ff0460", "#cbdc56", "#64a3ea", 	"#ffc100", "#c356ea", "#8ff243", "#71aef2", "#ea5645"];
function createPoolTask(priority, name, desc, skills) {
  if(desc.length > 150){
    desc = desc.substring(0, 150) + "...";
  }

  console.log(typeof skills, skills);
  var elements = <div class={`task-container ${priority}`}>

    <div class="task-name">{name}</div>
    <div class="task-body">
      <div class="task-desc">{desc}</div>
      <div class="task-skills">
        {skills.map(skill => (
          <div class="task-skill" style={{backgroundColor: colorMap[skill.length % colorMap.length]}}>{skill}</div>
        ))}
      </div>
    </div>
  </div>;
  var mainDiv = document.getElementById("mainContent");
  var tempDiv = document.createElement("div");
  tempDiv.id = poolTaskCount;
  mainDiv.appendChild(tempDiv);
  mainDiv.appendChild(document.createElement("p"));
  ReactDOM.render(elements, document.getElementById(poolTaskCount));
  poolTaskCount++;
}

// Calculates a percentage for how relavent the task is for the currentUser
function calculateRelevancy (userSkills, requiredSkils) {
  var total = requiredSkils.length;
  var same = 0;
  requiredSkils.forEach(skill => {
    userSkills.forEach(userSkill => {
      if (skill.valueOf() === userSkill.valueOf()) {
        same++;
      }
    })
  });
  return (Math.round((same / total) * 100) / 100) * 100
}

// Full screen display of the Task
function displayLargePoolTask (email, name, desc, skills) {
  var elements = <div id="largePoolTask">
    <h3>{name}</h3>
    <p>{email}</p>
    <p>{desc}</p>
    <p>X</p>
  </div>
  return elements;
}


// Main Code
export default function Dashboard() {
  const [setError] = useState("")
  const { logout } = useAuth()
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
                <h1>Set By Me</h1>
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


