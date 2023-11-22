import React from 'react'
import {Link } from "react-router-dom"

const Header = () => {
  return (
    <nav>
        <ul>
            <li><Link to="post">Post</Link></li>
        </ul>
    </nav>
  )
}

export default Header