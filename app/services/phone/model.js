/**
 * @typedef {import('./types').DbPool} DbPool
 * @typedef {import('./types').PhoneForDb} CreatePhoneData
 * @typedef {import('./types').PhoneFromDb} PhoneData
 */

export class Model {
  /**
   * @description Конструктор принимает пул соединений с БД
   * @param {DbPool} dbPool
   */

  constructor(dbPool) {
    this.pool = dbPool;
  }

  /**
   * @function getPhones
   * @description Функция получает все авто из таблицы phones
   * @returns {Promise<PhoneData[]>}
   */

  async getPhones() {
    const sql = 'SELECT * FROM phones';
    const queryResult = await this.pool.query(sql);
    const phones = queryResult.rows;
    if (!phones) throw new Error('Данных нет!');
    return phones;
  }

  /**
   * @function getPhoneById
   * @description Получает один телефон по его ID
   * @param {string} id
   * @throws {Error} Неизвестный id
   * @returns {Promise<PhoneData | undefined>}
   */

  async getPhoneById(id) {
    const sql = 'SELECT * FROM phones WHERE id = $1';
    const values = [id];
    const queryResult = await this.pool.query(sql, values);
    const color = queryResult.rows[0] ?? null;
    if (!color) throw new Error('Неизвестный id');
    return color;
  }

  /**
   * @function createPhone
   * @description Создает новый телефон в БД
   * @param {CreatePhoneData} phoneData
   * @returns {Promise<PhoneData>}
   */

  async createPhone(phoneData) {
    const sql = 'INSERT INTO phones ("brandId", name, description, price) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [phoneData.brandId, phoneData.name, phoneData.description, phoneData.price];
    const queryResult = await this.pool.query(sql, values);
    const phone = queryResult.rows[0] ?? null;
    if (!phone) throw new Error('Ошибка при создании');
    return phone;
  }

  /**
   * @function updatePhone
   * @description Обновляет существующий телефон
   * @param {string} id
   * @param {PhoneData} phoneData
   * @returns {Promise<PhoneData | undefined>}
   */

  async updatePhone(id, phoneData) {
    const sql = 'UPDATE phones SET "brandId" = $2, name = $3, description = $4, price = $5 WHERE id = $1 RETURNING *';
    const values = [id, phoneData.brandId, phoneData.name, phoneData.description, phoneData.price];
    const queryResult = await this.pool.query(sql, values);
    const phone = queryResult.rows[0] ?? null;
    if (!phone) throw new Error('Ошибка при изменении');
    return phone;
  }

  /**
   * @function deletePhone
   * @description Удаляет телефон из БД
   * @param {string} id
   * @returns {Promise<PhoneData | undefined>}
   */

  async deletePhone(id) {
    const sql = 'DELETE FROM phones WHERE id = $1 RETURNING *';
    const values = [id];
    const queryResult = await this.pool.query(sql, values);
    const phone = queryResult.rows[0] ?? null;
    if (!phone) throw new Error('Неизвестный id');
    return phone;
  }
};
