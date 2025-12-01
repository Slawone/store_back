import { toPartial } from '../../utils/transforms/toPartial.js';
import { Model } from './model.js';

/**
 * @typedef {import('./types').PhoneForDb} CreatePhoneData
 * @typedef {import('./types').PhoneFromDb} PhoneData
 * @typedef {import('./types').Service} Service
 * @typedef {import('./types').Infra} PhoneProps
 * @typedef {import('./types').PhoneDeps} PhoneDeps
 */

/**
 * @function getAllPhones
 * @description Функция получает все телефоны из БД
 * @param {PhoneDeps} deps
 * @returns {Promise<PhoneData[]>}
 */

const getAllPhones = async (deps) => {
  const phones = await deps.model.getPhones();
  return phones;
};

/**
 * @function getPhoneById
 * @description Получает один телефон по ID
 * @param {PhoneDeps} deps
 * @param {string} id
 * @returns {Promise<PhoneData | undefined>}
 */

const getPhoneById = async (deps, id) => {
  const phone = await deps.model.getPhoneById(id);
  return phone;
}

/**
 * @function createPhone
 * @description Создает новый телефон в БД
 * @param {PhoneDeps} deps
 * @param {CreatePhoneData} phoneForCreate
 * @returns {Promise<PhoneData>}
 */

const createPhone = (deps, phoneForCreate) => {
  const phone = deps.model.createPhone(phoneForCreate);
  return phone;
}

/**
 * @function updatePhone
 * @description Обновляет существующий телефон
 * @param {PhoneDeps} deps
 * @param {string} id
 * @param {PhoneData} phoneData
 * @returns {Promise<PhoneData | undefined>}
 */

const updatePhone = async (deps, id, phoneData) => {
  const updatedPhone = await deps.model.updatePhone(id, phoneData);
  return updatedPhone;
};

/**
 * @function deletePhone
 * @description Удаляет телефон из БД
 * @param {PhoneDeps} deps
 * @param {string} id
 * @returns {Promise<PhoneData | undefined>}
 */

const deletePhone = async (deps, id) => {
  const deletedPhone = await deps.model.deletePhone(id);
  return deletedPhone;
};

/**
 * @function initDeps
 * @description Инициализирует зависимости для сервиса
 * @param {PhoneProps} props
 * @returns {PhoneDeps}
 */

export const initDeps = (props) => ({
  model: new Model(props.dbPool),
});

/**
 * @function initService
 * @description Инициализирует сервис - "зашивает" deps в функции
 * @param {PhoneDeps} deps
 * @returns {Service}
 */

export const initService = (deps) => ({
  getAllPhones: toPartial(getAllPhones, deps),
  getPhoneById: toPartial(getPhoneById, deps),
  createPhone: toPartial(createPhone, deps),
  updatePhone: toPartial(updatePhone, deps),
  deletePhone: toPartial(deletePhone, deps),
});
