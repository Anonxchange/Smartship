import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Truck, Menu, X, Search, User } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Track Shipment', href: '/track' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-md">
              <Truck className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">SmartShip</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium"
                data-testid={`link-nav-${item.name.toLowerCase().replace(' ', '-')}`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Search and CTA Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search or Tracking Numbers"
                className="pl-10 w-64 h-9"
                data-testid="search-input"
              />
            </div>
            
            {/* Profile Icon */}
            <a href="/login">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-profile"
              >
                <User className="w-5 h-5" />
              </Button>
            </a>
            
            {/* CTA Button */}
            <a href="/quote">
              <Button 
                className="bg-primary hover:bg-primary/90"
                data-testid="button-get-quote"
              >
                Get Quote
              </Button>
            </a>
          </div>

          {/* Mobile Profile and Menu */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Profile Icon */}
            <a href="/login">
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
                data-testid="button-mobile-profile"
              >
                <User className="w-5 h-5" />
              </Button>
            </a>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-3 border-t border-border">
              {/* Mobile Search */}
              <div className="px-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search or Tracking Numbers"
                    className="pl-10 w-full"
                    data-testid="mobile-search-input"
                  />
                </div>
              </div>
              
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-muted-foreground hover:text-primary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                  data-testid={`link-mobile-${item.name.toLowerCase().replace(' ', '-')}`}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 pt-2">
                <a href="/quote" className="block">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    data-testid="button-mobile-quote"
                  >
                    Get Quote
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}