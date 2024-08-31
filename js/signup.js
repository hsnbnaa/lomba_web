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
  const footerCard = document.getElementById("footer");

  statusOptions.forEach((option) => {
    option.addEventListener("change", (event) => {
      if (event.target.checked) {
        if (event.target.value == "siswa") {
          statusCard.innerHTML = `
                    <input
                      type="text"
                      id="token"
                      name="token"
                      placeholder="Token"
                    />
                    <p>*Token didapat dari guru untuk masuk ke kelas.</p>
                    `;

          footerCard.innerHTML = `
          <p class="syarat">
            Dengan membuat akun, saya setuju dengan
            <span>syarat dan ketentuan</span> <br />serta
            <span>Ketentuan yang berlaku</span> di Edu - Care.
          </p>
          <button type="submit" id="signup-btn" onclick="handleSignup()">
            Daftar
          </button>
          `;
        } else if (event.target.value == "orangtua") {
          statusCard.innerHTML = `
                    <input
                      type="text"
                      id="namaAnak"
                      name="namaAnak"
                      placeholder="Nama Anak"
                    />
                    `;
          footerCard.innerHTML = `
          <p class="syarat">
            Dengan membuat akun, saya setuju dengan
            <span>syarat dan ketentuan</span> <br />serta
            <span>Ketentuan yang berlaku</span> di Edu - Care.
          </p>
          <button type="submit" id="signup-btn" onclick="handleSignup()">
            Daftar
          </button>
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
          footerCard.innerHTML = `
          <p class="syarat">
            Dengan membuat akun, saya setuju dengan
            <span>syarat dan ketentuan</span> <br />serta
            <span>Ketentuan yang berlaku</span> di Edu - Care.
          </p>
          <button type="button" id="next-btn" onclick="showNextStep()">
            Lanjut
          </button>
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
  'input[type="text"], input[type="email"], input[type="number"], input[type="password"]'
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
function handleSignup() {
  document
    .getElementById("signupForm")
    .addEventListener("submit", async function (e) {
      e.preventDefault();

      const status = document.querySelector(
        'input[name="status"]:checked'
      ).value;
      console.log(status);
      const name = document.getElementById("fullName").value;
      const numberPhone = document.getElementById("numberPhone").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      let token, namaAnak, sekolah, mapel;

      if (status === "siswa") {
        token = document.getElementById("token").value;
      } else if (status === "orangtua") {
        namaAnak = document.getElementById("namaAnak").value;
      } else if (status === "guru") {
        mapel = document.getElementById("mapel").value;
        sekolah = document.getElementById("sekolah").value;
      }

      let data = {
        status,
        name,
        numberPhone,
        email,
        password,
      };

      // Menambahkan properti tambahan berdasarkan status
      if (status === "siswa") {
        data.token = token;
      } else if (status === "orangtua") {
        data.namaAnak = namaAnak;
      } else if (status === "guru") {
        data.mapel = mapel;
        data.sekolah = sekolah;
      }

      try {
        const response = await fetch(
          "https://backendlomba-production.up.railway.app/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        if (result.status === "success") {
          alert(result.message);
          window.location.href = "../login.php";
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        alert("An error occurred. Please try again.");
      }
    });
}

// Mengurus Next Step
function showNextStep() {
  // Sembunyikan langkah pertama
  document.getElementById("signup-step-1").style.display = "none";
  // Tampilkan langkah kedua
  document.getElementById("signup-step-2").style.display = "block";

  loadProvinsi();
}

function showLastStep() {
  document.getElementById("signup-step-2").style.display = "none";
  document.getElementById("signup-step-3").style.display = "block";
  const formContent = document.getElementById("signup-step-3");
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const numberPhone = document.getElementById("numberPhone").value;
  const sekolah = document.getElementById("sekolah").value;

  formContent.innerHTML = `
      <h4>Hubungkan ke Sekolah</h4>
      <p class="desc">Pastikan data sekolah yang anda isi sudah benar</p>
          <div class="result-data">
            <div class="result-item">
              <p>Nama</p>
              <p class="result">${fullName}</p>
            </div>
            <div class="result-item">
              <p>Email</p>
              <p class="result">${email}</p>
            </div>
            <div class="result-item">
              <p>No Telepon</p>
              <p class="result">${numberPhone}</p>
            </div>
            <div class="result-item">
              <p>Sekolah</p>
              <p class="result">${sekolah}</p>
            </div>
            <div class="footer" id="footer">
              <p class="syarat">
                  Dengan membuat akun, saya setuju dengan
                  <span>syarat dan ketentuan</span> <br />serta
                  <span>Ketentuan yang berlaku</span> di Edu - Care.
              </p>
              <button type="submit" id="signup-btn" onclick="handleSignup()">
                  Daftar
              </button>
            </div>
          </div>
  `;
}

async function loadProvinsi() {
  try {
    const response = await fetch(
      "https://backendlomba-production.up.railway.app/provinsi"
    ); // Endpoint API untuk mendapatkan provinsi
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const options = await response.json();
    let selectElement = document.getElementById("provinsi");
    selectElement.innerHTML = '<option value="">Pilih Provinsi</option>';
    options.forEach((option) => {
      let opt = document.createElement("option");
      opt.value = option.provinsi;
      opt.innerHTML = option.provinsi;
      selectElement.appendChild(opt);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Fungsi untuk memuat kota berdasarkan provinsi yang dipilih
async function loadKota() {
  const provinsi = document.getElementById("provinsi").value;
  try {
    const response = await fetch(
      `https://backendlomba-production.up.railway.app/kota?provinsi=${encodeURIComponent(
        provinsi
      )}`
    ); // Endpoint API untuk mendapatkan kota
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const options = await response.json();
    let selectElement = document.getElementById("kota");
    selectElement.innerHTML = '<option value="">Pilih Kota/Kabupaten</option>';
    options.forEach((option) => {
      let opt = document.createElement("option");
      opt.value = option.kota;
      opt.innerHTML = option.kota;
      selectElement.appendChild(opt);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Fungsi untuk memuat sekolah berdasarkan kota yang dipilih
async function loadSekolah() {
  const kota = document.getElementById("kota").value;
  try {
    const response = await fetch(
      `https://backendlomba-production.up.railway.app/sekolah?kota=${encodeURIComponent(
        kota
      )}`
    ); // Endpoint API untuk mendapatkan sekolah
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const options = await response.json();
    let selectElement = document.getElementById("sekolah");
    selectElement.innerHTML = '<option value="">Pilih Sekolah</option>';
    options.forEach((option) => {
      let opt = document.createElement("option");
      opt.value = option.sekolah;
      opt.innerHTML = option.sekolah;
      selectElement.appendChild(opt);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
