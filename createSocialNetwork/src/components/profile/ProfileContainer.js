// part of the library
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// actionCreator
import {
  addPostActionCreator,
  updatNewPostTextActionCreator,
  setUserProfile,
} from "../state/profileReducer";
// component
import MyPosts from "./MyPosts/MyPosts";
import HeaderProfile from "./MyHeaderProfile/HeaderProfile";
// style
import s from "./Profile.module.scss";
// lodash
const pick = require("lodash/pick");

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = 1;
    }
    axios.get(`http://localhost:3001/users/${userId}`).then((response) => {
      this.props.setUserProfile(response.data);
    });
  }
  // componentDidUpdate(prevProps, prevState) {
  //   console.log("prevState");
  //   console.log(prevState);
  //   console.log("this.state");
  //   console.log(prevProps);

  //   console.log("new.state");
  //   let a = this.state; //придет новый стетй
  //   let b = this.props; //придут новые пропсы
  //   console.log(a);
  //   console.log(b);
  // }

  render() {
    return (
      <>
        <div className={s.profile}>
          <HeaderProfile {...this.props.profile} />
          <MyPosts
            state={pick(this.props.profile, ["posts", "newPostText"])}
            addPost={this.props.addPost}
            updateNewPostText={this.props.updateNewPostText}
          />
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addPost: bindActionCreators(addPostActionCreator, dispatch),
    updateNewPostText: bindActionCreators(
      updatNewPostTextActionCreator,
      dispatch
    ),
    setUserProfile: bindActionCreators(setUserProfile, dispatch),
  };
}
function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileContainer));
