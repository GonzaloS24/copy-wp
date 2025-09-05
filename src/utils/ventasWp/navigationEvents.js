class NavigationEvents {
  constructor() {
    this.listeners = new Set();
  }

  addListener(listener) {
    this.listeners.add(listener);
  }

  removeListener(listener) {
    this.listeners.delete(listener);
  }

  triggerNavigationBlock(navigationCallback) {
    let isBlocked = false;
    this.listeners.forEach(listener => {
      const blocked = listener(navigationCallback);
      if (blocked) isBlocked = true;
    });
    return isBlocked;
  }
}

export const navigationEvents = new NavigationEvents();