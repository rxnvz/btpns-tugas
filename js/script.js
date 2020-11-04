var allData     = []
var allAlbum    = []
var userSession = []
var actNav      = document.getElementsByClassName("actNav")[0];
var thisNav     = actNav.children.outerHTML;
var stats       = "";
var passdef     = "12345"

function navi(id) {
    if (userSession.length == 1) {
        thisNav = ` <li class="nav-item ">
                        <a class="nav-link ${stats}" href="#index" onclick="show('index','home','about','contact','login');">Beranda</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link ${stats}" href="#home" onclick="show('home','index','about','contact','login');dataAlbum();">Album</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#logout" onclick="logout();navi();alert('Anda telah keluar dari sistem')">Logout</a>
                    </li>`
    } else {
        thisNav =`<li class="nav-item">
                    <a class="nav-link" href="#index" onclick="show('index','contact','about','login','regis','home');">Beranda</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#about" onclick="show('about','contact','index','login','regis','home');">Tentang</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#contact" onclick="show('contact','about','index','login','regis','home')";>Hubungi Kami</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#home" onclick="show('home','index','about','contact','login','regis');dataAlbum();";>Album</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#login" onclick="show('login','contact','about','index','regis','home')";>Masuk</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#regis" onclick="show('regis','contact','about','index','login','home')";>Daftar</a>
                  </li>`
                }
                actNav.innerHTML = thisNav;
}

function show(shown,hide1,hide2,hide3,hide4,hide5) {
    document.getElementById(shown).style.display='block'
    document.getElementById(hide1).style.display='none'
    document.getElementById(hide2).style.display='none'
    document.getElementById(hide3).style.display='none'
    document.getElementById(hide4).style.display='none'
    // document.getElementById(hide5).style.display='none';
}

var paging = (albm, size) => {
    var thePage = 1
    var perPage = size || 10
    var numPage = Math.ceil(albm.length/perPage)
    var tabl    = document.querySelectorAll("tableData")

}

var login = async() => {
    var uname = document.getElementById("email-log").value;
    var passw = document.getElementById("pass-log").value;
    
    await fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {allData = data})
        .catch(err => console.warn("err ", err))
        
        if (uname) {
        var statusLog = allData.find(user => uname == user.username)
        
        if (passw = "") {
            allData.password = passdef;
        }

        if (statusLog) {
            userSession.push(statusLog);
            alert("Login Berhasil")
            navi()
            show('index','home','login','about','contact', 'regis');
            console.log(userSession);
        } else alert("Maaf, e-mail dan password tidak sesuai atau tidak terdaftar.")
    }
}

var dataAlbum = async () =>{
    var userlog   = userSession.length ? userSession[0].id: null     
    var tableData = document.getElementsByClassName("tableData")[0];
    var tr = tableData.children[0].children[0].outerHTML;
    
    await fetch('https://jsonplaceholder.typicode.com/albums')
        .then(response => response.json())
        .then(json => {allAlbum = json})
        .catch(err => console.warn("err ", err))
          
    var tr2 = allAlbum.map((alb, index) => {
        if (userlog) {
            if (userlog == alb.userId) {
                return `<tr>
                            <td>${index + 1}</td>
                            <td>${alb.title}</td>
                        </tr>`
            }            
        } else {
            return `<tr>
                        <td>${index + 1}</td>
                        <td>${alb.title}</td>
                        <td>${"Pemilik: " + allData.name}</td>
                    </tr>`
        }
    })
    tableData.innerHTML = tr + tr2.join("");
}

var searchin = () => {
    var userlog   = userSession.length ? userSession[0].id: null     
    var tableData = document.getElementsByClassName("tableData")[0]
    var tr  = tableData.children[0].children[0].outerHTML
    var x   = document.getElementById("cari").value
    var txt = x.toLowerCase()
    console.log(userlog)

    allAlbum.filter((srh, index) => {
        var t = srh.title
        var d = srh.userId
        if (userlog) {
            if (x !== null) {
                if (t.indexOf(txt) !== -1 && userlog == d){ //kalo login dan ngga kosong
                    tr += `<tr> 
                            <td>${index + 1}</td>
                            <td>${t}</td>
                           </tr>`
                } 
            } else { //kalo login dan kosong
                return `<tr>
                            <td>${index + 1}</td>
                            <td>${t}</td>
                        </tr>`
            }
        } else {
            if (x !== null) { //kalo ngga login dan ngga kosong
                if (t.indexOf(txt) !== -1){
                    tr += `<tr> 
                            <td>${index + 1}</td>
                            <td>${t}</td>
                            <td>${"Pemilik: " + allData.name}</td>
                           </tr>`
                } 
            } else { //kalo ngga login dan kosong
                return `<tr>
                            <td>${index + 1}</td>
                            <td>${t}</td>
                            <td>${"Pemilik: " + allData.name}</td>
                        </tr>`
            }            
        }
    })
    tableData.innerHTML = tr
}

function logout(){
    userSession.shift()
    show('index','login','contact','about','regis')
}

