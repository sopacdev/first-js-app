let pokemonList = [
    {name: "Pikachu", height: 5, type: ["electricity", "ground"]},
    {name: "Squirtle", height: 6, type: ["water", "ground"]},
    {name: "Bulbasaur", height: 7, type: ["grass", "poison", "ground"]}
];
for (let i=0; i<pokemonList.length; i++){
//     if (pokemonList[i].height>6){
//     document.write(pokemonList[i].name + "(Height:" + pokemonList[i].height + ") - Wow, That's big!") 
// } else {
//     document.write(pokemonList[i].name + "(Height:" + pokemonList[i].height + ")")
//  }
}
pokemonList.forEach(function(pokemonList){
    document.write("Name: " + pokemonList.name + " Height: " + pokemonList.height + " Type: " + pokemonList.type + " ");
})

let pokemonRepository = (function () {
  let pokemonList = [
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
        }
];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();