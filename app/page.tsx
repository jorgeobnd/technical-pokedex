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

  const fetchRegions = async () => {
    try {
      const reponse = await fetch("https://pokeapi.co/api/v2/region/");
      const data = await reponse.json();
      setRegion(data.results);
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

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

  

  return <></>;
}
