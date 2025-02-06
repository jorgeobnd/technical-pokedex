import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link href={`/pokemon/${pokemon.id}`} className= "block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <CardHeader className="p-4">
          <CardTitle className="text-lg capitalize">{pokemon.name}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-4 flex justify-center">
          <Image
            src={pokemon.sprites.front_default || "/placeholder.svg"}
            alt={pokemon.name}
            width={120}
            height={120}
            className="w-30 h-30 object-contain"
          />
        </CardContent>
      </Card>
    </Link>
  );
}
