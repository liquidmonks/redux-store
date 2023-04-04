import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import AMAZON_LOGO from '../../assets/amazon-logo.webp'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

function Nav() {
  return (
    <header className="p-2 bg-eerie text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="mr-3">
          <img src={AMAZON_LOGO} className='max-w-[3rem] rounded-md' alt='logo' />
        </Link>

        <nav>
          <ul className="flex items-center gap-2">
            {
              Auth.loggedIn() ? <>
                <li className="mx-1">
                  <Link to="/orderHistory">
                    Order History
                  </Link>
                </li>
                <li className="mx-1">
                  {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                  <button onClick={() => Auth.logout()} className='flex items-center gap-1'>
                    <span>Logout</span>
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  </button>
                </li>
              </>
                : <>
                  <li className="mx-1">
                    <Link to="/signup">
                      Signup
                    </Link>
                  </li>
                  <li className="mx-1">
                    <Link to="/login">
                      Login
                    </Link>
                  </li>
                </>
            }
          </ul>
        </nav>
      </div>
    </header>
  )


}

export default Nav;
