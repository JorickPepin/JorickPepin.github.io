function ajustDarkMode() {
  var checkBox = document.getElementById("darkSwitch");
  var cloudsContainer = document.getElementById("clouds-container");
  var shootingStarContainer = document.getElementById("shooting-star-container");

  if (checkBox.checked == true){
    cloudsContainer.style.display = "none",
    shootingStarContainer.style.display = "block";
  } else {
     cloudsContainer.style.display = "block",
     shootingStarContainer.style.display = "none";
  }
}