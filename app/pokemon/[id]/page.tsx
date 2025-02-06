"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{ type: { name: string } }>;
  abilities: Array<{ ability: { name: string } }>;
  sprites: {
    front_default: string;
  };
}

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
    return <div>loading...</div>;
  }

  if (!pokemon) {
    return <div>pokemon not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl capitalize text-center">
            {pokemon.name}
          </CardTitle>
          <CardContent className="flex flex-col items-center">
            <Image
              src={pokemon.sprites.front_default || "/placeholder.svg"}
              alt={pokemon.name}
              width={200}
              height={200}
              className="w-50 h-50 object-contain mb-4"
            />
            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
              <div>
                <h3 className="font-bold">Height: </h3>
                <p>{pokemon.height / 10} m</p>
              </div>
              <div>
                <h3 className="font-bold">Weight:</h3>
                <p>{pokemon.weight / 10} kg</p>
              </div>
              <div>
                <h3 className="font-bold">Types:</h3>
                <ul>
                  {pokemon.types.map((type) => (
                    <li key={type.type.name} className="capitalize">
                      {type.type.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold">Abilities:</h3>
                <ul>
                  {pokemon.abilities.map((ability) => (
                    <li key={ability.ability.name} className="capitalize">
                      {ability.ability.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link href="/" className="mt-6">
              <Button> Back to Home</Button>
            </Link>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
