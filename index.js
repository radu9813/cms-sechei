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
  fetchTable();
}

function submitData() {
  var users = JSON.parse(window.localStorage.getItem("users") || "[]");
  console.log("# of users: " + users.length);
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
  console.log(users);
  fetchTable();
}

function fetchTable() {
  var loadedData = JSON.parse(window.localStorage.getItem("users"));
  var loadedTable = document.getElementById("usersTable");
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
    numeCell.innerHTML = user.nume;
    var prenumeCell = row.insertCell(1);
    prenumeCell.innerHTML = user.prenume;
    var emailCell = row.insertCell(2);
    emailCell.innerHTML = user.email;
    var sexCell = row.insertCell(3);
    sexCell.innerHTML = user.sex;
    var birthDateCell = row.insertCell(4);
    birthDateCell.innerHTML = user.birthDate;
    var actionsCell = row.insertCell(5);
    actionsCell.innerHTML = `<button onClick="deleteRow(${user.id})">Delete</button>`;
  }
}
