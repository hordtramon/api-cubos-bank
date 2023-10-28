# API Cubos Bank

<img src="../images/haze-programmer-writing-code-on-laptop-1.png" width="200px" align="right" >
  <p align="left">
Essa foi a primeira API que criei para o desafio do módulo 2 do curso de programação com foco em Back end da Cubos Academy. A tarefa foi criar uma RESTful API com uma série de funcionalidades existentes nos bancos convencionais. (Esse é um projeto piloto, ou seja, no futuro outras funcionalidades serão implementadas, portanto, dados do banco (nome, agência, etc.) serão imutáveis).
  </p>



## :man_mechanic: Linguagens e Ferramentas

![Skills](https://skillicons.dev/icons?i=nodejs,js,express)

## :ladder: Fucionalidades do Projeto

- Listagem de contas bancárias
- Criar conta bancária
- Atualizar os dados do usuário da conta bancária
- Excluir uma conta bancária
- Depositar em uma conta bancária
- Sacar de uma conta bancária
- Transferir valores entre contas bancárias
- Consultar saldo da conta bancária
- Emitir extrato bancário

## :triangular_flag_on_post: Contribua com o projeto

- Realize o Fork
- Faça as modificações necessárias
- Realize a Pull Request (PR)

## :computer: Rodando o Projeto

```shell
# 1. Clone o projeto

git clone git@github.com:hordtramon/api-cubos-bank.git

# 2. Instale as dependências

npm install express

npm instal -D nodemon

# 3. Execute o projeto

npm run dev

```
<table>
  <tr>
    <td>
      <img src="https://github.com/hordtramon/api-cubos-bank/assets/133041729/1cee82d3-149a-4752-9469-2a32f0128ee3" alt="" style="width: 100%; height: auto;">
      <div style="text-align: center;">Funcionalidades no Insomnia</div>
    </td>
    <td>
      <img src="https://github.com/hordtramon/api-cubos-bank/assets/133041729/b40fdae8-2e64-4aaf-9cdc-713738ad6dc3" alt="" style="width: 100%; height: auto;">
      <div style="text-align: center;">Organização das pastas</div>
    </td>
  </tr>
</table>



## :sassy_man: Endpoints
- GET /contas - Lista todos as contas
- POST /contas - Cria uma nova conta
- PUT /contas/:numeroConta/usuario - Atualiza os dados da conta
- DELETE /contas/:numeroConta - Deleta uma conta
- POST /contas/transacoes/depositar - Deposita um valor em uma conta
- GET /contas/registros/deposito - Detalha as informações do depósito
- POST /contas/transacoes/sacar - Saca um valor da conta
- GET /contas/registros/sacar - Detalha as informações do saque
- POST /contas/transacoes/transferir - Transfere um valor de uma conta para outra
- GET /contas/registros/transferencias - Detalha as informações sobre uma transferência
- GET /contas/saldo - Mostra o saldo em conta
- GET /contas/extrato - Mostra o extrato da conta
  

## :technologist: Contribuidores

<table>
  <tr>
    <td align="center"><a href="https://github.com/hordtramon"><img src=https://i.imgur.com/rQuBXHis.jpg width="50px;" alt=""/><br /><sub><b>Ramon</b></sub></a><br /></td>
  
   
    
  </tr>
</table>
