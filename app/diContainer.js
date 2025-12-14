/*****************************************
  Infra
*****************************************/

import { initDb } from './infra/db/db.js';

const dbPool = initDb();
const infra = { dbPool };

/*****************************************
  Phone
*****************************************/

import { initDeps as initPhoneDeps } from './services/phone/service.js';
import { initService as initPhoneService } from './services/phone/service.js';

const phoneProps = { dbPool };
const phoneDeps = initPhoneDeps(phoneProps);
const phoneService = initPhoneService(phoneDeps);

/********************************************
  Service
********************************************/

const service = {
  phone: phoneService,
};

/********************************************
  DiContainer
********************************************/

/**
 * @typedef {import('./types').DiContainer} DiContainer
 * @type {DiContainer}
 */

export const diContainer = {
  infra,
  service,
};
