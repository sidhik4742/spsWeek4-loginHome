let searchedRow = document.getElementById("searchedRow");
// console.log(searchedRow.rows);
document.getElementById("addFormBtn").addEventListener("click", (event) => {
  event.preventDefault();
  let addFormDiv = document.getElementById("addForm");
  addFormDiv.style.display = "block";
});

// document.getElementById("editCloseBtn").addEventListener("click", (event) => {
//   event.preventDefault();
//   let editForm = document.getElementById("editForm");
//   editForm.style.display = "none";
// });

document.getElementById("addCloseBtn").addEventListener("click", (event) => {
  event.preventDefault();
  let addForm = document.getElementById("addForm");
  addForm.style.display = "none";
});

document.getElementById("searchUser").addEventListener("input", (event) => {
  //   let searchKey = document.getElementById("searchUser").value;
  let searchKey = document.getElementById("searchUser").value;
  searchKey = searchKey.toLowerCase();
//   console.log(searchKey);
//   console.log(searchedRow.rows.length);
  //   console.log(searchedRow.rows[1].cells[0].innerHTML);
  for (let tableRow = 1; tableRow < searchedRow.rows.length; tableRow++) {
    searchedRow.rows[0].style.display = "block";
    if (searchedRow.rows[tableRow].cells[0].innerHTML.indexOf(searchKey) > -1) {
      searchedRow.rows[tableRow].style.display = "block";
    } else {
      searchedRow.rows[tableRow].style.display = "none";
    }
  }
});

// function searchUser(){
//     console.log("this search field");
// }
