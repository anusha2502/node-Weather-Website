console.log("Client side JavaScript!");

const weatherForm = document.querySelector("form");
const f1 = document.querySelector("form");
const inp = document.querySelector("input");
const para1 = document.querySelector("#msg1");
const para2 = document.querySelector("#msg2");
const para3 = document.querySelector("#msg3");

para1.textContent = "From JavaScript";

f1.addEventListener("submit", e => {
  e.preventDefault();
  const loc = inp.value;
  para1.textContent = "Loading Message";
  para2.textContent = "";
  para3.textContent = "";

  fetch("/weather?address=" + loc).then(response => {
    response.json().then(data => {
      if (data.error) {
        para1.textContent = data.error;
        para2.textContent = "";
      } else {
        para1.textContent = data.location;
        para2.textContent = data.fdata;

        // para2.textContent=data.latitude
        //para2.textContent=data.longitude
      }
    });
  });
});
