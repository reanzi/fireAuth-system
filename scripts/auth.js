// Listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    // get data from firestore
    db.collection("guides").onSnapshot(snapshot => {
      // console.log(snapshot.docs);
      setupGuides(snapshot.docs);
      setupUI(user);
    });
  } else {
    setupUI();
    setupGuides([]);
  }
});

// create new guide
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", e => {
  e.preventDefault();
  //save to db
  db.collection("guides")
    .add({
      title: createForm["title"].value,
      content: createForm["content"].value
    })
    .then(() => {
      //close the modal and reset form
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch(err => console.log(err.message));
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
