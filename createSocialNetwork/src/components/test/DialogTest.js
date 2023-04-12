import "./test.css";

const DialogTest = (props) => {
  const update = (e) => {
    let text = e.target.value;
    props.store.updateNewMessage(text);
  };
  const clickBtn = () => {
    props.store.sendMessage();
  };
  // console.log(props);
  return (
    <>
      <p className="test">Dialog test</p>
      <textarea
        value={props.store.dialogs.newMessageBody}
        onChange={update}
        cols="30"
        rows="10"
      ></textarea>
      <button
        style={{ width: " 30px", height: "30px" }}
        onClick={clickBtn}
      ></button>
    </>
  );
};

export default DialogTest;
