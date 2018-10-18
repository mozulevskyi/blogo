import React from "react";

const Post =({post}) =>
  <div className="tile">
    <h4>{post.name}</h4>
    <p>{post.content}</p>
  </div>

export default Post;