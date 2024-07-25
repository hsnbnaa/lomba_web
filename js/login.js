let pass = document.getElementById("pass-container");
let lastClicked = null;

pass.addEventListener("click", function (event) {
  event.stopPropagation();

  if (lastClicked && lastClicked !== this) {
    lastClicked.style.outline = "none";
  }

  this.style.outline = "auto";

  lastClicked = this;
});

document.addEventListener("click", function () {
  if (lastClicked) {
    lastClicked.style.outline = "none";
    lastClicked = null;
  }
});

// Show/Hide Password
let eyeicon = document.getElementById("eye-icon");
let password = document.getElementById("password");

eyeicon.onclick = function () {
  if (password.type == "password") {
    password.type = "text";
    eyeicon.src = "img/eye-on.png";
  } else {
    password.type = "password";
    eyeicon.src = "img/eye-off.png";
  }
};

// Mengganti warna ketika text di input.
const textInputs = document.querySelectorAll(
  'input[type="email"], input[type="password"]'
);

textInputs.forEach((input) => {
  input.addEventListener("input", function () {
    if (this.value) {
      this.style.color = "black";
    } else {
      this.style.color = "#666161";
    }
  });
});

function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === "success") {
        console.log(data.message);
        window.location.href = "home.html";
      } else {
        console.error(data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
}
