import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import FilterControls, { FilterState } from '@/components/FilterControls';
import { Button } from '@/components/ui/button';

// Mock data for restaurants, reflecting the RestaurantCardProps interface
const mockRestaurants = [
  {
    id: 1,
    name: 'The Golden Spoon',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    cuisine: ['Italian', 'Pizza'],
    rating: 4.5,
    deliveryTime: 25,
  },
  {
    id: 2,
    name: 'Sushi Palace',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    cuisine: ['Japanese', 'Sushi'],
    rating: 4.8,
    deliveryTime: 30,
  },
  {
    id: 3,
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    cuisine: ['Mexican', 'Tacos'],
    rating: 4.3,
    deliveryTime: 20,
  },
  {
    id: 4,
    name: 'Curry House',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    cuisine: ['Indian'],
    rating: 4.6,
    deliveryTime: 35,
  },
  {
    id: 5,
    name: 'The Burger Joint',
    imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    cuisine: ['American', 'Burgers'],
    rating: 4.2,
    deliveryTime: 25,
  },
  {
    id: 6,
    name: 'Noodle Bowl',
    imageUrl: 'https://images.unsplash.com/photo-1552611052-33e04de081de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    cuisine: ['Chinese', 'Thai'],
    rating: 4.7,
    deliveryTime: 40,
  },
];

const HomePage = () => {
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  
  useEffect(() => {
    console.log('HomePage loaded');
  }, []);

  const handleApplyFilters = (filters: FilterState) => {
    console.log('Applying filters:', filters);
    let filteredList = [...mockRestaurants];

    // Filter by cuisine
    if (filters.cuisines.length > 0) {
      filteredList = filteredList.filter(r => 
        filters.cuisines.some(c => r.cuisine.includes(c))
      );
    }
    
    // Filter by rating
    if (filters.minRating > 0) {
        filteredList = filteredList.filter(r => r.rating >= filters.minRating);
    }

    // Note: Price range and sorting logic would be more complex and require price data.
    // This is a simplified demonstration of the filter connection.
    if (filters.sortBy === 'delivery_time') {
      filteredList.sort((a, b) => a.deliveryTime - b.deliveryTime);
    } else if (filters.sortBy === 'rating') {
      filteredList.sort((a, b) => b.rating - a.rating);
    }

    setRestaurants(filteredList);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <section className="text-center py-12 bg-muted/20 border-b">
          <div className="container">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Find your next meal</h1>
            <p className="text-lg text-muted-foreground mb-6">Explore the best local restaurants and dishes.</p>
            <div className="flex justify-center flex-wrap gap-2">
                <Button variant="outline">Pizza</Button>
                <Button variant="outline">Sushi</Button>
                <Button variant="outline">Burgers</Button>
                <Button variant="outline">Mexican</Button>
                <Button variant="outline">Indian</Button>
            </div>
          </div>
        </section>

        <div className="container py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
                {/* Filters Column */}
                <aside className="lg:col-span-1">
                    <FilterControls onApplyFilters={handleApplyFilters} />
                </aside>

                {/* Restaurants Grid */}
                <section className="lg:col-span-3">
                    <h2 className="text-2xl font-bold mb-6" id="restaurants">Featured Restaurants</h2>
                    {restaurants.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {restaurants.map((resto) => (
                                <RestaurantCard
                                    key={resto.id}
                                    id={resto.id}
                                    name={resto.name}
                                    imageUrl={resto.imageUrl}
                                    cuisine={resto.cuisine}
                                    rating={resto.rating}
                                    deliveryTime={resto.deliveryTime}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 border border-dashed rounded-lg">
                            <p className="text-muted-foreground">No restaurants match your filters.</p>
                            <p className="text-sm text-muted-foreground mt-2">Try adjusting your search.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;