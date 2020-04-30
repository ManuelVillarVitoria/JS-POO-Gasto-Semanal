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

    //Insertar  los gastos a la lista
    agregarGastoListado(nombre,cantidad){
        const gastosListado = document.querySelector('#gastos ul');

        //Crear un li
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        //Insertar el gasto
        li.innerHTML = `
            ${nombre}
            <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>
        `;
        //Insertar al HTML
        gastosListado.appendChild(li);
    }
    
    //Comprueba el presupuesto restante
    presupuestoRestante(cantidad){
        //console.log(cantidadPresupuesto);
        const restante = document.querySelector('span#restante');
        //leemos el presupuesto restante
        const presupuestoRestanteUsuario = 
        cantidadPresupuesto.presupuestoRestante(cantidad)
        //console.log(presupuestoRestanteUsuario);
        restante.innerHTML = `${presupuestoRestanteUsuario}`;

        this.comprobarPresupuesto();
    }
    //cambia de color el presupuesto restante
    comprobarPresupuesto(){
        //console.log(cantidadPresupuesto);
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        const presupuestoRestante = cantidadPresupuesto.restante;

        //comprobar el 25%
        if ((presupuestoTotal / 4) > presupuestoRestante) {
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-danger');
        //comprobar el 50%
        } else if ((presupuestoTotal / 2) > presupuestoRestante){
            const restante = document.querySelector('.restante');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');
        }
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
        //console.log('el gasto se agrego')
        //insertar en el HTML reutilizando el método del mensaje del error
        ui.imprimirMensaje('Correcto','correcto')
        ui.agregarGastoListado(nombreGasto,cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);
    }
});