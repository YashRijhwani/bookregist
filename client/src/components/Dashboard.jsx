import React from 'react'
import { Bookdrawer, Navbar } from "../components"

export default function Dashboard({profile, logOut}) {
  return (
    <div>
        <Navbar profile={profile} logOut={logOut} />
        <Bookdrawer />
    </div>
  )
}

