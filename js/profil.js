document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  document.getElementById("username").textContent = username;
  document.getElementById("username-title").textContent = username;
  const email = localStorage.getItem("email");
  document.getElementById("email").textContent = email;
  const token = localStorage.getItem("token");

  fetch("http://127.0.0.1:8000/mapel").then((response) => {
    response.json().then((data) => {
      container = document.getElementById("card-container");
      container.innerHTML = "";

      data.forEach((result, index) => {
        const tipeKartu =
          index % 8 === 0 ||
          index % 8 === 3 ||
          index % 8 === 4 ||
          index % 8 === 7
            ? "kotak21"
            : "kotak31";

        const card = document.createElement("div");
        card.classList.add(tipeKartu);

        if (tipeKartu === "kotak21") {
          card.innerHTML = `
                <div>
                  <div class="sub">
                    <h4>${result.mapel}</h4>
                    <img src="img/panah.png" id="m" width="30px" height="20" alt="" />
                  </div>
                  <div class="kelas">
                    <img src="img/Ellipse 861.png" alt="" />
                    <h4><b>Kelas <span id="nama-guru">Arif Widianto</span></b></h4>
                  </div>
                </div>
                <div class="gambar">
                  <img src="${result.url_gambar}" width="90px" alt="" />
                </div>
              `;
        } else {
          card.innerHTML = `
                <div class="gambar1">
                  <img src="${result.url_gambar}" width="90px" />
                </div>
                <div class="konten">
                  <div class="sub">
                    <h4>${result.mapel}</h4>
                    <img src="img/panah.png" id="m" width="30px" height="20" alt="" />
                  </div>
                  <div class="kelas">
                    <img src="img/Ellipse 861.png" alt="" />
                    <h4>Kelas <span id="nama-guru">Yusuf Ardianto</span></h4>
                  </div>
                </div>
              `;
        }
        card.style.backgroundColor = `#${result.warna}`;
        container.appendChild(card);
      });
    });
  });

  fetch(`http://127.0.0.1:8000/token/${token}`).then((response) => {
    response.json().then((data) => {
      result = data[0];
      document.getElementById("kelas").textContent = result.kelas;
    });
  });
});
