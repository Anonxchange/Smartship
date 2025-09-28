import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import cargoShipImage from '@assets/generated_images/Cargo_ship_logistics_scene_d218b66d.png';
import airFreightImage from '@assets/generated_images/Air_freight_logistics_scene_a980c507.png';
import warehouseImage from '@assets/generated_images/Warehouse_logistics_scene_dfb1c093.png';

export default function Hero() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const backgroundImages = [
    cargoShipImage,
    airFreightImage,
    warehouseImage
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      // Navigate to tracking page with the tracking number
      window.location.href = `/track?number=${encodeURIComponent(trackingNumber.trim())}`;
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground overflow-hidden">
      {/* Dynamic Background Images */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
        }}
      ></div>
      
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-primary/85"></div>
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Leading Global{' '}
                <span className="text-blue-200">Logistics Service</span>
              </h1>
              <p className="text-lg lg:text-xl text-blue-100 leading-relaxed">
                We offer a full range of global freight services with unmatched reliability and speed. 
                Professional shipping solutions tailored to meet your business needs worldwide.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                data-testid="button-learn-more"
              >
                Learn More
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                data-testid="button-contact-us"
              >
                Contact Us
              </Button>
            </div>
          </div>

          {/* Tracking Form */}
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-lg p-8 shadow-xl">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Track & Trace Your Shipment
                </h2>
                <p className="text-muted-foreground">
                  Enter your tracking number to get real-time updates on your package
                </p>
              </div>

              <form onSubmit={handleTrackSubmit} className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter tracking number (e.g., SS123456789)"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="pr-12 h-12 text-base"
                    data-testid="input-tracking-number"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base bg-primary hover:bg-primary/90"
                  data-testid="button-track-shipment"
                >
                  Track Shipment
                </Button>
              </form>

              <div className="text-sm text-muted-foreground">
                <p>Example tracking numbers:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <code 
                    className="bg-muted px-2 py-1 rounded cursor-pointer hover:bg-muted/80"
                    onClick={() => setTrackingNumber('SS123456789')}
                    data-testid="example-tracking-1"
                  >
                    SS123456789
                  </code>
                  <code 
                    className="bg-muted px-2 py-1 rounded cursor-pointer hover:bg-muted/80"
                    onClick={() => setTrackingNumber('SS987654321')}
                    data-testid="example-tracking-2"
                  >
                    SS987654321
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}