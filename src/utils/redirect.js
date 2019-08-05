const redirectHistory = (history, pathname)  => {
  setTimeout(() => {
    history.push({
      pathname
    });
  }, 3000)
};

export default {
  redirectHistory
};
// export default redirect;
