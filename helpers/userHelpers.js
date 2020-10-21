const db = require("../config/config");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

const saltRounds = 10;

// console.log(db);
module.exports = {
  insertUserDetail: (userDetails, callback) => {
    let {
      userNameValue,
      emailValue,
      mobileNumberValue,
      passwordValue,
      cPasswordValue,
    } = userDetails;
    const hashedPassword = bcrypt.hashSync(passwordValue, saltRounds);
    console.log(userNameValue);
    let query = { Email: emailValue, "Mobile-Number": mobileNumberValue };
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
              Password: hashedPassword,
            })
            .then((result) => {
              if (!result.result.ok) {
                console.error("registration failed please try again");
              } else {
                console.log(result.ops);
                return callback({
                  status: 200,
                  message: "Register successfully",
                });
              }
            });
        } else {
          console.log("User already registered");
          return callback({ status: 301, message: "user already registered" });
        }
      });
  },
  findUserDetails: (userCredential, callback) => {
    console.log("find user crential from database");
    let userName = userCredential.userName;
    let password = userCredential.password;

    console.log(`username : ${userName},password : ${password}`);

    // const hashedPassword = bcrypt.hashSync(password, saltRounds);
    // console.log(hashedPassword);

    let query = { "User-Name": userName };
    db.getConnection()
      .collection("registerDetails")
      .find(query)
      .toArray()
      .then((documents) => {
        console.log(documents);
        if (documents.length != 0) {
          documents.forEach((element) => {
            if (bcrypt.compareSync(password, element.Password)) {
              // console.log("password matched ");
              return callback({ status: 201, message: "password matched" });
            } else {
              return callback({
                status: null,
                message: "User not registered",
              });
            }
          });
        } else {
          return callback({
            status: null,
            message: "User not registered",
          });
        }
      });
  },
  findUserDetailsForAdmin: (callback) => {
    db.getConnection()
      .collection("registerDetails")
      .find()
      .toArray()
      .then((result) => {
        // console.log(result);
        return callback(result);
      });
  },
  deleteUser: (id, callback) => {
    let query = { _id: ObjectId(id) };
    db.getConnection()
      .collection("registerDetails")
      .deleteOne(query)
      .then((result) => {
        // console.log(result);
        return callback(result);
      });
  },
  editUser: (id, callback) => {
    let query = { _id: ObjectId(id) };
    db.getConnection()
      .collection("registerDetails")
      .findOne(query)
      .then((result) => {
        // console.log(result);
        return callback(result);
      });
  },
  updateUser: (id, data, callback) => {
    let query = { _id: ObjectId(id) };
    let updatedData = {
      "User-Name": data.userName,
      Email: data.email,
      "Mobile-Number": data.mobNo,
    };
    db.getConnection()
      .collection("registerDetails")
      .findOneAndUpdate(query, { $set: updatedData })
      .then((result) => {
        // console.log(result.ok);
        return callback(result.ok);
      });
  },
  addUser: (data, callback) => {
    let { userName, email, mobNo, password } = data;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    let query = { Email: email, "Mobile-Number": mobNo };
    db.getConnection()
      .collection("registerDetails")
      .find(query)
      .toArray()
      .then((result) => {
        if (result.length === 0) {
          db.getConnection()
            .collection("registerDetails")
            .insertOne({
              "User-Name": userName,
              Email: email,
              "Mobile-Number": mobNo,
              Password: hashedPassword,
            })
            .then((result) => {
              if (!result.result.ok) {
                console.error("registration failed please try again");
              } else {
                console.log(result.ops);
                return callback({
                  status: 200,
                  message: "Register successfully",
                });
              }
            });
        } else {
          console.log("User already registered");
          return callback({ status: 301, message: "user already registered" });
        }
      });
  },
};
