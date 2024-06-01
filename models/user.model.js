const { Model, DataTypes, Sequelize } = require('sequelize');

const User_TABLE = 'users';

class User extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: User_TABLE,
            modelName: 'User',
            timestamps: true
        }
    }
} 

const UserSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        field:'firstName'
    },
    lastName:{ 
        allowNull:false,
        type: DataTypes.STRING,
        field: 'lastName'
    },
    email:{ 
        allowNull:false,
        type: DataTypes.STRING,
        field: 'email'
    },
    password:{ 
        allowNull:false,
        type: DataTypes.STRING,
        field: 'password'
    },
    phone:{
        allowNull: true,
        type: DataTypes.INTEGER,
        field: 'phone'
    } ,   
    Role:{ 
        allowNull:true,
        type: DataTypes.ENUM('User', 'Membre','Admin'),
        field: 'role'
    },
}
  
module.exports = { User, UserSchema };