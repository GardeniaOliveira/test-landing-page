const formSubscribe = document.getElementById('form-subscribe');
const inputName = document.getElementById('input-name');
const inputEmail = document.getElementById('input-email');
const inputCpf = document.getElementById('input-cpf');
const btnSubscribe = document.getElementById('btn-subscribe');
const radioMale = document.getElementById('male')
const radioFemale = document.getElementById('female')
const error = document.querySelectorAll('.error');
const sucess = document.querySelector('.sucess');
let formComplete = true;

btnSubscribe.addEventListener("click", (e) => {
    e.preventDefault();
    validateMenu();
})

function validateMenu() {
   if(inputName.value ===""){
    error[0].innerText = "Por favor, digite seu nome.";
    formSubscribe.name.focus;

    inputName.style.border = "1px solid red";
    formComplete = false; 
   }
   else{
    error[0].innerText = "";
    let formComplete = true;
   }

   if( inputEmail.value ===""){
    error[1].innerText = "Por favor, digite seu e-mail.";
    formSubscribe.email.focus;

    inputEmail.style.border = "1px solid red";
    formComplete = false; 
   }
   else{
    error[1].innerText = "";
    let formComplete = true;
   }

   if(inputCpf.value ===""){
    error[2].innerText = "Por favor, digite seu CPF.";
    formSubscribe.cpf.focus;

    inputCpf.style.border = "1px solid red";
    formComplete = false; 
   }
   else{
    error[2].innerText = "";
    let formComplete = true;
   }
   if(inputCpf.value.length !== 11){
    error[2].innerText = "O CPF precisa conter 11 dígitos.";
    formSubscribe.cpf.focus;
console.log(formSubscribe.cpf.value.length)
    inputCpf.style.border = "1px solid red";
    formComplete = false; 
   }
   else{
    error[2].innerText = "";
    let formComplete = true;
   }
    if(radioMale.checked === false && radioFemale.checked === false){
        error[3].innerText = "Escolha um sexo";
        radioMale.style.border = "1px solid red";
        radioFemale.style.border = "1px solid red";
        formComplete = false; 
   }else{
    error[3].innerText = "";
    let formComplete = true;

   }
   console.log(radioFemale.checked)
   console.log(radioMale.checked)
}

