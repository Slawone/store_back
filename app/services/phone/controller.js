import { schema } from './validation/schema.ts';

/**
 * @typedef {import('./types').DiContainer} DiContainer
 * @typedef {import('./types').RouteOpts} RouteOpts
 * @typedef {import('./types').PhoneForDb} CreatePhoneData
 * @typedef {import('./types').PhoneFromDb} PhoneData
 */

/**
 * @function initController
 * @description Инициализирует контроллер и возвращает массив роутов
 * @param {DiContainer} diContainer
 * @returns {RouteOpts[]}
 */

export const initController = (diContainer) => {
  const phoneService = diContainer.service.phone;

  return [
    /**
     * @method Get
     * @description Получает все телефоны
     * @route /phones
     */

    {
      method: 'GET',
      url: '/phones',
      handler: async (req, reply) => {
        const phones = await phoneService.getAllPhones();
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
        const phone = await phoneService.getPhoneById(id);
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
        const /** @type {CreatePhoneData} */ phoneData = reqBody;
        const newPhone = await phoneService.createPhone(phoneData);
        reply.send(newPhone);
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
        const /** @type {string} */ id = reqParams.id;
        const /** @type {object} */ reqBody = req.body;
        const /** @type {CreatePhoneData} */ phoneData = reqBody;
        const updatePhone = await phoneService.updatePhone(id, phoneData);
        reply.send(updatePhone);
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
        const /** @type {string} */ id = reqParams.id;
        const deletedPhone = await phoneService.deletePhone(id);
        reply.send({ deletedPhone });
      },
    },
  ];
};
