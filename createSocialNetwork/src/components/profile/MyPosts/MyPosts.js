import React from "react";
import s from "./MyPosts.module.scss";
import Post from "./Post";

const MyPosts = (props) => {
  const { newPostText, posts } = props.state;
  const postElement = posts.map((p) => {
    return <Post message={p.message} key={p.id} />;
  });

  const addPost = () => {
    props.addPost(new Date().getTime());
  };

  const onPostChange = (e) => {
    let text = e.currentTarget.value;
    props.updateNewPostText(text);
  };

  return (
    <>
      <div>New Post</div>
      <textarea value={newPostText} onChange={onPostChange} />
      <button onClick={addPost}>Post</button>
      <div>My Post</div>
      <div className={s.message}>{postElement}</div>
    </>
  );
};

export default MyPosts;
