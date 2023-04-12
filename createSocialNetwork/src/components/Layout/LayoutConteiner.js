// part of the library
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
// component
import Header from "./Header/Header";
import NavBar from "./NavBar/NavBar";
// style
import s from "./Layout.module.scss";

import { setUserProfile } from "../state/profileReducer";

const LayoutContainer = (props) => {
  // debugger;
  return (
    <>
      <div className="app-wrapper">
        <Header isAuth={props.isAuth} />
        <NavBar
          frineds={props.profile.friends}
          setUserProfile={props.setUserProfile}
        />

        <div className={s.content}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    profile: state.sidebar,
    myProfileLink: state.profile.myProfile,
    isAuth: state.auth,
  };
}

export default connect(mapStateToProps, { setUserProfile })(LayoutContainer);
