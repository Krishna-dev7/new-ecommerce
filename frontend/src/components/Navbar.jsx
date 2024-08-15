import { useEffect } from "react"
import authService from "../app/authService"

function Navbar() {

  return (
    <nav className="bg-zinc-800 backdrop-blur-md w-full h-10 text-center flex items-center border border-zinc-700" >
      <div className="logo text-sm font-semibold">
        Logo.
      </div>
    </nav>
  )
}

export default Navbar