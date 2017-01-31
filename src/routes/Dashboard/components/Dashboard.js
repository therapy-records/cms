import React from 'react'
import { Link } from 'react-router'
import './Dashboard.scss'

export const Dashboard = () => (
  <div>
    <h2>Welcome back</h2>
    <Link to='news/create'>Create a new post</Link>
  </div>
)

export default Dashboard
