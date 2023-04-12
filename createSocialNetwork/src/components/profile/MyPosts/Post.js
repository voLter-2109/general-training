import s from "./Post.module.scss";

const Post = (props) => {

  return <div className={s.message}>{props.message}</div>;
};

export default Post;
