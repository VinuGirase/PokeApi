import React, {useState, useEffect} from 'react';
import axios from 'axios';


function OwnFetch() {

    // this allPokemon is to store all the 3 data variables 
    const [allPokemon,setAllPokemon] = useState({
        data:[],
        eggGroups:[],
        eggGroupSpeciesMap:{},
    });

    // it is for which cards is selected ~
    const [selectedCardData, setSelectedCardData] = useState(null);

    // this for toggling overlay intialy kept false ( hidden )
    // it toggles the visibility as we click on the any card 
    const [isOverlayVisible,setIsOverlayVisible] = useState(false);

    

    // it RUN once and calls function fetchData()
    useEffect(() => {
        fetchData();

    },[]);

    // this fetchData function will call 2 more functions and wait when each of them is called and data is fetched
    const fetchData = async () =>{
        // this is to fetch data and will be stored in data variable
        await fetchPokemonData();

        // this is to data and will store in eggGroups variable
        await fetchEggGroups();
    }

    // 1st function : fetching data from pokemon 
    const fetchPokemonData = async () =>{
        try {
            // this api link is to fetch all the normal data which is been stored in 'data' variable
            const response = await axios.get("https://pokeapi.co/api/v2/pokemon/");

            // this stores results array from response  
            const pokemonData = response.data.results;

            // is to fetch url from pokemonData ( data retrived from results from response)
            // this url is then stored in result and then result data is return from where it is called 
            const updatedPokemonData = await Promise.all(
                pokemonData.map(async (pokemon) => {
                  const result = await axios.get(pokemon.url);
                  return result.data;
                })
            );

            // this is to set value in allPokemon variable
            setAllPokemon((prevAllPokemon) =>({
                // this is to store prev data of all pokemon
                ...prevAllPokemon,

                // this to call function updatedPokemonData (above function) and store in data 
                data : updatedPokemonData
            }));

        }
        catch(error){
            console.log(" Error in Fetching data From API : "+error.message);
        }
    };

    //2nd function : fetching egg group data from egg group api
    const fetchEggGroups = async() =>{
        try{
            // this API is for egg group it will give data about all the egg groups
            const response = await axios.get("https://pokeapi.co/api/v2/egg-group/")

            // storing egg groups data in allPokemon variable's egg group
            setAllPokemon((prevAllPokemon) =>({
                ...prevAllPokemon,

                // this store array of all egg groups name in eggGroups variable 
                eggGroups : response.data.results,
            }));
        }
        catch(error){
            console.log(" Error Fetching Egg Groups : "+error.message);

        }
    };

    //------

    // this use effect is used to for calling function is going to fetch data of egg group species
    // basic idea used here is  ->
    // we have api at end if we give .../monster then it will give all the species which gives monster egg
    // so here we have used our existing fetch data of all egg groups 
    // now we will apply map on this allPokemon.eggGroups variable and fetch one by one all the egg groups and pass it as parameter for calling another funtion

    useEffect(() =>{
        allPokemon.eggGroups && allPokemon.eggGroups.forEach((eggGroup) => {
            // here we have called this function and we will pass eggGroup name 
            // this funtion is called as it iterates over eggGroups array
            fetchEggGroupSpecies(eggGroup);
        })
    },[allPokemon.eggGroups]);

    const fetchEggGroupSpecies = async (eggGroup) =>{
        try{
            // here we have used back ticks bcz we have to give variable in that so
            // now while calling we have passed a egg group name now
            // we have used that name in api 
            // as this api link take /egggroup-name and then gives data of all the species which have this egg group 
            const response = await axios.get(`https://pokeapi.co/api/v2/egg-group/${eggGroup.name}`);

            const speciesData = response.data.pokemon_species;

            setAllPokemon((prevAllPokemon) => ({
                // this for previous data 
                ...prevAllPokemon,

                // this is for new that is to be appended
                eggGroupSpeciesMap: {
                    ...prevAllPokemon.eggGroupSpeciesMap,

                    // this is stored in key value pair eggGroup.name is key and value is array of species.name
                    [eggGroup.name] : speciesData.map((species) => species.name)
                }
            }));
        }
        catch(error){
            console.log("Error in Fetching Egg Group Species : "+ error.message);
        }
    };

    // -----

    const handleCardClick = (data) =>{
        setSelectedCardData(data);
        setIsOverlayVisible(true);
    }


  return (
    <div>
        
    </div>
  )
}

export default OwnFetch

