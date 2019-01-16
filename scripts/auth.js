// get data from firestore
db.collection("guides")
  .get()
  .then(snapshot => {
    // console.log(snapshot.docs);
    setupGuides(snapshot.docs);
  });

// Listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    console.log(user.email);
  } else {
    console.log("Signed Out");
  }
});

// Signup
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", e => {
  e.preventDefault();

  //get user inputs
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  // signup a user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      //   console.log(cred.user);

      //close the modal and reset form
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
    })
    .catch(err => {
      console.log(err.message);
    });
});

// logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", e => {
  e.preventDefault();
  auth.signOut().then(() => {
    // console.log("User has Signed Out");
  });
});

// login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  // get User info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // console.log(cred.user.email + " is loged in");

    //close the modal and reset form
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
