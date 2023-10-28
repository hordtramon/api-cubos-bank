const express = require('express');

const { intermediarios, intermediarioDeConsulta } = require('./intermediarios/intermediarios');
const clientes = require('./controladores/clientes');
const rotas = express();

rotas.get('/contas', intermediarios, clientes.bancos);
rotas.post('/contas', intermediarios, clientes.criarConta);
rotas.put('/contas/:numeroConta/usuario', intermediarios, clientes.atualizarConta);
rotas.delete('/contas/:numeroConta', intermediarios, clientes.deletarConta);
rotas.post('/contas/transacoes/depositar', intermediarios, clientes.depositarValor);
rotas.get('/contas/registros/deposito', intermediarios, clientes.acessarDeposito);
rotas.post('/contas/transacoes/sacar', intermediarios, clientes.sacarValor);
rotas.get('/contas/registros/sacar', intermediarios, clientes.acessarSaque);
rotas.post('/contas/transacoes/transferir', intermediarios, clientes.transferirValor);
rotas.get('/contas/registros/transferencias', intermediarios, clientes.acessarTransferencia);
rotas.get('/contas/saldo', intermediarioDeConsulta, clientes.consultaDeSaldo);
rotas.get('/contas/extrato', intermediarioDeConsulta, clientes.consultarExtrato);
module.exports = rotas;