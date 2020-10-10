document.getElementById("submitBtn").addEventListener("click", (event) => {
  event.preventDefault();
  console.log(document.cookie);
  let submitBtn = document.getElementById("submitBtn");
  submitBtn.submit();
});
