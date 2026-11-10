export type ScrapCategoryType =
  | "paper"
  | "cardboard"
  | "plastic"
  | "metal"
  | "electronics"
  | "appliances"
  | "furniture"
  | "commercial"
  | "other";

export interface ScrapCategory {
  id: ScrapCategoryType;
  name: string;
  description: string;
  icon: string;
  popular?: boolean;
}

export interface ScrapItem {
  id: string;
  categoryId: ScrapCategoryType;
  name: string;
  unit: "kg" | "piece" | "ton";
  price: number; // in INR
  isInspectionRequired?: boolean;
  indicativeNote?: string;
  description?: string;
  iconName?: string;
  isActive: boolean;
}

export type TimeSlot = "9 AM – 12 PM" | "12 PM – 3 PM" | "3 PM – 6 PM";

export type BookingStatus =
  | "requested"
  | "confirmed"
  | "collector_assigned"
  | "on_the_way"
  | "arrived"
  | "collected"
  | "completed"
  | "cancelled";

export interface PickupAddress {
  fullName: string;
  phone: string;
  streetAddress: string;
  area: string;
  city: string;
  pincode?: string;
  landmark?: string;
}

export interface SelectedScrapItem {
  itemId: string;
  itemName: string;
  category: ScrapCategoryType;
  unit: "kg" | "piece" | "ton";
  approxQuantity: number;
  ratePerUnit: number;
  estimatedTotal: number;
  isInspectionRequired?: boolean;
}

export interface Collector {
  id: string;
  name: string;
  phone: string;
  area: string;
  vehicleNumber: string;
  rating: number;
  assignedPickupsCount: number;
  completedPickupsCount: number;
  status: "available" | "busy" | "offline";
  photoUrl?: string;
}

export interface BookingTimelineEvent {
  status: BookingStatus;
  label: string;
  description: string;
  timestamp: string;
  isCompleted: boolean;
}

export interface Booking {
  id: string; // e.g. SM-2026-0001
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  address: PickupAddress;
  pickupDate: string;
  pickupTimeSlot: TimeSlot;
  items: SelectedScrapItem[];
  scrapCategories: string[];
  estimatedTotalAmount: number;
  actualWeight?: number; // kg
  finalPayableAmount?: number; // INR
  status: BookingStatus;
  collectorId?: string;
  collector?: Collector;
  notes?: string;
  createdAt: string;
  completedAt?: string;
  paymentMethod?: "UPI / Instant Transfer" | "Cash" | "Bank Transfer";
  paymentStatus?: "pending" | "paid" | "failed";
  rating?: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  totalPickups: number;
  totalEarnings: number;
  status: "active" | "inactive";
  joinedDate: string;
  savedAddresses?: PickupAddress[];
}

export interface BusinessLead {
  id: string; // e.g. SM-BIZ-1001
  companyName: string;
  contactPerson: string;
  mobile: string;
  email: string;
  businessType:
    | "Office"
    | "School"
    | "Apartment"
    | "Hotel"
    | "Factory"
    | "Retail"
    | "Warehouse"
    | "Other";
  city: string;
  address: string;
  scrapType: string;
  approxQuantity: string;
  pickupFrequency: "One Time" | "Weekly" | "Monthly" | "Custom";
  status: "new" | "contacted" | "quotation_sent" | "converted" | "closed";
  notes?: string;
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  bookingId: string;
  customerName: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "processing";
  method: "UPI" | "Cash" | "Bank Transfer";
  transactionRef?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  review: string;
  scrapType: string;
  amountEarned: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

