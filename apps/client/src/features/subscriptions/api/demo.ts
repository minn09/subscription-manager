import type {
  Category,
  CreateSubscription,
  Subscription,
  UpdateSubscription,
} from "@/types/types";

const seedCategories: Category[] = [
  { id: 1, name: "Entertainment", color: "#ef4444" },
  { id: 2, name: "Productivity", color: "#3b82f6" },
  { id: 3, name: "Design", color: "#a855f7" },
  { id: 4, name: "Cloud Storage", color: "#22c55e" },
];

const daysFromNow = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

let demoSubscriptions: Subscription[] = [
  {
    id: 1,
    title: "Netflix",
    price: 15.99,
    categoryId: 1,
    nextRenewal: daysFromNow(2),
    isRenews: true,
  },
  {
    id: 2,
    title: "Spotify",
    price: 10.99,
    categoryId: 1,
    nextRenewal: daysFromNow(5),
    isRenews: true,
  },
  {
    id: 3,
    title: "Figma",
    price: 12,
    categoryId: 3,
    nextRenewal: daysFromNow(9),
    isRenews: true,
  },
  {
    id: 4,
    title: "Notion",
    price: 8,
    categoryId: 2,
    nextRenewal: daysFromNow(14),
    isRenews: true,
  },
  {
    id: 5,
    title: "Google Drive",
    price: 2.99,
    categoryId: 4,
    nextRenewal: daysFromNow(20),
    isRenews: true,
  },
];

export const getDemoCategories = (): Category[] =>
  seedCategories.map((category) => ({ ...category }));

export const getDemoSubscriptions = (): Subscription[] =>
  demoSubscriptions.map((subscription) => ({ ...subscription }));

export const createDemoSubscription = (
  subscriptionData: CreateSubscription
): Subscription => {
  const nextId =
    demoSubscriptions.reduce((max, subscription) => Math.max(max, subscription.id), 0) + 1;
  const created: Subscription = {
    ...subscriptionData,
    id: nextId,
    price: Number(subscriptionData.price),
    nextRenewal: new Date(subscriptionData.nextRenewal),
  };
  demoSubscriptions = [...demoSubscriptions, created];
  return { ...created };
};

export const deleteDemoSubscription = (id: number): Subscription[] => {
  demoSubscriptions = demoSubscriptions.filter((subscription) => subscription.id !== id);
  return getDemoSubscriptions();
};

export const editDemoSubscription = (
  id: number,
  subscriptionData: UpdateSubscription
): { subscription: Subscription } => {
  const existing = demoSubscriptions.find((subscription) => subscription.id === id);
  if (!existing) {
    throw new Error(`Subscription with id ${id} not found`);
  }

  const updated: Subscription = {
    ...existing,
    ...subscriptionData,
    price: Number(subscriptionData.price),
    nextRenewal: new Date(subscriptionData.nextRenewal),
  };
  demoSubscriptions = demoSubscriptions.map((subscription) =>
    subscription.id === id ? updated : subscription
  );
  return { subscription: { ...updated } };
};
