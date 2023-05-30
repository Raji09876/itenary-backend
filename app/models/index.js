const dbConfig = require("../config/database.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.booking = require("./booking.model.js")(sequelize, Sequelize);
db.category = require("./category.model.js")(sequelize, Sequelize);
db.itinerary = require("./itinerary.model.js")(sequelize, Sequelize);
db.itineraryImage = require("./itineraryImage.model.js")(sequelize, Sequelize);
db.itineraryPlan = require("./itineraryPlan.model.js")(sequelize, Sequelize);
db.place = require("./place.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(
  db.session,
  { as: "session" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);
db.session.belongsTo(
  db.user,
  { as: "user" },
  { foreignKey: { allowNull: false }, onDelete: "CASCADE" }
);

db.itinerary.belongsTo(db.category, { foreignKey: 'category_id' });
db.itinerary.hasMany(db.itineraryPlan, { foreignKey: 'itinerary_id' });
db.place.hasMany(db.itineraryPlan, { foreignKey: 'place_id' });
db.itinerary.hasMany(db.booking, { foreignKey: 'itinerary_id' });
db.user.hasMany(db.booking, { foreignKey: 'itinerary_id' });

db.itineraryImage.belongsTo(db.itineraryPlan, { foreignKey: 'plan_id' });

module.exports = db;
