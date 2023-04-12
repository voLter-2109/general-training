import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  addPostActionCreator,
  updatNewPostTextActionCreator,
} from "../state/profileReducer";
import ProfileTest from "./ProfileTest";

const ProfileContaunerTest = (props) => {
  // вместо dispatch передает функ. по имени свойства обьекта - addPost
  // в state  так же
  // state после каждого reduce книруется и заменяется
  return (
    <ProfileTest
      store={props.profile}
      addPost={props.addPost}
      update={props.update}
    />
  );
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    addPost: bindActionCreators(addPostActionCreator, dispatch),
    update: bindActionCreators(updatNewPostTextActionCreator, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContaunerTest);
