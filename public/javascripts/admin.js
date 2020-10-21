document.getElementById("addFormBtn").addEventListener("click", (event) => {
  event.preventDefault();
  let addFormDiv = document.getElementById("addForm");
  addFormDiv.style.display = "block";
});

document.getElementById("editCloseBtn").addEventListener("click", (event) => {
  event.preventDefault();
  let editForm = document.getElementById("editForm");
  editForm.style.display = "none";
});

document.getElementById("addCloseBtn").addEventListener("click", (event) => {
  event.preventDefault();
  let addForm = document.getElementById("addForm");
  addForm.style.display = "none";
});

