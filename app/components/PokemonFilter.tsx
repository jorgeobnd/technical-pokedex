import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Region {
  name: string;
  url: string;
}

interface PokemonFilterProps {
  regions: Region[];
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  types: string[];
  selectedType: string;
  onTypeChange: (type: string) => void;
}

export default function PokemonFilter({
  regions,
  selectedRegion,
  onRegionChange,
  types,
  selectedType,
  onTypeChange,
}: PokemonFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
      <Select value={selectedRegion} onValueChange={onRegionChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a region" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Regions</SelectItem>
          {regions.map((region) => (
            <SelectItem key={region.name} value={region.name}>
              {region.name.charAt(0).toUpperCase() + region.name.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedType} onValueChange={onTypeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {types.map((type) => (
            <SelectItem key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        onClick={() => {
          onTypeChange("all");
          onRegionChange("all");
        }}
        variant="outline"
      >
        Reset Filters
      </Button>
    </div>
  );
}
