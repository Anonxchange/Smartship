import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, Package, Calendar, User, Phone, Mail, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface ShipmentsListProps {
  shipments: any[];
  onUpdateTracking: (shipment: any) => void;
  onRefresh: () => void;
}

export default function ShipmentsList({ shipments, onUpdateTracking, onRefresh }: ShipmentsListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'in_transit': return 'bg-blue-500 hover:bg-blue-600';
      case 'delivered': return 'bg-green-500 hover:bg-green-600';
      case 'delayed': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'in_transit': return 'In Transit';
      case 'delivered': return 'Delivered';
      case 'delayed': return 'Delayed';
      default: return 'Unknown';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>All Shipments</CardTitle>
          <CardDescription>
            Manage and track all shipments in the system
          </CardDescription>
        </div>
        <Button onClick={onRefresh} variant="outline" data-testid="button-refresh-shipments">
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        {shipments.length === 0 ? (
          <div className="text-center py-8">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No shipments found</p>
            <p className="text-sm text-muted-foreground">
              Create your first shipment to get started
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking Number</TableHead>
                  <TableHead>Sender</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.map((shipment) => (
                  <TableRow key={shipment.id} data-testid={`shipment-row-${shipment.trackingNumber}`}>
                    <TableCell className="font-mono font-semibold">
                      {shipment.trackingNumber}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{shipment.senderName}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {shipment.senderEmail || shipment.senderPhone || 'No contact info'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{shipment.recipientName}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {shipment.recipientAddress.split(',')[0]}...
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {shipment.serviceType.charAt(0).toUpperCase() + shipment.serviceType.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`text-white ${getStatusColor(shipment.status)}`}>
                        {getStatusLabel(shipment.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-3 h-3 mr-1 text-muted-foreground" />
                        {shipment.currentLocation || 'Not set'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {format(new Date(shipment.createdAt), 'MMM dd, yyyy')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onUpdateTracking(shipment)}
                        data-testid={`button-update-tracking-${shipment.trackingNumber}`}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}