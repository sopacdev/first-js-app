let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("invalid pokemon");
    }
  }
  
  function getAll() {
    return pokemonList;
  }
  // function search(name){
  //   return pokemonList.filter((pokemon) => pokemon.name === name);
  // }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener("click" , function (event) {
      showDetails(pokemon)
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
        name: item.name,
        detailsUrl: item.url
      };
      add(pokemon);
      console.log(pokemon)
      });
    }).catch(function (e) {
      console.error(e)
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) { 
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.type;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      let modalTitle = document.querySelector(".modal-title");
      modalTitle.innertext = pokemon.name;
      let imageContainer = document.querySelector(".image-container");
      
      let pokemonImage = document.createElement("img");
      pokemonImage.src = pokemon.imageUrl;
      pokemonImage.classList.add("pokemon-image");
      imageContainer.innerHTML = "";
      imageContainer.append(pokemonImage);
      
      let pokemonHeight = document.querySelector(".height");
      pokemonHeight.innerText = "Height: " + pokemon.height;
      
      let modal = document.querySelector(".modal")
      modal.classList.add("modal-is-visible");
      modal.classList.remove("modal");
      
      let buttonContainer = document.querySelector("#button-container");
      
      let modalCloseButton = document.createElement("button");
      modalCloseButton.classList.add("btn");
      modalCloseButton.classList.add("modal-close");
      modalCloseButton.innerText = "Close";
      buttonContainer.innerHTML = "";
      buttonContainer.append(modalCloseButton);
      modalCloseButton.addEventListener("click", closeModal);
    });

    function closeModal() {
      let modalContainer = document.querySelector("#modal-containter");
      modalContainer.classList.remove("modal-is-visible");
      modalContainer.classList.add("modal");
      modalCloseButton.innerHTML = "";
    }
  }

  return {
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
  };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});