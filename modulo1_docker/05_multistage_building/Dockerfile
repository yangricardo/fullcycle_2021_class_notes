# stage 1
FROM php:7.4-cli    AS builder

WORKDIR /var/www
# atribui o diretório corrente

RUN apt-get update && \
    apt-get install -y libzip-dev && \
    docker-php-ext-install zip

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php && \
    php -r "unlink('composer-setup.php');" && \
    php composer.phar create-project --prefer-dist laravel/laravel laravel


FROM php:7.4-fpm-alpine

WORKDIR /var/www
RUN rm -rf /var/www/html
COPY --from=builder /var/www/laravel .
# copia o conteudo do stage builder

RUN chown -R www-data:www-data /var/www
# faz com que o usuário www-data seja o dono do diretorio

EXPOSE 9000
CMD [ "php-fpm" ]