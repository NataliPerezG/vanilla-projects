# App Tablero Kanban

## Canal: Tom is Loading

## Video:

[Aquí puedes ver el tutorial (Youtube)](https://www.youtube.com/watch?v=ecKw7FfikwI)

## Descripción:

Tablero kanban con un formulario para agregar tareas, tres columnas para ubicar las tareas y funcionalidad de
drag an drop

### Funcionalidad adicional interesante:

1. _función para ubicar la tarea en cualquier lugar de la columna, no solo al final_

> Esta es una imagen de referencia inicial:

![Screenshot de la aplicación](./src/assets/img/ref-inicial.png)

## Notas de Desarrollo:

- Nota uno

```javascript
if (tasks.length === 0) {
  containerTasks.append(initialMsg);
  return;
}
```

generaba un bug en la función `updateTasksStatus()`: cuando el array estaba vacío hacía
el return antes obtener esos datos y el status quedaba con valor de 1.
Por eso se eliminó ese `return`

- Se implementó la función `handlerClickTasks(e)` para manejar las funciones `completeTask()`y `deleteTask()`.
  De esa forma el evento quedó más limpio.

> Esta es una imagen de referencia final:

![Screenshot de la aplicación](./src/assets/img/ref-inicial.png)
