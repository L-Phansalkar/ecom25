const Sequelize = import('sequelize');
const db = import('../db');

const Order = db.define('order', {
  checkout: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

module.exports = Order;
