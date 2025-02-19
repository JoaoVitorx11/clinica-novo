import Paciente from "../models/Paciente.js";


class PacienteController { 
    cadastro = async (req, res) => {
        res.render('ADM/cadastroPaciente');
    };

    salvar = async (req, res) => {
        try {
            const paciente = {
                nome: req.body.nome,
                email: req.body.email,
                telefone: req.body.telefone,
                cpf: req.body.cpf,
                DataNascimento: req.body.data_nascimento
            };

            await Paciente.create(paciente);
            res.redirect('/ADM/listagemPacientes');
        } catch (error) {
            console.error("Erro ao salvar paciente:", error);
        }
    };

    listagem = async (req, res) => {
        try {
            const pacientes = await Paciente.findAll();
            res.render('ADM/listagemPacientes', { pacientes });
        } catch (error) {
            console.error("Erro ao listar pacientes:", error);
            res.render('error', { message: "Erro ao carregar lista!" });
        }
    };

    editarPaciente = async (req, res) => {
        try {
            const paciente = await Paciente.findByPk(req.params.id);
            if (!paciente) {
                return res.status(404).send("Paciente não encontrado!");
            }
            res.render('ADM/editarPaciente', { paciente });
        } catch (error) {
            console.error("Erro ao exibir o formulário de edição:", error);
            res.status(500).send("Erro interno ao carregar o formulário de edição.");
        }
    };
    
    // Atualizar dados do paciente
    atualizarPaciente = async (req, res) => {
        const { nome, dataNascimento, telefone, cpf } = req.body;
        try {
            await Paciente.update({ nome, dataNascimento, telefone, cpf }, { where: { id: req.params.id } });
            res.redirect('/ADM/listagemPacientes');
        } catch (error) {
            console.error("Erro ao atualizar paciente:", error);
            res.status(500).send("Erro ao atualizar os dados do paciente.");
        }
    };
    
    // Apagar paciente
    apagarPaciente = async (req, res) => {
        try {
            await Paciente.destroy({ where: { id: req.params.id } });
            res.redirect('/ADM/listagemPacientes');
        } catch (error) {
            console.error("Erro ao apagar paciente:", error);
            res.status(500).send("Erro ao apagar o paciente.");
        }
    };
}

export default new PacienteController()