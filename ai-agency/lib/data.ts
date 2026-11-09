// Sample account data for the demo. Every total is computed from its parts so the screens always agree.
const r2 = (n: number) => Math.round(n * 100) / 100;
const sum = (xs: number[]) => r2(xs.reduce((a, b) => a + b, 0));

export const rm = (n: number) =>
  `${n < 0 ? '−' : ''}RM ${Math.abs(n).toLocaleString('en-MY', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export const user = { name: 'Muhammad Ikhwan', initials: 'MI' };

export const mainBalance = 14722.63;
export const DAILY_LIMIT = 5000;
export const POCKET_RATE = 3.55; // % p.a.
export const streakMonths = 7;

export const pockets = [
  { name: 'Emergency Fund', balance: 53.08, goal: 500 },
  { name: 'Holiday Savings', balance: 60.0, goal: 2000 },
  { name: 'Education Fund', balance: 40.0, goal: 1000 },
];
export const pocketTotal = sum(pockets.map((p) => p.balance));
export const totalBalance = r2(mainBalance + pocketTotal);
export const monthlyInterest = r2((pocketTotal * POCKET_RATE) / 100 / 12);

export const transactions = [
  { id: 't1', name: 'Grab Food', category: 'Food & drinks', amount: -24.5, when: 'Today, 12:34', logo: '/logos/grab-food.png' },
  { id: 't2', name: 'Salary credit', category: 'Income', amount: 3980.2, when: 'Today, 09:00' },
  { id: 't3', name: 'Netflix', category: 'Subscriptions', amount: -17.0, when: 'Yesterday', logo: '/logos/netflix.png' },
  { id: 't4', name: 'Shopee', category: 'Shopping', amount: -89.9, when: 'Yesterday', logo: '/logos/shopee.png' },
  { id: 't5', name: "Touch 'n Go", category: 'Transport', amount: -30.0, when: '8 May', logo: '/logos/touchngo.png' },
];
export const salary = transactions.find((t) => t.category === 'Income')!.amount;

const parts = [
  { label: 'Food & drinks', amount: 539.41 },
  { label: 'Shopping', amount: 398.13 },
  { label: 'Transport', amount: 205.49 },
  { label: 'Other', amount: 141.27 },
];
export const spending = { month: 'May', parts, total: sum(parts.map((p) => p.amount)) };

const weekendDelivery = 150.0;
const divert = 50.0;
const dormant = [
  { name: 'Spotify Premium', monthly: 15.9 },
  { name: 'Disney+ Hotstar', monthly: 54.9 },
  { name: 'iCloud+ 200 GB', monthly: 14.2 },
];
const dormantTotal = sum(dormant.map((d) => d.monthly));
const autoSave = r2(salary * 0.2);
const emergency = pockets[0];

// Each check sends its facts to GX.AI; `offline` is the answer shown when Claude can't be reached.
export const scenarios = {
  weekend: {
    label: 'Weekend spending',
    hint: `${rm(weekendDelivery)} on food delivery`,
    facts: `This weekend I spent ${rm(weekendDelivery)} on food delivery. My Emergency Fund pocket has ${rm(emergency.balance)} of a ${rm(emergency.goal)} goal. My savings streak is ${streakMonths} months.`,
    offline: `${rm(weekendDelivery)} on food delivery this weekend is high. Move ${rm(divert)} to your Emergency Fund now to keep your ${streakMonths}-month streak going.`,
  },
  audit: {
    label: 'Subscription audit',
    hint: `${dormant.length} unused, ${rm(dormantTotal)}/mo`,
    facts: `I pay for subscriptions I haven't opened in 60+ days: ${dormant.map((d) => `${d.name} ${rm(d.monthly)}/month`).join(', ')}.`,
    offline: `You haven't used ${dormant.map((d) => d.name).join(', ')} in two months. Cancelling them frees ${rm(dormantTotal)} a month for your pockets.`,
  },
  salary: {
    label: 'Route my salary',
    hint: `${rm(salary)} landed today`,
    facts: `My salary of ${rm(salary)} landed today. I follow the 50/30/20 rule. My pockets hold ${rm(pocketTotal)} at ${POCKET_RATE}% p.a.`,
    offline: `Salary of ${rm(salary)} is in. Following 50/30/20, move ${rm(autoSave)} (20%) into your pockets at ${POCKET_RATE}% p.a. today.`,
  },
};
export type ScenarioKey = keyof typeof scenarios;

export const recipients = [
  { name: 'Ali Hassan', bank: 'Maybank', account: '114022334455' },
  { name: 'Siti Rahim', bank: 'CIMB', account: '800712345678' },
  { name: 'Farid Mohd', bank: 'GXBank', account: '880099887766' },
  { name: 'Ahmad Zaki', bank: 'RHB', account: '212345678901' },
];

export const startingPoints = 2450;
export const vouchers = [
  { id: 'grab-rides', brand: 'Grab Rides', offer: 'Free ride up to RM 8', points: 700, days: 2 },
  { id: 'grab-food', brand: 'Grab Food', offer: 'RM 5 off your next order', points: 500, days: 3 },
  { id: 'mcd', brand: "McDonald's", offer: 'Free McFlurry with any meal', points: 600, days: 5 },
  { id: 'shopee', brand: 'Shopee', offer: '10% cashback, up to RM 20', points: 800, days: 7 },
  { id: 'tng', brand: "Touch 'n Go", offer: 'RM 2 reload bonus', points: 300, days: 14 },
  { id: 'lazada', brand: 'Lazada', offer: 'RM 10 off a RM 50 spend', points: 1000, days: 21 },
];

// Self-check: the figures shown on different screens must agree.
console.assert(totalBalance === 14875.71, 'total balance', totalBalance);
console.assert(spending.total === 1284.3, 'May spending', spending.total);
console.assert(dormantTotal === 85, 'dormant subscriptions', dormantTotal);
console.assert(monthlyInterest === 0.45, 'monthly interest', monthlyInterest);
