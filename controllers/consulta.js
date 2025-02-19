import Consulta from "../models/Consulta.js";
import Medico from "../models/Medico.js";
import Paciente from "../models/paciente.js";

class ConsultaController {

    // Exibir o formulário para agendar uma nova consulta
    cadastroConsulta = async (req, res) => {
        try {
            // Buscar todos os médicos e pacientes para preencher os selects
            const medicos = await Medico.findAll();
            const pacientes = await Paciente.findAll();

            res.render('ADM/cadastroConsulta', { medicos, pacientes });
        } catch (error) {
            console.error("Erro ao exibir cadastro de consulta:", error);
            res.render('error', { message: "Erro ao exibir cadastro de consulta!" });
        }
    };

    // Salvar nova consulta
    salvarConsulta = async (req, res) => {
        try {
            const { medico_id, paciente_id, data, hora, status } = req.body;

            // Criar nova consulta associada ao médico e ao paciente
            await Consulta.create({
                medico_id,
                paciente_id,
                data,
                hora,
                status
            });

            res.redirect('/ADM/listagemConsultas');
        } catch (error) {
            console.error("Erro ao salvar consulta:", error);
            res.render('error', { message: "Erro ao cadastrar consulta!" });
        }
    };

    // Listar todas as consultas
    listagemConsultas = async (req, res) => {
        try {
            const consultas = await Consulta.findAll({
                include: [
                    {
                        model: Medico,
                        as: 'medico',
                        attributes: ['nome']
                    },
                    {
                        model: Paciente,
                        as: 'paciente',
                        attributes: ['nome']
                    }
                ]
            });

            res.render('ADM/listagemConsultas', { consultas });
        } catch (error) {
            console.error("Erro ao listar consultas:", error);
            res.render('error', { message: "Erro ao carregar lista de consultas!" });
        }
    };

    // Editar consulta - Exibir formulário de edição
    editarConsulta = async (req, res) => {
        try {
            const consulta = await Consulta.findByPk(req.params.id, {
                include: [
                    { model: Medico, as: 'medico' },
                    { model: Paciente, as: 'paciente' }
                ]
            });

            // Buscar médicos e pacientes para preencher os selects
            const medicos = await Medico.findAll();
            const pacientes = await Paciente.findAll();

            res.render('ADM/editarConsulta', { consulta, medicos, pacientes });
        } catch (error) {
            console.error("Erro ao editar consulta:", error);
            res.render('error', { message: "Erro ao exibir formulário de edição!" });
        }
    };

    // Atualizar consulta
    agendarConsulta = async (req, res) => {
        try {
            const { medico_id, paciente_id, data, hora, status } = req.body;
            await Consulta.update(
                { medico_id, paciente_id, data, hora, status },
                { where: { id: req.params.id } }
            );

            res.redirect('/ADM/listagemConsultas');
        } catch (error) {
            console.error("Erro ao atualizar consulta:", error);
            res.render('error', { message: "Erro ao atualizar consulta!" });
        }
    };

    // Apagar consulta
    apagarConsulta = async (req, res) => {
        try {
            await Consulta.destroy({ where: { id: req.params.id } });
            res.redirect('/ADM/listagemConsultas');
        } catch (error) {
            console.error("Erro ao apagar consulta:", error);
            res.render('error', { message: "Erro ao apagar consulta!" });
        }
    };

}

export default new ConsultaController();
