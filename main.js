let discosTable = document.getElementById('tableDiscos');
let btnSearch = document.getElementById('btn-search');
let closebtn = document.getElementById('closebtn');
btnSearch.addEventListener("click", searchDisc)
closebtn.addEventListener("click",closeSearch)
class Disco{
    constructor(ID,Name,Price,Year){
        this.ID = ID;
        this.Name=Name;
        this.Price = Price;
        this.Year = Year
    }
}
class DiscoResults{
    constructor(ID,Name,Price,Year){
        this.ID = ID;
        this.Name=Name;
        this.Price = Price;
        this.Year = Year
    }
}

listaDiscos = []
listResults = []
const buttonRegistro = document.getElementById("registroDisco");
buttonRegistro.addEventListener("click",getDatosDisco)
function getDatosDisco(){

    let nombreDisco = document.getElementById("inputName").value
    let precioDisco = document.getElementById("inputPrice").value
    let yearDisco = document.getElementById("inputYear").value
    const disco =new Disco(listaDiscos.length,nombreDisco,precioDisco,yearDisco)
    listaDiscos.push(disco)
    swal({
        title: "Success",
        text: "Registrado",
        timer: 2000,
        icon: "success",
    });
    renderTable();
    clearInputs();
}
function clearInputs(){
document.getElementById("inputName").value = ""
document.getElementById("inputPrice").value = ""
document.getElementById("inputYear").value= ""
}
function print(){}

function confirmDelete(IDdisco){
	var msg = "Seguro de eliminar?";
	swal(msg, {
        icon: "warning",
        buttons: {
            NO: {
                text: "NO",
                value: "no",
            },
            SI: {
                text: "SI",
                value: "SI",
            },
        },
    }).then(function(value) {
        switch (value) {
            case "SI":
                deleteItem(IDdisco)
               break

            case "no":
                break;
        }
    });

}
function deleteItem(ID){
    for(let i = 0; i< listaDiscos.length; i++) {
        if (listaDiscos[i].ID == ID){
            listaDiscos.splice(i, 1);
            swal({
                title: "Success",
                text: "Eliminado",
                timer: 3000,
                icon: "success",
            });
            renderTable()
        }else{
            swal({
                title: "Error",
                text: "Hubo un error",
                icon: "error",
            });
        }
    }

}

function renderTable(){
    var DiscsTableData = document.getElementById("tableDiscos")
    var bodyTable= document.getElementById("discosList")
    bodyTable.innerHTML = "";
    for (let i =0;i<listaDiscos.length;i++){

        var tbody = document.getElementById("discosList")
        var row = document.createElement("tr")
        var idColumn = document.createElement("td")
        var nameColumn = document.createElement("td")
        var priceColumn = document.createElement("td")
        var yearColumn = document.createElement("td")
        var btnColumn = document.createElement("td")

        var Id = document.createTextNode(listaDiscos[i].ID)
        var Nombre = document.createTextNode(listaDiscos[i].Name)
        var Precio = document.createTextNode(`$${listaDiscos[i].Price}`)
        var Anyo = document.createTextNode(listaDiscos[i].Year)
        var btn = document.createElement("div")
        btn.innerHTML = `<button type="button" class="btn btn-sm btn-light" onclick="confirmDelete('${listaDiscos[i].ID}')"><i class="fa fa-trash-o fa-2x text-danger" aria-hidden="true"></i></button>`

        idColumn.appendChild(Id)
        nameColumn.appendChild(Nombre)
        priceColumn.appendChild(Precio)
        yearColumn.appendChild(Anyo)
        btnColumn.appendChild(btn)

        row.appendChild(idColumn)
        row.appendChild(nameColumn)
        row.appendChild(priceColumn)
        row.appendChild(yearColumn)
        row.appendChild(btnColumn)
        tbody.appendChild(row)
        DiscsTableData.appendChild(tbody)
    }
}
function searchDisc(){

    let query = document.getElementById("search").value
    if(query ==""){
        swal({
            title: "Error",
            text: "Escribe el nombre a buscar",
            timer: 2000,
            icon: "error",
        });
        return false
    }
    for(let i = 0; i< listaDiscos.length; i++) {
        if (listaDiscos[i].Name == query){
            let searchresult= new DiscoResults(listaDiscos[i].ID,listaDiscos[i].Name,listaDiscos[i].Price,listaDiscos[i].Year)
            listResults.push(searchresult)
        }
    }
    renderResults()
}

function renderResults(){
    var tableResults = document.getElementById("searchResults")
    var bodyTable= document.getElementById("dataResults")
    bodyTable.innerHTML = "";
    let lnt = listResults.length
    if(lnt==0){
        swal({
            title: "Lo sentimos",
            text: "Sin resultados",
            icon: "warning",
        });
    }else{
        let card = document.getElementById('searchResults');
        card.style.display="block"
        for (let i =0;i<listResults.length;i++){
            var tbodyResults = document.getElementById("dataResults")
            var row = document.createElement("tr")
            var idColumn = document.createElement("td")
            var nameColumn = document.createElement("td")
            var priceColumn = document.createElement("td")
            var yearColumn = document.createElement("td")
            var Id = document.createTextNode(listResults[i].ID)
            var Nombre = document.createTextNode(listResults[i].Name)
            var Precio = document.createTextNode(`$${listResults[i].Price}`)
            var Anyo = document.createTextNode(listResults[i].Year)
            idColumn.appendChild(Id)
            nameColumn.appendChild(Nombre)
            priceColumn.appendChild(Precio)
            yearColumn.appendChild(Anyo)
            row.appendChild(idColumn)
            row.appendChild(nameColumn)
            row.appendChild(priceColumn)
            row.appendChild(yearColumn)
            tbodyResults.appendChild(row)
        }
        listResults.length = 0
    }

}
function closeSearch(){
    let card = document.getElementById('searchResults');
        card.style.display="none"
}