import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface CreateShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  adminId: string;
}

export default function CreateShipmentModal({ isOpen, onClose, onSuccess, adminId }: CreateShipmentModalProps) {
  const [formData, setFormData] = useState({
    senderName: '',
    senderAddress: '',
    senderPhone: '',
    senderEmail: '',
    recipientName: '',
    recipientAddress: '',
    recipientPhone: '',
    recipientEmail: '',
    serviceType: '',
    packageWeight: '',
    packageDimensions: '',
    packageDescription: '',
    currentLocation: '',
    estimatedDelivery: '',
    cost: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const serviceTypes = [
    { value: 'air', label: 'Air Freight' },
    { value: 'sea', label: 'Sea Freight' },
    { value: 'road', label: 'Road Transportation' },
    { value: 'express', label: 'Express Delivery' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const shipmentData = {
        ...formData,
        createdBy: adminId,
        status: 'pending'
      };

      const response = await fetch('/api/shipments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(shipmentData),
      });

      if (response.ok) {
        const newShipment = await response.json();
        toast({
          title: "Shipment created successfully",
          description: `Tracking number: ${newShipment.trackingNumber}`,
        });
        setFormData({
          senderName: '',
          senderAddress: '',
          senderPhone: '',
          senderEmail: '',
          recipientName: '',
          recipientAddress: '',
          recipientPhone: '',
          recipientEmail: '',
          serviceType: '',
          packageWeight: '',
          packageDimensions: '',
          packageDescription: '',
          currentLocation: '',
          estimatedDelivery: '',
          cost: ''
        });
        onSuccess();
      } else {
        const error = await response.json();
        toast({
          title: "Failed to create shipment",
          description: error.error || "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network error",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Shipment</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new shipment with automatic tracking number generation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sender Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Sender Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="senderName">Sender Name *</Label>
                <Input
                  id="senderName"
                  value={formData.senderName}
                  onChange={(e) => handleInputChange('senderName', e.target.value)}
                  required
                  data-testid="input-sender-name"
                />
              </div>
              <div>
                <Label htmlFor="senderPhone">Sender Phone</Label>
                <Input
                  id="senderPhone"
                  value={formData.senderPhone}
                  onChange={(e) => handleInputChange('senderPhone', e.target.value)}
                  data-testid="input-sender-phone"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="senderAddress">Sender Address *</Label>
              <Textarea
                id="senderAddress"
                value={formData.senderAddress}
                onChange={(e) => handleInputChange('senderAddress', e.target.value)}
                required
                data-testid="input-sender-address"
              />
            </div>
            <div>
              <Label htmlFor="senderEmail">Sender Email</Label>
              <Input
                id="senderEmail"
                type="email"
                value={formData.senderEmail}
                onChange={(e) => handleInputChange('senderEmail', e.target.value)}
                data-testid="input-sender-email"
              />
            </div>
          </div>

          {/* Recipient Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recipient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="recipientName">Recipient Name *</Label>
                <Input
                  id="recipientName"
                  value={formData.recipientName}
                  onChange={(e) => handleInputChange('recipientName', e.target.value)}
                  required
                  data-testid="input-recipient-name"
                />
              </div>
              <div>
                <Label htmlFor="recipientPhone">Recipient Phone</Label>
                <Input
                  id="recipientPhone"
                  value={formData.recipientPhone}
                  onChange={(e) => handleInputChange('recipientPhone', e.target.value)}
                  data-testid="input-recipient-phone"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="recipientAddress">Recipient Address *</Label>
              <Textarea
                id="recipientAddress"
                value={formData.recipientAddress}
                onChange={(e) => handleInputChange('recipientAddress', e.target.value)}
                required
                data-testid="input-recipient-address"
              />
            </div>
            <div>
              <Label htmlFor="recipientEmail">Recipient Email</Label>
              <Input
                id="recipientEmail"
                type="email"
                value={formData.recipientEmail}
                onChange={(e) => handleInputChange('recipientEmail', e.target.value)}
                data-testid="input-recipient-email"
              />
            </div>
          </div>

          {/* Package Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Package Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="serviceType">Service Type *</Label>
                <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                  <SelectTrigger data-testid="select-service-type">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map((service) => (
                      <SelectItem key={service.value} value={service.value}>
                        {service.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="packageWeight">Package Weight (kg)</Label>
                <Input
                  id="packageWeight"
                  type="number"
                  step="0.01"
                  value={formData.packageWeight}
                  onChange={(e) => handleInputChange('packageWeight', e.target.value)}
                  data-testid="input-package-weight"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="packageDimensions">Package Dimensions (L x W x H)</Label>
                <Input
                  id="packageDimensions"
                  placeholder="e.g., 30 x 20 x 15 cm"
                  value={formData.packageDimensions}
                  onChange={(e) => handleInputChange('packageDimensions', e.target.value)}
                  data-testid="input-package-dimensions"
                />
              </div>
              <div>
                <Label htmlFor="cost">Shipping Cost ($)</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  value={formData.cost}
                  onChange={(e) => handleInputChange('cost', e.target.value)}
                  data-testid="input-cost"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="packageDescription">Package Description</Label>
              <Textarea
                id="packageDescription"
                placeholder="Description of package contents"
                value={formData.packageDescription}
                onChange={(e) => handleInputChange('packageDescription', e.target.value)}
                data-testid="input-package-description"
              />
            </div>
          </div>

          {/* Logistics Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Logistics Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currentLocation">Current Location</Label>
                <Input
                  id="currentLocation"
                  placeholder="e.g., Processing Center, New York"
                  value={formData.currentLocation}
                  onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                  data-testid="input-current-location"
                />
              </div>
              <div>
                <Label htmlFor="estimatedDelivery">Estimated Delivery Date</Label>
                <Input
                  id="estimatedDelivery"
                  type="datetime-local"
                  value={formData.estimatedDelivery}
                  onChange={(e) => handleInputChange('estimatedDelivery', e.target.value)}
                  data-testid="input-estimated-delivery"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-shipment">
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90"
              data-testid="button-submit-shipment"
            >
              {isLoading ? 'Creating...' : 'Create Shipment'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}