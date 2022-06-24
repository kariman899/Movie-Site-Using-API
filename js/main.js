let leftMenu = $(".left-menu");
let rightMenu = $(".right-menu");
let menu = $("#toggle-btn");
let menuItem = $(".nav-item li");
menu.click(function () {
  let leftMenuwidth = leftMenu.outerWidth();

  if (menu.attr("class") == "open") {
    menu.addClass("close");
    menu.removeClass("open");
    leftMenu.animate({ left: "0px" }, 500);
    rightMenu.animate({ left: `${leftMenuwidth}` }, 500);

    for (let i = 1; i <= menuItem.length; i++) {
      $(`.item${i}`).animate(
        { paddingTop: "15px", opacity: "1" },i * 10 + 800);
    }
  } else {
    menu.addClass("open");
    menu.removeClass("close");
    leftMenu.animate({ left: `-${leftMenuwidth}` }, 500);
    rightMenu.animate({ left: "0px" }, 500, function () {
      menuItem.animate({ paddingTop: "300px", opacity: "0" }, 500);
    });
  }
});

/********start api*******/
let finalResponse;
let apiKey = "b7ed3ef8d2fddd67928ca17512db61f4";
let imgpath = "https://image.tmdb.org/t/p/w500";
let category = "now_playing";
let results;
/**get api**/
async function getMovie(category) {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}`
  );

  finalResponse = await response.json();
  results = finalResponse.results;
  displayData();
}
getMovie(category);

/**display movie data**/
function displayData() {
  let allMovie = "";

  for (let i = 0; i < results.length; i++) {
    allMovie += `
      <div class="col-md-6 col-lg-4 ms-4 ms-md-0 mb-5 "> <div class="movie text-center  ">
      <div class="inner-img position-relative">
          <img src="${imgpath + results[i].poster_path}" class="w-100" alt="" />
          <div class="movie-overlay position-absolute  start-0">
              <div class="movie-desc text-black position-absolute top-50 translate-middle-y  ">
                  <h4>${results[i].title}</h4>
                  <p>${results[i].overview}</p>
                  <div class="rate"><span>rate:${
                    results[i].vote_average
                  }</span></div>
                  <div class="date mt-4"><span>${
                    results[i].release_date
                  }</span></div>
              </div>
          </div>
      </div>
  </div>
  </div>
  `;
    document.getElementById("allMovie").innerHTML = allMovie;
  }
}

/* selecting category*/
$("ul li a").click(function (e) {
  category = $(e.target).attr("moviesTitle");
  getMovie(category);
});

/* select trending*/
$("#trending").click(async function getTrending() {
  let response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`
  );
  finalResponse = await response.json();
  results = finalResponse.results;
  displayData();
});

/**search by word*/
let searchWord = document.getElementById("searchWord");
let searchAll = document.getElementById("searchAll");
async function searchByWord() {
  let text = searchWord.value;
  let response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${text}&page=1&include_adult=false`
  );
  finalResponse = await response.json();
  results = finalResponse.results;
  displayData();
}
searchWord.oninput = function () {
  searchByWord();
};

/**search on page **/
searchAll.oninput = function () {
  let movieTitle = searchAll.value;
  let singleMovie = "";
  if (movieTitle == "") {
    getMovie(category);
  }
  for (let i = 0; i < results.length; i++) {
    if (
      results[i].title.toLowerCase().includes(movieTitle.toLowerCase()) == true) {
      singleMovie += `
            <div class="col-md-4 mb-4 mb-5 "> <div class="movie text-center  ">
      <div class="inner-img position-relative">
          <img src="${imgpath + results[i].poster_path}" class="w-100" alt="" />
          <div class="movie-overlay position-absolute  start-0">
              <div class="movie-desc text-black position-absolute top-50 translate-middle-y  ">
                  <h4>${results[i].title}</h4>
                  <p>${results[i].overview}</p>
                  <div class="rate"><span>rate:${
                    results[i].vote_average
                  }</span></div>
                  <div class="date mt-4"><span>${
                    results[i].release_date
                  }</span></div>
              </div>
          </div>
      </div>
  </div>
  </div>`;
    }
  }
//السطر ده بيضيف الداتا السيرش ف صف فوق الداتا عادي بس انا عملته كومنت
//   document.getElementById("searchContainer").innerHTML = singleMovie;
//شايفه ان اظهر الداتا اللي ببحث عنها *بس* افضل من اني اظهرها فوق 
// و باقي الداتا للصفحه تحت   
document.getElementById("allMovie").innerHTML = singleMovie;

};

/********end api*******/

/**nice scroll**/
$("#contactUrl").click(function (e) {
  let linkHref = $(e.target).attr("href");
  let sectionOffset = $(linkHref).offset().top;
  $("html,body").animate({ scrollTop: sectionOffset }, 1000);
});

/**regex */
let nameInput = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let age = document.getElementById("age");
let password = document.getElementById("password");
let rePassword = document.getElementById("rePassword");

/**regex for name **/
nameInput.addEventListener("focus", function () {
  $(".contact .name p").removeClass("d-none");
});

nameInput.addEventListener("input", function () {
  let regax = /^[a-zA-Z0-9]+$/;
  if (regax.test(nameInput.value) == true) {
    $(".contact .name p").addClass("d-none");
  } else {
    $(".contact .name p").addClass("d-block");
    $(".contact .name p").removeClass("d-none");
  }
});

/**regex for email **/
email.addEventListener("input", function () {
  let regax = /^\w+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/;
  if (regax.test(email.value) == true) {
    $(".contact .email p").addClass("d-none");
  } else {
    $(".contact .email p").addClass("d-block");
    $(".contact .email p").removeClass("d-none");
  }
});

/**regex for phone **/

phone.addEventListener("input", function () {
  let regax = /^(002)?01[0125][0-9]{8}$/;
  if (regax.test(phone.value) == true) {
    $(".contact .phone p").addClass("d-none");
  } else {
    $(".contact .phone p").addClass("d-block");
    $(".contact .phone p").removeClass("d-none");
  }
});

/**regex for age **/

age.addEventListener("input", function () {
  let regax = /^[1-9][0-9]{0,1}$/;
  if (regax.test(age.value) == true) {
    $(".contact .age p").addClass("d-none");
  } else {
    $(".contact .age p").addClass("d-block");
    $(".contact .age p").removeClass("d-none");
  }
});

/**regex for password **/
password.addEventListener("input", function () {
  let regax = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (regax.test(password.value) == true) {
    $(".contact .password p").addClass("d-none");
  } else {
    $(".contact .password p").addClass("d-block");
    $(".contact .password p").removeClass("d-none");
  }
});

/** rePassword **/
rePassword.addEventListener("input", function () {
  if (rePassword.value == password.value) {
    $(".contact .rePassword p").addClass("d-none");
  } else {
    $(".contact .rePassword p").addClass("d-block");
    $(".contact .rePassword p").removeClass("d-none");
  }
});
