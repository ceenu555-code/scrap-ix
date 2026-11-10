import {
  Booking,
  ScrapItem,
  Collector,
  Customer,
  BusinessLead,
  BookingStatus,
} from "@/types";
import {
  INITIAL_BOOKINGS,
  INITIAL_SCRAP_ITEMS,
  INITIAL_COLLECTORS,
  INITIAL_CUSTOMERS,
  INITIAL_BUSINESS_LEADS,
} from "@/data/mockData";

const STORAGE_KEYS = {
  BOOKINGS: "scrapix_bookings",
  ITEMS: "scrapix_scrap_items",
  COLLECTORS: "scrapix_collectors",
  CUSTOMERS: "scrapix_customers",
  LEADS: "scrapix_business_leads",
  AUTH: "scrapix_current_user",
};

export interface AuthSession {
  role: "customer" | "admin" | "collector";
  name: string;
  phone: string;
  email?: string;
  collectorId?: string;
}

const isClient = typeof window !== "undefined";

function safeGet<T>(key: string, fallback: T): T {
  if (!isClient) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function safeSet<T>(key: string, val: T): void {
  if (!isClient) return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
    window.dispatchEvent(new Event("scrapix-storage-update"));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
  }
}

// Bookings
export function getBookings(): Booking[] {
  return safeGet<Booking[]>(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
}

export function getBookingById(id: string): Booking | undefined {
  const all = getBookings();
  return all.find((b) => b.id.toLowerCase() === id.trim().toLowerCase());
}

export function saveBooking(booking: Booking): void {
  const all = getBookings();
  const index = all.findIndex((b) => b.id === booking.id);
  if (index >= 0) {
    all[index] = booking;
  } else {
    all.unshift(booking);
  }
  safeSet(STORAGE_KEYS.BOOKINGS, all);
}

export function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
  extra?: Partial<Booking>
): Booking | null {
  const all = getBookings();
  const index = all.findIndex((b) => b.id === bookingId);
  if (index === -1) return null;

  all[index] = {
    ...all[index],
    status,
    ...extra,
    ...(status === "completed" ? { completedAt: new Date().toISOString() } : {}),
  };
  safeSet(STORAGE_KEYS.BOOKINGS, all);
  return all[index];
}

// Scrap Items & Prices
export function getScrapItems(): ScrapItem[] {
  return safeGet<ScrapItem[]>(STORAGE_KEYS.ITEMS, INITIAL_SCRAP_ITEMS);
}

export function updateScrapItem(item: ScrapItem): void {
  const all = getScrapItems();
  const index = all.findIndex((i) => i.id === item.id);
  if (index >= 0) {
    all[index] = item;
  } else {
    all.push(item);
  }
  safeSet(STORAGE_KEYS.ITEMS, all);
}

export function addScrapItem(item: Omit<ScrapItem, "id">): ScrapItem {
  const all = getScrapItems();
  const newItem: ScrapItem = {
    ...item,
    id: `item-${Date.now()}`,
  };
  all.push(newItem);
  safeSet(STORAGE_KEYS.ITEMS, all);
  return newItem;
}

// Collectors
export function getCollectors(): Collector[] {
  return safeGet<Collector[]>(STORAGE_KEYS.COLLECTORS, INITIAL_COLLECTORS);
}

export function getCollectorById(id: string): Collector | undefined {
  return getCollectors().find((c) => c.id === id);
}

export function assignCollectorToBooking(
  bookingId: string,
  collectorId: string
): boolean {
  const collectors = getCollectors();
  const collector = collectors.find((c) => c.id === collectorId);
  if (!collector) return false;

  const booking = getBookingById(bookingId);
  if (!booking) return false;

  booking.collectorId = collectorId;
  booking.collector = collector;
  booking.status = "collector_assigned";
  saveBooking(booking);

  // Increment collector active count
  collector.assignedPickupsCount = (collector.assignedPickupsCount || 0) + 1;
  const updatedCollectors = collectors.map((c) =>
    c.id === collectorId ? collector : c
  );
  safeSet(STORAGE_KEYS.COLLECTORS, updatedCollectors);
  return true;
}

// Customers
export function getCustomers(): Customer[] {
  return safeGet<Customer[]>(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
}

export function saveCustomer(customer: Customer): void {
  const all = getCustomers();
  const idx = all.findIndex((c) => c.id === customer.id || c.phone === customer.phone);
  if (idx >= 0) {
    all[idx] = customer;
  } else {
    all.push(customer);
  }
  safeSet(STORAGE_KEYS.CUSTOMERS, all);
}

// Business Leads
export function getBusinessLeads(): BusinessLead[] {
  return safeGet<BusinessLead[]>(STORAGE_KEYS.LEADS, INITIAL_BUSINESS_LEADS);
}

export function saveBusinessLead(lead: BusinessLead): void {
  const all = getBusinessLeads();
  all.unshift(lead);
  safeSet(STORAGE_KEYS.LEADS, all);
}

export function updateBusinessLeadStatus(
  id: string,
  status: BusinessLead["status"]
): void {
  const all = getBusinessLeads();
  const idx = all.findIndex((l) => l.id === id);
  if (idx >= 0) {
    all[idx].status = status;
    safeSet(STORAGE_KEYS.LEADS, all);
  }
}

// Auth Session Management
export function getCurrentUser(): AuthSession | null {
  return safeGet<AuthSession | null>(STORAGE_KEYS.AUTH, {
    role: "customer",
    name: "Rahul Sundaram",
    phone: "9845012345",
    email: "rahul.sundaram@example.com",
  });
}

export function setCurrentUser(session: AuthSession | null): void {
  safeSet(STORAGE_KEYS.AUTH, session);
}

export function clearCurrentUser(): void {
  if (!isClient) return;
  localStorage.removeItem(STORAGE_KEYS.AUTH);
  window.dispatchEvent(new Event("scrapix-storage-update"));
}

export function resetToDefaults(): void {
  if (!isClient) return;
  safeSet(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
  safeSet(STORAGE_KEYS.ITEMS, INITIAL_SCRAP_ITEMS);
  safeSet(STORAGE_KEYS.COLLECTORS, INITIAL_COLLECTORS);
  safeSet(STORAGE_KEYS.CUSTOMERS, INITIAL_CUSTOMERS);
  safeSet(STORAGE_KEYS.LEADS, INITIAL_BUSINESS_LEADS);
}
