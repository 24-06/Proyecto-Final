Descripción del Proyecto

Raíces de Córdoba es una API desarrollada para gestionar, consultar y administrar información relacionada con los recursos culturales, turísticos y tradicionales del departamento de Córdoba.
Su objetivo principal es ofrecer un servicio estructurado que permita exponer datos de manera eficiente, segura y estandarizada para aplicaciones web, móviles o sistemas internos.

Esta API centraliza información clave y facilita su consumo mediante endpoints documentados, siguiendo buenas prácticas de desarrollo y arquitectura.

Objetivo del API

Proveer un sistema backend funcional para la gestión de información.

Ofrecer endpoints claros y estructurados para consulta, registro, actualización y eliminación de datos.

Servir como base para proyectos educativos, institucionales o turísticos del departamento.

Implementar buenas prácticas de programación, control de versiones y pruebas unitarias.

Roles del Equipo
Integrante	Rol
Adriana	Desarrolladora
María Fernanda	Guía
María José	Desarrolladora
Karen	Diseñadora
Kendy	Diseñador
a
Instrucciones para Ejecutar la API Localmente

Clonar el repositorio

git clone <URL-del-repositorio>
cd raiz_cordoba_api


Instalar dependencias

pnpm install


Configurar variables de entorno
Crear un archivo .env en la raíz del proyecto:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_clave
DB_NAME=raices_cordoba
JWT_SECRET=clave_secreta_segura


Ejecutar la API

pnpm run dev


o

pnpm start


La API se ejecutará en:

http://localhost:3000

Variables de Entorno Requeridas

Estas variables deben definirse en un archivo .env:

Variable	Descripción
PORT	Puerto donde se ejecutará la API
DB_HOST	Host de la base de datos
DB_USER	Usuario de base de datos
DB_PASSWORD	Contraseña del usuario
DB_NAME	Nombre de la base de datos
JWT_SECRET	Clave para generación de tokens

Endpoints Principales
GET — Obtener elementos
GET /api/items

GET — Obtener item por ID
GET /api/items/:id

POST — Crear nuevo elemento
POST /api/items

PUT — Actualizar elemento
PUT /api/items/:id

DELETE — Eliminar elemento
DELETE /api/items/:id

Pruebas Unitarias y Evidencias

Pruebas Implementadas

Pruebas de respuesta correcta de endpoints.

Verificación de códigos de estado HTTP.

Validación de creación de registros.

Pruebas de autenticación con JWT.

Prueba de manejo de errores (404, 500).

Validación de estructura JSON retornada.

Pruebas de conexión a base de datos.

Resultado de la Ejecución

Todas las pruebas unitarias ejecutadas correctamente.

Cobertura mínima aceptada según el estándar del proyecto.

Validaciones exitosas de comportamiento esperado en flujos principales.

No se presentaron errores críticos durante la ejecución de los tests.

Conclusión

Este proyecto proporciona una base sólida para trabajar con datos culturales y turísticos del departamento de Córdoba.
La API está construida bajo buenas prácticas, cuenta con pruebas unitarias, y permite escalar funcionalidades según las necesidades futuras del proyecto.