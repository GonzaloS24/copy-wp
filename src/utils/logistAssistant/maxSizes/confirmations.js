import { maxIntSize, maxTextAreaSize, maxTextSize } from "./generalSizes";

export const confirmMessagesMaxSizes = {
  imagePosition: maxIntSize,
  reminder1Time: maxIntSize,
  reminder1Unit: maxTextSize,
  reminder2Time: maxIntSize,
  reminder2Unit: maxTextSize,
  thanksMessage: maxTextAreaSize,
};

export const directionAnalisisMaxSizes = {
  evaluateAddress: false,
  addressPrompt: maxTextAreaSize,
};

export const orderValidationsMaxSizes = {
  minSuccessPercentage: maxIntSize,
  minOrdersValidation: maxIntSize,
  minShippingValue: maxIntSize,
};

export const shippingTimesMaxSizes = {
  deliveryTimes: maxTextAreaSize,
};

export const confirmationsMaxSizes = {
  confirmMessages: confirmMessagesMaxSizes,
  directionAnalisis: directionAnalisisMaxSizes,
  orderValidations: orderValidationsMaxSizes,
  shippingTimes: shippingTimesMaxSizes,
};
