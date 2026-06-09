document.getElementById("boton-influencer").addEventListener("click",ingresoInfluencer)
document.getElementById("cancelar-influencer").addEventListener("click",cerrarInfluencer)
document.getElementById("agregar-influencer").addEventListener("click",agregarInfluencer)

document.getElementById("boton-articulo").addEventListener("click",ingresoArticulo)
document.getElementById("cancelar-articulo").addEventListener("click",cerrarArticulo)
document.getElementById("agregar-articulo").addEventListener("click",agregarArticulo)

document.getElementById("boton-venta").addEventListener("click",ingresoVenta)
document.getElementById("cancelar-venta").addEventListener("click",cerrarVenta)
document.getElementById("agregar-venta").addEventListener("click",agregarVenta)

function ingresoInfluencer(){
    document.getElementById("tablaInfluencer").showModal()
}
function cerrarInfluencer(){
    document.getElementById("tablaInfluencer").close()
}
function agregarInfluencer(){
    let nombre = document.getElementById("nombre-influencer").value.trim()
    let mail = document.getElementById("mail-influencer").value.trim()
    let comision = parseFloat(document.getElementById("comision-influencer").value)

    if(nombre === "" || mail === "" || isNaN(comision)){
        alert("Por favor completá todos los campos.")
        return
    }

    let nuevoInfluencer = new Influencer(nombre, mail, comision)
    influencers.push(nuevoInfluencer)
    renderizarInfluencers()

    document.getElementById("nombre-influencer").value = ""
    document.getElementById("mail-influencer").value = ""
    document.getElementById("comision-influencer").value = ""

    document.getElementById("tablaInfluencer").close()
}

function renderizarInfluencers(){
    let tbody = document.getElementById("influencers-body")
    tbody.innerHTML = ""
    for(let i = 0; i < influencers.length; i++){
        let inf = influencers[i]
        let fila = document.createElement("tr")
        fila.innerHTML = `
            <td>${inf.nombre}</td>
            <td>${inf.mail}</td>
            <td>${inf.comision}%</td>
            <td>$0</td>
            <td></td>
            <td></td>
        `
        tbody.appendChild(fila)
    }
}

function ingresoArticulo(){
    document.getElementById("tablaArticulo").showModal()
}
function cerrarArticulo(){
    document.getElementById("tablaArticulo").close()
}
function agregarArticulo(){

    document.getElementById("tablaArticulo").close()
}

function ingresoVenta(){
    document.getElementById("tablaVenta").showModal()
}
function cerrarVenta(){
    document.getElementById("tablaVenta").close()
}
function agregarVenta(){

    document.getElementById("tablaVenta").close()
}
