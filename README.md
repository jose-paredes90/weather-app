# Configurar y ejecutar el proyecto.

## 1. Clonar el repositorio

Si el proyecto está alojado en un repositorio, clónalo ejecutando el siguiente comando:

git clone https://github.com/jose-paredes90/weather-app.git

Una vez clonado, accede al directorio del proyecto:

cd weather-app

## 2. Instalar las dependencias

Instala las dependencias necesarias para la aplicación ejecutando:

npm install

Esto descargará todas las dependencias especificadas en el archivo package.json.


## 3. Levantar el servidor de desarrollo

Ejecuta el siguiente comando para iniciar el servidor de desarrollo:

**ng serve**

Por defecto, la aplicación estará disponible en:

http://localhost:4200/

## 4. Verificar la aplicación

Abre un navegador web y accede a la URL donde está corriendo tu aplicación (por defecto, http://localhost:4200/).

## 5. Ejecutar pruebas unitarias

La aplicación incluye pruebas unitarias, puedes ejecutarlas con:

**ng test**


# Integración con WeatherAPI

La integración con WeatherAPI se maneja en el servicio **WeatherService**. Utilizamos el módulo HttpClient de Angular para realizar solicitudes HTTP a la API de WeatherAPI y enviamos la **API_KEY** correspondiente.

Para la búsqueda de ciudades utilizo el servicio **search.json** y para mostrar la información del clima **current.json**.

Optimizaciones realizadas

1. Utilicé operadores de RxJS como **debounceTime** y **distinctUntilChanged** en el componente **WeatherSearchComponent** para optimizar las solicitudes de búsqueda y evitar llamadas innecesarias a la API.

2. Implementé servicios como FavoritesService y HistoryService para almacenar en caché los datos de favoritos e historial en **localStorage**, reduciendo la necesidad de realizar solicitudes repetidas a la API.

3. Se desarrolló un componente de tabla (DataTableComponent) que incluye **paginación**, **acciones personalizables** y es reutilizable para el historial y favoritos.

4. Se separaron las funcionalidades en módulos específicos **(WeatherModule, FavoritesModule, HistoryModule)** para mantener una estructura modular y escalable.


