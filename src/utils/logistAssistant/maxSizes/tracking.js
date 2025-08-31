import { maxIntSize, maxTextAreaSize, maxTextSize } from "./generalSizes";

export const salesHooksMaxSizes = {
  generatedGuideHook: maxTextAreaSize,
  deliveryHook: maxTextAreaSize,
  officeHook: maxTextAreaSize,
  deliveredHook: maxTextAreaSize,
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
