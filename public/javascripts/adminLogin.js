let userName = document.getElementById("username");
let password = document.getElementById("password");
let userNameErr = document.getElementById("userNameErr");
let passwordErr = document.getElementById("passwordErr");

let userNameDiv = document.getElementById("SignUpUsername");
let emailDiv = document.getElementById("email");
let mobileNumberDiv = document.getElementById("mobNo");
let passwordDiv = document.getElementById("SignUpPassword");
let cPasswordDiv = document.getElementById("cPassword");

let userNameDivErr = document.getElementById("userNameDivErr");
let emailDivErr = document.getElementById("emailNameDivErr");
let mobileNumberDivErr = document.getElementById("mobNoNameDivErr");
let passwordDivErr = document.getElementById("passwordDivErr");
let cPasswordDivErr = document.getElementById("cPasswordDivErr");

// *?  login actions*****************************//
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
        homePage = JSON.parse(this.responseText);
        console.log(typeof homePage);
        console.log(homePage);
        if (homePage.status === 101) {
          userName.value = "";
          password.value = "";
          document.location.href = "http://localhost:3000/admin/dashboard";
        } else {
          if (homePage.status === null) {
            let nonStatus = document.querySelector(".noUser");
            document.getElementById("statusmessage").innerText =
              homePage.message;
            nonStatus.classList.remove("hideDisplayClass");
            nonStatus.classList.add("showDisplayClass");
            // console.log(nonStatus);
            userName.value = "";
            password.value = "";
          } 
        //   else if(homePage.status === 201) {
        //     document.location.href = "http://localhost:3000/home";
        //   }
        }
      }
    };

    xhr.open("post", "http://localhost:3000/admin/login", true);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(userData));

    // document.getElementById("loginForm").submit();
  }
});

document.getElementById("statusBtn").addEventListener("click", () => {
  let nonStatus = document.querySelector(".noUser");
  nonStatus.classList.remove("showDisplayClass");
  nonStatus.classList.add("hideDisplayClass");
  // console.log(nonStatus);
  userName.value = "";
  password.value = "";
});

document.getElementById("switchToSignUp").addEventListener("click", (event) => {
  event.preventDefault();
  console.log("animation start");
  let loginPage = document.querySelector(".formDiv");
  loginPage.classList.add("transformLogin");
  console.log(loginPage);
  let signUpPage = document.querySelector(".registerForm");
  setTimeout(() => {
    console.log("5 sec reached");
    loginPage.style.display = "none";
    signUpPage.style.display = "block";
    loginPage.classList.remove("transformLogin");
  }, 2000);
});

// *?  signUp actions*****************************//

document.getElementById("backToLogin").addEventListener("click", (event) => {
  event.preventDefault();
  console.log("animation start");
  let signUpPage = document.querySelector(".registerForm");
  signUpPage.classList.add("transformSignup");
  console.log(signUpPage);
  let loginPage = document.querySelector(".formDiv");

  setTimeout(() => {
    console.log("5 sec reached");
    loginPage.style.display = "block";
    signUpPage.style.display = "none";
    signUpPage.classList.remove("transformSignup");
  }, 2000);
});

const signupValidation = (userData) => {
  let emailFormat = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  let mobileFormat = /^\d{10}$/;
  let {
    userNameValue,
    emailValue,
    mobileNumberValue,
    passwordValue,
    cPasswordValue,
  } = userData;
  console.log(`user name : ${userName}, password : ${password}`);
  if (userNameValue === "" || userNameValue.length <= 4) {
    userNameDiv.style.borderColor = "red";
    userNameDivErr.style.display = "block";
    console.error("Please enter atleast 4 character");
    return false;
  } else if (!emailValue.match(emailFormat)) {
    userNameDiv.style.borderColor = "grey";
    userNameDivErr.style.display = "none";
    emailDiv.style.borderColor = "red";
    emailDivErr.style.display = "block";
    console.error("Please enter a valid email");
    return false;
  } else if (!mobileNumberValue.match(mobileFormat)) {
    userName.style.borderColor = "grey";
    userNameErr.style.display = "none";
    emailDiv.style.borderColor = "grey";
    emailDivErr.style.display = "none";
    mobileNumberDiv.style.borderColor = "red";
    mobileNumberDivErr.style.display = "block";
    console.error("Please enter a valid mobile number");
    return false;
  } else if (passwordValue != cPasswordValue || passwordValue === "") {
    userName.style.borderColor = "grey";
    userNameErr.style.display = "none";
    emailDiv.style.borderColor = "grey";
    emailDivErr.style.display = "none";
    mobileNumberDiv.style.borderColor = "grey";
    mobileNumberDivErr.style.display = "none";
    passwordDiv.style.borderColor = "red";
    passwordDivErr.style.display = "block";
    cPasswordDiv.style.borderColor = "red";
    cPasswordDivErr.style.display = "block";
    console.error(
      "field is empty or password and conform password does not match"
    );
    return false;
  } else {
    console.log("everything fine");
    password.style.borderColor = "grey";
    passwordErr.style.display = "none";
    cPasswordDiv.style.borderColor = "grey";
    cPasswordDivErr.style.display = "none";
    return true;
  }
};

document
  .getElementById("registerSubmitBtn")
  .addEventListener("click", (event) => {
    event.preventDefault();
    let result;

    let userData = {
      userNameValue: document.getElementById("SignUpUsername").value,
      emailValue: document.getElementById("email").value,
      mobileNumberValue: document.getElementById("mobNo").value,
      passwordValue: document.getElementById("SignUpPassword").value,
      cPasswordValue: document.getElementById("cPassword").value,
    };
    console.log(userData);

    if (signupValidation(userData)) {
      console.log("submit form");

      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          result = JSON.parse(this.responseText);
          // console.log(result);
          if (result.result.status === 200 || result.result.status === 301) {
            // *TODO: create a sucessfully message div //
            let nonStatus = document.querySelector(".noUser");
            document.getElementById("statusmessage").innerText =
              result.result.message;
            nonStatus.classList.remove("hideDisplayClass");
            nonStatus.classList.add("showDisplayClass");
            // console.log(nonStatus);
            // if (result.result.status === 200) {
            //   document.location.href = "http://localhost:3000/";
            // }
          } else {
            console.log("else case");
          }
        }
      };

      xhr.open("post", "http://localhost:3000/register", true);
      xhr.setRequestHeader("content-type", "application/json");
      xhr.send(JSON.stringify(userData));

      // document.getElementById("loginForm").submit();
    }
  });
