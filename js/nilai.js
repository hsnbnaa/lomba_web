document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");

  fetch(
    `https://backendlomba-production.up.railway.app/get_nilai/${username}`
  ).then((response) => {
    response.json().then((data) => {
      result = data[0];
      document.getElementById("ul-1").textContent = result.ulangan_1.toFixed(2);
      document.getElementById("ul-2").textContent = result.ulangan_2.toFixed(2);
      document.getElementById("ul-3").textContent = result.ulangan_3.toFixed(2);
      document.getElementById("ul-4").textContent = result.ulangan_4.toFixed(2);
      document.getElementById("uts").textContent = result.uts.toFixed(2);
      document.getElementById("uas").textContent = result.uas.toFixed(2);
    });
  });
});
