
document.getElementById('submitBtn').addEventListener('click', ()=>{

    console.log(document.cookie);
    let submitBtn = document.getElementById('submitBtn');
    submitBtn.submit();
})