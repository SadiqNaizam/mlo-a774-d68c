import React, { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';

// Define the shape of the filter data
export interface FilterState {
  cuisines: string[];
  priceRange: [number, number];
  sortBy: string;
  minRating: number;
}

interface FilterControlsProps {
  onApplyFilters: (filters: FilterState) => void;
}

// Mock data for filter options
const cuisineOptions = ['Italian', 'Mexican', 'Japanese', 'Chinese', 'Indian', 'American', 'Thai'];
const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'delivery_time', label: 'Delivery Time' },
  { value: 'rating', label: 'Rating' },
];

const FilterControls: React.FC<FilterControlsProps> = ({ onApplyFilters }) => {
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [minRating, setMinRating] = useState<number>(0);

  useEffect(() => {
    console.log('FilterControls component loaded.');
  }, []);

  const handleCuisineChange = (cuisine: string, checked: boolean) => {
    setSelectedCuisines(prev =>
      checked ? [...prev, cuisine] : prev.filter(c => c !== cuisine)
    );
  };

  const handleClearFilters = () => {
    setSelectedCuisines([]);
    setPriceRange([0, 50]);
    setSortBy('recommended');
    setMinRating(0);
    // Also apply the cleared state immediately
    onApplyFilters({
      cuisines: [],
      priceRange: [0, 50],
      sortBy: 'recommended',
      minRating: 0,
    });
  };

  const handleApply = () => {
    const filters: FilterState = {
      cuisines: selectedCuisines,
      priceRange,
      sortBy,
      minRating,
    };
    onApplyFilters(filters);
  };

  return (
    <Card className="w-full max-w-sm sticky top-20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Filters</CardTitle>
        <Button variant="ghost" size="icon" onClick={handleClearFilters}>
            <RotateCcw className="h-4 w-4" />
            <span className="sr-only">Clear Filters</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" defaultValue={['cuisines', 'price', 'rating']} className="w-full">
          <AccordionItem value="cuisines">
            <AccordionTrigger className="text-base">Cuisines</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {cuisineOptions.map(cuisine => (
                  <div key={cuisine} className="flex items-center space-x-2">
                    <Checkbox
                      id={cuisine}
                      checked={selectedCuisines.includes(cuisine)}
                      onCheckedChange={(checked) => handleCuisineChange(cuisine, !!checked)}
                    />
                    <Label htmlFor={cuisine} className="font-normal">{cuisine}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger className="text-base">Price Range</AccordionTrigger>
            <AccordionContent className="pt-4">
              <Slider
                defaultValue={[50]}
                min={0}
                max={100}
                step={1}
                value={[priceRange[1]]} // Control only the max value for simplicity
                onValueChange={(value) => setPriceRange([0, value[0]])}
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>$0</span>
                <span>${priceRange[1]}</span>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="rating">
            <AccordionTrigger className="text-base">Rating</AccordionTrigger>
            <AccordionContent>
                <RadioGroup value={String(minRating)} onValueChange={(value) => setMinRating(Number(value))}>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="4" id="r1" /><Label htmlFor="r1">4 stars & up</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="3" id="r2" /><Label htmlFor="r2">3 stars & up</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="0" id="r3" /><Label htmlFor="r3">Any</Label></div>
                </RadioGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sort">
            <AccordionTrigger className="text-base">Sort By</AccordionTrigger>
            <AccordionContent>
              <RadioGroup value={sortBy} onValueChange={setSortBy}>
                {sortOptions.map(option => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="font-normal">{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button onClick={handleApply} className="w-full">Apply Filters</Button>
      </CardFooter>
    </Card>
  );
};

export default FilterControls;