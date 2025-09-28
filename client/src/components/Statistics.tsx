import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, MapPin, Users, Award } from 'lucide-react';
import { useEffect, useState } from 'react';

interface StatItemProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  description: string;
}

function StatItem({ icon: IconComponent, value, label, description }: StatItemProps) {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    // Simple counter animation for demo purposes
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
    const increment = Math.max(1, Math.floor(numericValue / 100));
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current.toLocaleString() + (value.includes('+') ? '+' : ''));
      }
    }, 20);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <Card className="text-center h-full">
      <CardContent className="p-8 space-y-4">
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
          <IconComponent className="w-8 h-8 text-primary" />
        </div>
        <div>
          <div className="text-3xl lg:text-4xl font-bold text-foreground mb-1" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, '-')}`}>
            {displayValue}
          </div>
          <div className="text-sm font-semibold text-primary mb-2">{label}</div>
          <div className="text-sm text-muted-foreground leading-relaxed">{description}</div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Statistics() {
  const achievements = [
    {
      icon: TrendingUp,
      value: '101,273+',
      label: 'Delivered Packages',
      description: 'Successfully delivered packages worldwide with industry-leading reliability'
    },
    {
      icon: MapPin,
      value: '673,754+',
      label: 'KM Per Year',
      description: 'Total distance covered annually across our global logistics network'
    },
    {
      icon: Users,
      value: '16,714+',
      label: 'Happy Clients',
      description: 'Satisfied customers who trust us with their shipping needs globally'
    },
    {
      icon: Award,
      value: '160+',
      label: 'Countries Served',
      description: 'Global coverage spanning across continents with reliable service'
    }
  ];

  const metrics = [
    { label: 'On-Time Delivery', value: '99.8%', description: 'Industry-leading on-time delivery performance across all shipping methods' },
    { label: 'GPS Accuracy', value: 'Real-time', description: 'Advanced tracking systems with minute-by-minute updates and GPS precision' },
    { label: 'Average Rating', value: '4.9/5', description: 'Outstanding client satisfaction across all our logistics services' }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Statistics */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Our Impact & Achievements
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Delivering excellence across the globe with industry-leading standards
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {achievements.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-3 gap-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6 space-y-4">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1" data-testid={`metric-${metric.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    {metric.value}
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-2">{metric.label}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{metric.description}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Credentials */}
        <div className="flex justify-center items-center gap-8 mt-16 pt-8 border-t border-border">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">11+ Years</div>
            <div className="text-sm text-muted-foreground">Industry Experience</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">ISO 27001</div>
            <div className="text-sm text-muted-foreground">Security Certification</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">8+ Awards</div>
            <div className="text-sm text-muted-foreground">Industry Recognition</div>
          </div>
        </div>
      </div>
    </section>
  );
}