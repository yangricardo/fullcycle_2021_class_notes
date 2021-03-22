# Curso - FullCycle - Módulo Docker

## Trabalhando com Imagens

### Criando Primeira Imagem com Dockerfile

#### Criação de imagem docker baseada na imagem `nginx:latest` com instalação do editor de texto `VIM`

```dockerfile
FROM nginx:latest
# FROM é uma diretiva no Dockerfile para definir a imagem de origem
RUN apt-get update
# RUN é uma diretiva no Dockerfile para executar um comando de terminal habilitado a partir da imagem de origem ou de acordo com as dependências configuradas durante o Build 
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

### Avançando com Dockerfile

```dockerfile
FROM nginx:latest
# FROM é uma diretiva no Dockerfile para definir a imagem de origem
WORKDIR /app
# WORKDIR é uma diretiva no Dockerfile que cria e/ou define o diretório corrente da imagem
RUN apt-get update && \
    apt-get install -y vim
# RUN é uma diretiva no Dockerfile para executar um comando de terminal habilitado a partir da imagem de origem ou de acordo com as dependências configuradas durante o Build 
COPY html/ /usr/share/nginx/html
# COPY é uma diretiva que copia um arquivo ou diretório para o caminho de destino indicado
```

### ENTRYPOINT vs CMD

#### CMD

```dockerfile
FROM ubuntu:latest

CMD ["echo","Hello World"]
#CMD é uma diretiva que irá definir um comando executável default durante a execução do contêiner docker, e que permite ser substituido
```

> `➜  02_ubuntu_hello_dockerfile git:(main) ✗ docker build -t yangricardo/ubuntu_hello:latest .`
>
> `➜  02_ubuntu_hello_dockerfile git:(main) ✗ docker run --rm yangricardo/ubuntu_hello:latest`
>
> Hello

> - flag `--rm` remove o conteiner apos a execução

#### ENTRYPOINT

```dockerfile
FROM ubuntu:latest

ENTRYPOINT ["echo","Hello"]
#ENTRYPOINT  é uma diretiva que irá definir um comando executável FIXO

CMD ["echo","World"]
#CMD é uma diretiva que irá definir o parâmetro de acordo com o entrypoint, podendo ser o comando default completo ou apenas os parâmetros de um entrypoint definido
```

> ➜  02_ubuntu_hello_dockerfile git:(main) ✗ docker run --rm yangricardo/ubuntu_hello:latest echo Hello
>
> Hello echo Hello
> ➜  02_ubuntu_hello_dockerfile git:(main) ✗ docker run --rm yangricardo/ubuntu_hello:latest Yang
>
> Hello Yang

#### Comandos Docker

- `docker ps -a -q`: lista os IDs dos contêiners ativos e inativos
- `docker rm $(docker ps -aq)`: remove todos os contêiners listados
