const discosTable = document.getElementById('tableDiscos');
const inputSearch = document.getElementById('search');
const rows = document.getElementsByTagName('tr');
const buttonRegistro = document.getElementById("registroDisco");
buttonRegistro.addEventListener("click", registroDisco)
inputSearch.addEventListener('keyup', (e) => {
    let query = e.target.value
    let search = new RegExp(query, "i")
    for (let i = 0; i < rows.length; i++) {
        let valor = rows
        if (search.test(valor.innerText)) {
            valor.classList.remove('ocultar')
        } else {
            valor.classList.add('ocultar')
        }
    }
})
listaDiscos = []
class Disco {
    constructor(ID, Name, Price, Year) {
        this.ID = ID;
        this.Name = Name;
        this.Price = Price;
        this.Year = Year
    }
}
listaDiscos.push(new Disco('1652909617207', "The Hidden Land", "300", "2019"))
listaDiscos.push(new Disco('1666709617208', "Little Worlds", "250", "2018"))
listaDiscos.push(new Disco('1652959617209', "Live Art", "150", "2020"))
listaDiscos.push(new Disco('1652903617210', "Cool", "300", "2017"))
listaDiscos.push(new Disco('1652925961721', "Tales from Acoustic", "200", "1995"))
renderTable()


function registroDisco() {
    let UUID = Date.now()
    let nombreDisco = document.getElementById("inputName").value
    let precioDisco = document.getElementById("inputPrice").value
    let yearDisco = document.getElementById("inputYear").value
    const disco = new Disco(UUID, nombreDisco, precioDisco, yearDisco)
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
function clearInputs() {
    document.getElementById("inputName").value = ""
    document.getElementById("inputPrice").value = ""
    document.getElementById("inputYear").value = ""
}
function confirmDelete(IDdisco) {
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
    }).then(function (value) {
        switch (value) {
            case "SI":
                deleteItem(IDdisco)
                break;
            case "no":
                break;
        }
    })
}
function deleteItem(ID) {
    for (let i = 0; i < listaDiscos.length; i++) {
        if (listaDiscos[i].ID == ID) {
            listaDiscos.splice(i, 1);
            swal({
                title: "Success",
                text: "Eliminado",
                timer: 3000,
                icon: "success",
            });
            renderTable();
        }
    }
}
function renderTable() {
    var bodyTable = document.getElementById("discosList")
    bodyTable.innerHTML = "";
    let = rowBody = ""
    for (let i = 0; i < listaDiscos.length; i++) {
        rowBody += `<tr><td>${listaDiscos[i].ID}</td><td>${listaDiscos[i].Name}</td><td>$${listaDiscos[i].Price}</td><td>${listaDiscos[i].Year}</td><td><button type="button" class="btn btn-sm btn-light" onclick="confirmDelete('${listaDiscos[i].ID}')"><i class="fa fa-trash-o fa-2x text-danger" aria-hidden="true"></i></button></td></tr>`
    }
    document.getElementById("discosList").innerHTML = rowBody
}