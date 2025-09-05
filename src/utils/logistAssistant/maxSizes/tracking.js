import { maxIntSize, maxTextAreaSize, maxTextSize } from "./generalSizes";

export const salesHooksMaxSizes = {
  generatedGuideHook: 3000,
  deliveryHook: 3000,
  officeHook: 3000,
  deliveredHook: 3000,
};

export const shippingTimesMaxSizes = {
  deliveryTimesGuide: maxTextAreaSize,
  deliveryTimesDistribution: maxTextAreaSize,
};

export const trackMessagesMaxSizes = {
  officeReminderTime: maxIntSize,
  officeReminderUnit: maxTextSize,
};

export const trackingMaxSizes = {
  salesHooks: salesHooksMaxSizes,
  shippingTimes: shippingTimesMaxSizes,
  trackMessages: trackMessagesMaxSizes,
};
