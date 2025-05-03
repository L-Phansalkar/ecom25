const Sequelize = import('sequelize');
const db = import('../db');

const productOrder = db.define('productOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

module.exports = productOrder;