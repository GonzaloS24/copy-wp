import z from "zod/v4";

const confirmMessagesSchema = z.object({
  imagePosition: z.int().positive(),
  reminder1Time: z.int().positive(),
  reminder1Unit: z.string(),
  reminder2Time: z.int().positive(),
  reminder2Unit: z.string(),
  thanksMessage: z.string(),
});

const directionAnalisisSchema = z.object({
  evaluateAddress: z.boolean(),
  addressPrompt: z.string(),
});

const orderValidationsSchema = z.object({
  autoConfirm: z.boolean(),
  validateDeliveries: z.boolean(),
  minSuccessPercentage: z.int().positive(),
  minOrdersValidation: z.int().positive(),
  validateShipping: z.boolean(),
  minShippingValue: z.int().positive(),
});

const shippingTimesSchema = z.object({
  deliveryTimes: z.string(),
});

export const confirmationsSchema = z.object({
  confirmMessages: confirmMessagesSchema,
  directionAnalisis: directionAnalisisSchema,
  orderValidations: orderValidationsSchema,
  shippingTimes: shippingTimesSchema,
});
