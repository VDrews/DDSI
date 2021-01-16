# DDSI

Prácticas de la asignatura DDSI. Este repositorio albergará la página web requerida para la práctica final.


## Estructura

```
.
├── backend
│  └── sql
│     ├── contabilidad.js
│     ├── inventario.js
│     ├── logistica.js
│     ├── marketing.js
│     └── rrhh.js
├── frontend
│  └── src
│     ├── ...
│     └── views
│         ├── Contabilidad.vue
│         ├── Home.vue
│         ├── Inventario.vue
│         ├── Logistica.vue
│         ├── Marketing.vue
│         └── Rrhh.vue
├── README.md
└── SQL_files
   ├── definicion_tablas.sql
   ├── drops.sql
   ├── Inserciones.sql
   └── marketing.sql
```

- El archivo `index.js` contiene los disparadores del backend de cada subsistema. Se encuentran separadas por cabeceras bien distinguidas. También se configura la ruta '/' para que muestre el frontend.
   - El backend está implementando con Node y Express, usando la arquitectura de cliente-servidor REST.
- Los archivos de la carpeta `/frontend/src/views/` contienen la implementación de la parte del frontend correspondiente a cada parte.
- En SQL_files  se encuentran los archivos del backend previos a la implementación de la web. Se pueden encontrar diferentes inserciones de ejemplo para popular las tablas, definidas en `definicion_tablas.sql`
- Las consultas de SQL usadas en `index.js` se encuentran en `backend/sql/`.
