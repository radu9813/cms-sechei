window.onload = function () {
  var reloading = sessionStorage.getItem("reloading");
  if (reloading) {
    sessionStorage.removeItem("reloading");
    fetchTable();
  }
};

function reloadP() {
  sessionStorage.setItem("reloading", "true");
  document.location.reload();
}

function deleteRow(id) {
  var users = JSON.parse(window.localStorage.getItem("users") || "[]");
  for (var entry in users) {
    var user = users[entry];
    if (user.id == id) {
      users.splice(entry, 1);
      break;
    }
  }
  window.localStorage.setItem("users", JSON.stringify(users));
  window.location.reload();
}

function validate() {
  var error = "";
  var name = document.getElementById("nume");
  if (name.value == "") {
    error += " \nThe employee last name should not be empty.\n";
  }
  var prenume = document.getElementById("prenume");
  if (prenume.value == "") {
    error += " \nThe employee first name should not be empty.\n";
  }

  var email = document.getElementById("email");
  if (email.value == "" || email.value.indexOf("@") == -1) {
    error += " \nThe email address does not have a valid format.\n";
  }

  var birthDate = document.getElementById("birthdate");
  console.log(birthDate.value)
  var auxBirthdate = new Date(birthDate.value);
  var yearsOld = new Date(Date.now() - auxBirthdate.getTime());
  console.log(Math.abs(yearsOld.getFullYear()) - 1970);
  if (birthDate.value == "" || Math.abs(yearsOld.getFullYear()) - 1970 < 16) {
    error += " \nThe employee should be over 16 years old.\n";  
  } 

  console.log(error);
  if (error != ""){
    alert(error);
    return false;
  }

  return true;
}

function submitData() {
  var users = JSON.parse(window.localStorage.getItem("users") || "[]");
  if(validate() == false){
    return false;
  }
  var user = {
    id: Date.now(),
    nume: document.getElementById("nume").value,
    prenume: document.getElementById("prenume").value,
    email: document.getElementById("email").value,
    sex: document.getElementById("sex").value,
    birthDate: document.getElementById("birthdate").value,
  };
  users.push(user);
  window.localStorage.setItem("users", JSON.stringify(users));
}

function fetchTable() {
  var loadedData = JSON.parse(window.localStorage.getItem("users"));
  var loadedTable = document.getElementById("usersTable").getElementsByTagName('tbody')[0];
  var rowCount = loadedTable.rows.length;
  var tableHeaderRowCount = 1;
  for (var i = tableHeaderRowCount; i < rowCount; i++) {
    loadedTable.deleteRow(tableHeaderRowCount);
  }
  console.log(loadedData);
  for (var entry in loadedData) {
    var user = loadedData[entry];
    console.log(user.nume);
    var row = loadedTable.insertRow();
    row.id = user.id;
    var numeCell = row.insertCell(0);
    numeCell.setAttribute("data-label","Nume");
    numeCell.innerHTML = user.nume;
    var prenumeCell = row.insertCell(1);
    prenumeCell.setAttribute("data-label","Prenume");
    prenumeCell.innerHTML = user.prenume;
    var emailCell = row.insertCell(2);
    emailCell.setAttribute("data-label","Email");
    emailCell.innerHTML = user.email;
    var sexCell = row.insertCell(3);
    sexCell.setAttribute("data-label","Sex");
    sexCell.innerHTML = user.sex;
    var birthDateCell = row.insertCell(4);
    birthDateCell.setAttribute("data-label","Birthday");
    birthDateCell.innerHTML = user.birthDate;
    var actionsCell = row.insertCell(5);
    actionsCell.innerHTML = `<button onClick="deleteRow(${user.id})">Delete</button>`;
  }
}
