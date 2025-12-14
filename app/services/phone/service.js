import { toPartial } from '../../utils/transforms.js';
import { Model } from './model.js';

/**
 * @typedef {import('./types').PhoneForDb} PhoneForDb
 * @typedef {import('./types').PhoneFromDb} PhoneFromDb
 * @typedef {import('./types').Service} Service
 * @typedef {import('./types').Props} Props
 * @typedef {import('./types').Deps} Deps
 */

/**
 * @function getPhones
 * @param {Deps} deps
 * @returns {Promise<PhoneFromDb[]>}
 */

const getPhones = async (deps) => {
  const phones = await deps.model.getPhones();
  return phones;
};

/**
 * @function getPhoneById
 * @param {Deps} deps
 * @param {string} id
 * @returns {Promise<PhoneFromDb | null>}
 */

const getPhoneById = async (deps, id) => {
  return deps.model.getPhoneById(id);
};

/**
 * @function createPhone
 * @param {Deps} deps
 * @param {PhoneForDb} phoneForCreate
 * @returns {Promise<PhoneFromDb>}
 */

const createPhone = (deps, phoneForCreate) => {
  return deps.model.createPhone(phoneForCreate);
};

/**
 * @function updatePhone
 * @param {Deps} deps
 * @param {string} id
 * @param {PhoneFromDb} phoneFromDb
 * @returns {Promise<PhoneFromDb | null>}
 */

const updatePhone = async (deps, id, phoneFromDb) => {
  return deps.model.updatePhone(id, phoneFromDb);
};

/**
 * @function deletePhone
 * @param {Deps} deps
 * @param {string} id
 * @returns {Promise<PhoneFromDb | null>}
 */

const deletePhone = async (deps, id) => {
  return deps.model.deletePhone(id);
};

/**
 * @function initDeps
 * @param {Props} props
 * @returns {Deps}
 */

export const initDeps = (props) => ({
  model: new Model(props.dbPool),
});

/**
 * @function initService
 * @param {Deps} deps
 * @returns {Service}
 */

export const initService = (deps) => ({
  'getPhones': toPartial(getPhones, deps),
  'getPhoneById': toPartial(getPhoneById, deps),
  'createPhone': toPartial(createPhone, deps),
  'updatePhone': toPartial(updatePhone, deps),
  'deletePhone': toPartial(deletePhone, deps),
});
