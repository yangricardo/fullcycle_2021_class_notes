FROM nginx:latest
# FROM é uma diretiva no Dockerfile para definir a imagem de origem
WORKDIR /app
# WORKDIR é uma diretiva no Dockerfile que cria e/ou define o diretório corrente da imagem
RUN apt-get update && \
    apt-get install -y vim
# RUN é uma diretiva no Dockerfile para executar um comando de terminal habilitado a partir da imagem de origem ou de acordo com as dependências configuradas durante o Build 
COPY html/ /usr/share/nginx/html
# COPY é uma diretiva que copia um arquivo ou diretório para o caminho de destino indicado