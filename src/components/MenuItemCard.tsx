import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Minus } from 'lucide-react';

/**
 * Props for the MenuItemCard component.
 */
interface MenuItemCardProps {
  id: string | number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  // In a real app, you'd pass a handler like this:
  // onQuantityChange: (itemId: string | number, newQuantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
}) => {
  const [quantity, setQuantity] = useState(0);
  console.log(`MenuItemCard loaded for: ${name}`);

  const handleSetQuantity = (newQuantity: number) => {
    // Clamp the quantity between 0 and a max value, e.g., 99
    const clampedQuantity = Math.max(0, Math.min(newQuantity, 99));
    
    // Logic for toast notifications
    if (clampedQuantity > quantity && quantity === 0) {
      toast.success(`${name} added to your cart!`);
    } else if (clampedQuantity < quantity && clampedQuantity === 0) {
      toast.info(`${name} removed from your cart.`);
    }

    setQuantity(clampedQuantity);

    // In a real app, you would call the prop handler here
    // onQuantityChange(id, clampedQuantity);
    console.log(`Updated quantity for ${name} (id: ${id}) to: ${clampedQuantity}`);
  };

  return (
    <Card className="w-full overflow-hidden transition-shadow duration-200 hover:shadow-lg">
      <div className="flex flex-col sm:flex-row-reverse">
        {/* Image Section */}
        {imageUrl && (
          <div className="w-full sm:w-40 md:w-48 flex-shrink-0">
            <img 
              src={imageUrl} 
              alt={name} 
              className="object-cover w-full h-40 sm:h-full" 
            />
          </div>
        )}
        
        {/* Content Section */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex-grow">
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {description}
            </p>
          </div>
          
          <div className="flex items-end justify-between mt-4">
            <span className="text-xl font-semibold text-gray-800">${price.toFixed(2)}</span>
            
            {quantity === 0 ? (
              <Button onClick={() => handleSetQuantity(1)}>
                <Plus className="mr-2 h-4 w-4" /> Add
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-9 w-9" 
                  onClick={() => handleSetQuantity(quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-bold text-lg w-8 text-center" aria-live="polite">
                  {quantity}
                </span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-9 w-9" 
                  onClick={() => handleSetQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MenuItemCard;