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
    });
});