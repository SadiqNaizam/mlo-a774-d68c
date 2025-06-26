import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker from '@/components/OrderTracker';

// shadcn/ui Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

// Define the possible statuses for an order
type OrderStatus = 'ORDER_PLACED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED';

const orderStatuses: OrderStatus[] = ['ORDER_PLACED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];

const OrderTrackingPage = () => {
  console.log('OrderTrackingPage loaded');
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('ORDER_PLACED');

  // Effect to simulate the order progressing through the statuses
  useEffect(() => {
    const currentIndex = orderStatuses.indexOf(currentStatus);
    if (currentIndex < orderStatuses.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStatus(orderStatuses[currentIndex + 1]);
      }, 5000); // Move to the next status every 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [currentStatus]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Section 1: The Visual Order Tracker */}
          <section>
            <OrderTracker 
              currentStatus={currentStatus}
              orderId="DX123456789"
              estimatedDeliveryTime="8:45 PM"
            />
          </section>

          {/* Section 2: The Order Summary Card */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  From "Spicy Tuna Sushi Bar" - <Link to="/restaurant-menu" className="text-primary hover:underline">View Restaurant</Link>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">1 x Spicy Tuna Roll</span>
                    <span>$12.99</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">1 x Miso Soup</span>
                    <span>$3.50</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>$16.49</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Delivery Fee</span>
                    <span>$2.99</span>
                  </div>
                   <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Taxes & Fees</span>
                    <span>$1.50</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center font-bold text-lg">
                  <span>Total</span>
                  <span>$20.98</span>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Section 3: Action Buttons */}
          <section className="text-center">
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;