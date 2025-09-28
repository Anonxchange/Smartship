import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Package, MapPin, Clock, CheckCircle, Truck, Calendar, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { toast } = useToast();

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;

    setIsLoading(true);
    setError('');
    setTrackingData(null);

    try {
      const response = await fetch(`/api/track/${trackingNumber.trim()}`);
      const data = await response.json();

      if (response.ok) {
        setTrackingData(data);
        toast({
          title: "Tracking information found",
          description: `Shipment ${trackingNumber} details loaded successfully`,
        });
      } else {
        setError(data.error || 'Tracking number not found');
        toast({
          title: "Tracking failed",
          description: data.error || "Tracking number not found",
          variant: "destructive",
        });
      }
    } catch (error) {
      setError('Network error. Please try again.');
      toast({
        title: "Network error",
        description: "Please check your connection and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'picked_up': return 'bg-orange-500';
      case 'in_transit': return 'bg-blue-500';
      case 'out_for_delivery': return 'bg-purple-500';
      case 'delivered': return 'bg-green-500';
      case 'delayed': return 'bg-red-500';
      case 'failed_delivery': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'picked_up': return Package;
      case 'in_transit': return Truck;
      case 'out_for_delivery': return MapPin;
      case 'delivered': return CheckCircle;
      case 'delayed': return Clock;
      case 'failed_delivery': return Package;
      default: return Package;
    }
  };

  const faqItems = [
    {
      question: "What information do I need to track my package?",
      answer: "You only need your tracking number, which is typically 10-15 characters. Updates are available 24/7 and reflect real-time status."
    },
    {
      question: "How often is my tracking information updated?",
      answer: "Tracking information is updated in real-time as your package moves through our network. You'll see updates whenever there's a significant change in your shipment's status or location."
    },
    {
      question: "What should I do if my tracking isn't working?",
      answer: "Please verify your tracking number is correct and try again. If the issue persists, contact our customer support team for assistance."
    },
    {
      question: "Can I track multiple packages at once?",
      answer: "Currently, you can track one package at a time. For multiple shipments, please enter each tracking number separately."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Navy Hero Section */}
      <div className="bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Track & Trace Your Shipment
            </h1>
            <p className="text-xl text-primary-foreground/80 mb-8">
              Real-time tracking for your packages, delivered with precision and care
            </p>
            
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-primary-foreground/60">
              <span>Home</span>
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
              <span>Track & Trace Shipment</span>
            </div>
          </div>
        </div>
        
        {/* Curved bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" fill="none" className="w-full h-12">
            <path d="M0,0 C150,100 350,100 600,50 C850,0 1050,0 1200,50 L1200,120 L0,120 Z" fill="currentColor" className="text-background"/>
          </svg>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Track Your Shipment Section */}
        <Card className="mb-12">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold mb-2">
              Track Your Shipment
            </CardTitle>
            <CardDescription className="text-base leading-relaxed max-w-2xl mx-auto">
              Here's the fastest way to check the status of your shipment. No need to call Customer Service - our online results give you real-time, detailed progress as your shipment speeds through the Smartship network.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleTrackSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Tracking Number
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter your tracking number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="h-14 text-base pl-4 pr-12 border-2 border-border focus:border-primary"
                    data-testid="input-tracking-search"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="w-8 h-6 bg-muted border border-border rounded flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-0.5">
                        {[...Array(9)].map((_, i) => (
                          <div key={i} className="w-0.5 h-0.5 bg-foreground/40 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading || !trackingNumber.trim()}
                className="w-full h-12 text-base bg-primary hover:bg-primary/90 font-semibold"
                data-testid="button-track-search"
              >
                {isLoading ? (
                  <>
                    <Search className="w-4 h-4 mr-2 animate-spin" />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Track Shipment
                  </>
                )}
              </Button>
            </form>

            {/* Tracking Tips */}
            <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-primary">
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-xs">®</span>
                </div>
                Tracking Tips
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Your tracking number can be found on your shipping confirmation email</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Tracking numbers typically contain a barcode - look for the package code on the left side of your shipping label</span>
                </li>
              </ul>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-6">
            {/* Shipment Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Shipment Details</span>
                  <Badge className={`text-white ${getStatusColor(trackingData.shipment.status)}`}>
                    {trackingData.shipment.status.replace('_', ' ').toUpperCase()}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Tracking Number: {trackingData.shipment.trackingNumber}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Sender Information</h3>
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">{trackingData.shipment.senderName}</p>
                      <p className="text-muted-foreground">{trackingData.shipment.senderAddress}</p>
                      {trackingData.shipment.senderPhone && (
                        <p className="text-muted-foreground">{trackingData.shipment.senderPhone}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Recipient Information</h3>
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">{trackingData.shipment.recipientName}</p>
                      <p className="text-muted-foreground">{trackingData.shipment.recipientAddress}</p>
                      {trackingData.shipment.recipientPhone && (
                        <p className="text-muted-foreground">{trackingData.shipment.recipientPhone}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <Label className="text-sm font-semibold">Service Type</Label>
                    <p className="text-sm capitalize">{trackingData.shipment.serviceType} Freight</p>
                  </div>
                  {trackingData.shipment.packageWeight && (
                    <div>
                      <Label className="text-sm font-semibold">Weight</Label>
                      <p className="text-sm">{trackingData.shipment.packageWeight} kg</p>
                    </div>
                  )}
                  {trackingData.shipment.estimatedDelivery && (
                    <div>
                      <Label className="text-sm font-semibold">Estimated Delivery</Label>
                      <p className="text-sm">
                        {format(new Date(trackingData.shipment.estimatedDelivery), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  )}
                </div>

                {trackingData.shipment.currentLocation && (
                  <div className="flex items-center gap-2 pt-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm">
                      <strong>Current Location:</strong> {trackingData.shipment.currentLocation}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tracking Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Tracking History
                </CardTitle>
                <CardDescription>
                  Complete timeline of your shipment's journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                {trackingData.trackingUpdates.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No tracking updates available yet</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {trackingData.trackingUpdates.map((update: any, index: number) => {
                      const StatusIcon = getStatusIcon(update.status);
                      return (
                        <div 
                          key={update.id} 
                          className="flex items-start gap-4"
                          data-testid={`tracking-step-${index}`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(update.status)}`}>
                            <StatusIcon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold">
                                {update.status.replace('_', ' ').toUpperCase()}
                              </h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="w-3 h-3 mr-1" />
                                {format(new Date(update.timestamp), 'MMM dd, yyyy HH:mm')}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-3 h-3 text-muted-foreground" />
                              <span className="font-medium">{update.location}</span>
                            </div>
                            {update.description && (
                              <p className="text-sm text-muted-foreground">{update.description}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tracking Features Section */}
        {!trackingData && !isLoading && (
          <div className="space-y-12">
            {/* Features Section */}
            <div className="text-center">
              <span className="text-sm font-semibold text-primary uppercase tracking-wide mb-2 block">
                TRACKING FEATURES
              </span>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Real-Time Tracking Benefits
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                Monitor your shipments with precision and confidence using our advanced tracking system
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {/* Real-Time Updates */}
                <Card className="text-center p-6 shadow-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Real-Time Updates</h3>
                  <p className="text-muted-foreground">
                    Stay informed with accurate, up-to-the-minute information about your shipment's location and status throughout its journey.
                  </p>
                </Card>

                {/* Estimated Delivery */}
                <Card className="text-center p-6 shadow-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Estimated Delivery</h3>
                  <p className="text-muted-foreground">
                    Get precise delivery time estimates that help you plan and prepare for your shipment's arrival with confidence.
                  </p>
                </Card>

                {/* Shipment History */}
                <Card className="text-center p-6 shadow-lg">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Shipment History</h3>
                  <p className="text-muted-foreground">
                    Access a detailed timeline of your package's journey, including all transit points and handling activities along the route.
                  </p>
                </Card>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-sm font-semibold text-primary uppercase tracking-wide mb-2 block">
                  HELP CENTER
                </span>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-muted-foreground">
                  Find answers to common tracking and shipping questions
                </p>
              </div>

              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-0">
                      <button
                        className="w-full text-left p-6 flex items-center justify-between hover:bg-muted transition-colors"
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      >
                        <span className="font-semibold text-foreground">{item.question}</span>
                        {expandedFaq === index ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                      {expandedFaq === index && (
                        <div className="px-6 pb-6">
                          <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Help Section */}
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Need Additional Help With Your Shipment?
              </h2>
              <p className="text-primary-foreground/80 mb-8 text-lg">
                Our customer service team is available to assist you with any questions or concerns about your shipment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-background text-foreground hover:bg-muted px-8 py-3"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Support
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Us
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function Label({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}