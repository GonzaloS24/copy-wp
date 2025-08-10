import {
  generatedGuideHook,
  deliveredHook,
  deliveryHook,
  officeHook,
} from "./salesHooks";

export const salesHooksInitialValues = {
  generatedGuideHook: generatedGuideHook,
  deliveryHook: deliveryHook,
  officeHook: officeHook,
  deliveredHook: deliveredHook,
};

const shippingTimesPlaceholder =
  "De 3 a 5 días en ciudades principales y de 5 a 7 días en ciudades no principales";

export const shippingTimesInitialValues = {
  deliveryTimesGuide: shippingTimesPlaceholder,
  deliveryTimesDistribution: shippingTimesPlaceholder,
};

export const trackMessagesInitialValues = {
  officeReminderTime: 1,
  officeReminderUnit: "dias",
};

export const trackingInitialValues = {
  salesHooks: salesHooksInitialValues,
  shippingTimes: shippingTimesInitialValues,
  trackMessages: trackMessagesInitialValues,
};
