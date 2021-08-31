const logoutEl = document.querySelector("#logout");
const loginEl = document.querySelector("#login");
const profileEl = document.querySelector("#profile");
loginEl.style.display = "none";
logoutEl.style.display = "none";
profileEl.style.display = "none";

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
    console.log("test");
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
  }
};

document.querySelector(".form-login").addEventListener("submit", loginUser);
