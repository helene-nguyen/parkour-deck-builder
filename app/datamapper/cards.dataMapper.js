//!connect to DB
const client = require('../database');

const TABLE_NAME = "card";

//~datamapper
const cardsDataMapper = {

  async getAllCards() {
    const query = {
      text: 
      `SELECT * 
       FROM ${TABLE_NAME}`
    };

    const result = await client.query(query);

    return result.rows;
  },
  async getOneCard(targetId) {
    const query = {
      text: 
      `SELECT *
       FROM ${TABLE_NAME}
       WHERE "id" = $1`,
      values: [targetId]
    }

    const result = await client.query(query);
    
    return result.rows[0];
  }
  
};

module.exports = cardsDataMapper;