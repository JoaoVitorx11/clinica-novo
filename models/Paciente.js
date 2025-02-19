import banco from "../config/banco.js";

const Paciente = banco.sequelize.define("pacientes", {
    id: {
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
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
    cpf: {
        type: banco.Sequelize.STRING(14),
        allowNull: false,
        unique: true
    },
    DataNascimento: {
        type: banco.Sequelize.DATEONLY,
        allowNull: false
    }
});

Paciente.sync({ alter: true })
    .then(() => console.log("Tabela pacientes sincronizada"))
    .catch(error => console.log("Erro na sincronização:", error));

export default Paciente;