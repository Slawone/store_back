import { schema } from './validation/schema.ts';

/**
 * @typedef {import('./types').DiContainer} DiContainer
 * @typedef {import('./types').RouteOpts} RouteOpts
 * @typedef {import('./types').PhoneForDb} PhoneForDb
 * @typedef {import('./types').PhoneFromDb} PhoneFromDb
 */

/**
 * @function initController
 * @description Инициализирует контроллер и возвращает массив роутов
 * @param {DiContainer} diContainer
 * @returns {RouteOpts[]}
 */

export const initController = (diContainer) => {
  const service = diContainer.service.phone;

  return [
    /**
     * @method Get
     * @description Получает все телефоны
     * @route /phones
     */

    {
      method: 'GET',
      url: '/phones',
      handler: async (_, reply) => {
        const phones = await service.getPhones();
        reply.send({ phones });
      },
    },

    /**
     * @method GET
     * @description Получает один телефон по id
     * @route /phones/:id
     */

    {
      method: 'GET',
      url: '/phones/:id',
      schema: {
        params: schema.id,
      },
      handler: async (req, reply) => {
        const /** @type {object} */ reqParams = req.params;
        const /** @type {string} */ id = reqParams.id;
        const phone = await service.getPhoneById(id);
        reply.send({ phone });
      },
    },

    /**
     * @method POST
     * @description Создает телефон в БД
     * @route /phones/create
     */

    {
      method: 'POST',
      url: '/phones/create',
      schema: {
        body: schema.phone,
      },
      handler: async (req, reply) => {
        const /** @type {object} */ reqBody = req.body;
        const /** @type {PhoneForDb} */ phoneForCreate = reqBody;
        const createdPhone = await service.createPhone(phoneForCreate);
        reply.send({ createdPhone });
      },
    },

    /**
     * @method PUT
     * @description Обновляет данные телефона
     * @route /phones/update/:id
     */

    {
      method: 'PUT',
      url: '/phones/update/:id',
      schema: {
        body: schema.phone,
        params: schema.id,
      },
      handler: async (req, reply) => {
        const /** @type {object} */ reqParams = req.params;
        const /** @type {string} */ phoneId = reqParams.id;
        const /** @type {object} */ reqBody = req.body;
        const /** @type {PhoneForDb} */ phoneForUpdate = reqBody;
        const updatedPhone = await service.updatePhone(phoneId, phoneForUpdate);
        reply.send({ updatedPhone });
      },
    },

    /**
     * @method DELETE
     * @description Удаляет один телефон по id
     * @route /phones/delete/:id
     */

    {
      method: 'DELETE',
      url: '/phones/delete/:id',
      schema: {
        params: schema.id,
      },
      handler: async (req, reply) => {
        const /** @type {object} */ reqParams = req.params;
        const /** @type {string} */ phoneId = reqParams.id;
        const deletedPhone = await service.deletePhone(phoneId);
        reply.send({ deletedPhone });
      },
    },
  ];
};
