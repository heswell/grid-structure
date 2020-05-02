export function getScrollHandler(callback) {
  let timeoutHandle = null;
  const onScrollEnd = () => {
    callback("scroll-end");
    timeoutHandle = null;
  };
  return () => {
    if (timeoutHandle === null) {
      callback("scroll-start");
    } else {
      clearTimeout(timeoutHandle);
    }
    timeoutHandle = setTimeout(onScrollEnd, 200);
  };
}
