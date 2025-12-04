/**
 * @function toPartial
 * @description to the func
 * @param {Function} func
 * @param {any[]} args
 * @returns {(...args: any) => any} func
 */

export const toPartial = (func, ...args) => (
  func.bind(null, ...args)
);
