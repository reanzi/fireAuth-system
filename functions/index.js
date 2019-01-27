const functions = require("firebase-functions");

const admin = require("firebase-admin");

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // check request is made by an admin
  if (context.auth.token.admin !== true) {
    return { message: "Only admins can add another admin, back-off!" };
  }
  if (context.auth.token.admin === true) {
    return { message: "Alreay an Admin" };
  }
  // get the user and add custom claims(admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      });
    })
    .then(() => {
      return {
        message: `success ${data.email} has been made an admin`
      };
    })
    .catch(err => {
      return err;
    });
});
