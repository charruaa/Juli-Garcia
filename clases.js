class sistema {
    influencer = class {
        constructor(nombre, mail, comision) {
            this.nombre = nombre
            this.mail = mail
            this.comision = comision
        }
    }

    articulo = class {
        constructor(codigo, descripcion, precio) {
            this.codigo = codigo
            this.descripcion = descripcion
            this.precio = precio
        }
    }

    venta = class {
        constructor(numero, codigoArticulo, nombreInfluencer, cantidad, medio) {
            this.numero = numero
            this.codigoArticulo = codigoArticulo
            this.nombreInfluencer = nombreInfluencer
            this.cantidad = cantidad
            this.medio = medio
        }
    }

    constructor() {
        this.influencers = []
        this.articulos = []
        this.ventas = []
        this.contadorVenta = 1
    }
}

let miSistema = new sistema()
