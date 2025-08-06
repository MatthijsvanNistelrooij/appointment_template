import React from "react"
import SignOutButton from "./SignOutButton"

import { Models } from "appwrite" // or "node-appwrite" depending on your setup

const Navbar = ({ user }: { user: Models.User<Models.Preferences> | null }) => {
  console.log(user)

  return (
    <div className="bg-gray-200 flex justify-between p-2">
      <div className="text-gray-800 m-1"> Welcome back, {user?.name}!</div>
      <div>
        <SignOutButton />
      </div>
    </div>
  )
}

export default Navbar
