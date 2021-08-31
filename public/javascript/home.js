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
      loginEl.style.display = "";
      profileEl.style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
};

getUser();

const navEl = document.querySelector(".container-nav");
navEl.addEventListener("click", async (event) => {
  //   event.preventDefault();
  if (event.target.id === "logout") {
    try {
      const logout = await fetch("/api/users/logout", {
        method: "post",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.log(error);
    }
  }
});

// make login and logout display dynamic
