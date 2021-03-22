# Curso - FullCycle - Módulo Docker

## Trabalhando com Imagens

### Criando Primeira Imagem com Dockerfile

#### Criação de imagem docker baseada na imagem `nginx:latest` com instalação do editor de texto `VIM`

```dockerfile
FROM nginx:latest

RUN apt-get update
RUN apt-get install vim -y
```

#### Construção da Imagem Docker baseada no `Dockerfile` acima

```bash
docker build -t yangricardo/nginx-vim:latest .
```

#### Execução do terminal interativo bash no contêiner docker criado a partir da imagem definida no Dockerfile

```bash
docker run -it yangricardo/nginx-vim:latest bash
```
