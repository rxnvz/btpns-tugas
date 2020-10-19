var allData     = [];

var userSession = [];
var actNav      = document.getElementsByClassName("actNav")[0];
var thisNav     = actNav.children.outerHTML;
var stats       = "";

function navi() {
    if (userSession.length == 1) {
        thisNav = ` <li class="nav-item">
                        <a class="nav-link ${stats}" href="#home" onclick="show('home','index','about','contact','login');showData(); stats=' active'">Pengaturan User</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#logout" onclick="logout();navi();alert('Anda telah keluar dari sistem!')">Logout</a>
                    </li>`
    } else {
        thisNav =`<li class="nav-item">
                    <a class="nav-link active" href="#index" onclick="show('index','contact','about','login','regis');">Beranda</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#about" onclick="show('about','contact','index','login','regis');">Tentang</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#contact" onclick="show('contact','about','index','login','regis')";>Hubungi Kami</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#login" onclick="show('login','contact','about','index','regis')";>Masuk</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#regis" onclick="show('regis','contact','about','index','login')";>Daftar</a>
                  </li>`
    }
    actNav.innerHTML = thisNav;
}

function show(shown,hide1,hide2,hide3,hide4) {
    document.getElementById(shown).style.display='block';
    document.getElementById(hide1).style.display='none';
    document.getElementById(hide2).style.display='none';
    document.getElementById(hide3).style.display='none';
    document.getElementById(hide4).style.display='none';
}

function addData() {
    var isi = [];
    isi[0]  = document.getElementById("mail").value;
    isi[1]  = document.getElementById("nama").value;
    isi[2]  = document.getElementById("password").value;

    var passVal = document.getElementById("passwordRepeat").value;

    if (isi[2] != passVal) {
        alert("Sandi yang dimasukkan tidak sama!");
    } else {
        allData.push(isi);
        alert("Data Berhasil dimasukkan.");
        showData();
        resetRegForm();
    }   
}

function showData() {
    // var isi = [];
    // isi[0]  = document.getElementById("mail").value;
    // isi[1]  = document.getElementById("name").value;
    // isi[2]  = document.getElementById("password").value;

    // allData.push(isi);
    
    var tableData = document.getElementsByClassName("tableData")[0];
    var tr = tableData.children[0].children[0].outerHTML;

    for (i=0; i<allData.length; i++) {
        tr += `
            <tr>
                <td>${i + 1}</td>
                <td>${allData[i][0]}</td>
                <td>${allData[i][1]}</td>
                <td>${allData[i][2]}</td>
                <td>
                    <a onClick="updateData(${i})" href=# >Ubah </a> ||
                    <a onClick="deleteData(${i})" href=# > Hapus</a>
                </td>
            </tr>
        `;
    }
    tableData.innerHTML = tr
    console.log(allData);
}

function resetRegForm() {
    document.getElementById("mail").value           = "";
    document.getElementById("nama").value           = "";
    document.getElementById("password").value       = "";
    document.getElementById("passwordRepeat").value = "";
}

function login() {
    var email     = document.getElementById("email-log").value;
    var passw     = document.getElementById("pass-log").value;

    for (var i=0; i<allData.length; i++) {
        if (allData[i][0] == email && allData[i][2] == passw) {
            userSession.push(allData[i]);
            navi();
            alert("Login Berhasil");
            show('home','index','login','about','contact', 'regis');
        } else {
            alert("Maaf, e-mail dan password tidak sesuai atau tidak terdaftar.");
        }
    }
    console.log("logged: " + userSession);
}

function logout(){
    userSession.shift()
    show('index','login','contact','about','regis')
}

function deleteData(id) {
    allData.splice(id, 1);
    showData();
}

function updateData(id) {
    var email = document.getElementById("mails").value   = allData[id][0];
    var namaa = document.getElementById("namas").value   = allData[id][1];
    var passs = document.getElementById("passw").value   = allData[id][2];

    allData[id][0] = email;
    allData[id][1] = namaa;
    allData[id][2] = passs;

    // showData();
    // resetForm();
    // console.log(id);
}

function editedData() {
    var edited = [];
    edited[0]  = document.getElementById("mails").value;
    edited[1]  = document.getElementById("namas").value;
    edited[2]  = document.getElementById("passw").value;

    var i = allData.length;
    allData[i-1] = edited;

    alert("Data berhasil dirubah!");
    showData();
    resetHomeForm();
}

// function addDataForm() {
//     var isi = [];
//     isi[0]  = document.getElementById("mails").value;
//     isi[1]  = document.getElementById("namas").value;
//     isi[2]  = document.getElementById("passw").value;

//     var passVal = document.getElementById("passwRepeat").value;

//     if (isi[2] != passVal) {
//         alert("Sandi yang dimasukkan tidak sama!");
//     } else {
//         allData.push(isi);
//         alert("Data Berhasil dimasukkan");
//         showData();
//         resetHomeForm();
//     }   
// }

function resetHomeForm() {
    document.getElementById("mails").value          = "";
    document.getElementById("namas").value          = "";
    document.getElementById("passw").value          = "";
    document.getElementById("passwRepeat").value    = "";
}