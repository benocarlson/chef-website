document.getElementById("recipe-submit").addEventListener("click", function(event) {
  event.preventDefault();
  const input = document.getElementById("recipe-input").value;
  if (input === "") return;

  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + input;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);

      let results = "";
      if (json.meals === null || json.meals.length === 0) {
        results += '<h3>No Search Results for "' + input + '"</h3>';
      } else {
        results += '<h3>Search Results for "' + input + '"</h3>"';

        for (let meal of json.meals) {
          results += "<div class='search-result' id='meal-" + meal.idMeal + "'>";
          results += "<h4>" + meal.strMeal + "</h4>";
          results += "<p>" + meal.strCategory + "</p>";
          results += "</div>";
        }
      }
      document.getElementById("recipe-search-results").innerHTML = results;

      if (json.meals != null) {
        for (let meal of json.meals) {
          document.getElementById("meal-" + meal.idMeal).addEventListener("click", function(event) {
            event.preventDefault();
            console.log("clicked on " + meal.strMeal);
            let recipe = "";
            recipe += "<div class='recipe'>"
            recipe += "<div class='text'>"
            recipe += "<h3>" + meal.strMeal + "</h3>"
            recipe += "<p>" + meal.strArea + " " + meal.strCategory + "</p>"
            recipe += "<h4>Ingredients:</h4>"
            recipe += "<ul class='ingredients-list'>"
            for (let i = 1; i <= 20; i++) {
              let ingredient = meal["strIngredient" + i];
              if (ingredient != null && ingredient !== "") {
                recipe += "<li>" + meal["strMeasure" + i] + " " + ingredient + "</li>" 
              }
            }
            recipe += "</ul>"
            recipe += "<h4>Instructions:</h4>"
            recipe += "<p>" + meal.strInstructions + "</p>"
            recipe += "</div>"
            recipe += "<img src='" + meal.strMealThumb + "'/>"
            recipe += "</div>"

            document.getElementById("searched-recipe").innerHTML = recipe;
          })
        }
      }
    });
});