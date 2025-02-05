import { useState } from "react";

interface Pokemon {
  id: number
  name: string
}

interface Region {
  name: string
  url: number
}

export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [region, setRegion] = useState<Region[]>();
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  return (
    <>
      
    </>
  );
}
