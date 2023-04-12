import { Link } from "react-router-dom";
import s from "./Header.module.scss";

const Header = (props) => {
  return (
    <header className={s.header}>
      <div className={s.logo}></div>
      <h1>New Social React Websites </h1>

      <div>
        <Link to="login">
          {props.isAuth.isAuth ? <p>{props.isAuth.login}</p> : <p>Login</p>}
        </Link>
      </div>
    </header>
  );
};

export default Header;
