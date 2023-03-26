let pokemonRepository = (function () {
  let repository = [
    {
      name: "Pikachu", 
      height: 5, 
      type: ["electricity", "ground"]
    },
    {
      name: "Squirtle", 
      height: 6, 
      type: ["water", "ground"]
    },
    {
      name: "Bulbasaur", 
      height: 7, 
      type: ["grass", "poison", "ground"]
    },
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("invalid pokemon")
    }
  }
  function getAll() {
    return repository;
  }
  function search(name){
    return repository.filter((pokemon) => pokemon.name === name);
  }
  function addListItem(pokemon){
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    
    button.addEventListener('click' function (){
      showDetails(pokemon)
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    search: search,
    addListItem: addListItem
  };
})();

pokemonRepository.add({
  name: "Cosmog",
  height: 5,
  type: ["electricity", "ground"]
});

console.log(pokemonRepository.search('Cosmog'))

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
})