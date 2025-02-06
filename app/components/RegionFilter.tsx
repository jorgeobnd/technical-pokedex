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
  url: number;
}

interface RegionFilterProps {
  regions: Region[];
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

export default function RegionFilter({
  regions,
  selectedRegion,
  onRegionChange,
}: RegionFilterProps) {
  return (
    <div className="flex justify-center items-center space-x-4">
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
      <Button onClick={() => onRegionChange("")} variant="outline">
        Reset
      </Button>
    </div>
  );
}
