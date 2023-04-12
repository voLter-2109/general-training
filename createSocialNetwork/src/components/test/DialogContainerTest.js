import DialogTest from "./DialogTest";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  sendMessageActionCreator,
  updateDialogIdActionCreator,
  updateNewMessageBodyActionCreator,
} from "../state/dialogsReducer";

const DialogContaunerTest = (props) => {
  // console.log(props);
  return <DialogTest store={props} />;
};

function mapStateToProps(store) {
  return {
    dialogs: store.dialogs,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateDialog: bindActionCreators(updateDialogIdActionCreator, dispatch),
    updateNewMessage: bindActionCreators(
      updateNewMessageBodyActionCreator,
      dispatch
    ),
    sendMessage: bindActionCreators(sendMessageActionCreator, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogContaunerTest);
