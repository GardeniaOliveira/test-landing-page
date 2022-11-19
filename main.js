const formSubscribe = document.getElementById('form-subscribe');
const inputName = document.getElementById('input-name');
const inputEmail = document.getElementById('input-email');
const inputCpf = document.getElementById('input-cpf');
const btnSubscribe = document.getElementById('btn-subscribe');
const radioMale = document.getElementById('male')
const radioFemale = document.getElementById('female')
const error = document.querySelectorAll('.error');
const success = document.querySelector('.success');
let formComplete = true;
let imageProduct = document.querySelector('.image');
let nameProduct = document.querySelector('.product-name');
let descriptionProduct = document.querySelector('.product-description');
let oldPrice = document.querySelector('.old-price');
let price = document.querySelector('.price');
let splitPrice = document.querySelector('.split-price');
const btnBuy = document.querySelector('.btn-buy');
const productsGrid = document.querySelector('.products-grid');


btnSubscribe.addEventListener("click", (e) => {
    e.preventDefault();
    validateMenu();

    if(formComplete === true){
        messageSuccess();
        cleanForm();
    }

})
formSubscribe.addEventListener("focus", (e) => {
        cleanForm();

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
    inputName.style.border = "1px solid green";
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
    inputEmail.style.border = "1px solid green";
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
    inputCpf.style.border = "1px solid green";
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
        formComplete = false; 
   }else{
    error[3].innerText = "";
    let formComplete = true;


   }
}

function messageSuccess(){
    success.innerText = "Formulário enviado com sucesso!";
   
}
function cleanForm() {
    inputName.value = "";
    inputEmail.value = "";
    inputCpf.value = "" ;
    radioMale.checked === false;
    radioFemale.checked === false;
}



function showProducts(){
    fetch(`https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1`)
    .then(response => {
        response.json().then(data => {
            putOnProductContainer(data)
            console.log(data);

        })
    })
    .catch(error => console.error(error));
}
    
showProducts()

  function putOnProductContainer(data) {
    for (let i = 0; i < data.products.length; i++) {
        productsGrid.innerHTML = productsGrid.innerHTML+`
        <div class="product-container">
        <div class="product-img">
            <img src="${data.products[i].image}" alt="" class="image">
        </div>

        <div class="product-informations">
            <h5 class="product-name">${data.products[i].name}</h5>
            <p class="hidden product-description">${data.products[i].description}</p>
            <p class="old-price"> De: R$ ${data.products[i].oldPrice}</p>
            <p class="price"> Por: R$ ${data.products[i].price}</p>
            <p class="split-price"> ou ${data.products[i].installments.count}x de R$ ${data.products[i].installments.value}</p>
            <button class="btn-buy">Comprar</button>
        </div>
    </div>
        
        `
    }
  }