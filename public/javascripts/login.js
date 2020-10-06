const validaton = () => {
  //   console.log("Enter");
  if (userName.value === "" || userName.value.length <= 4) {
    console.error("Please enter a valid user name");
    userName.style.borderColor = "red";
    userNameErr.style.display = "block";
    return false;
  } else if (password.value === "" || password.value.length <= 4) {
    userName.style.borderColor = "grey";
    userNameErr.style.display = "none";
    console.error("Please enter a valid password");
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

  if (validaton()) {
    document.getElementById("loginForm").submit();
    userName.value = "";
    password.value = "";
  }
});

document.getElementById("statusBtn").addEventListener("click", () => {
  let nonStatus = document.querySelector(".noUser");
  let displayClass = nonStatus.classList.add("displayClass");
  console.log(nonStatus);
});
