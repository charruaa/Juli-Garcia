class influencer{
    constructor(nombre,mail,comision){
        this.nombre=nombre
        this.mail=mail
        this.comision=comision
    }
}
let influencers = []

class articulo{
    constructor (codigo,descripcion,precio){
        this.codigo=codigo
        this.descripcion=descripcion
        this.precio=precio
    }
}

let articulos = []

class venta {
    constructor(numero, codigoArticulo, nombreInfluencer, cantidad, medio){
        this.numero = numero
        this.codigoArticulo = codigoArticulo
        this.nombreInfluencer = nombreInfluencer
        this.cantidad = cantidad
        this.medio = medio
    }
}

let ventas = []
let contadorVenta = 1