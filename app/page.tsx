"use client";

import { useState } from "react";
import PokemonCard from "./components/PokemonCard";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

interface Region {
  name: string;
  url: number;
}

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [region, setRegion] = useState<Region[]>();
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


  //Fetching data from the API
  //Fetch Regions
  const fetchRegions = async () => {
    try {
      const reponse = await fetch("https://pokeapi.co/api/v2/region/");
      const data = await reponse.json();
      setRegion(data.results);
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  //fetching Pokemons
  const fetchAllPokemon = async () => {
    setLoading(true);
    try {
      const reponse = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=151"
      );
      const data = await reponse.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      setPokemon(pokemonDetails);
    } catch (error) {
      console.error("Error fetching pokemon:", error);
    }
    setLoading(false);
  };

  //Fetching the selected region
  const fetchPokemonByRegion = async (regionName: string) => {
    setLoading(true);
    try{
      const regionResponse = await fetch(`https://pokeapi.co/api/v2/region/${regionName}/`);
      const regionData = await regionResponse.json();
      const pokedexResonse = await fetch(regionData.pokedexes[0].url)
      const pokedexData = await pokedexResonse.json();
      const pokemonEntries = pokedexData.pokemon_entries;

      const pokemonDetails = await Promise.all(
        pokemonEntries.map(async (entry: { pokemon_species: {url: string} }) => {
          const speciesRes = await fetch(entry.pokemon_species.url);
          const speciesData = await speciesRes.json();
          const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${speciesData.id}`);
          return pokemonRes.json();
        })
      );
      setPokemon(pokemonDetails);
    }
    catch(error){
      console.error("Error fetching pokemon by region:", error);
    }
    setLoading(false);
  }


  return <></>;
}
