// lib/plans.ts
export const PLANS = {
  FREE: {
    name: "Free",
    price: 0,
    limits: {
      spaces: 1,
      testimonials: 25,
      aiInsights: 3,
    },
  },
  PRO: {
    name: "Pro",
    price: 19,
    limits: {
      spaces: 5,
      testimonials: 500,
      aiInsights: 50,
    },
  },
};
