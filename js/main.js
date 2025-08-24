document.querySelector("#foodList").addEventListener("change", getApi);
function getApi() {
  let chosenCategory = document.querySelector("#foodList").value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var txt = this.responseText;
      var txtjson = JSON.parse(txt);
      var apitxt = txtjson.meals;
      var myTxt = "";

      for (let i = 0; i < apitxt.length; i++) {
        var cartoona = `
            <div class="card hoverCard">
                <img src="${apitxt[i].strMealThumb}" alt="${apitxt[i].strMeal}">
                <h3>${apitxt[i].strMeal}</h3>
            </div>`;
        myTxt = myTxt + cartoona;
      }

      document.querySelector(".mealGrid").innerHTML = myTxt;

      let items = document.querySelectorAll(".card");
      items.forEach((item) => {
        item.addEventListener("click", function () {
          item.classList.remove("cardhover");
          item.classList.add("clicked");
          document.getElementById("screen").style.display = "block";
        });

        document.getElementById("screen").addEventListener("click", function () {
          this.style.display = "none";
          item.classList.add("cardhover");
          item.classList.remove("clicked");
        });
      });
    }
  };
  xhttp.open(
    "GET",
    "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + chosenCategory,true);
  xhttp.send();
}
getApi();





