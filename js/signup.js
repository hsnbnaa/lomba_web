// Outline Password
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

// Pemilihan status
document.addEventListener("DOMContentLoaded", (event) => {
  const statusOptions = document.querySelectorAll('input[name="status"]');
  const statusCard = document.getElementById("token-card");

  statusOptions.forEach((option) => {
    option.addEventListener("change", (event) => {
      if (event.target.checked) {
        if (event.target.value == "murid") {
          statusCard.innerHTML = `
                    <input
                      type="text"
                      id="token"
                      name="token"
                      placeholder="Token"
                    />
                    <p>*Token didapat dari guru untuk masuk ke kelas.</p>
                    `;
        } else if (event.target.value == "orangtua_wali") {
          statusCard.innerHTML = `
                    <input
                      type="text"
                      id="namaAnak"
                      name="namaAnak"
                      placeholder="Nama Anak"
                    />
                    `;
        } else if (event.target.value == "guru") {
          statusCard.innerHTML = `
                    <input
                      type="text"
                      id="mapel"
                      name="mapel"
                      placeholder="Guru Mata Pelajaran"
                    />
                    `;
        }
        // Mengganti warna saat input
        const textInputs = document.querySelectorAll(
          'input[type="text"], input[type="password"]'
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
      }
    });
  });
});

// Mengganti warna ketika text di input.
const textInputs = document.querySelectorAll(
  'input[type="text"], input[type="password"]'
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

// Mengatur Signup
function handleSignup(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);

  fetch(form.action, {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
      if (data.status === 'success') {
          console.log(data.message);
          window.location.href = 'home.html';
      } else {
          console.error(data.message);
      }
  })
  .catch(error => console.error('Error:', error));
}
