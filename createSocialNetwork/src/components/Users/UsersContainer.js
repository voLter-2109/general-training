// part of the library
import React from "react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import axios from "axios";

// actionCreator
import {
  follow,
  setCurrentPage,
  setTotalCount,
  setUsers,
  toggleIsFetching,
  unFollow,
} from "../state/usersReducer";

// component
import Users from "./Users";
import Pagination from "./Pagination";
import Preloader from "../common/Preloader/Preloader";

class UsersContainer extends React.Component {
  componentDidMount = () => {
    this.props.toggleIsFetching(true);
    axios.get("http://localhost:3001/totalUsers").then((response) => {
      this.props.setTotalCount(response.data[0]);
    });

    axios
      .get(
        `http://localhost:3001/users?_page=${this.props.currentPage}&_limit=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setUsers(response.data);
        this.props.toggleIsFetching(false);
      });
  };

  onPageChenged = (currentPage) => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(currentPage);

    axios
      .get(
        `http://localhost:3001/users?_page=${currentPage}&_limit=${this.props.pageSize}`
      )
      .then((response) => {
        this.props.setUsers(response.data);
        this.props.toggleIsFetching(false);
      });
  };

  render = () => {
    // debugger;
    let pagesCount = Math.ceil(this.props.totalCount / this.props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }

    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <>
            <Pagination
              pages={pages}
              onPageChenged={this.onPageChenged}
              currentPage={this.props.currentPage}
            />
            <Users
              users={this.props.users}
              unFollow={this.props.unFollow}
              follow={this.props.follow}
            />
          </>
        )}
      </>
    );
  };
}

function mapStateToProps(state) {
  return {
    users: state.users.users,
    pageSize: state.users.pageSize,
    totalCount: state.users.totalCount,
    currentPage: state.users.currentPage,
    isFetching: state.users.isFetching,
  };
}

export default connect(mapStateToProps, {
  follow,
  unFollow,
  setUsers,
  setCurrentPage,
  setTotalCount,
  toggleIsFetching,
})(UsersContainer);
