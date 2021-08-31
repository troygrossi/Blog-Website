const profileContentEl = document.querySelector(".container-posts");

const deletePost = async function (post_id) {
  const post = await fetch("api/posts", {
    method: "delete",
    body: JSON.stringify({
      post_id,
    }),
    headers: { "Content-Type": "application/json" },
  });
};

const deleteComment = async function (comment_id) {
  document.getElementById(comment_id).style.display = "none";
  const post = await fetch("api/comments", {
    method: "delete",
    body: JSON.stringify({
      comment_id,
    }),
    headers: { "Content-Type": "application/json" },
  });
};

const deleteContent = function (event) {
  if (event.target.id === "delete-post") {
    deletePost(event.target.value);
  }
  if (event.target.id === "delete-comment") {
    deleteComment(event.target.value);
  }
};

profileContentEl.addEventListener("click", deleteContent);
