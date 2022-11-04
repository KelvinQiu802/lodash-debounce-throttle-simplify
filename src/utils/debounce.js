const debounce = (fn, wait, options) => {
  // option: {leading: boolean, trailling: boolean, maxWait: number}
  let lastCalltime,
    lastInvokeTime,
    timerId,
    maxWait,
    maxing,
    leading,
    result,
    trailing,
    allArgs;

  lastInvokeTime = 0;
  leading = false; // defualt
  maxing = false; // default
  trailing = true; // default

  if (options) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
    maxWait = options.maxWait;
    maxing = 'maxWait' in options;
  }

  function debounced(...args) {
    const time = Date.now();
    const canInvoke = shouldInvoke(time);
    lastCalltime = time;
    allArgs = args;

    if (canInvoke) {
      // 起始调用 (第一次 或 一次调用完整结束后)
      if (timerId === undefined) {
        return leadingEdge(time);
      }
    }

    return result;
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCalltime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    // 1. 第一次调用
    // 2. 间隔时间大于wait
    // 3. 等待时间大于了maxWait
    return (
      timerId === undefined ||
      timeSinceLastCall >= wait ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  function leadingEdge(time) {
    lastInvokeTime = time;

    // 调用的开始，等待完整的wait
    timerId = setTimeout(timerExpired, wait);

    if (leading) {
      // 处理leading
      return invokeFunc(time);
    }

    return result;
  }

  function trailingEdge(time) {
    // 运行trailling意味着一次调用的结束
    timerId = undefined;

    if (trailing) {
      return invokeFunc(time);
    }

    return result;
  }

  function timerExpired() {
    const time = Date.now();
    // 再次检查是否可以调用
    // 多次点击会改变lastCallTime, 所以shouldInvoke返回值也会改变
    if (shouldInvoke(time)) {
      // 处理trailling
      return trailingEdge(time);
    }
    // 不满足条件，继续等待
    // remainingWait来计算需要等待的具体时间
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function invokeFunc(time) {
    lastInvokeTime = time;
    console.log(1);
    const argsCopy = allArgs;
    allArgs = undefined;
    if (allArgs) {
      return fn(...argsCopy);
    }
    return fn();
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCalltime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    const timeToWait = wait - timeSinceLastCall;

    // maxing模式，返回 正常需要等待的时间 和 距离maxWait剩余时间 的小值
    return maxing
      ? Math.min(timeToWait, maxWait - timeSinceLastInvoke)
      : timeToWait;
  }

  return debounced;
};

export default debounce;
