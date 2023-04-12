import "./dialogActive.css";

const DialogName = (props) => {
  const onUpdateDialogId = (e) => {
    let eT = e.target.parentNode.childNodes;
    eT.forEach((e) => {
      e.classList.remove("active");
    });
    e.target.classList.add("active");
    const id = e.currentTarget.getAttribute("data-id");
    props.updateDialogId(id);
  };

  const dialog = props.dialogs.map((item) => {
    return (
      <div
        data-id={item.id}
        key={item.id}
        onClick={onUpdateDialogId}
      >
        {item.name}
      </div>
    );
  });
  return dialog;
};

export default DialogName;
