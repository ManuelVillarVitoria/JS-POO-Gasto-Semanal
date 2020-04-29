//Variables
const presupuestoUsuario = prompt('Cual es tu presupuesto semanal?');
let cantidadPresupuesto;

//console.log(presupuestoUsuario);

//Clases
//Clase de presupuesto
class Presupuesto{
    constructor(presupuesto){
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }
    //Método para ir restando del presupuesto actual
    presupuestoRestante(cantidad = 0){
        return this.restante -= Number(cantidad);
    }
}

//Clase Interfaz maneja todo lo relacionado con el HTML
class Interfaz{
    insertarPresupuesto(cantidad){
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        //Insertar al HTML
        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }
}


//EventListeners
document.addEventListener('DOMContentLoaded', function(){
    if(presupuestoUsuario === null || presupuestoUsuario === ''){
        window.location.reload(); // Sino se pone nada el prompt, se recargue constantemente
                                //hasta que el ususario introduzca el presupuesto.
    } else {
        //Instanciar el presupuesto
        //console.log('agregado correctamente');
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario)
       //console.log(cantidadPresupuesto);
       //Instanciar la clase de interfaz
       const ui = new Interfaz();
       ui.insertarPresupuesto(cantidadPresupuesto.presupuesto)
    }
});