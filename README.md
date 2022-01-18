# Practica BackEnd

## Instalar los módulos antes de arrancar la API
```sh
npm install
```

## Inicializar la base de datos
```sh
npm run initDB
```
o también

```sh
nodemon initDB
```
## Arrancar la aplicación en modo de desarrollo
```sh
npm run dev
```

## Script para iniciar BD y arrancar API en modo desarrollo todo en uno
```sh
npm run i_run
```

## Hacer peticiones al API
* Es necesario hacer login con un POST a localhost:3000/api/login
* usuario por defecto: 
                        email: user@example.com
                        password: 1234
* Esto devuelve un token JWT que debe ser incluido en la cabecera de las peticiones a /api/anuncios
## Rutas del api devuelven json
* localhost:3000/api/anuncios  

* localhost:3000/api/tags

## Rutas del browser
* localhost:3000/anuncios

* localhost:3000/tags



## Lista de querys

Para **filtrar** en el navegador podemos usar:

* _?name=pho_   mostraría todos los anuncios que incluyen esa cadena, en nuestro caso mostraría el anuncio "iphone12"

* _?price=minPrice-maxPrice_  pudiendo dejar vacío tanto el máximo como el mínimo

* _?skip=number_ para saltar anuncios 

* _?limit=numer_ para limitar anuncios

* _?select=name_  muestra solo el nombre de los anuncios, también podríamos hacer ?select=name+price y mostraría solo el nombre y precio de cada anuncio.

* _?sort=name_  para ordenar por nombre, usaremos price, sale, etc según convenga

* _?sale=true_* para ordenar por artículos en venta o False para artículos en demanda

* _?tags=lifestyle,mobile,sports_, etc, podemos añadir tantos tags como queramos

un **ejemplo de búsqueda con filtrado** sería 
* _localhost:3000/api/anuncios/?select=name+price+photo&price=-300&sale=true&tags=lifestyle,sports_


## Implementado CRUD

__GET, POST, PUT, DELETE__
