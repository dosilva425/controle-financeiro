# Controle Financeiro (API REST)

Este é um projeto piloto de criação da API REST de um sistema de controle financeiro. Ele foi concebido a partir de um trabalho em dupla para o desafio do módulo 3 do curso de desenvolvimento de software back-end da Cubos Academy (Ifood).

Integrantes da dupla: Débora de Oliveira Silva ([@dosilva425](https://github.com/dosilva425)) e Isabel Diana Pereira de Lima ([@isabeldiana](https://github.com/isabeldiana)).

# Funcionalidades

- Cadastro de usuário (com criptografia de senha)
- Login (com geração de token de autenticação)
- Detalhamento de perfil do usuário logado
- Edição de perfil do usuário logado
- Listagem de categorias financeiras
- Cadastro de transação
- Detalhamento de transação
- Listagem de transações financeiras (com filtragem por categoria financeira)
- Extrato de transações
- Edição de transação
- Exclusão de transação

# Tecnologias

- JavaScript
- NodeJS
- Banco de Dados Relacional
- PostgreSQL
- Pg
- Express
- Bcrypt
- Jsonwebtoken

# Requisitos

- node instalado na sua máquina
- npm instalado na sua máquina

## Preparação

```

git clone git@github.com:dosilva425/controle-financeiro.git

cd controle-financeiro

npm install

```

#### Execução

```

npm run dev

```

# Rotas

- [POST]/usuarios
- [POST]/login
- [GET]/usuario
- [PUT]/usuario
- [GET]/categoria
- [POST]/transacao
- [GET]/transacao/:id
- [GET]/transacao ou [GET]/transacao?filtro[]=categoria_id (filtragem de transações por categoria financeira)
- [GET]/transacao/extrato
- [PUT]/transacao/:id
- [DEL]/transacao/:id

# Exemplos de Requisição e Resposta

## Rota Cadastro de Usuário: `POST` `/usuarios`
- Esta rota será utilizada para cadastrar um novo usuário no sistema.
- Envio da requisição:
	- Body (corpo): é obrigatório informar nome, email (único) e senha.
- Retorno da requisição: id, nome e email do usuário cadastrado.

#### **Exemplo de requisição**

```javascript
// POST /usuario
{
    "nome": "José",
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 201
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400 
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```

## Rota Login: `POST` `/login`
- Esta rota será utilizada para o usuário cadastrado realizar o login no sistema.
- Envio da requisição:
	- Body (corpo): é obrigatório informar email e senha.
- Retorno da requisição: id, nome e email do usuário que fez o login, além do seu token de autenticação gerado.

#### **Exemplo de requisição**

```javascript
// POST /login
{
    "email": "jose@email.com",
    "senha": "123456"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    "usuario": {
        "id": 1,
        "nome": "José",
        "email": "jose@email.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```

```javascript
// HTTP Status 400
{
    "mensagem": "Email e/ou senha inválido(s)."
}
```

---

## **ATENÇÃO**: Todas as rotas a seguir exigem token de autenticação no header (cabeçalho) da requisição no formato Bearer Token.

---

## Rota Detalhamento de Perfil Usuário Logado: `POST` `/usuario`
- Esta rota será utilizada quando o usuário logado quiser obter os dados do seu próprio perfil.
- Envio da requisição:
	- Header (cabeçalho): é obrigatório enviar o token de autenticação (no formato Bearer Token).
- Retorno da requisição: id, nome e email do usuário cadastrado logado.

#### **Exemplo de requisição**

```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    "id": 1,
    "nome": "José",
    "email": "jose@email.com"
}
```

```javascript
// HTTP Status 400 
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

## Rota Edição de Perfil do Usuário Logado: `PUT` `/usuario`
- Esta rota será utilizada para editar o perfil de um usuário cadastrado no sistema.
- Envio da requisição:
	- Body (corpo): é obrigatório informar nome, email (único) e senha.
   	- Header (cabeçalho): é obrigatório enviar o token de autenticação (no formato Bearer Token).
- Retorno da requisição: Status 204 - sem conteúdo no body da requisição.

#### **Exemplo de requisição**

```javascript
// PUT /usuario
{
    "nome": "José de Abreu",
    "email": "jose_abreu@email.com",
    "senha": "j4321"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400
{
    "mensagem": "O e-mail informado já está sendo utilizado por outro usuário."
}
```

## Rota Listagem de Categorias Financeiras: `GET` `/categoria`
- Esta rota será utilizada quando o usuário logado quiser listar as categorias financeiras cadastradas no sistema.
- Envio da requisição:
	- Header (cabeçalho): é obrigatório enviar o token de autenticação (no formato Bearer Token).
- Retorno da requisição: categorias financeiras cadastradas.

#### **Exemplo de requisição**

```javascript
// GET /categoria
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
[
  {
    id: 1,
    descricao: "Roupas",
  },
  {
    id: 2,
    descricao: "Mercado",
  },
];
```

```javascript
// HTTP Status 400 
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

## Rota Cadastro de Transação: `POST` `/transacao`
- Esta rota será utilizada para cadastrar uma transação associada ao usuário logado.
- Envio da requisição:
	- Body (corpo): é obrigatório informar descricao, valor (em centavos), data, categoria_id e tipo (entrada ou saida (de valor));
	- Header (cabeçalho): é obrigatório enviar o token de autenticação (no formato Bearer Token).
- Retorno da requisição: id, tipo, descricao, valor (em centavos), data, usuario_id, categoria_id, categoria_nome.

#### **Exemplo de requisição**

```javascript
// POST /transacao
{
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24",
    "categoria_id": 6
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 201
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```

```javascript
// HTTP Status 400
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```

## Rota Detalhamento de Transação: `GET` `/transacao/:id`
- Esta rota será utilizada quando o usuário logado quiser obter uma das suas transações cadastradas.  
- Envio da requisição:
	- Header (cabeçalho): é obrigatório enviar o token de autenticação (no formato Bearer Token).
	- Parâmetro de Url: é obrigatório enviar o id da transação.
- Retorno da requisição: id, tipo, descricao, valor, data, usuario_id, categoria_id, categoria_nome.

#### **Exemplo de requisição**

#### **Exemplo de requisição**

```javascript
// GET /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
    "id": 3,
    "tipo": "entrada",
    "descricao": "Salário",
    "valor": 300000,
    "data": "2022-03-24",
    "usuario_id": 5,
    "categoria_id": 6,
    "categoria_nome": "Salários",
}
```
```javascript
// HTTP Status 404
{
    "mensagem": "Transação não encontrada."
}
```

## Rota Listagem de Transações: `GET` `/transacao` ou `GET` `/transacao?filtro[]=categoria_id` 
- Esta rota será utilizada quando o usuário logado quiser listar todas as suas transações cadastradas. 
- Envio da requisição:
	- Header (cabeçalho): é obrigatório enviar o token de autenticação (no formato Bearer Token).
   	- *Parâmetro de Consulta (opcional)*: Caso o usuário deseje filtrar as transações por categoria, basta informar o id da categoria como um filtro.
- Retorno da requisição: transações gerais ou filtradas por categoria, que foram cadastradas pelo usuário.

#### **Exemplo de requisição**

```javascript
// GET /transacao
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 
[
  {
    id: 1,
    tipo: "saida",
    descricao: "Sapato amarelo",
    valor: 15800,
    data: "2022-03-23",
    usuario_id: 5,
    categoria_id: 4,
    categoria_nome: "Roupas",
  },
  {
    id: 3,
    tipo: "entrada",
    descricao: "Salário",
    valor: 300000,
    data: "2022-03-24",
    usuario_id: 5,
    categoria_id: 6,
    categoria_nome: "Salários",
  },
];
```

```javascript
// HTTP Status 200 
[];
```

#### Com filtro

#### **Exemplo de requisição**

```javascript
// GET /transacao?filtro[]=roupas&filtro[]=salários
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 
[
  {
    id: 1,
    tipo: "saida",
    descricao: "Sapato amarelo",
    valor: 15800,
    data: "2022-03-23",
    usuario_id: 5,
    categoria_id: 4,
    categoria_nome: "Roupas",
  },
  {
    id: 3,
    tipo: "entrada",
    descricao: "Salário",
    valor: 300000,
    data: "2022-03-24",
    usuario_id: 5,
    categoria_id: 6,
    categoria_nome: "Salários",
  },
];
```

```javascript
// HTTP Status 200 
[];
```

## Rota Extrato de Transações: `GET` `/transacao/extrato`
- Esta rota será utilizada quando o usuario logado quiser obter o extrato de todas as suas transações cadastradas.
- Envio da requisição:
	- Header (cabeçalho): é obrigatório enviar o token de autenticação (no formato Bearer Token).
- Retorno da requisição: entrada e saida (tipos de transações).

#### **Exemplo de requisição**

```javascript
// GET /transacao/extrato
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200
{
	"entrada": 300000,
	"saida": 15800
}
```

## Rota Edição de Transação: `PUT` `/transacao/:id`
- Esta rota será utilizada quando o usuario logado quiser editar uma das suas transações cadastradas. 
- Envio da requisição:
	- Body (corpo): é obrigatório informar descricao, valor, data, categoria_id e tipo (entrada ou saida (de valor));
	- Header (cabeçalho): é obrigatório enviar o token de autenticação (no formato Bearer Token).
- Retorno da requisição: Status 204 - sem conteúdo no body da requisição.

#### **Exemplo de requisição**

```javascript
// PUT /transacao/2
{
	"descricao": "Sapato amarelo",
	"valor": 15800,
	"data": "2022-03-23",
	"categoria_id": 4,
	"tipo": "saida"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 400
{
    "mensagem": "Todos os campos obrigatórios devem ser informados."
}
```
## Rota Exclusão de Transação: `DELETE` `/transacao/:id`
- Esta rota será utilizada quando o usuario logado quiser excluir uma das suas transações cadastradas.  
- Envio da requisição:
	- Header (cabeçalho): é obrigatório enviar o token de autenticação (no formato Bearer Token).
	- Parâmetro de Url: é obrigatório enviar o id da transação.
- Retorno da requisição: Status 204 - sem conteúdo no body da requisição.


```javascript
// DELETE /transacao/2
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 204
// Sem conteúdo no corpo (body) da resposta
```

```javascript
// HTTP Status 404
{
    "mensagem": "Transação não encontrada."
}
```

----
