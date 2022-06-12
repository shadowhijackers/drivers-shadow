// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const watcherId = setInterval(() => {
    postMessage(true);
  }, 5000);

  // eslint-disable-next-line no-restricted-globals
  self.onmessage = (data) => {
    clearInterval(watcherId);
  };
};
