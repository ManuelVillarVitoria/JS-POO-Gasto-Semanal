//Variables
const presupuestoUsuario = prompt('Cual es tu presupuesto semanal?');
const formulario = document.getElementById('agregar-gasto');
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

    imprimirMensaje(mensaje,tipo) {
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        divMensaje.appendChild(document.createTextNode(mensaje));
        //Insertar en el DOM
        document.querySelector('.primario').insertBefore(divMensaje,formulario);
        //Quitar el alert después de 3 seg.
        setTimeout(() => {
            document.querySelector('.primario .alert').remove();
            formulario.reset();
        },3000);
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

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    //console.log('Enviado');

    //Leer del formulario de gastos
    const nombreGasto = document.querySelector('#gasto').value;
    const cantidadGasto = document.querySelector('#cantidad').value;

    //Instanciar la interfaz
    const ui = new Interfaz();

    //Comprobar que los campos no estén vacíos
    if(nombreGasto === '' || cantidadGasto === ''){
        //console.log('hubo un error');
        //2 parámetros mensaje y tipo
        ui.imprimirMensaje('Hubo un error','error')
    } else {
        console.log('el gasto se agrego')
    }
});