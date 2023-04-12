// part of the library
import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// component
import Dialog from "./Dialog";
import DialogName from "./DialogsName";
// actionCreator
import {
  updateNewMessageBodyActionCreator,
  sendMessageActionCreator,
  updateDialogIdActionCreator,
} from "../state/dialogsReducer";
// style
import s from "./Dialogs.module.scss";

const DialogsContainer = (props) => {

  const message = props.dialogs.dialogs[props.dialogs.dialogId].message.map(
    (item) => {
      return <Dialog message={item} />;
    }
  );

  const onNewMessageBody = (e) => {
    let body = e.target.value;
    props.onNewMessageBody(body);
  };

  const clickSendMessage = () => {
    props.onSendMessageClick();
  };

  return (
    <div className={s.container}>
      <div className={s.dialogs}>
        <DialogName
          dialogs={props.dialogs.dialogs}
          updateDialogId={props.updateDialogId}
        />
      </div>
      <div className={s.dialog}>{message}</div>
      <div className={s.newmessage}>
        <textarea
          value={props.dialogs.newMessageBody}
          onChange={onNewMessageBody}
          placeholder="write new post"
        ></textarea>
        <button onClick={clickSendMessage}>Post</button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    dialogs: state.dialogs,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateDialogId: bindActionCreators(updateDialogIdActionCreator, dispatch),
    onSendMessageClick: bindActionCreators(sendMessageActionCreator, dispatch),
    onNewMessageBody: bindActionCreators(
      updateNewMessageBodyActionCreator,
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer);
