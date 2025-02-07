import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{ type: { name: string } }>;
}

interface PokemonCardProps {
  pokemon: Pokemon;
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
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.id}`} className="block">
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-gray-100 to-gray-200">
        <CardHeader className="p-4 bg-white backdrop-blur-sm">
          <CardTitle className="text-xl font-bold capitalize">{pokemon.name}</CardTitle>
          <div className="text-sm font-semibold text-gray-500">#{pokemon.id.toString().padStart(3, "0")}</div>
        </CardHeader>
        <CardContent className="p-4 flex flex-col items-center">
          <div className="relative w-40 h-40 mb-4">
            <Image
              src={pokemon.sprites.front_default || "/placeholder.svg"}
              alt={pokemon.name}
              layout="fill"
              objectFit="contain"
              className="drop-shadow-md hover:drop-shadow-xl transition-all duration-300"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {pokemon.types.map((type) => (
              <Badge
                key={type.type.name}
                className={`${typeColors[type.type.name]} text-white font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wide shadow-sm`}
              >
                {type.type.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
