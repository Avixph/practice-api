import Axios from "axios";
import dotenv from "dotenv";
dotenv.config();
import regeneratorRuntime from "regenerator-runtime";

// Axios calls will need to be formatted like this:
// axios.get("your endpoint url",
//     {
//       "x-api-key": "your API Key
//     })
const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;
const dropdown = document.querySelector("select");
const button = document.querySelector("#try-me");
const picDisplay = document.querySelector("#catpic");
// const fs = require("fs");

let response = async function () {
  await axios
    .get(`${BASE_URL}categories`, {
      "x-api-key": API_KEY,
    })
    .then((res) => {
      // console.log(res);
      const catCategories = res.data;
      for (let i = 0; i < catCategories.length; i++) {
        dropdown.innerHTML += `<option id= ${catCategories[i].id}>${catCategories[i].name}</option>`;
        console.log(catCategories);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

button.addEventListener("click", async () => {
  const categoryId = dropdown[dropdown.selectedIndex].id;
  try {
    const response = await axios.get(
      `${BASE_URL}images/search?category_ids=${categoryId}`,
      {
        "x-api-key": API_KEY,
      }
    );
    console.log(response);
    const catPhoto = response.data[0].url;
    picDisplay.innerHTML = `<img src=${catPhoto} >`;
  } catch (e) {
    console.log(e);
  }
});
response();
