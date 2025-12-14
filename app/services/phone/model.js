/**
 * @typedef {import('./types').DbPool} DbPool
 * @typedef {import('./types').PhoneForDb} PhoneForDb
 * @typedef {import('./types').PhoneFromDb} PhoneFromDb
 */

export class Model {
  #pool;

  constructor(/** @type {DbPool} */ dbPool) {
    this.#pool = dbPool;
  }

  /**
   * @method getPhones
   * @throws {Error} Данных нет
   * @returns {Promise<PhoneFromDb[]>}
   */

  async getPhones() {
    const sql = 'SELECT * FROM phones';
    const queryResult = await this.#pool.query(sql);
    const phones = queryResult.rows;
    if (!phones.length) throw new Error('Данных нет');
    return phones;
  }

  /**
   * @method getPhoneById
   * @param {string} id
   * @throws {Error} Неизвестный id
   * @returns {Promise<PhoneFromDb | null>}
   */

  async getPhoneById(id) {
    const sql = 'SELECT * FROM phones WHERE id = $1';
    const values = [id];
    const queryResult = await this.#pool.query(sql, values);
    const color = queryResult.rows[0] ?? null;
    if (!color) throw new Error('Неизвестный id');
    return color;
  }

  /**
   * @method createPhone
   * @param {PhoneForDb} phoneForDb
   * @returns {Promise<PhoneFromDb>}
   */

  async createPhone(phoneForDb) {
    const values = [
      phoneForDb.brandId,
      phoneForDb.name,
      phoneForDb.description,
      phoneForDb.price,
    ];
    const sql = /* sql */`
      INSERT INTO phones (
        "brandId",
        "name",
        "description",
        "price"
      )
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const queryResult = await this.#pool.query(sql, values);
    const phone = queryResult.rows[0] ?? null;
    return phone;
  }

  /**
   * @method updatePhone
   * @param {string} id
   * @param {PhoneForDb} phoneForDb
   * @returns {Promise<PhoneFromDb | null>}
   */

  async updatePhone(id, phoneForDb) {
    const sql = 'UPDATE phones SET "brandId" = $2, name = $3, description = $4, price = $5 WHERE id = $1 RETURNING *';
    const values = [
      id,
      phoneForDb.brandId,
      phoneForDb.name,
      phoneForDb.description,
      phoneForDb.price,
    ];
    const queryResult = await this.#pool.query(sql, values);
    const phone = queryResult.rows[0] ?? null;
    if (!phone) throw new Error('Ошибка при изменении');
    return phone;
  }

  /**
   * @method deletePhone
   * @param {string} id
   * @returns {Promise<PhoneFromDb | null>}
   */

  async deletePhone(id) {
    const sql = 'DELETE FROM phones WHERE id = $1 RETURNING *';
    const values = [id];
    const queryResult = await this.#pool.query(sql, values);
    const phone = queryResult.rows[0] ?? null;
    if (!phone) throw new Error('Неизвестный id');
    return phone;
  }
};
