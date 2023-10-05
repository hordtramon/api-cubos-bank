const { banco, contas } = require('../bancodedados');

const intermediarios = (req, res, next) => {
    const { senha_banco } = req.query;
    if (!senha_banco) {
        return res.status(400).json({ mensagem: 'O campo senha é obrigatório' })
    }
    if (banco.senha !== senha_banco) {
        return res.status(401).json({ mensagem: 'Senha incorreta' })
    };

    next();
};

const intermediarioDeConsulta = (req, res, next) => {
    const { numero_conta, senha } = req.query;
    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'Existem campos obrigatórios a serem preenchidos' })
    }
    const encontrarConta = contas.find(conta => conta.numero == numero_conta)
    if (!encontrarConta) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado.' })
    }
    const senhaCorreta = encontrarConta.usuario.senha === senha;
    if (!senhaCorreta) {
        return res.status(401).json({ mensagem: 'O campo senha está incorreto.' })
    }
    next();
}


module.exports = {
    intermediarios,
    intermediarioDeConsulta,
}