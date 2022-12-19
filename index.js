const statePending = "pending";
const stateFulfilled = "fulfilled";
const stateRejected = "rejected";
class myPromise {
  constructor(fun) {
    this.PromiseState = statePending;
    this.PromiseResult = null;
    try {
      fun(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      console.error(error);
    }
  }
  resolve(result) {
    if (this.PromiseState === statePending) {
      this.PromiseState = stateFulfilled;
      this.PromiseResult = result;
    }
    console.log("resolve");
  }
  reject(result) {
    if (this.PromiseState === statePending) {
      this.PromiseState = stateRejected;
      this.PromiseResult = result;
    }
    console.log("reject");
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function" ? onRejected : (value) => value;
    if (this.PromiseState === statePending) {
    }
    if (this.PromiseState === stateFulfilled) {
      queueMicrotask(() => {
        onFulfilled(this.PromiseResult);
      });
    }
    if (this.PromiseState === stateRejected) {
      queueMicrotask(() => {
        onRejected(this.PromiseResult);
      });
    }
  }
}

// 测试代码
const mp = new myPromise((resolve, reject) => {
  setTimeout( ()=> {
    resolve(2);
  }, 100 )
  // reject(1);
});
mp.then(
  (res) => console.log(res),
  (res) => console.log(res)
);

function resolvePromise(promise2, x, resolve, reject) {}

myPromise.deferred = function () {
  let result = {};
  result.promise = new myPromise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
};

module.exports = myPromise;
