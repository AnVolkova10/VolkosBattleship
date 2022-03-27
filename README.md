##### VolkosBattleship ##### 27/03

A continuación dejo un listados de los arreglos que se le hicieron al battleship original, en la rama ```mejorado```.


## Eliminado el hardcodeo del estado de los barcos de hit & miss

Ahora se utiliza dos funciones **generateShipsStates()** y **createShipState()** 
para generar el estado de los barcos para limpiar el código y permitir en un
futuro aumentar el tamaño o la cantidad de los mismos sin modificar código. 


## Se refactorizó y se creó nuevas variables y funciones para la legibilidad del código

Se creo la  función **generateRandomNumber()** y las variables *horizontal*,
*locationScope* y *alphabet* para que el código sea más entnedible a simple
vista sin necesidad de usar comentarios de más.
También se creo el método **getAlphabet()** para simplificar y mejorar el alfabeto hardcodeado y que aumente la cantidad de letras cuando aumente el tamaño del tablero.
Se agregó la función **setTimeout** para que refreshé la página cuando finaliza el juego.

## Selección de celda mediante el click

Se creo la  función **clickFire()** mediante el uso del *onClick='clickFire(this)'*
dentro de cada celda del HTML. Para mejorar la jugabilidad del juego, para hacerlo
más dinámico y accesible para mobile. La próxima refactorización será obtener todos las celdas con *querySelectorAll* y crear un eventListener de click.

## Eliminado el hardcodeo de la tabla

Se creo el método **generateBoard()** para eliminar código innecesario en HTML,
para la creación de una tabla que se le puede arreglar el tamaño desde el Objeto ```model```.
Se mantuvo los id de cada celda para que siga funcionando **generateShip()** y para que
la función **clickFire()**  obtenga un id para su funcionamiento.


###### PRÓXIMAS ACTUALIZACIONES/ARREGLOS ########

- Maquetado: banner donde quede grabados los scores e iniciales (3 letras) del que jugó.
- Arreglo de la función **processGuess()** que cuando se intruducen 2 números en el input que coinciden con el id lo deja pasar.
- Uso de LocalStorage para guardar último récord luego de haber refreshado.
- Agregar sonido.
- Agregar efectos.
- Jugabilidad: limitar el juego a un intento por día.
- Jugabilidad: ir variando modos de juego por día.
- Imagen: Sacar la imagen hardcodeada y recrear la misma con CSS para que se pueda cambiar fácilmente el tamaño del tablero para próximos modos// o nuevas imagenes por modo.


