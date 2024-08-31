document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  document.getElementById("username").textContent = username;
  document.getElementById("email").textContent = email;

  fetch(`https://backendlomba-production.up.railway.app/token/${token}`).then(
    (response) => {
      response.json().then((data) => {
        result = data[0];
        document.getElementById("kelas").textContent = result.kelas;
        document.getElementById("semester").textContent = result.semester;
        document.getElementById("jumlah-mapel").textContent =
          result.jumlah_mapel;
      });
    }
  );

  fetch(
    `https://backendlomba-production.up.railway.app/nilai/${username}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json().then((data) => {
      console.log(data);
      result = data[0];
      document.getElementById("math").textContent = result.matematika;
    });
  });
});
