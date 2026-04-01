# New Relic Test Application

Aplicação Node.js simples com Express, pronta para testes de instrumentação com New Relic.

## 🚀 Características

- ✅ Rotas básicas para testes de monitoramento
- ✅ Endpoint lento para testar response time tracking
- ✅ Endpoint de erro para testar error tracking
- ✅ PostgreSQL opcional para testes de database instrumentation
- ✅ Docker pronto para uso
- ✅ Estrutura preparada para adicionar New Relic sem refatoração

## 📋 Pré-requisitos

- Docker e Docker Compose instalados
- OU Node.js 18+ instalado (para execução local)

## 🔧 Instalação

### Executar com Docker (Recomendado)

1. Clone o repositório e navegue até a pasta:
```bash
cd /home/avelino/projeto-teste
```

2. Suba os containers:
```bash
docker-compose up -d
```

3. Verifique os logs:
```bash
docker-compose logs -f app
```

4. Pare os containers:
```bash
docker-compose down
```

### Executar Localmente

1. Instale as dependências:
```bash
npm install
```

2. Copie o arquivo de exemplo de variáveis de ambiente:
```bash
cp .env.example .env
```

3. Edite o `.env` se necessário (as configurações padrão já funcionam para testes locais)

4. Inicie a aplicação:
```bash
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## 🧪 Testando as Rotas

### Com curl

```bash
# Health check
curl http://localhost:3000/health

# Rota principal
curl http://localhost:3000/

# Rota lenta (simula delay de 2-5 segundos)
curl http://localhost:3000/slow

# Rota de erro (retorna status 500)
curl http://localhost:3000/error

# Teste de banco de dados
curl http://localhost:3000/db-test
```

### Exemplos de Resposta

**GET /health**
```json
{
  "status": "ok",
  "timestamp": "2026-03-31T10:30:00.000Z"
}
```

**GET /slow**
```json
{
  "message": "Response after delay",
  "delay_ms": 3247,
  "timestamp": "2026-03-31T10:30:05.247Z"
}
```

**GET /error**
```json
{
  "error": "Intentional error for testing",
  "timestamp": "2026-03-31T10:30:10.000Z"
}
```

**GET /db-test**
```json
{
  "message": "Database query successful",
  "data": {
    "current_time": "2026-03-31T10:30:15.123Z"
  },
  "timestamp": "2026-03-31T10:30:15.123Z"
}
```

## 📊 Estrutura do Projeto

```
.
├── src/
│   ├── config/
│   │   └── database.js          # Configuração do PostgreSQL
│   ├── routes/
│   │   └── index.js              # Definição das rotas
│   ├── app.js                    # Configuração do Express
│   └── server.js                 # Ponto de entrada da aplicação
├── .env.example                  # Exemplo de variáveis de ambiente
├── .gitignore
├── Dockerfile                    # Imagem Docker da aplicação
├── docker-compose.yml            # Orquestração dos serviços
├── package.json
└── README.md
```

## 🔮 Futura Instrumentação New Relic

A aplicação já está preparada para adicionar New Relic facilmente:

1. **Adicionar o pacote newrelic:**
   ```bash
   npm install newrelic
   ```

2. **Criar o arquivo newrelic.js** na raiz (pode copiar do exemplo na documentação)

3. **Descomentar as linhas marcadas com TODO** nos arquivos:
   - `src/app.js` - Import do newrelic
   - `src/server.js` - Inicialização
   - `src/config/database.js` - Database instrumentation

4. **Configurar variáveis de ambiente** no `.env` ou `docker-compose.yml`:
   - `NEW_RELIC_APP_NAME`
   - `NEW_RELIC_LICENSE_KEY`

New Relic automaticamente instrumentará:
- ✅ Todas as rotas HTTP
- ✅ Queries do PostgreSQL
- ✅ Erros e exceções
- ✅ Tempo de resposta
- ✅ Métricas de performance

## 🐛 Troubleshooting

### PostgreSQL não conecta
- Verifique se o container do PostgreSQL está rodando: `docker-compose ps`
- Aguarde alguns segundos para o PostgreSQL inicializar completamente
- Verifique os logs: `docker-compose logs postgres`

### Porta já em uso
- Altere a porta mapeada no `docker-compose.yml` (linha 8)
- OU pare o serviço usando a porta 3000

## 📝 Rotas Disponíveis

| Método | Rota | Descrição | Uso em New Relic |
|--------|------|-----------|------------------|
| GET | `/health` | Health check | Monitoramento de saúde |
| GET | `/` | Endpoint simples | Métricas básicas |
| GET | `/slow` | Delay de 2-5s | Response time tracking |
| GET | `/error` | Erro intencional (500) | Error tracking |
| GET | `/db-test` | Query no PostgreSQL | Database instrumentation |

## 📄 Licença

MIT
