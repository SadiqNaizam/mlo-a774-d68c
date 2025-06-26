import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RestaurantCardProps {
  id: string | number;
  name: string;
  imageUrl: string;
  cuisine: string[];
  rating: number;
  deliveryTime: number; // in minutes
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  name,
  imageUrl,
  cuisine,
  rating,
  deliveryTime
}) => {
  console.log('RestaurantCard loaded for:', name);

  return (
    <Link to="/restaurant-menu" className="group block">
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225'}
              alt={`Photo of ${name}`}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <CardTitle className="text-lg font-bold tracking-tight line-clamp-1">{name}</CardTitle>
          <div className="flex flex-wrap gap-2">
            {cuisine.map((c) => (
              <Badge key={c} variant="secondary">{c}</Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
          <div className="flex items-center gap-4 w-full">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{deliveryTime} min</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RestaurantCard;