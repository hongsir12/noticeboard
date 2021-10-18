// 防抖
export const Debounce = (fn, t) => {
    let delay = t || 500
    let timer
    return function() {
      let args = arguments
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)     
    }
  }
  