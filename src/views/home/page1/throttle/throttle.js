export function throttle(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer == null) {
      timer = setTimeout(() => {
        fn.call(this, ...args);

        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  };
}
