let pokemonRepository=function(){let e=[];function t(){return e}function n(){let e=document.querySelector("#modal-container");e.classList.remove("modal-is-visible"),e.classList.add("modal"),document.removeEventListener("keydown",function(e){"Escape"===e.key&&n()})}return{getAll:t,addListItem:function e(t){let o=document.querySelector(".list-group"),i=document.createElement("li"),r=document.createElement("button");r.setAttribute("data-toggle","modal"),r.setAttribute("data-target","#exampleModal"),r.classList.add("btn-secondary","mt-1","p-2","border-0","fs-5"),r.classList.add("btn"),r.addEventListener("click",function(){(function e(t){var o;fetch((o=t).detailsUrl).then(function(e){return e.json()}).then(function(e){o.imageUrl=e.sprites.front_default,o.height=e.height,o.types=e.types}).catch(function(e){console.error(e)}).then(function(){var e;let o,i,r,a;return console.log(t),e=t,document.querySelector(".modal-title").innerText=e.name,o=document.querySelector(".image-container"),(i=document.createElement("img")).src=e.imageUrl,i.classList.add("pokemon-image"),o.innerHTML="",o.append(i),document.querySelector(".height").innerText="Height: "+e.height,document.querySelector("#modal-container").classList.add("modal-is-visible"),(r=document.querySelector(".modal")).classList.add("modal-is-visible"),r.classList.remove("modal"),document.addEventListener("keydown",function(e){"Escape"===e.key&&n()}),(a=document.querySelector("#button")).classList.add("btn"),a.classList.add("modal-close"),a.innerText="Close",a.addEventListener("click",n),t})})(t)}),r.innerText=t.name,i.appendChild(r),o.appendChild(i)},loadList:function t(){return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150").then(function(e){return e.json()}).then(function(t){t.results.forEach(function(t){var n;"object"==typeof(n={name:t.name,detailsUrl:t.url,height:t.height})&&"name"in n&&e.push(n)})}).catch(function(e){console.error(e)})}}}();console.log(pokemonRepository.getAll()),pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(e){pokemonRepository.addListItem(e)})});