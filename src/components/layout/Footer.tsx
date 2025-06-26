import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/40 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">DelishExpress</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your favorite local restaurants, delivered fast.
            </p>
            <div className="flex space-x-4">
                <Link to="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
                <Link to="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
                <Link to="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/#restaurants" className="text-sm text-muted-foreground hover:text-primary">View Restaurants</Link>
              <Link to="/order-tracking" className="text-sm text-muted-foreground hover:text-primary">Track Your Order</Link>
              <Link to="/#deals" className="text-sm text-muted-foreground hover:text-primary">Deals & Offers</Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary">About Us</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} DelishExpress. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;