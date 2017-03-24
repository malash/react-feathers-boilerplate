'use strict';
const authentication = require('./authentication');
const user = require('./user');
const Sequelize = require('sequelize');
module.exports = function() {
  const app = this;

  const sequelize = new Sequelize(app.get('mysql').conn, {
    dialect: 'mysql',
    logging: false,
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      freezeTableName: true,
      timestamps: true,
      schema: app.get('mysql').prefix
    }
  });
  app.set('sequelize', sequelize);

  app.configure(authentication);
  app.configure(user);
};
