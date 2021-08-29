const logoutEl = document.querySelector("#logout");
const loginEl = document.querySelector("#login");

// determines if user is logged in or out and dynamically displays navigation links
const getUser = async function () {
  let user = await fetch("/api/users/profile", {
    method: "get",
  });
  user = await user.json();
  if (user) {
    logoutEl.style.display = "";
    loginEl.style.display = "none";
  } else {
    logoutEl.style.display = "none";
    loginEl.style.display = "";
  }
};

getUser();

const navEl = document.querySelector(".container-nav");
navEl.addEventListener("click", async (event) => {
  //   event.preventDefault();
  if (event.target.id === "logout") {
    const logout = await fetch("/api/users/logout", {
      method: "post",
      headers: { "Content-Type": "application/json" },
    });
    if (logout.ok) {
      //   document.location.replace("/");
    } else {
      alert("Already logged out");
    }
  }
});

// make login and logout display dynamic
