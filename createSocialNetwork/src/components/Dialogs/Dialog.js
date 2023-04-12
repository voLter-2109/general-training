const Dialog = (props) => {
  let foto =
    props.message.id === "me"
      ? "../../img/profileImg/avatar.png"
      : "https://img.freepik.com/premium-psd/3d-illustration-smiling-mature-man-cartoon-close-up-portrait-standing-gray-hair-man-blue-background-3d-avatar-ui-ux_1020-5075.jpg?w=2000";
  return (
    <div>
      <img src={foto} alt="" />
      <p className="">{props.message.message}</p>
    </div>
  );
};

export default Dialog;
