import Medico from "../models/Medico.js";

class MedicoController { 
    cadastroMedico = async (req, res) => {
        res.render('ADM/cadastroMedico');
    };

    salvarMedico = async (req, res) => {
        try {
            const medico = {
                nome: req.body.nome,
                email: req.body.email,
                telefone: req.body.telefone,
                especialidade: req.body.especialidade, 
                crm: req.body.crm,
                DataNascimento: req.body.data_nascimento
            };

            await Medico.create(medico);
            res.redirect('/ADM/listagemMedicos');
        } catch (error) {
            console.error("Erro ao salvar médico:", error);
            res.render('error', { message: "Erro ao cadastrar médico!" });
        }
    };

    listagemMedico = async (req, res) => {
        try {
            const medicos = await Medico.findAll();
            res.render('ADM/listagemMedicos', { medicos });
        } catch (error) {
            console.error("Erro ao listar médicos:", error);
            res.render('error', { message: "Erro ao carregar lista!" });
        }
    };
    
    // Editar Médico - Exibir Formulário
editarMedico = async (req, res) => {
    const medico = await Medico.findByPk(req.params.id);
    res.render('ADM/editarMedico', { medico });

};

// Editar Médico - Atualizar Dados
atualizarMedico = async (req, res) => {
    const { nome, especialidade, crm, telefone } = req.body;
    await Medico.update({ nome, especialidade, crm, telefone }, { where: { id: req.params.id } });
    res.redirect('/ADM/listagemMedicos');

};

// Apagar Médico
apagarMedico = async (req, res) => {
    await Medico.destroy({ where: { id: req.params.id } });
    res.redirect('/ADM/listagemMedicos');
};

}

export default new MedicoController()