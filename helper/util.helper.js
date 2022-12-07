/**
 * UtilHelper
 */
export const UtilHelper = {
  /**
   * debouncing
   * @param {*} fn
   * @param {*} delay
   * @returns
   */
  debounce: function (fn, delay = 300) {
    let timer;
    return function () {
      let context = this,
        args = arguments;

      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  },
};
