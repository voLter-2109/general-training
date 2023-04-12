const UPDATE_DIALOG_ID = "UPDATE-DIALOG-ID";
const UPDATE_NEW_MESSAGE_BODY = "UPDATE-NEW-MESSAGE-BODY";
const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
  newMessageBody: "",
  dialogId: 0,
  message: [],
  dialogs: [
    {
      name: "",
      id: "0",
      message: [{ id: "me", message: "select dialog" }],
    },
    {
      name: "Ivan",
      id: "1",
      message: [
        { id: "me", message: "hi" },
        { id: "you", message: "hi Ivan" },
        { id: "me", message: "YO" },
        { id: "you", message: "hi Ros" },
        { id: "you", message: "React" },
      ],
    },
    {
      name: "Sau",
      id: "2",
      message: [
        { id: "me", message: "hi" },
        { id: "you", message: "hi Sau" },
        { id: "you", message: "hi Ros" },
        { id: "you", message: "React" },
      ],
    },
    {
      name: "Kost",
      id: "3",
      message: [
        { id: "me", message: "hi" },
        { id: "you", message: "hi Kost" },
        { id: "me", message: "YO" },
        { id: "me", message: "hi" },
        { id: "you", message: "hi Kost" },
        { id: "me", message: "YO" },
      ],
    },
    {
      name: "Ros",
      id: "4",
      message: [
        { id: "me", message: "hi" },
        { id: "you", message: "hi Ros" },
        { id: "you", message: "React" },
        { id: "me", message: "YO" },
      ],
    },
  ],
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DIALOG_ID:
      return {
        ...state,
        dialogId: action.id,
        newMessageBody: "",
        message: state.dialogs.find((item) => item.id === state.dialogId),
      };

    case UPDATE_NEW_MESSAGE_BODY:
      return {
        ...state,
        newMessageBody: action.body,
      };

    case SEND_MESSAGE:
      if (state.dialogId === 0) {
        return state;
      } else {
        let stateClone = {
          ...state,
          dialogs: [...state.dialogs],
        };
        stateClone.dialogs[stateClone.dialogId].message.push({
          id: "me",
          message: stateClone.newMessageBody,
        });
        stateClone.newMessageBody = "";
        return stateClone;
      }
    default:
      return state;
  }
};

export default dialogsReducer;

export const updateDialogIdActionCreator = (id) => {
  return {
    type: UPDATE_DIALOG_ID,
    id: id,
  };
};
export const updateNewMessageBodyActionCreator = (body) => {
  return {
    type: UPDATE_NEW_MESSAGE_BODY,
    body: body,
  };
};
export const sendMessageActionCreator = (id) => {
  return {
    type: SEND_MESSAGE,
    // id: id,
  };
};
