// determines if user is logged in or out and dynamically displays navigation links
const getUserForProfile = async function () {
  try {
    let user = await fetch("/api/users/profile", {
      method: "get",
    });
    user = await user.json();
    if (user) {
      logoutEl.style.display = "";
      loginEl.style.display = "none";
      profileEl.style.display = "none";
    } else {
      logoutEl.style.display = "none";
      loginEl.style.display = "";
      profileEl.style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
};
getUserForProfile();

// View Post or Comment on homepage
const profileContentEl = document.querySelector(".container-posts");

const viewPost = function (post_url) {
  document.location.replace(post_url);
};
profileContentEl.addEventListener("click", (event) => {
  if (event.target.className === "view-button") {
    viewPost(event.target.value);
  } else {
    return;
  }
});

// Delete post or comment //
// Deletes a post and associated comments
const deletePost = async function (post_id) {
  try {
    const comments = await fetch("api/comments/onpost", {
      method: "delete",
      body: JSON.stringify({
        post_id,
      }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
  try {
    const post = await fetch("api/posts", {
      method: "delete",
      body: JSON.stringify({
        post_id,
      }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
  document.location.replace("/profile");
};
// Deletes a single comment
const deleteComment = async function (comment_id) {
  document.getElementById("comment_" + comment_id).style.display = "none";
  try {
    const post = await fetch("api/comments", {
      method: "delete",
      body: JSON.stringify({
        comment_id,
      }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
};
// Determines if it is a single comment or post with associated comments
const deleteContent = function (event) {
  event.preventDefault();
  if (event.target.id === "delete-post") {
    deletePost(event.target.value);
  }
  if (event.target.id === "delete-comment") {
    deleteComment(event.target.value);
  }
};
profileContentEl.addEventListener("click", deleteContent);

// Create new Post
const createPostButtonEl = document.querySelector("#button-create-post");
const submitPostButtonEl = document.querySelector("#button-submit-post");
const createPostContainerEl = document.querySelector(".container-create-post");
const createPostTitleEl = document.querySelector("#post-title");
const createPostContentEl = document.querySelector("#post-content");
const submitPost = async function () {
  try {
    let user = await fetch("/api/users/profile", {
      method: "get",
    });
    user = await user.json();
    const user_id = user.id;
    const post_title = createPostTitleEl.value;
    const post_content = createPostContentEl.value;
    const newPost = await fetch("api/posts", {
      method: "post",
      body: JSON.stringify({
        post_title,
        post_content,
        user_id,
      }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
  }
  document.location.replace("/profile");
};
createPostButtonEl.addEventListener("click", (event) => {
  event.preventDefault();
  createPostContainerEl.style.display = "block";
});
submitPostButtonEl.addEventListener("click", submitPost);
