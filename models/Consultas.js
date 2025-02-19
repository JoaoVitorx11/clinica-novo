import banco from "../config/banco.js";
import Medico from './Medico.js';  // Importando o modelo de Médico
import Paciente from './paciente.js';  // Importando o modelo de Paciente

const Consulta = banco.sequelize.define("consultas", {
    id: {
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    medico_id: {
        type: banco.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'medicos', // Referência à tabela de médicos
            key: 'id'
        }
    },
    paciente_id: {
        type: banco.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'pacientes', // Referência à tabela de pacientes
            key: 'id'
        }
    },
    data: {
        type: banco.Sequelize.DATEONLY,
        allowNull: false
    },
    hora: {
        type: banco.Sequelize.TIME,
        allowNull: false
    },
    status: {
        type: banco.Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'Agendada' // Status padrão
    }
});

// Relacionamento entre Consulta e Médico
Consulta.belongsTo(Medico, {
    foreignKey: 'medico_id',
    as: 'medico'
});

// Relacionamento entre Consulta e Paciente
Consulta.belongsTo(Paciente, {
    foreignKey: 'paciente_id',
    as: 'paciente'
});

// Sincronizando a tabela consultas
Consulta.sync({ alter: true })
    .then(() => console.log("Tabela consultas sincronizada"))
    .catch(error => console.log("Erro na sincronização:", error));

export default Consulta;
