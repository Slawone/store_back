import { initController as initPhoneController } from './services/phone/controller.js';

/**
 * @typedef {import('./types').RouteOpts} RouteOpts
 * @typedef {import('./types').DiContainer} DiContainer
 */

/**
 * @function initController
 * @param {DiContainer} diContainer
 * @returns {RouteOpts[]}
 */

export const initController = (diContainer) => {
  const phoneRoutes = initPhoneController(diContainer);

  return [
    ...phoneRoutes,
  ];
};
