const { contas, depositos, saques, transferencias } = require('../bancodedados')
let numeroconta = 1;
const bancos = (req, res) => {
    res.status(200).json(contas)
}

const criarConta = (req, res) => {
    const { nome, email, cpf, data_nascimento, telefone, senha } = req.body;
    if (!nome || !email || !cpf || !data_nascimento || !telefone || !senha) {
        res.status(404).json({ mensagem: 'Existem campos obrigatórios que não foram preenchidos!' })
    }

    const conta = {
        numero: numeroconta,
        saldo: 0,
        usuario: {
            nome,
            email,
            cpf,
            data_nascimento,
            senha
        }
    }
    contas.push(conta);
    numeroconta++
    return res.status(201).json(conta);
};

const atualizarConta = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, email, cpf, data_nascimento, telefone, senha } = req.body;

    if (!nome && !email && !cpf && !data_nascimento && !telefone && !senha) {
        return res.status(404).json({ mensagem: 'Campo não informado.' })
    }

    let encontrarConta = contas.find(conta => {
        return conta.numero === Number(numeroConta)
    })

    if (!encontrarConta) {
        return res.status(404).json({ mensagem: 'Conta inexistente.' })
    };

    const cpfRepetido = contas.find(conta => {
        return conta.usuario.cpf === cpf
    });

    if (cpfRepetido) {
        return res.status(400).json({ mensagem: 'O CPF já existe no cadastro.' })
    };

    const emailRepetido = contas.find(conta => {
        return conta.usuario.email === email
    });
    if (emailRepetido) {
        return res.status(400).json({ mensagem: 'O email já existe no cadastro.' })
    };
    encontrarConta.usuario = {
        nome: nome ?? encontrarConta.usuario.nome,
        email: email ?? encontrarConta.usuario.email,
        cpf: cpf ?? encontrarConta.usuario.cpf,
        data_nascimento: data_nascimento ?? encontrarConta.usuario.data_nascimento,
        telefone: telefone ?? encontrarConta.usuario.telefone,
        senha: senha ?? encontrarConta.usuario.senha
    }

    return res.status(200).json({ mensagem: 'Conta atualizada com sucesso.' })
};

const deletarConta = (req, res) => {
    const { numeroConta } = req.params;

    const encontrarConta = contas.find(conta => conta.numero == numeroConta);

    if (!encontrarConta) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado!' })
    }
    if (encontrarConta.saldo !== 0) {
        return res.status(403).json({ mensagem: 'Não é possível excluir conta com saldo remanescente.' })
    }
    const indexContaEncontrada = contas.findIndex(conta => conta.numero == numeroConta);

    if (indexContaEncontrada === -1) {
        return res.status(404).json({ mensagem: 'Usuário não cadastrado.' })
    }

    if (contas[indexContaEncontrada].saldo !== 0) {
        return res.status(403).json({ mensagem: 'A conta não pode ser excluída enquanto houver um saldo restante.' })
    }

    contas.splice(indexContaEncontrada, 1);

    return res.status(200).json({ mensagem: 'Conta excluída com sucesso' })

};
const formatarData = (data) => {
    const ano = data.getFullYear();
    const mes = data.getMonth();
    const dia = data.getDate();
    const hora = data.getHours();
    const minuto = data.getMinutes();
    const segundo = data.getSeconds();
    return ` ${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`
};

const depositarValor = (req, res) => {
    const { numero_conta, valor } = req.body;
    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: 'Existem campos obrigatórios que não foram preenchidos' })
    };
    const encontrarConta = contas.find(conta => conta.numero == numero_conta);
    if (!encontrarConta) {
        return res.status(404).json({ mensagem: 'Conta não registrada' })
    };
    if (valor <= 0) {
        return res.status(403).json({ mensagem: 'Valor de depósito inválido' })
    }
    encontrarConta.saldo += valor


    const registoDeposito = {
        data: formatarData(new Date()),
        conta: numero_conta,
        valor
    }
    depositos.push(registoDeposito);
    return res.status(201).json({ mensagem: 'Deposito realizado com sucesso' })
};
const acessarDeposito = (req, res) => {
    return res.status(200).json(depositos)
};

const sacarValor = (req, res) => {
    const { numero_conta, valor, senha } = req.body;
    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: 'Existem campos obrigatórios que não foram preenchidos' })
    };
    const encontrarConta = contas.find(conta => conta.numero == numero_conta);
    if (!encontrarConta) {
        return res.status(404).json({ mensagem: 'Conta não registrada' })
    };
    const senhaCorreta = contas.find(conta => conta.usuario.senha === senha);
    if (!senhaCorreta) {
        return res.status(401).json({ mensagem: 'Senha incorreta!' })
    }
    if (valor <= 0) {
        return res.status(403).json({ mensagem: 'Valor de depósito inválido' })
    }
    if (valor > encontrarConta.saldo) {
        return res.status(403).json({ mensagem: 'Valor de saque inválido' })
    }
    encontrarConta.saldo -= valor;



    const registoSaque = {
        data: formatarData(new Date()),
        conta: numero_conta,
        valor: `- ${valor}`
    }
    saques.push(registoSaque);
    return res.status(201).json({ mensagem: 'Saque realizado com sucesso' })
};
const acessarSaque = (req, res) => {
    return res.status(200).json(saques)
};

const transferirValor = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: 'Existem campos obrigatórios que não foram preenchidos.' })
    }
    let contaOrigemEncontrada = contas.find(conta => conta.numero == numero_conta_origem);

    if (!contaOrigemEncontrada) {
        return res.status(404).json({ mensagem: 'Conta inexistente' })
    }
    let contaDestinoEncontrada = contas.find(conta => conta.numero == numero_conta_destino);

    if (!contaDestinoEncontrada) {
        return res.status(404).json({ mensagem: 'Conta inexistente' })
    }
    const senhaCerta = contaOrigemEncontrada.usuario.senha === senha;
    if (!senhaCerta) {
        return res.status(403).json({ mensagem: 'Senha incorreta.' })
    }

    if (contaOrigemEncontrada.saldo < valor) {
        return res.status(403).json({ mensagem: 'Saldo insuficiente.' })
    }
    contaOrigemEncontrada.saldo -= valor;
    contaDestinoEncontrada.saldo += valor;

    const registroDeTransferencia = {
        data: formatarData(new Date()),
        numero_conta_origem,
        numero_conta_destino,
        valor
    }

    transferencias.push(registroDeTransferencia);

    return res.status(200).json({ mensagem: 'Transferência realizada com sucesso.' });
};

const acessarTransferencia = (req, res) => {
    return res.status(200).json(transferencias);
};
const consultaDeSaldo = (req, res) => {
    const { numero_conta } = req.query;

    const encontrarConta = contas.find(conta => conta.numero == numero_conta);
    const detalharSaldo = {
        saldo: encontrarConta.saldo
    };
    return res.status(200).json(detalharSaldo);

};

const consultarExtrato = (req, res) => {
    const { numero_conta } = req.query;
    const depositosDaconta = depositos.filter(deposito => deposito.conta === numero_conta);
    const saquesDaconta = saques.filter(saque => saque.conta === numero_conta);
    const transferenciasRealizadas = transferencias.filter(transferencia => transferencia.numero_conta_origem === numero_conta);
    const tranferenciasRecebidas = transferencias.filter(transferencia => transferencia.numero_conta_destino === numero_conta);

    const extrato = {
        depositosDaconta,
        saquesDaconta,
        transferenciasRealizadas,
        tranferenciasRecebidas,
    }

    return res.status(200).json(extrato);

};



module.exports = {
    bancos,
    criarConta,
    atualizarConta,
    deletarConta,
    depositarValor,
    acessarDeposito,
    sacarValor,
    acessarSaque,
    transferirValor,
    acessarTransferencia,
    consultaDeSaldo,
    consultarExtrato,

}