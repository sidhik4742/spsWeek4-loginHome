let xhr = new XMLHttpRequest();

const validaton = (userData) => {
  let name = userData.userName;
  let pass = userData.password;
  console.log(`user name : ${userName}, password : ${password}`);
  if (name === "" || name.length <= 4) {
    console.error("Please enter a valid user name");
    userName.style.borderColor = "red";
    userNameErr.style.display = "block";
    return false;
  } else if (pass === "" || pass.length <= 4) {
    userName.style.borderColor = "grey";
    userNameErr.style.display = "none";
    console.error("Please enter a minimum 4 character");
    password.style.borderColor = "red";
    passwordErr.style.display = "block";
    return false;
  } else {
    userName.style.borderColor = "grey";
    userNameErr.style.display = "none";
    password.style.borderColor = "grey";
    passwordErr.style.display = "none";
    return true;
  }
};

let userName = document.getElementById("username");
let password = document.getElementById("password");
let userNameErr = document.getElementById("userNameErr");
let passwordErr = document.getElementById("passwordErr");

document.getElementById("submitBtn").addEventListener("click", (event) => {
  event.preventDefault();
  let homePage;

  let userData = {
    userName: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  if (validaton(userData)) {
    console.log("submit form");

    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        homePage = this.responseText;
        console.log(typeof homePage);
        if (homePage == "false") {
          let nonStatus = document.querySelector(".noUser");
          nonStatus.classList.remove("hideDisplayClass");
          nonStatus.classList.add("showDisplayClass");
          console.log(nonStatus);
        } else {
          document.location.href = "http://localhost:3000/home";
        }
      }
    };

    xhr.open("post", "http://localhost:3000/", true);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(userData));

    // document.getElementById("loginForm").submit();
  }
});

document.getElementById("statusBtn").addEventListener("click", () => {
  let nonStatus = document.querySelector(".noUser");
  nonStatus.classList.remove("showDisplayClass");
  nonStatus.classList.add("hideDisplayClass");
  console.log(nonStatus);
  userName.value = "";
  password.value = "";
});
