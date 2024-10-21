## Proyecto: Subida de Archivos con `express-fileupload`

Este proyecto implementa un servidor Express que permite subir archivos desde un formulario HTML y guarda los archivos en el servidor. Se utiliza el middleware `express-fileupload` para gestionar la subida de archivos.

### Características:
1. **Subida de múltiples archivos**: Se permite subir más de un archivo simultáneamente.
2. **Validación de tamaño de archivo**:
   - Lado cliente: Los archivos no deben superar los 2MB.
   - Lado servidor: El tamaño máximo permitido es de 2MB.
3. **Nombres de archivos únicos**: Los archivos subidos se guardan con un nombre basado en un timestamp para evitar colisiones de nombres.
4. **Carpeta de destino**: Los archivos se almacenan en la carpeta `uploads`.

### Tecnologías usadas:
- Node.js
- Express.js
- Middleware `express-fileupload`
- HTML + JavaScript para validaciones del lado del cliente

### Archivos clave:
1. **`server.js`**: El servidor Express principal que gestiona las solicitudes de subida de archivos.
2. **`public/index.html`**: Formulario HTML para subir archivos con validación básica en el lado del cliente.
3. **`uploads/`**: Carpeta donde se almacenan los archivos subidos.


### Validaciones:
- **Lado del Cliente**: Se verifica que cada archivo no exceda los 2MB antes de enviarlo al servidor.
- **Lado del Servidor**: El servidor rechaza archivos mayores a 2MB mediante el uso de la opción `limits` en `express-fileupload`.

### Nota:
Asegúrate de que la carpeta `uploads` exista en el directorio raíz para que los archivos puedan ser almacenados correctamente.