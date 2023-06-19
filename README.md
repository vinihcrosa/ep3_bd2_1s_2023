Este é seu dashboard de campeonatos de xadrex!
## Execução

Para essa execução, você precisará abrir dois terminais, um para o servidor e um para o banco de dados.

Primeiramente, rode o servidor em um dos terminais usando:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Agora, no outro terminal, rode o banco de dados usado:
```bash
docker-compose up
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o sistema.

Obs: Caso você já esteja rodando algo na porta 3000, a porta do link acima pode ser alterada. Verifique o terminal do servidor para descobrir a porta sendo utilizada, caso haja algum problema.