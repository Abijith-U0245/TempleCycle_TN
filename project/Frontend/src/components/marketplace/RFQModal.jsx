import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, CheckCircle2 } from 'lucide-react';

export default function RFQModal({ open, onClose, product, buyerInfo }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    quantity_kg: '',
    delivery_city: '',
    usage_type: '',
    required_by: '',
    special_requirements: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const rfqNumber = `RFQ-${Date.now().toString(36).toUpperCase()}`;
    // Mock create: simulate network delay and store a record in localStorage for demo
    await new Promise((res) => setTimeout(res, 500));
    try {
      const stored = JSON.parse(localStorage.getItem('demo_rfqs') || '[]');
      stored.unshift({
        id: rfqNumber,
        rfq_number: rfqNumber,
        buyer_id: buyerInfo?.id || 'demo_buyer',
        buyer_company: buyerInfo?.company_name || 'Demo Company',
        product_id: product.id,
        product_name: product.name,
        ...formData,
        quantity_kg: parseInt(formData.quantity_kg),
        status: 'pending',
        created_at: new Date().toISOString(),
      });
      localStorage.setItem('demo_rfqs', JSON.stringify(stored));
    } catch (e) {
      // ignore storage errors in demo mode
    }

    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
      setFormData({
        quantity_kg: '',
        delivery_city: '',
        usage_type: '',
        required_by: '',
        special_requirements: '',
      });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Request for Quote</DialogTitle>
          <DialogDescription>
            Submit your requirements for {product?.name}
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-12 text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">RFQ Submitted!</h3>
            <p className="text-gray-500">Our team will review and respond within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity Required (kg)</Label>
                <Input
                  id="quantity"
                  type="number"
                  min={product?.moq_kg || 100}
                  placeholder={`Min: ${product?.moq_kg || 100} kg`}
                  value={formData.quantity_kg}
                  onChange={(e) => setFormData({ ...formData, quantity_kg: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Delivery City</Label>
                <Input
                  id="city"
                  placeholder="e.g., Chennai, Coimbatore"
                  value={formData.delivery_city}
                  onChange={(e) => setFormData({ ...formData, delivery_city: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Usage Type</Label>
              <Select
                value={formData.usage_type}
                onValueChange={(value) => setFormData({ ...formData, usage_type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select usage type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incense_manufacturing">Incense Manufacturing</SelectItem>
                  <SelectItem value="textile_dye">Textile Dyeing</SelectItem>
                  <SelectItem value="agriculture">Agriculture / Farming</SelectItem>
                  <SelectItem value="cosmetics">Cosmetics</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Required By</Label>
              <Input
                id="date"
                type="date"
                value={formData.required_by}
                onChange={(e) => setFormData({ ...formData, required_by: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Special Requirements</Label>
              <Textarea
                id="requirements"
                placeholder="Any specific quality requirements, packaging preferences, etc."
                value={formData.special_requirements}
                onChange={(e) => setFormData({ ...formData, special_requirements: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-amber-500 hover:bg-amber-600">
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Submit RFQ
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}