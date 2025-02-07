"use client";

import { useCallback, useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import PokemonFilter from "./components/PokemonFilter";
import { Loader2 } from "lucide-react";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{ type: { name: string } }>;
}

interface Region {
  name: string;
  url: string;
}

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [regions, setRegions] = useState<Region[]>();
  const [types, setTypes] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(false);

  //UseEffect to fetch data on page load
  useEffect(() => {
    const initializePokedex = async () => {
      await Promise.all([fetchRegions(), fetchTypes(), fetchAllPokemon()]);
      setLoading(false);
    };
    initializePokedex();
  }, []);

  //Fetching data from the API
  //Fetch Regions
  const fetchRegions = async () => {
    try {
      const reponse = await fetch("https://pokeapi.co/api/v2/region/");
      const data = await reponse.json();
      setRegions(data.results);
    } catch (error) {
      console.error("Error fetching regions:", error);
    }
  };

  //Fetch Types
  const fetchTypes = async () => {
    try {
      const reponse = await fetch("https://pokeapi.co/api/v2/type/");
      const data = await reponse.json();
      setTypes(data.results.map((type: { name: string }) => type.name));
    } catch (error) {
      console.error("Error fetching types:", error);
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
      setFilteredPokemon(pokemonDetails);
    } catch (error) {
      console.error("Error fetching pokemon:", error);
    }
    setLoading(false);
  };

  //Fetching the selected region
  const fetchPokemonByRegion = useCallback(
    async (regionName: string) => {
      setLoading(true);
      try {
        const regionResponse = await fetch(
          `https://pokeapi.co/api/v2/region/${regionName}`
        );
        const regionData = await regionResponse.json();
        const pokedexResponse = await fetch(regionData.pokedexes[0].url);
        const pokedexData = await pokedexResponse.json();
        const pokemonEntries = pokedexData.pokemon_entries;

        return pokemon.filter((pokemon) =>
          pokemonEntries.some(
            (entry: { pokemon_species: { name: string } }) =>
              entry.pokemon_species.name === pokemon.name
          )
        );
      } catch (error) {
        console.error("Error fetching pokemon by region:", error);
        return [];
      } finally {
        setLoading(false);
      }
    },
    [pokemon]
  );

  const filterPokemon = useCallback(async () => {
    setLoading(true);
    let filtered = pokemon;

    if (selectedRegion !== "all") {
      filtered = await fetchPokemonByRegion(selectedRegion);
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((p) =>
        p.types.some((t) => t.type.name === selectedType)
      );
    }

    setFilteredPokemon(filtered);
    setLoading(false);
  }, [selectedRegion, selectedType, pokemon, fetchPokemonByRegion]);

  useEffect(() => {
    filterPokemon();
  }, [filterPokemon]);

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-500 to-yellow-500 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-5xl font-bold mb-8 text-center text-red-600">Pokédex</h1>
          <PokemonFilter
            regions={regions || []}
            selectedRegion={selectedRegion}
            onRegionChange={handleRegionChange}
            types={types}
            selectedType={selectedType}
            onTypeChange={handleTypeChange}
          />
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-red-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
              {filteredPokemon.map((poke) => (
                <PokemonCard key={poke.id} pokemon={poke} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
