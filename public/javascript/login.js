const logoutEl = document.querySelector("#logout");
const loginEl = document.querySelector("#login");
const profileEl = document.querySelector("#profile");

// determines if user is logged in or out and dynamically displays navigation links
const getUser = async function () {
  try {
    let user = await fetch("/api/users/profile", {
      method: "get",
    });
    user = await user.json();
    if (user) {
      logoutEl.style.display = "";
      loginEl.style.display = "none";
      profileEl.style.display = "";
    } else {
      logoutEl.style.display = "none";
      loginEl.style.display = "none";
      profileEl.style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
};

getUser();

const signupUser = async function (event) {
  event.preventDefault();
  const usernameSignup = document
    .querySelector("#input-name-signup")
    .value.trim();
  const passwordSignup = document
    .querySelector("#input-password-signup")
    .value.trim();
  console.log(usernameSignup, passwordSignup);
  if (usernameSignup && passwordSignup) {
    try {
      const createUser = await fetch("/api/users/", {
        method: "post",
        body: JSON.stringify({
          usernameSignup,
          passwordSignup,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (createUser.ok) {
        document.location.replace("/");
      } else {
        alert(createUser.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

document.querySelector(".form-signup").addEventListener("submit", signupUser);

const loginUser = async function (event) {
  event.preventDefault();
  const usernameLogin = document
    .querySelector("#input-name-login")
    .value.trim();
  const passwordLogin = document
    .querySelector("#input-password-login")
    .value.trim();
  if (usernameLogin && passwordLogin) {
    try {
      const loginUser = await fetch("/api/users/login", {
        method: "post",
        body: JSON.stringify({
          usernameLogin,
          passwordLogin,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (loginUser.ok) {
        document.location.replace("/");
      } else {
        alert(createUser.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

document.querySelector(".form-login").addEventListener("submit", loginUser);
