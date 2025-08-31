import { maxIntSize, maxTextSize } from "./generalSizes";

export const offerDaysMaxSizes = {
  minDay: maxIntSize,
  maxDay: maxIntSize,
};

export const specialActionsMaxSizes = {};

export const updateMessagesMaxSizes = {
  reminder1TimeUpdate: maxIntSize,
  reminder1Unit: maxTextSize,
  reminder2TimeUpdate: maxIntSize,
  reminder2Unit: maxTextSize,
};

export const updatesMaxSizes = {
  offerDays: offerDaysMaxSizes,
  specialActions: specialActionsMaxSizes,
  updateMessages: updateMessagesMaxSizes,
};
