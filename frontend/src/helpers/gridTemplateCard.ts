export const detectMobile = () => {
  console.log('navigator.userAgent', navigator.userAgent);
  if (
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/Macintosh/i) ||
    navigator.userAgent.match(/Windows NT/i)
  ) {
    return true;
  }

  return false;
};
