import s from "./UsersStyle.module.scss";

const Pagination = (props) => {
  let pag = props.pages.map((p) => {
    return (
      <span
        onClick={() => props.onPageChenged(p)}
        key={p}
        className={props.currentPage === p ? s.active : undefined}
      >
        {p}
      </span>
    );
  });
  return <div className={s.selectPage}>{pag}</div>;
};

export default Pagination;
