const guidesList = document.querySelector(".guides");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const setupUI = user => {
  if (user) {
    //toggle UI elements
    loggedInLinks.forEach(item => (item.style.display = "block"));
    loggedOutLinks.forEach(item => (item.style.display = "none"));
  } else {
    //toggle UI elements
    loggedInLinks.forEach(item => (item.style.display = "none"));
    loggedOutLinks.forEach(item => (item.style.display = "block"));
  }
};

// setup guides
const setupGuides = data => {
  if (data.length) {
    let html = "";
    data.forEach(doc => {
      const guide = doc.data();
      // console.log(guide);
      const li = `
    <li>
        <div class="collapsible-header grey lighten-4"> ${guide.title}</div>
        <div class="collapsible-body white"> ${guide.content} </div>
    </li>
    `;
      html += li;
    });
    guidesList.innerHTML = html;
  } else {
    guidesList.innerHTML = `<h4 class="center grey-text lighten-1">Please login to view Guides</h4>`;
  }
};

// setup materialize components
document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
