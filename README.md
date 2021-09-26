# Todo Backend
Backend creado con Node, Express, Mongoose, entre otros.

## Como utilizar
1. Clonar proyecto
```bash
git clone https://github.com/gallucm/todo_backend.git
```
## Instalación
1. Abrir una consola de comandos (en la ruta root del proyecto) y ejecutar el siguiente comando:
```bash
npm install
```
## Configuración
1. Crear archivo .env en la raíz del proyecto y agregar las siguientes variables de entorno:Cancel changes
  - DB_URI = (url de la base de datos MONGO)
  - JWTPRIVATEKEY = (llave para tokens, la misma que el frontend)
  
2. Iniciar la aplicación con el siguiente comando (ambiente local):
```bash
npm run dev
```
## Extra
Este backend es necesario para utilizar en la aplicación TodoApp, la cual se obtiene de [Aqui](https://github.com/gallucm/todo_frontend.git)

