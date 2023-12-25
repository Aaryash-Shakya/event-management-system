import Sequelize from 'sequelize';
import { DB_sequelize } from "../../config/sequelize"; 


const ExampleModel = DB_sequelize.define('example', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default ExampleModel;