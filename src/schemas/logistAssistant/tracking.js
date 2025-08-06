import z from "zod/v4";

const salesHooksSchema = z.object({
  generatedGuideHook: z.string(),
  deliveryHook: z.string(),
  officeHook: z.string(),
  deliveredHook: z.string(),
});

const shippingTimesSchema = z.object({
  deliveryTimesGuide: z.string(),
  deliveryTimesDistribution: z.string(),
});

const trackMessagesSchema = z.object({
  officeReminderTime: z.int().positive(),
  officeReminderUnit: z.string(),
});

export const trackingSchema = z.object({
  salesHooks: salesHooksSchema,
  shippingTimes: shippingTimesSchema,
  trackMessages: trackMessagesSchema,
});
