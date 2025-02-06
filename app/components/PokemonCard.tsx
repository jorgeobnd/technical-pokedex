import Image from "next/image";
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
    <Card className="overflow-hidden">
      <CardHeader className="p-4">
        <CardTitle className="text-lg capitalize">Pokemon</CardTitle>
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
  );
}
