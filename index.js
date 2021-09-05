

function deleteRow(){
    document.getElementById("myRow").delete();
};

function submitData(){
    var users = JSON.parse(window.localStorage.getItem("users") || "[]");
    console.log("# of users: " + users.length);
    var user = {
        id: Date.now(),
        nume: document.getElementById("nume").value,
        prenume: document.getElementById("prenume").value,
        email: document.getElementById("email").value,
        sex: document.getElementById("sex").value,
        birthDate: document.getElementById("birthdate").value
    };
    users.push(user);
    window.localStorage.setItem("users",JSON.stringify(users));
    console.log(JSON.stringify(users));
}