import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setUserData } from "../state/auth-reducer";

class AuthContainer extends React.Component {
  componentDidMount() {
    axios
      .get("http://localhost:3001/autData", { withCredentials: true })
      .then((response) => {
        let { id, email, username } = response.data;
        if (response.data.resultCode === 1) {
          this.props.setUserData(id, email, username);
        }
      });
  }

  render() {
    return;
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    setUserData: bindActionCreators(setUserData, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
