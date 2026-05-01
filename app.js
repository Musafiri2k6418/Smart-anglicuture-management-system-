let farmers = JSON.parse(localStorage.getItem("farmers")) || [];
let crops = JSON.parse(localStorage.getItem("crops")) || [];

function show(page){
    document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
    document.getElementById(page).classList.add("active");
}

function openModal(){
    document.getElementById("modal").style.display="block";
}

function closeModal(){
    document.getElementById("modal").style.display="none";
}

function toast(msg){
    let t = document.getElementById("toast");
    t.innerText = msg;
    t.style.display="block";
    setTimeout(()=>t.style.display="none",2000);
}

function addFarmer(){
    let name = document.getElementById("name").value;
    if(!name) return;

    farmers.push({id:Date.now(), name});
    localStorage.setItem("farmers", JSON.stringify(farmers));

    closeModal();
    render();
    toast("Farmer added!");
}

function searchFarmer(){
    let q = document.getElementById("search").value.toLowerCase();
    document.getElementById("list").innerHTML =
        farmers.filter(f=>f.name.toLowerCase().includes(q))
        .map(f=>`<li>${f.name}</li>`).join("");
}

function addCrop(){
    let c = document.getElementById("cropInput").value;
    crops.push({id:Date.now(), c});
    localStorage.setItem("crops", JSON.stringify(crops));
    render();
    toast("Crop added!");
}

function render(){
    document.getElementById("fCount").innerText = farmers.length;
    document.getElementById("cCount").innerText = crops.length;

    document.getElementById("list").innerHTML =
        farmers.map(f=>`<li>${f.name}</li>`).join("");

    document.getElementById("cropList").innerHTML =
        crops.map(c=>`<li>${c.c}</li>`).join("");

    new Chart(document.getElementById("chart"), {
        type:'doughnut',
        data:{
            labels:["Farmers","Crops"],
            datasets:[{data:[farmers.length,crops.length]}]
        }
    });
}

function toggleTheme(){
    document.body.classList.toggle("dark");
}

render();
