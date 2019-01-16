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
      console.log(cred.user);
      //   setTimeout(() => {}, 2000);

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
    console.log("User has Signed Out");
  });
});
