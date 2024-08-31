document.addEventListener("DOMContentLoaded", function () {
  fetch(
    `https://backendlomba-production.up.railway.app/get_nilai/${username}`
  ).then((response) => {
    response.json().then((data) => {
      result = data[0];
      document.getElementById("ul-1").textContent = result.ulangan_1;
      document.getElementById("ul-2").textContent = result.ulangan_2;
      document.getElementById("ul-3").textContent = result.ulangan_3;
      document.getElementById("ul-4").textContent = result.ulangan_4;
      document.getElementById("uts").textContent = result.uts;
      document.getElementById("uas").textContent = result.uas;
    });
  });
});
