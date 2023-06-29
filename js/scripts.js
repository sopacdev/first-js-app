let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  
  function add(pokemon) {
    if (typeof pokemon === "object" &&
      "name" in pokemon) {
      pokemonList.push(pokemon);
    }
  }
  
  function getAll() {
    return pokemonList;
  }
  
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#exampleModal");
    button.classList.add("btn-secondary", "mt-1", "p-2", "border-0", "fs-5");
    button.classList.add("btn")
    
    button.addEventListener("click" , function () {
      showDetails(pokemon)
    });

    button.innerText = pokemon.name;
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
  }

  function getAll() {
    return  pokemonList;
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
          height: item.height,
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) { 
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon)
      showModal(pokemon);
      return pokemon;
    });
  }

  function showModal(pokemon) {
      let modalTitle = document.querySelector(".modal-title");
      modalTitle.innerText = pokemon.name;
      
      let imageContainer = document.querySelector(".image-container");
      let pokemonImage = document.createElement("img");
      pokemonImage.src = pokemon.imageUrl;
      pokemonImage.classList.add("pokemon-image");
      imageContainer.innerHTML = "";
      imageContainer.append(pokemonImage);
      
      let pokemonHeight = document.querySelector(".height");
      pokemonHeight.innerText = "Height: " + pokemon.height;
      
      let modalContainer = document.querySelector("#modal-container");
      modalContainer.classList.add("modal-is-visible");

      let modal = document.querySelector(".modal")
      modal.classList.add("modal-is-visible");
      modal.classList.remove("modal");
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          closeModal();
        }
      });
      
      let modalCloseButton = document.querySelector("#button");
      modalCloseButton.classList.add("btn");
      modalCloseButton.classList.add("modal-close");
      modalCloseButton.innerText = "Close";
      modalCloseButton.addEventListener("click", closeModal);
    }

    function closeModal() {
      let modalContainer = document.querySelector("#modal-container");
      modalContainer.classList.remove("modal-is-visible");
      modalContainer.classList.add("modal");
      document.removeEventListener("keydown", function (event) {
        if (event.key === "Escape") {
          closeModal();
        }
      })
    }

    return {
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
  };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});