module.exports =  (sequelize, Sequelize) => {
    const Place = sequelize.define("place", {
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rating:{
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0,
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reviews:{
        type: Sequelize.STRING,
        allowNull: true,
        default: 0,
      },
    },
    {
     timestamps: true, 
    });
    return Place;
  };
  