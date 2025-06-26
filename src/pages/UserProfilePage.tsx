import React from 'react';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Home, CreditCard, Trash2, Pencil, PlusCircle } from 'lucide-react';

// Mock data based on the page description
const userProfile = {
  name: 'Alex Doe',
  email: 'alex.doe@example.com',
  phone: '555-123-4567',
};

const savedAddresses = [
  { id: 1, type: 'Home', address: '1234 Blossom Hill Ln, San Jose, CA 95123', isDefault: true },
  { id: 2, type: 'Work', address: '5678 Innovation Dr, Palo Alto, CA 94304', isDefault: false },
];

const paymentMethods = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
  { id: 2, type: 'MasterCard', last4: '5555', expiry: '08/25', isDefault: false },
];

const orderHistory = [
  { id: 'ORD-1024', date: '2023-10-26', restaurant: 'Sushi Central', total: '$45.50', status: 'Delivered' },
  { id: 'ORD-1021', date: '2023-10-22', restaurant: 'The Burger Joint', total: '$28.00', status: 'Delivered' },
  { id: 'ORD-1015', date: '2023-10-15', restaurant: 'Pasta Palace', total: '$52.75', status: 'Cancelled' },
];


const UserProfilePage = () => {
  console.log('UserProfilePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto py-8 px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tight mb-6">My Account</h1>
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="addresses">Addresses</TabsTrigger>
              <TabsTrigger value="payment">Payment Methods</TabsTrigger>
              <TabsTrigger value="history">Order History</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* This would be a form component in a real app */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={userProfile.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={userProfile.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" defaultValue={userProfile.phone} />
                  </div>
                   <Button>Save Changes</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="addresses">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Saved Addresses</CardTitle>
                    <CardDescription>Manage your delivery addresses.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Address
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {savedAddresses.map(addr => (
                    <div key={addr.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <Home className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <p className="font-semibold">{addr.type} {addr.isDefault && <Badge variant="secondary">Default</Badge>}</p>
                          <p className="text-sm text-muted-foreground">{addr.address}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Payment Methods Tab */}
            <TabsContent value="payment">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your saved cards.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Card
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map(pm => (
                     <div key={pm.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <CreditCard className="h-6 w-6 text-muted-foreground" />
                        <div>
                          <p className="font-semibold">{pm.type} ending in {pm.last4} {pm.isDefault && <Badge variant="secondary">Default</Badge>}</p>
                          <p className="text-sm text-muted-foreground">Expires {pm.expiry}</p>
                        </div>
                      </div>
                       <div className="flex gap-2">
                        <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Order History Tab */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View your past orders and reorder your favorites.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Restaurant</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orderHistory.map(order => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.restaurant}</TableCell>
                          <TableCell>{order.total}</TableCell>
                          <TableCell>
                            <Badge variant={order.status === 'Delivered' ? 'default' : 'destructive'}>{order.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">Reorder</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;