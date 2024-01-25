'use strict';
const fs = require('fs').promises
const bcryptjs = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = JSON.parse(await fs.readFile('./data/users.json', 'utf-8')).map((el) => {
      const salt = bcryptjs.genSaltSync(8);
      const hash = bcryptjs.hashSync(el.password, salt)
      el.password = hash
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
     })
    //  console.log(data);
    await queryInterface.bulkInsert('Users', data, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {})
  }
};
