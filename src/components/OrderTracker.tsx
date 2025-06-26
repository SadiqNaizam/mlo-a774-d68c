import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle, ChefHat, Bike, PartyPopper } from 'lucide-react';

// Define the possible statuses for an order
type OrderStatus = 'ORDER_PLACED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED';

// Define the props for the OrderTracker component
interface OrderTrackerProps {
  currentStatus: OrderStatus;
  orderId: string;
  estimatedDeliveryTime: string;
}

// Define the steps of the order process
const orderSteps = [
  {
    id: 'ORDER_PLACED',
    title: 'Order Placed',
    description: 'We have received your order.',
    icon: CheckCircle,
  },
  {
    id: 'PREPARING',
    title: 'Preparing',
    description: 'The restaurant is preparing your food.',
    icon: ChefHat,
  },
  {
    id: 'OUT_FOR_DELIVERY',
    title: 'Out for Delivery',
    description: 'Your order is on its way.',
    icon: Bike,
  },
  {
    id: 'DELIVERED',
    title: 'Delivered',
    description: 'Enjoy your meal!',
    icon: PartyPopper,
  },
];

const OrderTracker: React.FC<OrderTrackerProps> = ({ currentStatus, orderId, estimatedDeliveryTime }) => {
  console.log('OrderTracker loaded');

  const currentStepIndex = orderSteps.findIndex(step => step.id === currentStatus);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Track Your Order</CardTitle>
        <CardDescription>
          Order #{orderId} - Estimated Delivery: {estimatedDeliveryTime}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-start justify-between relative">
          {orderSteps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isActive = index === currentStepIndex;

            return (
              <React.Fragment key={step.id}>
                {/* Step Item */}
                <div className="flex flex-col items-center text-center w-1/4 z-10">
                  <div
                    className={cn(
                      'flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300',
                      isCompleted || isActive ? 'bg-green-500 border-green-500 text-white' : 'bg-gray-100 border-gray-300 text-gray-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-500'
                    )}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>
                  <p className={cn(
                    'mt-2 font-semibold text-sm md:text-base',
                     isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'
                  )}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 hidden sm:block">{step.description}</p>
                </div>

                {/* Connector Line (not after the last item) */}
                {index < orderSteps.length - 1 && (
                  <div className="absolute top-6 left-0 w-full h-0.5 transform -translate-y-1/2 -z-1">
                     <div className={cn(
                        "h-full w-full",
                        isCompleted ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'
                     )}></div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
           {/* This is a clever trick to handle the progress bar */}
           <div className="absolute top-6 left-0 h-0.5 transform -translate-y-1/2 -z-1 w-full bg-gray-300 dark:bg-gray-700">
             <div 
               className="h-full bg-green-500 transition-all duration-500"
               style={{ width: `${(currentStepIndex / (orderSteps.length - 1)) * 100}%` }}
             ></div>
           </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTracker;