import { Button } from '@/components/ui/button';
import { Truck, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'Air Freight', href: '#services' },
        { name: 'Sea Freight', href: '#services' },
        { name: 'Road Transportation', href: '#services' },
        { name: 'Warehousing', href: '#services' },
        { name: 'Packaging & Storage', href: '#services' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Team', href: '/team' },
        { name: 'Careers', href: '/careers' },
        { name: 'News & Updates', href: '#' },
        { name: 'Partners', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Track Shipment', href: '#track' },
        { name: 'Contact Us', href: '/contact' },
        { name: 'Get Quote', href: '/quote' },
        { name: 'Terms of Service', href: '#' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
    { icon: Instagram, href: '#', name: 'Instagram' }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-md">
                <Truck className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">SmartShip</span>
            </div>
            
            <p className="text-blue-100 leading-relaxed max-w-md">
              Leading global logistics service provider offering comprehensive shipping solutions 
              with unmatched reliability and professional service standards.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-blue-100">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">contact@smartship.com</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-blue-100">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">Global Headquarters, New York</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 text-white"
                    data-testid={`link-social-${social.name.toLowerCase()}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-blue-100 hover:text-white transition-colors duration-200 text-sm"
                      data-testid={`link-footer-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-blue-100">
              © 2024 SmartShip. All rights reserved. | Privacy Policy | Terms of Service
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center gap-4 text-sm text-blue-100">
                <span>Certifications:</span>
                <span className="px-2 py-1 bg-white/10 rounded text-xs">ISO 27001</span>
                <span className="px-2 py-1 bg-white/10 rounded text-xs">IATA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}