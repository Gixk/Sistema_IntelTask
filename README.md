# IntelTask – Sistema de Monitoreo y Control de Tareas y Permisos

Sistema desarrollado como proyecto académico para la gestión de tareas y permisos de teletrabajo en organizaciones jerárquicas. Su propósito es mejorar la trazabilidad, comunicación y cumplimiento de políticas internas mediante una solución web accesible y segura.

## Tecnologías Utilizadas

- **Frontend:** Angular, Taiga UI, Bootstrap
- **Backend:** ASP.NET Core (C#)
- **Base de datos:** SQL Server
- **Comunicación:** API RESTful
- **Arquitectura:** Basada en capas con enfoque DDD

## Arquitectura

El sistema sigue una arquitectura basada en diseño orientado al dominio (Domain-Driven Design) con separación en tres capas principales:

- **Presentación:** Angular
- **Dominio:** Lógica de negocio centralizada
- **Infraestructura:** Acceso a datos y persistencia

Además, el sistema se diseñó bajo principios orientados a microservicios, permitiendo la escalabilidad modular de sus componentes.

## Módulo de Tareas

Este módulo permite a los usuarios jerárquicos asignar, monitorear y controlar tareas dentro de sus grupos de trabajo. Cada tarea posee atributos como complejidad, prioridad, estado, fechas clave, responsables y adjuntos relacionados.

Las tareas siguen un flujo de estados controlado: registrada, asignada, en proceso, en espera, en revisión, terminada, rechazada o incumplida. Todos los cambios relevantes son registrados automáticamente en bitácoras para asegurar la trazabilidad.

Las validaciones consideran jerarquías, coherencia de fechas, justificaciones requeridas en ciertos casos y generación de notificaciones automáticas para los involucrados. El sistema permite además justificar incumplimientos y rechazos, así como agregar comentarios y evidencias en el proceso.

## Roles y Jerarquía

El sistema establece un control jerárquico estricto que define quién puede asignar tareas a quién. Esta jerarquía se respeta en todas las acciones

## Seguridad y Restricciones

- Validación de usuario y rol en inicio de sesión.
- Control de accesos por jerarquía y módulo.
- Contraseñas encriptadas.
- Bitácoras no editables.
- Adjuntos protegidos por permisos.

## Requisitos No Funcionales

- Interfaz responsive compatible con escritorio y dispositivos móviles.
- Acceso restringido a días y horarios laborales definidos.
- Alta disponibilidad en entorno web interno o externo.
- Cumplimiento con principios de accesibilidad y usabilidad.


## Despliegue

El sistema está diseñado para ejecutarse en un entorno web. Puede ser desplegado en infraestructura propia o en la nube. Requiere:

- **Servidor Web:** Windows con IIS o Linux con Nginx/Apache
- **Base de Datos:** SQL Server 2019 o superior
- **Requisitos del Sistema:**
  - .NET Core SDK 6+
  - Node.js 18+
  - Angular CLI
  - Motor SQL configurado con autenticación

## Mantenimiento

El sistema incluye herramientas para mantenimiento interno, enfocadas en usuarios, roles, oficinas y días no hábiles. Solo el perfil administrador puede realizar configuraciones de seguridad y gestión jerárquica.

## Seguridad

- Contraseñas almacenadas de forma encriptada.
- Roles y accesos gestionados mediante control jerárquico.
- Acciones registradas automáticamente.
- No se permite autenticación externa.

## Usabilidad

- Interfaz responsive compatible con:
  - Escritorio (Chrome, Firefox, Edge actualizados)
  - Móviles Android 10+ y iOS 14+
- Navegación guiada por menús laterales y formularios validados.

## Reportes

El sistema permite generación de reportes de tareas y permisos desde el módulo principal, incluyendo exportación de bitácoras, estados y notificaciones. El acceso a estos reportes está limitado por rol.


## Estado del Proyecto

Versión prototipo funcional desarrollado en entorno académico. Sin integración externa.
De momento se mantiene funcional solamente el módulo de tareas, control de roles y jerarquias y autenticacion de usuario.

## Ejecución local del proyecto

Para ejecutar IntelTask de forma local, es necesario contar con el entorno para backend y frontend configurado de forma independiente.

### Requisitos

- .NET 8 SDK o superior
- Node.js 18 o superior
- Angular CLI
- SQL Server 2019+
- Visual Studio / VS Code
- Navegador moderno (Chrome, Firefox, Edge)

### Clonar el repositorio

```bash
git clone https://github.com/Gixk/Sistema_IntelTask.git
cd inteltask


**Nota:** Este sistema fue desarrollado como prototipo funcional. No incluye integración con sistemas externos ni autenticación federada.
