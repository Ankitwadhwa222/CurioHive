
import Container from "./Container";

import Footer from "./Footer";
import Logo from "./Logo";
import Logout from "./Logout";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  console.log(authStatus);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <header className="shadow py-4 bg-gray-950 ">
      <Container>
        <div className="flex justify-between items-center">
          <Logo />

          <ul className="flex ml-auto items-center gap-4  ">
            {navItems.map((item) =>
              item.active ? (
                <NavLink
                  key={item.name}
                  to={item.slug}
                  className={({ isActive }) =>
                    `relative inline-block font-black uppercase tracking-wide py-1 px-3 overflow-hidden text-sm
                    font-bold ${isActive ? "text-rose-400" : "text-white"}
                    before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[3px] before:w-full
                    before:bg-white before:transition-transform before:duration-500
                    before:animate-[slideX_0.5s_ease] hover:before:animate-[slideX_0.5s_ease]`
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
                  className="text-white font-semibold cursor-pointer transition duration-200 bg-gradient-to-r from-rose-400 to-rose-500 p-2 rounded-3xl px-5 ml-10 text-sm hover:opacity-90"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </Container>
    </header>
  );
}

export default Header;
