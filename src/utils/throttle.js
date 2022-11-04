import debounce from './debounce';

// 对debounce的封装， maxWait = wait;
const throttle = (fn, wait, options) => {
  let leading = true; // default
  let trailing = true; // default

  if (options) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  return debounce(fn, wait, { leading, trailing, maxWait: wait });
};

export default throttle;
