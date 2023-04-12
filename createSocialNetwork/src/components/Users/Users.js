import { NavLink } from "react-router-dom";

const Users = (props) => {
  let user = props.users.map((user) => {
    return (
      <div
        key={user.id}
        style={{
          display: "flex",
          flexDirection: "row",
          border: "1px solid black",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <NavLink to={"/profile/" + user.id}>
            <img style={{ width: "100px" }} src={user.fotoUrl.small} alt="" />
          </NavLink>
          {user.followed ? (
            <button onClick={() => props.unFollow(user.id)}>Follow</button>
          ) : (
            <button onClick={() => props.follow(user.id)}>unFollow</button>
          )}
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div>{user.name}</div>
            <div>{user.username}</div>
          </div>
          <div>
            <div>{user.address.street}</div>
            <div>{user.address.city}</div>
          </div>
        </div>
      </div>
    );
  });
  return user;
};

export default Users;
