const searchBtnEl = document.getElementById("btn-search");
const inputEl = document.getElementById("input-city");
const apikey = "7c076ebdc9171cc941023949cd3161e3";

searchBtnEl.addEventListener("click", function () {
    console.log("weatherfor" + inputEl.value);

    getGeoLocation(inputEl.value)
});
