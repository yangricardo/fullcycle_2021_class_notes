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
CMD [ "--host=0.0.0.0" ]