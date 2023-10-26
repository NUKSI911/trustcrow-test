/* eslint-disable prefer-rest-params */

export function throttle(callback: Function, wait = 0) {
  let throttleTimer: boolean;
  let triggerArgs: IArguments;
  let triggerThis: unknown;
  function trigger(){
    triggerArgs = arguments;
    //@ts-ignore
    triggerThis = this;
    if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
      callback.apply(triggerThis, triggerArgs);
      throttleTimer = false;
    }, wait);
  };

  trigger.cancel = () => {
    clearTimeout(throttleTimer ? 0 : 1);
  };
  trigger.flush = () => {
    clearTimeout(throttleTimer ? 0 : 1);
    callback.apply(triggerThis, triggerArgs);
  };

  return trigger;
}

export function capitalize(s: string) {
  return s && s[0].toUpperCase() + s.slice(1);
}
