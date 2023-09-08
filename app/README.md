# Treinamento Imediatum

Repositório com uma pequena aplicação de lista de tarefas escrita em Express com comunicação de mensagens cliente-servidor via WebSockets.

## Requisitos

- docker
- docker-compose

## Execução

Na raiz do repositório, onde se encontra o arquivo docker-compose.yml, execute:

```properties
docker-compose up -d mysqldb
```

```properties
docker-compose up app
```

O primeiro comando irá criar a imagem do banco, e deixará o container do banco rodando como tarefa de segundo plano, e o segundo irá criar a imagem da aplicação, que mostrará alguns testes simples no console e estará pronta para aceitar conexões em localhost://3000.

Para encerrar a aplicação, execute:

```properties
docker-compose down
```
