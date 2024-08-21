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

let username = "";
function handleLogin() {
  document
    .getElementById("loginForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      if (!email || !password) {
        alert("Please fill out both email and password fields.");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error("Invalid email or password");
        }

        const result = await response.json();
        localStorage.setItem("username", result.username);
        localStorage.setItem("email", result.email);
        localStorage.setItem("token", result.token);

        if (result.status === "success") {
          alert(result.message);
          window.location.href = "profil.html";
        } else {
          alert(result.message);
        }
      } catch (error) {
        alert(error.message || "An unexpected error occurred.");
      }
    });
}
