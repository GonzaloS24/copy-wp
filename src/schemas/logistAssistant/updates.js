import z from "zod/v4";

export const offerDaysSchema = z.object({
  minDay: z.string(),
  maxDay: z.string(),
});

export const specialActionsSchema = z.object({
  autoUpdate: z.boolean(),
});

export const updateMessagesSchema = z.object({
  reminder1TimeUpdate: z.coerce.number().int().positive(),
  reminder1Unit: z.string(),
  reminder2TimeUpdate: z.coerce.number().int().positive(),
  reminder2Unit: z.string(),
});

export const updatesSchema = z.object({
  offerDays: offerDaysSchema,
  specialActions: specialActionsSchema,
  updateMessages: updateMessagesSchema,
});
