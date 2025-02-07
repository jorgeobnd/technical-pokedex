"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  sprites: {
    front_default: string;
    back_default: string;
  };
}

const typeColors: { [key: string]: string } = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-blue-200",
  fighting: "bg-red-700",
  poison: "bg-purple-500",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-green-400",
  rock: "bg-yellow-700",
  ghost: "bg-purple-700",
  dragon: "bg-indigo-700",
  dark: "bg-gray-700",
  steel: "bg-gray-400",
  fairy: "bg-pink-300",
};

export default function PokemonDetailPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("error fetching pokemon details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-red-500 to-yellow-500">
        <Loader2 className="h-16 w-16 animate-spin text-white" />
      </div>
    );
  }

  if (!pokemon) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-red-500 to-yellow-500">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center p-6">
            <h2 className="text-2xl font-bold mb-4">Pokemon not found</h2>
            <Link href="/">
              <Button>Back to Pokédex</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const mainType = pokemon.types[0].type.name

  return (
    <div className={`min-h-screen bg-gradient-to-b from-${mainType} to-white p-8`}>
      <Card className="max-w-4xl mx-auto overflow-hidden shadow-lg">
        <CardHeader className={`bg-gradient-to-r from-${mainType} to-white`}>
          <div className="flex justify-between items-center">
            <CardTitle className="text-4xl font-bold capitalize text-white">{pokemon.name}</CardTitle>
            <span className="text-2xl font-semibold text-white">#{pokemon.id.toString().padStart(3, "0")}</span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <div className="relative w-64 h-64 mb-4">
                <Image
                  src={pokemon.sprites.front_default || "/placeholder.svg"}
                  alt={pokemon.name}
                  layout="fill"
                  objectFit="contain"
                  className="drop-shadow-lg"
                />
              </div>
              <div className="flex gap-2 mt-4">
                {pokemon.types.map((type) => (
                  <Badge
                    key={type.type.name}
                    className={`${typeColors[type.type.name]} text-white font-semibold px-3 py-1 text-sm uppercase tracking-wide`}
                  >
                    {type.type.name}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Stats</h3>
              <div className="space-y-2">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="flex items-center">
                    <span className="w-32 capitalize">{stat.stat.name}:</span>
                    <span className="ml-2 w-8 text-right font-semibold">{stat.base_stat}</span>
                  </div>
                ))}
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-2">Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>
                    <span className="font-semibold">Height:</span> {pokemon.height / 10} m
                  </p>
                  <p>
                    <span className="font-semibold">Weight:</span> {pokemon.weight / 10} kg
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Abilities:</p>
                  <ul className="list-disc list-inside">
                    {pokemon.abilities.map((ability) => (
                      <li key={ability.ability.name} className="capitalize">
                        {ability.ability.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/">
              <Button className={`${typeColors[mainType]} hover:opacity-90 text-white`}>Back to Pokédex</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
