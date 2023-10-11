# clone-tabnews

Implementação do https://tabnews.com.br para o https://curso.dev

# Banco de dados Postgres
## Container
```
docker compose -f infra/compose.yaml up -d
docker compose -f infra/compose.yaml down
```
## Conexão
psql --host=localhost --username=postgres --port=5432
