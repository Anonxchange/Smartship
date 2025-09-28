import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plane, Ship, Truck, Warehouse, Package, Shield, ArrowRight } from 'lucide-react';

// Import service images
const airFreightImage = '/attached_assets/generated_images/Air_freight_cargo_loading_10ab2b90.png';
const seaFreightImage = '/attached_assets/generated_images/Sea_freight_container_ship_0289dbba.png';
const roadTransportImage = '/attached_assets/generated_images/Road_transportation_trucks_aab9787d.png';
const warehouseImage = '/attached_assets/generated_images/Warehouse_logistics_scene_dfb1c093.png';
const packagingImage = '/attached_assets/generated_images/Packaging_storage_facility_8837bf21.png';
const diplomaticImage = '/attached_assets/generated_images/Secure_diplomatic_logistics_dbf1d411.png';

export default function Services() {
  const services = [
    {
      icon: Plane,
      title: 'Air Freight',
      description: 'SmartShip, as an IATA-endorsed air forwarder, offers professional and reliable global air-freight solutions.',
      features: ['Global Coverage', 'Express Delivery', '24/7 Tracking']
    },
    {
      icon: Ship,
      title: 'Sea/Ocean Freight',
      description: 'International ocean freight shipping import and export services. FCL, LCL shipments, port to port or door to door.',
      features: ['FCL & LCL', 'Port to Door', 'Cost Effective']
    },
    {
      icon: Truck,
      title: 'Road Transportation',
      description: 'Highly experienced and dependable, SmartShip is a trusted partner in domestic road transportation.',
      features: ['Domestic Coverage', 'Flexible Scheduling', 'Real-time Updates']
    },
    {
      icon: Shield,
      title: 'Diplomatic Bag & Secure Logistics',
      description: 'Global secure mail and equipment delivery service with complete confidence and security.',
      features: ['Secure Handling', 'Confidential', 'Global Network']
    },
    {
      icon: Warehouse,
      title: 'Warehousing',
      description: 'Shared and dedicated warehousing solutions supported by state-of-the-art technology and warehouse services.',
      features: ['Flexible Storage', 'Inventory Management', 'Technology Enabled']
    },
    {
      icon: Package,
      title: 'Packaging & Storage',
      description: 'Professional packaging and storage solutions for raw materials, electronics, and finished goods with cargo insurance.',
      features: ['Professional Packing', 'Insurance Coverage', 'Custom Solutions']
    }
  ];

  return (
    <section id="services" className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive shipping and logistics solutions tailored to your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover-elevate transition-all duration-300 h-full overflow-hidden group">
                {/* Service Icon */}
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                    <IconComponent className="w-10 h-10 text-primary" />
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <CardTitle className="text-xl mb-3 text-foreground">{service.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </div>

                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant="ghost"
                    className="w-full mt-4 text-primary hover:text-primary hover:bg-primary/10 justify-between group/btn"
                    data-testid={`button-learn-more-${service.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}