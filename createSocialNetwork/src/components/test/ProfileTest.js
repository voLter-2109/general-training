const ProfileTest = (props) => {
  const update = (e) => {
    let text = e.target.value;
    props.update(text);
  };
  const clickBtn = () => {
    props.addPost();
  };
  return (
    <>
      <textarea
        value={props.store.newPostText}
        onChange={update}
        cols="30"
        rows="10"
      ></textarea>
      <button style={{ width: " 30px", height: "30px" }} onClick={clickBtn}>
        123
      </button>
    </>
  );
};

export default ProfileTest;
