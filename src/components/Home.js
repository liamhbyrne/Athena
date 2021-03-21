import React, { useState } from "react"
import { Card } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import "../css/Home.css"

export default function Home() {
  const [setError] = useState("")
  const { logout } = useAuth()
  const history = useHistory()

  // Attempst to log the user in
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

function goSignup(){
  window.location.href="/signup";
}


  var sectionStyle = {
    backgroundImage: "url(" + "landing_background.png" + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  }

  return (
    <>

          <div class="mainPage" style={ sectionStyle }>
            <div class="section">
              <div class="titleSection">
              <img className="img-fluid" src={`${process.env.PUBLIC_URL}/landing_logo.png`} id="mainimage" alt=""></img>
              <br></br>
              <button onClick={goSignup}><b>Sign Up</b></button>
              <br></br>
              <p id="p-login">Already have an account? - <a href="/login">Log In</a></p>
              <br></br>
              <p><b>Scroll down to read more</b></p>
              <p><b>V</b></p>
              </div>

            
            </div>
            <div class="section">
              <div class="column">
                <h2><b>Task Pooling</b></h2>
                <p>Athena uses the idea of task pooling as an innovative solution to task delegation within an organisation. Instead of managers or co-workers assigning task to individuals, they simply put the task into a pool and the most applicable or most eager worker fulfils it. This creates a great environment in which someone who has a task that they aren't qualified to do can put it into the pool and someone who is qualified can do it. The result - a more distributed and democratised horiztonal working environment.</p>
              </div>
              <div class="column">
                <img className="img-fluid" src={`${process.env.PUBLIC_URL}/pooling.png`} id="image1" alt=""></img>
              </div>
            </div>
            <div class="section">
              <div class="column">
                <img className="img-fluid" src={`${process.env.PUBLIC_URL}/remote_work.png`} id="image2" alt=""></img>
              </div>
              <div class="column">
                <h2><b>Remote Working</b></h2>
                <p><b>"Our best estimate is that 25-30% of the workforce will be working-from-home multiple days a week by the end of 2021."</b><br/> - Kate Lister, President of Global Workplace Analytics<br/><br/>
                  Remote working is on the rise and Athena's platform offers an empowering yet accountable solution. For workers, they have more control over the tasks they complete and their pace. For managers, they don't have to figure out where all their employees are at in their work and perfectly time issuing new tasks. It is a solution benefiical to all parties involved.</p>
              </div>
            </div>
            <div class="section">
              <div class="column">
                <h2><b>Easy to Use</b></h2>
                <p><b>"As far as the customer is concerned, the interface is the product."</b><br/> - Jef Raskin, Human–Computer Interface expert<br/><br/>
                Here at Athena, we designed our User Interface to be as user-friendly as possible, focusing on convenience and accessability. With a clean UI, viewing and creating <b>Tasks</b> is simple as simple as filling in a form, and letting the users come to you.</p>
              </div>
              <div class="column">
                <img className="img-fluid" src={`${process.env.PUBLIC_URL}/home3.PNG`} id="image3" alt=""></img>
              </div>
            </div>
            <div class="section">
              <div class="column">
              <img className="img-fluid" src={`${process.env.PUBLIC_URL}/home4.PNG`} id="image4" alt=""></img>
              </div>
              <div class="column">
                <h2><b>Specialised for You</b></h2>
                <p>When creating a Task, you have full control over how it is viewed. For example, you can set the priority level so that users can see whether or not your task is needed to be completed quickly or not, with <b>Red</b> being the <b>Highest</b> and <b>Green</b> being the <b>Lowest</b>. As well as this, you can add required Skills, so that users can filter out the tasks which are specially suited for them. </p>
              </div>
            </div>
          </div>
    </>
  )
}