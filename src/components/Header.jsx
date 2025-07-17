
import Container from "./Container";

import Footer from "./Footer";
import Logo from "./Logo";
import Logout from "./Logout";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  console.log(authStatus);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },

    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All-Posts",
      slug: "/view-all",
      active: authStatus,
    },
    {
      name: "Add-Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "About",
      slug: "/about",
      active: authStatus,
    },
  ];

 return (
    <header className="shadow py-4 bg-gray-950 text-white">
      <Container>
        <div className="flex justify-between items-center">
          <Logo />

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex ml-auto items-center gap-4 font-[Inter] ">
            {navItems.map((item) =>
              item.active ? (
                <NavLink
                  key={item.name}
                  to={item.slug}
                  className={({ isActive }) =>
                    `relative inline-block font-black uppercase tracking-wide py-1 px-3 overflow-hidden text-xs
                    ${isActive ? "text-rose-400" : "text-white"}
                    before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[3px] before:w-full
                    before:bg-white before:transition-transform before:duration-500
                    before:animate-[slideX_0.5s_ease] hover:before:animate-[slideX_0.5s_ease] font-semibold`
                  }
                >
                  {item.name}
                </NavLink>
              ) : null
            )}
            {authStatus && (
              <li>
                <button
                  onClick={async () => {
                    try {
                      await authService.logout();
                      dispatch({ type: "auth/logout" });
                      navigate("/login");
                    } catch (error) {
                      console.log("Logout error:", error);
                    }
                  }}
                  className="text-white font-semibold cursor-pointer transition duration-200 bg-gradient-to-r from-rose-400 to-rose-500 p-2 rounded-3xl px-5 text-sm hover:opacity-90 ml-20"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Mobile nav (dropdown) */}
        {isMobileMenuOpen && (
          <div className="w-1/2 ml-38">
          <ul className="md:hidden mt-4 flex flex-col gap-4 text-sm font-semibold  font-[Inter] ">
            {navItems.map((item) =>
              item.active ? (
                <NavLink
                  key={item.name}
                  to={item.slug}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block  px-4 py-2 rounded ${
                      isActive ? "text-rose-400" : "text-white"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ) : null
            )}
            {authStatus && (
              <button
                onClick={async () => {
                  try {
                    await authService.logout();
                    dispatch({ type: "auth/logout" });
                    navigate("/login");
                  } catch (error) {
                    console.log("Logout error:", error);
                  }
                }}
                className="text-white font-semibold cursor-pointer transition duration-200 bg-gradient-to-r from-rose-400 to-rose-500 px-4 py-2 rounded-xl hover:opacity-90"
              >
                Logout
              </button>
            )}
          </ul>
          </div>
        )}
      </Container>
    </header>
 )
}

export default Header;
