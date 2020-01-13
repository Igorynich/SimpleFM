/**
 * Unsubscribes from all available subscriptions in component
 * @returns {Function}
 * @constructor
 */
import {Subscription, SubscriptionLike} from 'rxjs';


export function CleanSubscriptions(): (constructor) => void {
  return (constructor) => {
    const original = constructor.prototype.ngOnDestroy;
    if (typeof original !== 'function') {
      console.warn(`OnDestroy is not implemented in ${constructor.name} but it's using @CleanSubscriptions decorator`);
    }
    constructor.prototype.ngOnDestroy = () => {
      for (const prop in this) {
        if (this.hasOwnProperty(prop)) {
          const item: SubscriptionLike | any = this[prop];
          if (item) {
            if (Array.isArray(item) && item.length > 0 && item[0] instanceof Subscription) {
              item.forEach(sub => cleanSubscription(sub));
            } else {
              cleanSubscription(item);
            }
          }
        }
      }
      original.apply(this, arguments);
    };
  };
}

/**
 * Unsubscribe from observable if not completed
 * @param sub
 */
export function cleanSubscription(sub: any): void {
  if (sub instanceof Subscription && !sub.closed) {
    sub.unsubscribe();
  }
}
