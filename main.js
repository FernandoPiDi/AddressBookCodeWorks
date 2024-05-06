const nombre = document.querySelector('.nombre')
const apellido = document.querySelector('.apellido')
const telefono = document.querySelector('.telefono')
const direccion = document.querySelector('.direccion')
const btnAgregarContacto = document.querySelector('.btn-agregar-contacto')
const listado = document.querySelector('.listado')
const dataBase = window.localStorage

const inputBusqueda = document.querySelector('#busqueda')
const boton = document.querySelector('#btnBuscar')
const resultado = document.querySelector('#resultado')

const filter = () => {
    const users = JSON.parse(dataBase.getItem('usuarios'));
    const options = {
      keys: ['id', 'nombre', 'apellido', 'telefono', 'direccion'],
      includeScore: true  
    };
    
    const fuse = new Fuse(users, options);
    
    let usuariosEncontrados = fuse.search(busqueda.value)
    resultado.innerHTML = ''

    for(let contacto of usuariosEncontrados){

        resultado.innerHTML += `
        <li>
            ${contacto.item.nombre} ${contacto.item.apellido} <span style="margin-left: 100px;"> Telefono:${contacto.item.telefono} 
            <span style="margin-left: 100px;"> Direccion:${contacto.item.direccion}
        </li>
        `
    }
}

boton.addEventListener('click', filter)

btnAgregarContacto.onclick = () => {
    let contacto = {
        id: Math.random(1,1000),
        nombre: nombre.value,
        apellido: apellido.value,
        telefono: telefono.value,
        direccion: direccion.value,
    }
 
    guardarContacto(dataBase, contacto)
}

const guardarContacto = (dataBase, contacto) => {
    /*dataBase.setItem(contacto.id, contacto)*/
    let entradas = JSON.parse(dataBase.getItem('usuarios')) || [];
    entradas.push(contacto)
    dataBase.setItem('usuarios', JSON.stringify(entradas))
    window.location.href = '/'

}

/*funcion para cargar los datos obtenidos a la base de datos (localStorage)*/
const subirContactos = (dataBase, parentNode) => {
    let ids = Object.keys(dataBase)
    for(id of ids){
        let contactos = JSON.parse(dataBase.getItem('usuarios'))
        for(contacto of contactos){
            crearContacto(parentNode, contacto, dataBase)
        }
    }
}

const crearContacto = (parentNode, contacto, dataBase) => {
    let boxContacto = document.createElement('div')
    let nombreContacto = document.createElement('p')
    let apellidoContacto = document.createElement('p')
    let telefonoContacto = document.createElement('p')
    let direccionContacto = document.createElement('p')
    let icon = document.createElement('span')
    nombreContacto.innerHTML = contacto.nombre
    apellidoContacto.innerHTML = contacto.apellido
    telefonoContacto.innerHTML = contacto.telefono
    direccionContacto.innerHTML = contacto.direccion
    icon.innerHTML = 'delete'

    boxContacto.classList.add('tarea')
    icon.classList.add('material-symbols-outlined', 'icono')
    boxContacto.appendChild(nombreContacto)
    boxContacto.appendChild(apellidoContacto)
    boxContacto.appendChild(telefonoContacto)
    boxContacto.appendChild(direccionContacto)
    boxContacto.appendChild(icon)

    parentNode.appendChild(boxContacto)

    icon.onclick = () => {
        let entradas = JSON.parse(dataBase.getItem('usuarios')) || [];
        let index = entradas.map((entrada) => entrada['id']).indexOf(contacto.id)
        console.log(`index: ${index}`)
        entradas.splice(index, 1)
        dataBase.setItem('usuarios', JSON.stringify(entradas))
        window.location.href = ('/')
    }
}

subirContactos(dataBase, listado)