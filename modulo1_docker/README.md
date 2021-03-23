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

> `docker build -t yangricardo/nginx-vim:latest .`

#### Execução do terminal interativo bash no contêiner docker criado a partir da imagem definida no Dockerfile

> `docker run -it yangricardo/nginx-vim:latest bash`

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

> `docker build -t yangricardo/ubuntu_hello:latest .`
>
> `docker run --rm yangricardo/ubuntu_hello:latest`
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

> `docker run --rm yangricardo/ubuntu_hello:latest echo Hello`
>
> Hello echo Hello
>
> `docker run --rm yangricardo/ubuntu_hello:latest Yang`
>
> Hello Yang

#### Comandos Docker

> - `docker ps -a -q`: lista os IDs dos contêiners ativos e inativos
> - `docker rm $(docker ps -aq)`: remove todos os contêiners listados

### Docker Entrypoint Exec

> Todo contêiner docker possui um processo que o mantém ativo, no caso da [imagem](https://hub.docker.com/layers/nginx/library/nginx/latest/images/sha256-3a9f0b1c80284e8979a43a042512e45742114c113985b5877fcc3b7ff2b1b65b?context=explore) do `Nginx` define como `ENTRYPOINT` este [script](https://github.com/nginxinc/docker-nginx/blob/master/entrypoint/docker-entrypoint.sh), que possui no fim o comando terminal unix `exec "$@"`, que irá receber qualquer `CMD` disponível

### Publicando Imagem no Dockerhub

#### Definição de Imagem baseada no `Nginx` contendo os arquivos HTML

```Dockerfile
FROM nginx:latest

COPY html/ /usr/share/nginx/html

ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD [ "nginx", "-g", "daemon off;" ]
```

#### Construção da imagem

> `docker build -t yangricardo/nginx-fullcycle .`

```bash
    [+] Building 0.4s (7/7) FINISHED
 => [internal] load build definition from Dockerfile                                                                                                                                    0.1s
 => => transferring dockerfile: 173B                                                                                                                                                    0.0s
 => [internal] load .dockerignore                                                                                                                                                       0.1s
 => => transferring context: 2B                                                                                                                                                         0.0s
 => [internal] load metadata for docker.io/library/nginx:latest                                                                                                                         0.0s
 => [internal] load build context                                                                                                                                                       0.0s
 => => transferring context: 474B                                                                                                                                                       0.0s
 => CACHED [1/2] FROM docker.io/library/nginx:latest                                                                                                                                    0.0s
 => [2/2] COPY html/ /usr/share/nginx/html                                                                                                                                              0.1s
 => exporting to image                                                                                                                                                                  0.1s
 => => exporting layers                                                                                                                                                                 0.1s
 => => writing image sha256:483d43c7cca8473a4e702ba483ccd0cecb66c89c4c08fb817e24ea330d88241e                                                                                            0.0s
 => => naming to docker.io/yangricardo/nginx-fullcycle
```

#### Execução

> `docker run --rm -d -p 8080:8080 yangricardo/nginx-fullcycle`
>
> - `--rm`: remove o conteiner apos execução
> - `-d`: executa em modo detached, ou seja, background
> - `-p 8080:8080`: associa a porta 8080 do dispositivo host à porta 8080 do conteiner

#### Login

> `docker login`
>
> - Entrar com `username` e `password`

#### Enviar imagem para repositório de conteiner docker

> `docker push yangricardo/nginx-fullcycle`

```bash
Using default tag: latest
The push refers to repository [docker.io/yangricardo/nginx-fullcycle]
e641c0727a6e: Pushed 
6b93c0e56d01: Mounted from library/nginx 
2f2780a1a18d: Mounted from library/nginx 
7278048f2330: Mounted from library/nginx 
fc621d08b12b: Mounted from library/nginx 
2230366c7c6c: Mounted from library/nginx 
14a1ca976738: Mounted from library/nginx 
latest: digest: sha256:4ff3e8411d006d0ceca28aa983b72c43e6df39a5801788fef031d897590bfc7e size: 1777
```

> [Imagem docker](https://hub.docker.com/r/yangricardo/nginx-fullcycle)

## Networks

### Tipos de Network

#### Bridge

> Tipo de rede que viabiliza um contêiner conversar com outro

#### Host

> Tipo de rede que combina a rede do docker, ou seja, os contêiners em execução, com a rede do computador Host

#### Overlay

> Tipo de rede que viabiliza que contêiners executando remotamente possam ser integradas, como se estivessem local

#### macvlan

> Tipo de rede baseado no MAC Address, aplicação incomum.

#### None

> Conteiner roda em modo isolado

### Trabalhando com network

> - `docker network ls`: lista networks existentes no docker host
> - `docker network prune`: remove todas as networks inativas
> - `docker inspect ubuntu1`: inspeciona o conteiner

#### Trabalhando com Bridge

> - `docker network inspect bridge`: inspeciona a network bridge
> - `docker attach ubuntu1`: acessa terminal de container em execução
> - `docker network create --driver bridge ubuntu_network`:  cria uma docker network de tipo `bridge` chamada `ubuntu_network`
> - `docker run -d -it --name ubuntu1 --network ubuntu_network bash`: executa um contêiner já associado a uma network
> - `docker run -d -it --name ubuntu2 bash`: executa um conteiner não associado a uma network
> - `docker network connect ubuntu_network ubuntu2`: associa um conteiner a uma rede

#### Trabalhando com Host

> - `docker network create --driver host ubuntu__host+network`:  cria uma docker network de tipo `host` chamada `ubuntu_host_network`

> No `MacOS`, o tipo `Host` não funciona adequadamente, devido a forma como o `Docker Desktop` funciona neste sistema operacional.
> No `Windows` funciona normalmente, dado que o `WSL2` é um linux de fato.

#### Conteiner Acessando Serviço na Máquina

> Requisições para endereço `http://host.docker.internal:<PORTA_NA_MAQUINA_HOST>`

## Colocando em Prática

### PHP/Laravel

```dockerfile
FROM php:7.4-cli
# utiliza como base a imagem do php
WORKDIR /var/www
# atribui o diretório corrente
RUN apt-get update && \
    apt-get install -y libzip-dev && \
    docker-php-ext-install zip
# atualiza dependencias do sistema e instala dependencia do zip
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');" && \
    php composer.phar create-project --prefer-dist laravel/laravel laravel
# instala o composer e o laravel
ENTRYPOINT [ "php", "laravel/artisan", "serve" ]
# executa o servidor laravel
CMD [ "--host=0.0.0.0" ]
# no host 0.0.0.0
```

> - `build`: `docker build -t yangricardo/laravel ./laravel`
> - `run`: `docker run --rm --name laravel -p 8000:8000 yangricardo/laravel`
> - `push`: `docker push yangricardo/laravel` ==> [Imagem docker](https://hub.docker.com/r/yangricardo/laravel)

### NodeJS

> `docker run --rm -it -v $(pwd)/:/usr/src/app -p 3000:3000 node:15 bash`: executa o bash a partir de uma imagem do node, mapeando uma pasta do conteiner com a maquina host e a porta 3000 entre maquina e contêiner
>
> `docker build -t yangricardo/hello_express .`
> `docker run --rm -p 3000:3000 yangricardo/hello_express:latest`
> `docker push  yangricardo/hello_express:latest`
