import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, ShoppingCart as ShoppingCartIcon } from 'lucide-react';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItemCard from '@/components/MenuItemCard';
import ShoppingCart from '@/components/ShoppingCart';

// Shadcn/ui Components
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Placeholder data for the restaurant menu
const restaurantData = {
  name: 'Sushi Heaven',
  description: 'Serving the freshest and most authentic Japanese sushi and cuisine in the heart of the city.',
  imageUrl: 'https://source.unsplash.com/random/100x100/?sushi-restaurant',
  rating: 4.8,
  address: '123 Main Street, Anytown, USA',
  hours: '11:00 AM - 10:00 PM',
  tags: ['Sushi', 'Japanese', 'Seafood'],
};

const menuCategories = [
  {
    title: 'Appetizers',
    items: [
      { id: 'app1', name: 'Miso Soup', description: 'A traditional Japanese soup with tofu, seaweed, and scallions.', price: 4.50, imageUrl: 'https://source.unsplash.com/random/400x400/?miso-soup' },
      { id: 'app2', name: 'Edamame', description: 'Steamed young soybeans sprinkled with sea salt.', price: 6.00, imageUrl: 'https://source.unsplash.com/random/400x400/?edamame' },
      { id: 'app3', name: 'Gyoza', description: 'Pan-fried pork and vegetable dumplings.', price: 8.50, imageUrl: 'https://source.unsplash.com/random/400x400/?gyoza' },
    ]
  },
  {
    title: 'Signature Sushi Rolls',
    items: [
      { id: 'roll1', name: 'Spicy Tuna Roll', description: 'Fresh tuna mixed with spicy mayo, topped with sesame seeds.', price: 12.99, imageUrl: 'https://source.unsplash.com/random/400x400/?sushi-roll' },
      { id: 'roll2', name: 'Dragon Roll', description: 'Eel and cucumber topped with avocado, tobiko, and eel sauce.', price: 16.50, imageUrl: 'https://source.unsplash.com/random/400x400/?dragon-roll' },
      { id: 'roll3', name: 'California Roll', description: 'Crab meat, avocado, and cucumber wrapped in seaweed and rice.', price: 10.00, imageUrl: 'https://source.unsplash.com/random/400x400/?california-roll' },
    ]
  }
];


const RestaurantMenuPage = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  console.log('RestaurantMenuPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <ShoppingCart isOpen={isCartOpen} onOpenChange={setCartOpen} />

      <main className="flex-grow container py-8">
        {/* Restaurant Info Card */}
        <Card className="mb-8 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <Avatar className="w-24 h-24 border">
                <AvatarImage src={restaurantData.imageUrl} alt={restaurantData.name} />
                <AvatarFallback>{restaurantData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {restaurantData.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </div>
                <h1 className="text-3xl font-bold mt-2">{restaurantData.name}</h1>
                <p className="text-muted-foreground mt-2">{restaurantData.description}</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mt-4">
                  <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-500" /> {restaurantData.rating}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {restaurantData.address}</span>
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {restaurantData.hours}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items Section */}
        <div className="space-y-12">
          {menuCategories.map((category) => (
            <section key={category.title}>
              <h2 className="text-2xl font-bold tracking-tight">{category.title}</h2>
              <Separator className="my-4" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {category.items.map(item => (
                  <MenuItemCard 
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    description={item.description}
                    price={item.price}
                    imageUrl={item.imageUrl}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* Floating Cart Button as a workaround for triggering cart sheet */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button size="lg" className="rounded-full shadow-lg" onClick={() => setCartOpen(true)}>
          <ShoppingCartIcon className="mr-2 h-5 w-5" />
          View Cart
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;