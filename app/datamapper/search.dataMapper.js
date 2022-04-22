//!connect to DB
const client = require('../database');

const TABLE_NAME = "card";

//~datamapper
const searchDataMapper = {
    async displayElementsOptions() {
        const query = {
            text: 
            `SELECT DISTINCT "element"
             FROM ${TABLE_NAME}`
        };
        const result = await client.query(query);

        return result.rows;
    },
    async getElementCards(targetElement) {
        const query = {
            text: 
            `SELECT * 
             FROM ${TABLE_NAME}
             WHERE "element" = $1`,
            values: [targetElement]
        };
        const result = await client.query(query);

        return result.rows
    },
    async getElementCardsISNULL() {
        const query = {
            text: 
            `SELECT * 
             FROM ${TABLE_NAME}
             WHERE "element" ISNULL`
        };
        const result = await client.query(query);

        return result.rows
    },
    async getCardByLevel(level) {
        const query = {
            text: 
            `SELECT *
             FROM ${TABLE_NAME}
             WHERE "level" = $1`,
            values: [level]
        }
        const result = await client.query(query);
        return result.rows;
    },
    async getCardByValues(direction, value) {
        const query = {
            text: 
            `SELECT *
             FROM ${TABLE_NAME}
             WHERE "value_${direction}" = $1`,
            values: [
                value
            ]
        }
        const result = await client.query(query);

        return result.rows;
    },
    async getElementByName(name) {
        const query = {
            text: 
            `SELECT *
             FROM ${TABLE_NAME}
             WHERE "name"
             ILIKE '%${name}%'`,
        }
        const result = await client.query(query);

        return result.rows;
    }
};


module.exports = searchDataMapper;