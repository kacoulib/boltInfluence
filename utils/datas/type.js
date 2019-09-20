const isFn = (check) => check && {}.toString.call(check) === '[object Function]';

export { isFn } 