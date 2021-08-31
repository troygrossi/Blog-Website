const commentAddEl = document.querySelector(".button-comment");
const commentTextEl = document.querySelector(".text-comment");
const commentSubmitEl = document.querySelector(".button-submit");
const commentFormEl = document.querySelector(".form-comment");

const addComment = async function (event) {
  event.preventDefault();
  let user = await fetch("/api/users/profile", {
    method: "get",
  });
  user = await user.json();
  if (user) {
    console.log("test");
    commentTextEl.style.display = "block";
    commentSubmitEl.style.display = "block";
  } else {
    alert("Must be logged in to comment");
  }
};

const submitComment = async function (event) {
  event.preventDefault();
  const comment_content = commentTextEl.value;
  const post_id = document.querySelector(".post").dataset.postid;
  let user = await fetch("/api/users/profile", {
    method: "get",
  });
  user = await user.json();
  const user_id = user.id;

  let post = await fetch("/api/comments", {
    method: "post",
    body: JSON.stringify({
      comment_content,
      post_id,
      user_id,
    }),
    headers: { "Content-Type": "application/json" },
  });
  if (post.ok) {
    commentTextEl.style.display = "none";
    commentSubmitEl.style.display = "none";
    document.location.replace("/post-view/" + post_id);
  } else {
    alert(post.statusText);
  }
};

commentAddEl.addEventListener("click", addComment);
commentFormEl.addEventListener("submit", submitComment);
