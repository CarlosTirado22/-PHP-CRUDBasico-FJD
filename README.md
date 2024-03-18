Buenos dias.
mi nombre es Carlos Mario Tirado Tovar, he realizado el crud como me pidieron en la prueba tecnica con algunos puntos extras los cuales consisten en. <br>
primero que todo realice un CRUD muy intuitivo el cual cuenta con un buscador que esta hecho con javascript y css3, como tambien se puede
descargar todos los datos de la tabla a excel que tambien lo realice con JS y en la parte de las funciones cree un archivo llamado funciones.php
en el cual se encuentran todas las funciones de mi CRUD.

1. obtenerDatos(): primera mente obtengo todos los datos ingresados a la base de datos para asi mostrarlos con un bucle  foreach
2. agregarDato($datos): en esta función le pongo por parametro la variable "datos" que es la que va a recoger todos los datos escritos en mi formulario,
   y para seguridad contra la inyeccion SQL prepare la consulta con mysqli_prepare y al vinculo los parametros mysqli_stmt_bind_param
3. obtenerPersona($id): igualmente hice esta funcion con el fin de buscar a las personas por su ID para asi poder actualizar los campos, igualmente
   le coleque seguridad contra la inyección SQL
4. actualizarPersona($id, $datos): ya en la función de actualizar que tiene por parametro el ID y los DATOS que el ID es el que me va a identificar a la persona
   con mi la ayuda de mi funcion obtenerPersona($id) igualmente le agrego la misma seguridad
5. eliminarDato($id): mi ultima función la cual identifica el dato por su ID y lo elimina de mi base de datos

en mi archivo de JS esta la busqueda de datos, la ordenacion de datos de la tabla, la conversioón de la tabla HTML a EXCEL, una alerta con la libreria 
SweetAlert2 que esta primero muestra un cuadro de confirmación para saber si se va a eliminar o no el dato, si el usuario confirma la eliminación
redirige a la URL de eliminación, y por ultimo en mi codigo JS estoy consumiento una API para agregar el pais, el departamento y la ciudad de dicha persona

![74479726-bf53-4da9-aef6-b96bbcedc554](https://github.com/CarlosTirado22/-PHP-CRUDB-sico-FJD/assets/102559140/2eaca586-8121-4c66-8b60-7646fb172222)

![06c7387b-fc45-407e-9b3a-a2dd419f8cde](https://github.com/CarlosTirado22/-PHP-CRUDB-sico-FJD/assets/102559140/778356d6-0a03-4705-a1ae-f4a0f784ba63)

![2117f459-62a2-4041-87ca-f201e5916302](https://github.com/CarlosTirado22/-PHP-CRUDB-sico-FJD/assets/102559140/6f4acaf0-c09f-42e0-9679-11a0dc1ac64c)


