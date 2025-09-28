import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Package, MapPin, Clock, CheckCircle, Truck, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { format } from 'date-fns';

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Track Your Shipment
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter your tracking number to get real-time updates on your package
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Track & Trace
            </CardTitle>
            <CardDescription>
              Enter your tracking number to view detailed shipment information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTrackSubmit} className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Enter tracking number (e.g., SS000001000)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="h-12 text-base"
                  data-testid="input-tracking-search"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading || !trackingNumber.trim()}
                className="h-12 px-8 bg-primary hover:bg-primary/90"
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
                    Track
                  </>
                )}
              </Button>
            </form>

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

        {/* Example Tracking Numbers */}
        {!trackingData && !isLoading && (
          <Card>
            <CardHeader>
              <CardTitle>Try These Example Tracking Numbers</CardTitle>
              <CardDescription>
                Click on any tracking number below to see a demo shipment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {['SS000001000', 'SS000001001', 'SS000001002'].map((number) => (
                  <Button
                    key={number}
                    variant="outline"
                    className="h-auto p-4 text-left justify-start"
                    onClick={() => setTrackingNumber(number)}
                    data-testid={`button-example-${number}`}
                  >
                    <div>
                      <div className="font-mono font-semibold">{number}</div>
                      <div className="text-sm text-muted-foreground">Demo shipment</div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  );
}

function Label({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}