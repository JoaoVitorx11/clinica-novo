import banco from "../config/banco.js";

const Medico = banco.sequelize.define("medicos", {
    id: {
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: banco.Sequelize.STRING(50),
        allowNull: false
    },

    especialidade: {
        type: banco.Sequelize.STRING(50),
        allowNull: false
    },
    email: {
        type: banco.Sequelize.STRING(50),
        allowNull: false
    },
    telefone: {
        type: banco.Sequelize.STRING(20),
        allowNull: false
    },
    crm: {
        type: banco.Sequelize.STRING(14),
        allowNull: false,
        unique: true
    },
    DataNascimento: {
        type: banco.Sequelize.DATEONLY,
        allowNull: false
    }
});

Medico.sync({ alter: true })
    .then(() => console.log("Tabela medicos sincronizada"))
    .catch(error => console.log("Erro na sincronização:", error));

export default Medico;
