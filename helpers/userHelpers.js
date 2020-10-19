const db = require("../config/config");

// console.log(db);
module.exports = {
  insertUserDetail: (userDetails) => {
    let {
      userNameValue,
      emailValue,
      mobileNumberValue,
      passwordValue,
      cPasswordValue,
    } = userDetails;
    console.log(userNameValue);
    let query = { Email: emailValue };
    db.getConnection()
      .collection("registerDetails")
      .find(query)
      .toArray()
      .then((collection) => {
        console.log(collection);
        console.log(collection.length);
        if (collection.length === 0) {
          db.getConnection()
            .collection("registerDetails")
            .insertOne({
              "User-Name": userNameValue,
              Email: emailValue,
              "Mobile-Number": mobileNumberValue,
              Password: passwordValue,
            })
            .then((result) => {
              if (!result.result.ok) {
                console.error("registration failed please try again");
              } else {
                console.log(result.ops);
              }
            });
        } else {
          console.log("User already registered");
        }
      });
  },
};
