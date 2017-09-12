document.addEventListener("DOMContentLoaded", function() {

  /*Podświetlanie Plan-Boxów*/

  var planBox = document.getElementsByClassName("plan-box");

  for (var i = 0; i < planBox.length; i++) {
    planBox[i].addEventListener("mouseover", function() {
      this.style.backgroundColor = "#00CEAC";
      this.style.borderColor = "#00CEAC";
      this.children[0].style.color = "white";
      this.children[1].style.backgroundColor = "#00CEAC";
      this.children[1].style.borderColor = "#00CEAC";
      this.children[1].children[0].style.backgroundColor = "white";
      this.children[2].children[0].style.color = "#00CEAC";
      this.children[2].style.borderColor = "#00CEAC";
      for (var j = 0; j < this.children[3].children.length; j++) {
        if (j % 2 == 0) {
          this.children[3].children[j].style.backgroundColor = "white";
        }
      }
      this.lastElementChild.style.color = "#00CEAC";
      this.lastElementChild.style.backgroundColor = "white";
    });
  }

  for (var i = 0; i < planBox.length; i++) {
    planBox[i].addEventListener("mouseout", function() {
      this.style.backgroundColor = "#F9F9F9";
      this.style.borderColor = "#C1C1C1";
      this.children[0].style.color = "#00CEAC";
      this.children[1].style.backgroundColor = "white";
      this.children[1].style.borderColor = "#C1C1C1";
      this.children[1].children[0].style.backgroundColor = "#C1C1C1";
      this.children[2].children[0].style.color = "#C1C1C1";
      this.children[2].style.borderColor = "#C1C1C1";
      for (var j = 0; j < this.children[3].children.length; j++) {
        if (j % 2 == 0) {
          this.children[3].children[j].style.backgroundColor = "#E3E3E3";
        }
      }
      this.lastElementChild.style.color = "white";
      this.lastElementChild.style.backgroundColor = "#00CEAC";
    });
  }

  /*Rozwijanie dropdown-menu*/

  var listElement = document.querySelectorAll("nav > ul > li");

  for (var i = 0; i < listElement.length; i++) {
    listElement[i].addEventListener("mouseover", function() {
      this.firstElementChild.classList.add("visible");
    });
  }
  for (var i = 0; i < listElement.length; i++) {
    listElement[i].addEventListener("mouseout", function() {
      this.firstElementChild.classList.remove("visible");
    });
  }

  /*Ukrywanie nazwy obrazka*/

  var picture = document.querySelectorAll("#section2 > .container > div");

  for (var i = 0; i < picture.length - 1; i++) {
    picture[i].addEventListener("mouseover", function() {
      this.firstElementChild.style.display = "none";
      this.style.transform = "scale(1.04)";
    });
  }
  for (var i = 0; i < picture.length - 1; i++) {
    picture[i].addEventListener("mouseout", function() {
      this.firstElementChild.style.display = "block";
      this.style.transform = "scale(1)";
    });
  }

  
  /*Slider*/

  var next = document.getElementById("next");
  var prev = document.getElementById("prev");
  var images = document.querySelector(".images").children;
  var slideIndex = 1;

  function switchImage(n) {
    if (n > images.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = images.length;
    }
    for (var i = 0; i < images.length; i++) {
      images[i].style.display = "none";
    }
    images[slideIndex - 1].style.display = "block";
  }

  next.addEventListener("click", function() {
    slideIndex++;
    switchImage(slideIndex);
  });

  prev.addEventListener("click", function() {
    slideIndex--;
    switchImage(slideIndex);
  });


  /***Kalkulator***/

  var listArrow = document.getElementsByClassName("list_arrow");
  var listPanel = document.getElementsByClassName('list_panel');
  var listLabel = document.getElementsByClassName('list_label');
  var clickCount = 0;

  /*Wysuwanie listy po kliklnięciu na arrow*/

  for (var i = 0; i < listArrow.length; i++) {
    listArrow[i].addEventListener("click", function() {
      clickCount++;
      if (clickCount % 2 != 0) {
        this.nextElementSibling.style.display = "block";
      } else {
        this.nextElementSibling.style.display = "none";
      }
    });
  }

  /*Obsługa drop-down listy*/

  var chairName = document.querySelector(".panel_left p.title");
  var chairColor = document.querySelector(".panel_left .color");
  var chairPattern = document.querySelector(".panel_left .pattern");
  var chairTransport = document.querySelector(".panel_left .transport");
  var checkTransport = document.querySelector(".form .checkbox input");
  var sumPanel = document.querySelector(".panel_right").children;
  var sum = document.querySelector(".sum strong");

  for (var i = 0; i < listPanel.length; i++) {
    for (var j = 0; j < listPanel[i].children.length; j++) {
      listPanel[i].children[j].addEventListener("click", function(event) {

        /*Wpisywanie wybranej wartości z listy drop-down i ukrywanie tej listy*/

        this.parentElement.parentElement.firstElementChild.innerText = this.innerText;
        this.parentElement.style.display = "none";
        clickCount = 2;

        /*Wpisywanie wybranych wartości do summary_panel*/

        if (listLabel[0].innerText != "Wybierz rodzaj" && event.target.parentElement == listPanel[0]) {
          chairName.innerText = "Chair: " + listLabel[0].innerText;
          sumPanel[0].innerText = event.target.dataset.value;
        }
        if (listLabel[1].innerText != "Wybierz kolor" && event.target.parentElement == listPanel[1]) {
          chairColor.innerText = "Kolor: " + listLabel[1].innerText;
          sumPanel[1].innerText = event.target.dataset.value;
        }
        if (listLabel[2].innerText != "Wybierz materiał" && event.target.parentElement == listPanel[2]) {
          chairPattern.innerText = "Materiał: " + listLabel[2].innerText;
          sumPanel[2].innerText = event.target.dataset.value;
        }

        /*Sumowanie*/

        var add = 0;
        for (var k = 0; k < sumPanel.length; k++) {
          add += Number(sumPanel[k].innerText);
        }
        sum.innerText = add + " zł";
        add = 0;
      });
    }
  }

  /*Zaznaczanie checkbox'a Transport*/

  var transportClickCount = 0;
  checkTransport.addEventListener("click", function(event) {
    transportClickCount++;
    if (transportClickCount % 2 != 0) {
      chairTransport.innerText = "Transport";
      sumPanel[3].innerText = checkTransport.dataset.value;
      sum.innerText = parseInt(sum.innerText, 10) + Number(event.target.dataset.value) + " zł";
    } else {
      chairTransport.innerText = "";
      sumPanel[3].innerText = "";
      sum.innerText = parseInt(sum.innerText, 10) - Number(event.target.dataset.value) + " zł";
    }
  });
});
