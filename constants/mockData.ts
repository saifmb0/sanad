// Mock Data for Sanad Citizen OS
// All data is hardcoded to ensure 100% reliability during demos

export interface Alert {
  id: string;
  category: 'EDUCATION' | 'HOUSING' | 'VISA' | 'TRAFFIC';
  title: string;
  subtitle: string;
  description: string;
  actionLabel?: string;
  actionTarget?: string;
  severity: 'warning' | 'success' | 'info' | 'critical';
  icon: string;
}

export const ALERTS: Alert[] = [
  {
    id: '1',
    category: 'EDUCATION',
    title: '⚠️ Grade Alert: Math',
    subtitle: "Sarah is falling behind (-15%)",
    description: 'We detected a consistent drop in Algebra scores. The Ministry of Education offers free remedial coding & math sessions at Yas Hub.',
    actionLabel: 'Book Session',
    actionTarget: 'education_modal',
    severity: 'warning',
    icon: 'graduation-cap',
  },
  {
    id: '2',
    category: 'VISA',
    title: '🔴 Visa Expiry Warning',
    subtitle: 'Golden Visa expires in 28 days',
    description: 'Your Golden Visa is expiring soon. We have prepared an auto-renewal draft for your review. All documents are verified.',
    actionLabel: 'Review Draft',
    actionTarget: 'visa_modal',
    severity: 'critical',
    icon: 'passport',
  },
  {
    id: '3',
    category: 'HOUSING',
    title: '✅ Title Deed Verified',
    subtitle: 'Reem Island Unit 502',
    description: 'The contract you uploaded matches the Land Department records. No active disputes found.',
    actionLabel: 'View Report',
    actionTarget: 'housing_modal',
    severity: 'success',
    icon: 'home',
  },
  {
    id: '4',
    category: 'TRAFFIC',
    title: '🚗 Traffic Update',
    subtitle: 'Accident on E11 Highway',
    description: 'Major accident reported. Your school run route has been automatically updated to avoid delays.',
    severity: 'info',
    icon: 'car',
  },
];

export const PROPERTY_SCAN_RESULT = {
  titleDeedStatus: 'MISMATCH',
  ownerName: 'Mohammed Al Rashid',
  listingAgent: 'Ahmed Properties LLC',
  ownerMatch: false,
  disputes: [
    { type: 'Deposit Refund', status: 'Active', court: 'RDC' },
    { type: 'Maintenance Dispute', status: 'Active', court: 'RDC' },
  ],
  recommendation: 'DO NOT RENT. High Fraud Risk.',
  riskLevel: 'HIGH',
};

export const USER_PROFILE = {
  name: 'Khalid Ahmed Al Mansouri',
  emiratesId: '784-1990-1234567-1',
  nationality: 'United Arab Emirates',
  visaType: 'Golden Visa',
  visaExpiry: '2026-03-07',
  daysUntilExpiry: 28,
};

export const EDUCATION_PROGRAM = {
  name: 'Yas Creative Hub - Coding & Math Support',
  provider: 'Ministry of Education',
  subsidy: '100%',
  location: 'Yas Island, Abu Dhabi',
  schedule: 'Saturdays 10:00 AM - 12:00 PM',
  startDate: '2026-02-15',
};

export const SERVICES = [
  { id: '1', name: 'Property Verification', icon: 'shield-check', color: '#10B981' },
  { id: '2', name: 'Visa Services', icon: 'passport', color: '#F59E0B' },
  { id: '3', name: 'Education Support', icon: 'graduation-cap', color: '#3B82F6' },
  { id: '4', name: 'Traffic Fines', icon: 'car', color: '#EF4444' },
  { id: '5', name: 'Health Records', icon: 'heart-pulse', color: '#EC4899' },
  { id: '6', name: 'Utility Bills', icon: 'zap', color: '#8B5CF6' },
];
