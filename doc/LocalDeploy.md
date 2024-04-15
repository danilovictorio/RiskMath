Al clonar el proyecto, para inicializar el entorno de pruebas, se debe iniciar un terminal en la carpeta raíz del proyecto y ejecutar:

    cd ./laravel/
    composer install
    cp .env.exemple .env
    php artisan key:generate
    php artisan migrate
    php artisan db:seed

(Si quedan seeders sin procesar)
    
    php artisan db:seed --class=NameOfSeeder

(Por último)

    php artisan serve

Abrir un segundo terminal y ejecutar:

    cd ../node/
    npm install
    node index.js

Abrir un tercer terminal y ejecutar:

    cd ../vue_project/
    npm install
    npm run dev
    
Ahora en el enlace mostrado en la orden run dev podrás probar en local la totalidad del proyecto.

