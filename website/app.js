/* Global Variables */
const url = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const key = "17de35a0d3d989567f43e7aa4c5a6332";

// Event listener to add function to existing HTML DOM element
document.querySelector("#generate").addEventListener("click", getData);

/* Function called by event listener */
function getData() {
  const zip = document.querySelector("#zip").value;
  const feeling = document.querySelector("#feelings").value;
  getWeatherData(url, zip, key).then(function (data) {
    postData("/add", { temp: data, date: newDate, feel: feeling }).then(
      function () {
        retrieveData();
      }
    );
  });
}

/* Function to GET Web API Data*/
async function getWeatherData(url, zip, key) {
  try {
    const response = await fetch(url + zip + ",us&appid=" + key);
    const data = await response.json();
    const temp = data.main.temp;
    return temp;
  } catch (error) {
    console.log(`error : ${error}`);
  }
}

/* Function to POST data */
async function postData(u, data) {
  const res = await fetch(u, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error : ", error);
  }
}

async function retrieveData() {
  const request = await fetch("/all");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + "degrees";
    document.getElementById("content").innerHTML = allData.feel;
    document.getElementById("date").innerHTML = allData.date;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
}
