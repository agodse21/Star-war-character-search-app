// https://swapi.dev/api/people/?search={your_search_term}

async function main() {
  let search = document.getElementById("search").value;
  let data = await getdata(search);
  append(data);
}

// async makes a function return a Promise.
// await makes a function wait for a Promise.

async function getdata(search) {
  const url = `https://swapi.dev/api/people/?search=${search}`;
  // `https://www.omdbapi.com/?apikey=a1d311fe&s=${search}`;

  let res = await fetch(url);
  let data = await res.json();
  console.log(data.count);
  if ((data.count == 0)) {
   let p=document.getElementById("error");
   p.innerText="No results found. Try again...";
   p.style.color="red";
  } else {
    document.getElementById("error").innerText="";
    return data.results;
  }
}

function append(data) {
  if (!data) {
    return;
  }

  // {name: 'Jocasta Nu', height: '167', mass: 'unknown', hair_color: 'white', skin_color: 'fair', …}
  console.log("amol", data);
  let container = document.getElementById("searched_char");
  container.innerHTML = "";
  container.style.overflow = "scroll";
  data.forEach(function (ele) {
    // let img=document.createElement("img");
    // img.src=ele.Poster;

    let name = document.createElement("h3");
    name.innerHTML = `<h4>${ele.name} <span>${ele.gender}</span> </h4>`;
    let birth_year = document.createElement("p");
    birth_year.innerText = ele.birth_year;
    // let gender=document.createElement("p");
    // gender.innerText=ele.gender;
    let div = document.createElement("div");
    div.setAttribute("class", "movie");
    div.addEventListener("click", function () {
      showDetails(ele);
    });

    div.append(name, birth_year);
    container.append(div);
  });
}
// for set time
let id;
function debounce(func, delay) {
  if (id) {
    clearTimeout(id);
  }
  id = setTimeout(function () {
    func();
  }, delay);
}

function showDetails(ele) {
  let container = document.getElementById("searched_char");
  container.innerHTML = "";
  document.getElementById("main").innerHTML = "";
  let main = document.createElement("div");
  main.setAttribute("id", "main2");

  let main_div = document.createElement("div");
  main_div.setAttribute("id", "main_div");

  let h2 = document.createElement("h2");
  h2.innerText = ele.name;
  let div1 = document.createElement("div");
  let per_info = document.createElement("h2");
  per_info.innerText = "Personal Info";
  let birth_year = document.createElement("p");
  birth_year.innerText = `Birth Year: ${ele.birth_year}`;

  let gender = document.createElement("p");
  gender.innerText = `Gender: ${ele.gender}`;
  let height = document.createElement("p");
  height.innerText = `Height:${ele.height}`;
  div1.append(per_info, birth_year, gender, height);

  let div2 = document.createElement("div");
  let Anatomy = document.createElement("h2");
  Anatomy.innerText = "Anatomy";
  let Eye_Color = document.createElement("p");
  Eye_Color.innerText = `Eye Color: ${ele.eye_color}`;

  let Mass = document.createElement("p");
  Mass.innerText = `Mass: ${ele.mass}`;
  let Hair_Color = document.createElement("p");
  Hair_Color.innerText = `Hair Color: ${ele.hair_color}`;
  div2.append(Anatomy, Eye_Color, Mass, Hair_Color);

  main_div.append(div1, div2);

  let go_back = document.createElement("button");
  go_back.innerText = "Go Back";
  go_back.addEventListener("click", function () {
    backTosearch(ele);
  });
  main.append(h2, main_div, go_back);
  document.getElementById("main").append(main);
}
function backTosearch(ele) {
  window.location.reload();
}
