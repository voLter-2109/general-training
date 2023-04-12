import { NavLink } from "react-router-dom";
import axios from "axios";
import s from "./NavBar.module.scss";

let activeClass = {
  color: "black",
  backgroundColor: "rgb(197, 118, 118)",
  boxShadow: "2px 2px 10px rgb(0, 0, 0, .2)",
  textDecoration: "none",
};
const NavBar = (props) => {
  // debugger;
  const Friends = () => {
    const friend = props.frineds.map((f) => {
      return (
        <div key={f.id}>
          <div className={s.friend}>
            <img src={f.url} alt="" />
            <p>{f.name}</p>
          </div>
        </div>
      );
    });
    return friend;
  };

  return (
    <nav className={s.nav}>
      <NavLink
        style={({ isActive }) => (isActive ? activeClass : undefined)}
        to="profile"
        onClick={() => {
          axios.get(`http://localhost:3001/users/1`).then((response) => {
            props.setUserProfile(response.data);
          });
        }}
      >
        Profile
      </NavLink>

      <NavLink
        style={({ isActive }) => (isActive ? activeClass : undefined)}
        to="dialogs"
      >
        Dialogs
      </NavLink>
      <NavLink
        style={({ isActive }) => (isActive ? activeClass : undefined)}
        to="users"
      >
        Users
      </NavLink>

      <NavLink
        style={({ isActive }) => (isActive ? activeClass : undefined)}
        to="/error"
      >
        error
      </NavLink>
      <h1>Friends</h1>
      <div>
        <Friends />
      </div>
    </nav>
  );
};

export default NavBar;
