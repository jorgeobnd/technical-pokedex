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

export default function PokemonCard() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Pokemon</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png`}
          alt="Pokemon"
          width={200}
          height={200}
        />
      </CardContent>
    </Card>
  );
}
