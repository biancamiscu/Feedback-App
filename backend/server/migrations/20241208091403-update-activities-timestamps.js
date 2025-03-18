'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },
  

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.changeColumn('Activities', 'createdAt', {
//       type: Sequelize.DATE,
//       allowNull: false,
//       defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
//     });

//     await queryInterface.changeColumn('Activities', 'updatedAt', {
//       type: Sequelize.DATE,
//       allowNull: false,
//       defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
//     });
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.changeColumn('Activities', 'createdAt', {
//       type: Sequelize.DATE,
//       allowNull: true,
//       defaultValue: null,
//     });

//     await queryInterface.changeColumn('Activities', 'updatedAt', {
//       type: Sequelize.DATE,
//       allowNull: true,
//       defaultValue: null,
//     });
//   },
// };

