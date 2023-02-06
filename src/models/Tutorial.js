const TutorialModel = (sequelize, DataTypes) => {
  const Tutorial = sequelize.define(
    'Tutorial',
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      video_url: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      published_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deleted_at: {
        type: DataTypes.DATE,
      },
    },
    { timestamps: false }
  );

  return Tutorial;
};

module.exports = TutorialModel;
