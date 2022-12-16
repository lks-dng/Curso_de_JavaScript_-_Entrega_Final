// Clase de los productos:

class Producto {
    constructor(ID,Name,Price,Stock, Img){
        this.ID = ID
        this.Name = Name
        this.Price = Price
        this.Stock = Stock
        this.Img = Img
    }
}

const bienvenido = document.getElementById('bienvenido')
const formularioUsuario = document.getElementById('formulario')
const contacto = document.getElementById('contacto')
const nombreUsuario = document.getElementById('nombre')
const apellidoUsuario = document.getElementById('apellido')
const correoUsuario = document.getElementById('correo')
const submitButtom = document.getElementById('ingresar')
const textoTotal = document.getElementById('textoTotal')

//Obj para guardar los datos de usuario
const infoUsuario = {}

//Evento Submit
formularioUsuario.onsubmit = (e) =>{
    e.preventDefault()
    infoUsuario.nombre = nombreUsuario.value
    infoUsuario.apellido = apellidoUsuario.value
    infoUsuario.correo = correoUsuario.value
    console.log(infoUsuario)
    localStorage.setItem('infoUsuario',JSON.stringify(infoUsuario))
}

const infoUsuarioStorage = JSON.parse(localStorage.getItem('infoUsuario'))
console.log(infoUsuarioStorage)
if(infoUsuario.nombre !== "" || infoUsuario.apellido !== ""){
    bienvenido.innerText = `¡Hola ${infoUsuarioStorage.nombre} ${infoUsuarioStorage.apellido}, bienvenido de vuelta!`
}

// Lista de productos: 

const productsArray = []

const shampooEquilibrado = new Producto(1,'Shampoo Equilibrado',1420, 100, 'shampooEquilibrado')
productsArray.push(shampooEquilibrado)
const shampooFortalecedor = new Producto(2,'Shampoo Fortalecedor',1420, 100, 'shampooFortalecedor')
productsArray.push(shampooFortalecedor)
const shampooSeco = new Producto(3,'Shampoo Cabello Seco',1420, 100, 'shampooSeco')
productsArray.push(shampooSeco)
const shampooGraso = new Producto(4,'Shampoo Cabello Graso / Anticaspa',1420, 100, 'shampooGraso')
productsArray.push(shampooGraso)
const acondicionador = new Producto(5,'Acondicionador',1500, 100, 'acondicionador')
productsArray.push(acondicionador)


// const serumCapilar = new Producto(3,'Sérum Capilar',2100, 100)
// productsArray.push(serumCapilar)

// const jabonExfoliante = new Producto(4,'Jabón Exfoliante',800, 100)
// productsArray.push(jabonExfoliante)
// const jabonDeCoco = new Producto(5,'Jabón de Coco',500, 100)
// productsArray.push(jabonDeCoco)
// const jabonDeCalendula = new Producto(6,'Jabón de Calendula',700, 100)
// productsArray.push(jabonDeCalendula)
// const jabonDeJazmin = new Producto(7,'Jabón de Jazmin',500, 100)
// productsArray.push(jabonDeJazmin)
// const jabonDeMelon = new Producto(8,'Jabón de Melón',700, 100)
// productsArray.push(jabonDeMelon)

// const aceiteEsencialDeMenta = new Producto(9,'Aceite Esencial de Menta',1000, 100)
// productsArray.push(aceiteEsencialDeMenta)
// const aceiteEsencialDeMirra = new Producto(10,'Aceite Esencial de Mirra',1200, 100)
// productsArray.push(aceiteEsencialDeMirra)
// const aceiteEsencialDeRosaMosqueta = new Producto(11,'Aceite Esencial de Rosa Mosqueta',1400, 100)
// productsArray.push(aceiteEsencialDeRosaMosqueta)
// const aceiteEsencialDeLavanda = new Producto(12,'Aceite Esencial de Lavanda',1600, 100)
// productsArray.push(aceiteEsencialDeLavanda)

//console.log(productsArray)

const divProductos = document.querySelector('#divProductos')

productsArray.forEach(producto => {

    divProductos.innerHTML += `
    <div id="${producto.ID}" class="card cardProducto">
        <div class="card-body">
            <img src="/Images/Cuidado Capilar/${producto.Img}.jpg" alt="" height="150">
            <h5 class="card-title">${producto.Name}</h5>
            <p class="card-text">$${producto.Price}</p>
            <button id="${producto.ID}" class="btn btn-primary">AGREGAR</button>
        </div>
    </div>
    `
})

// Carrito de Compras
const carrito = []
const botonesAgregar = document.querySelectorAll('.btn-primary')

botonesAgregar.forEach(boton=> {
    boton.onclick = () => {
        const producto = productsArray.find(prod=>prod.ID===parseInt(boton.id))
        const productoCarrito = {
            id: producto.id,
            name: producto.Name,
            price: producto.Price,
            cantidad: 1
        }


        const indexCarrito = carrito.findIndex(prod=>prod.id === producto.id)
        if(indexCarrito === -1){
            carrito.push(productoCarrito)
        }else{
            carrito[indexCarrito].cantidad =  carrito[indexCarrito].cantidad + 1
        }
        console.log(carrito)
    }
})



// Finalizar la compra

const botonFinalizar = document.querySelector('#finalizar')
botonFinalizar.onclick = () => {
    const totalCompra = carrito.map(prod=>prod.price*prod.cantidad).reduce((elem1,elem2)=>elem1+elem2)
    if(totalCompra >= 6500){
        textoTotal.innerText = `Total de la compra:  ${totalCompra}. El envío es gratis!!`
    }else{
        textoTotal.innerText = `Total de la compra:  ${totalCompra}. El envío es tiene un costo de $370!!`
    }
}
