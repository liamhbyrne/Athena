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
          <h1>TaskPool</h1>
          <div class="mainPage">
            <div class="section">
              <div class="left"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum leo turpis, scelerisque vitae dictum eget, ullamcorper non sem. Aliquam justo purus, molestie mattis dignissim nec, rutrum quis erat. Cras faucibus libero a enim maximus, ut lacinia est laoreet. Aenean erat est, posuere ac lectus ut, blandit porta sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum a est eros. Praesent non magna sit amet eros feugiat ultrices vitae vel metus. Ut eget ante metus. Ut nec magna sed orci varius sollicitudin. Nam sit amet diam lectus. Vestibulum viverra est eu velit mollis, in egestas nulla maximus. Nulla facilisi. Donec blandit ac augue fringilla volutpat. Nulla commodo viverra faucibus. Ut pulvinar dictum nunc, at aliquam justo finibus id. Vestibulum a placerat massa, sit amet semper elit.</p></div>
              <div class="right"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum leo turpis, scelerisque vitae dictum eget, ullamcorper non sem. Aliquam justo purus, molestie mattis dignissim nec, rutrum quis erat. Cras faucibus libero a enim maximus, ut lacinia est laoreet. Aenean erat est, posuere ac lectus ut, blandit porta sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum a est eros. Praesent non magna sit amet eros feugiat ultrices vitae vel metus. Ut eget ante metus. Ut nec magna sed orci varius sollicitudin. Nam sit amet diam lectus. Vestibulum viverra est eu velit mollis, in egestas nulla maximus. Nulla facilisi. Donec blandit ac augue fringilla volutpat. Nulla commodo viverra faucibus. Ut pulvinar dictum nunc, at aliquam justo finibus id. Vestibulum a placerat massa, sit amet semper elit.</p></div>
            </div>
            <div class="section">
              <div class="left"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum leo turpis, scelerisque vitae dictum eget, ullamcorper non sem. Aliquam justo purus, molestie mattis dignissim nec, rutrum quis erat. Cras faucibus libero a enim maximus, ut lacinia est laoreet. Aenean erat est, posuere ac lectus ut, blandit porta sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum a est eros. Praesent non magna sit amet eros feugiat ultrices vitae vel metus. Ut eget ante metus. Ut nec magna sed orci varius sollicitudin. Nam sit amet diam lectus. Vestibulum viverra est eu velit mollis, in egestas nulla maximus. Nulla facilisi. Donec blandit ac augue fringilla volutpat. Nulla commodo viverra faucibus. Ut pulvinar dictum nunc, at aliquam justo finibus id. Vestibulum a placerat massa, sit amet semper elit.</p></div>
              <div class="right"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum leo turpis, scelerisque vitae dictum eget, ullamcorper non sem. Aliquam justo purus, molestie mattis dignissim nec, rutrum quis erat. Cras faucibus libero a enim maximus, ut lacinia est laoreet. Aenean erat est, posuere ac lectus ut, blandit porta sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum a est eros. Praesent non magna sit amet eros feugiat ultrices vitae vel metus. Ut eget ante metus. Ut nec magna sed orci varius sollicitudin. Nam sit amet diam lectus. Vestibulum viverra est eu velit mollis, in egestas nulla maximus. Nulla facilisi. Donec blandit ac augue fringilla volutpat. Nulla commodo viverra faucibus. Ut pulvinar dictum nunc, at aliquam justo finibus id. Vestibulum a placerat massa, sit amet semper elit.</p></div>
            </div>
            <div class="section">
              <div class="left"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum leo turpis, scelerisque vitae dictum eget, ullamcorper non sem. Aliquam justo purus, molestie mattis dignissim nec, rutrum quis erat. Cras faucibus libero a enim maximus, ut lacinia est laoreet. Aenean erat est, posuere ac lectus ut, blandit porta sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum a est eros. Praesent non magna sit amet eros feugiat ultrices vitae vel metus. Ut eget ante metus. Ut nec magna sed orci varius sollicitudin. Nam sit amet diam lectus. Vestibulum viverra est eu velit mollis, in egestas nulla maximus. Nulla facilisi. Donec blandit ac augue fringilla volutpat. Nulla commodo viverra faucibus. Ut pulvinar dictum nunc, at aliquam justo finibus id. Vestibulum a placerat massa, sit amet semper elit.</p></div>
              <div class="right"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum leo turpis, scelerisque vitae dictum eget, ullamcorper non sem. Aliquam justo purus, molestie mattis dignissim nec, rutrum quis erat. Cras faucibus libero a enim maximus, ut lacinia est laoreet. Aenean erat est, posuere ac lectus ut, blandit porta sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum a est eros. Praesent non magna sit amet eros feugiat ultrices vitae vel metus. Ut eget ante metus. Ut nec magna sed orci varius sollicitudin. Nam sit amet diam lectus. Vestibulum viverra est eu velit mollis, in egestas nulla maximus. Nulla facilisi. Donec blandit ac augue fringilla volutpat. Nulla commodo viverra faucibus. Ut pulvinar dictum nunc, at aliquam justo finibus id. Vestibulum a placerat massa, sit amet semper elit.</p></div>
            </div>
            <div class="section">
              <div class="left"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum leo turpis, scelerisque vitae dictum eget, ullamcorper non sem. Aliquam justo purus, molestie mattis dignissim nec, rutrum quis erat. Cras faucibus libero a enim maximus, ut lacinia est laoreet. Aenean erat est, posuere ac lectus ut, blandit porta sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum a est eros. Praesent non magna sit amet eros feugiat ultrices vitae vel metus. Ut eget ante metus. Ut nec magna sed orci varius sollicitudin. Nam sit amet diam lectus. Vestibulum viverra est eu velit mollis, in egestas nulla maximus. Nulla facilisi. Donec blandit ac augue fringilla volutpat. Nulla commodo viverra faucibus. Ut pulvinar dictum nunc, at aliquam justo finibus id. Vestibulum a placerat massa, sit amet semper elit.</p></div>
              <div class="right"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum leo turpis, scelerisque vitae dictum eget, ullamcorper non sem. Aliquam justo purus, molestie mattis dignissim nec, rutrum quis erat. Cras faucibus libero a enim maximus, ut lacinia est laoreet. Aenean erat est, posuere ac lectus ut, blandit porta sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum a est eros. Praesent non magna sit amet eros feugiat ultrices vitae vel metus. Ut eget ante metus. Ut nec magna sed orci varius sollicitudin. Nam sit amet diam lectus. Vestibulum viverra est eu velit mollis, in egestas nulla maximus. Nulla facilisi. Donec blandit ac augue fringilla volutpat. Nulla commodo viverra faucibus. Ut pulvinar dictum nunc, at aliquam justo finibus id. Vestibulum a placerat massa, sit amet semper elit.</p></div>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}