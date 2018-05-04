const changeNum = n => n * 10;

const getPromiseByResolveAlways = func => {
  return Promise.resolve(func()).then(changeNum);
}
const getPromiseByUsingIf = func => {
  let result = func();
  if (result instanceof Promise) return result.then(changeNum);
  else return Promise.resolve(result).then(changeNum);
}
const getPromiseByNewPromise = func => {
  let result = func();
  return new Promise(resolve => {
    if (result instanceof Promise) {
      result.then(changeNum).then(resolve);
    } else {
      resolve(changeNum(result));
    }
  });
}

const getDataAsync = () => Promise.resolve(1);
const getDataSync = () => 2;

const getPromiseMethods = [
  getPromiseByNewPromise,
  getPromiseByResolveAlways,
  getPromiseByUsingIf
];

const getDataMethods = [getDataAsync, getDataSync];
getPromiseMethods.forEach(func => {
  getDataMethods.forEach(
    getPromiseByResolveAlwaysFunc => {
      func(getPromiseByResolveAlwaysFunc).then(console.log);
    }
  );
});
