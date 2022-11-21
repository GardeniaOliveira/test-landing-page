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
let formError = false;
let url = 'https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1'
let imageProduct = document.querySelector('.image');
let nameProduct = document.querySelector('.product-name');
let descriptionProduct = document.querySelector('.product-description');
let oldPrice = document.querySelector('.old-price');
let price = document.querySelector('.price');
let splitPrice = document.querySelector('.split-price');
const btnBuy = document.querySelector('.btn-buy');
const productsGrid = document.querySelector('.products-grid');
const btnNextPage = document.querySelector('#btn-next-page')
const formNewsletter = document.querySelector('#form-newsletter');
const newsletterInputName = document.querySelector('#newsletter-input-name');
const newsletterInputEmail = document.querySelector('#newsletter-input-email');
const btnNewsletter = document.querySelector('#btn-newsletter')
const sendNewslleterMessage = document.querySelector('#send-newslleter');



btnSubscribe.addEventListener("click", (e) => {
    e.preventDefault();
    validateForm();

    if (formComplete === true && formError === false) {
        messageSuccess();
        cleanForm();
    }

})
formSubscribe.addEventListener("focus", (e) => {
    cleanForm();

})
function validateName(name) {
    if (name === "") {
        formError = true;
        error[0].innerText = "Por favor, digite seu nome.";
        formSubscribe.name.focus;

        inputName.style.border = "1px solid red";
        formComplete = false;

    }
    else {
        error[0].innerText = "";
        inputName.style.border = "1px solid green";
        formComplete = true;
    }

}
function validateEmail(email) {
    if (email === "") {
        error[1].innerText = "Por favor, digite seu e-mail.";
        formSubscribe.email.focus;

        inputEmail.style.border = "1px solid red";
        formComplete = false;
        formError = true;
    }
    else {
        error[1].innerText = "";
        inputEmail.style.border = "1px solid green";
        formComplete = true;
    }

    let validateRegexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(validateRegexEmail)) {
        error[1].innerText = "";
        inputEmail.style.border = "1px solid green";
        formComplete = true;
    }
    else {
        error[1].innerText = "Por favor, digite um e-mail válido.";
        formSubscribe.email.focus;

        inputEmail.style.border = "1px solid red";
        formComplete = false;
        formError = true;

    }
}
function validateCpf(cpf) {
    if (cpf === "") {
        formError = true;
        error[2].innerText = "Por favor, digite seu CPF.";
        formSubscribe.cpf.focus;

        inputCpf.style.border = "1px solid red";
        formComplete = false;
        formError = true;
    }
    else {
        error[2].innerText = "";
        inputCpf.style.border = "1px solid green";
        formComplete = true;
    }
    // if (cpf.length !== 11) {
    //     error[2].innerText = "O CPF precisa conter 11 dígitos.";
    //     formSubscribe.cpf.focus;
    //     console.log(formSubscribe.cpf.value.length)
    //     inputCpf.style.border = "1px solid red";
    //     formComplete = false;
    //     formError = true;
    // }
    // else {
    //     error[2].innerText = "";
    //     formComplete = true;
    // }

    let validateRegexCpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
    if (cpf.match(validateRegexCpf)) {
        error[2].innerText = "";
        formComplete = true;
    }
    else {
        error[2].innerText = "Digite um CPF válido";
        formSubscribe.cpf.focus;
        inputCpf.style.border = "1px solid red";
        formComplete = false;
        formError = true;
    }
}
function validateGender() {
    if (radioMale.checked === false && radioFemale.checked === false) {
        error[3].innerText = "Escolha um sexo";
        formComplete = false;
        formError = true;
    } else {
        error[3].innerText = "";
        formComplete = true;


    }
}

function validateForm() {
    validateName(inputName.value)
    validateEmail(inputEmail.value)
    validateCpf(inputCpf.value)
    validateGender()
}

function messageSuccess() {
    success.innerText = "Formulário enviado com sucesso!";

}
function cleanForm() {
    inputName.value = "";
    inputEmail.value = "";
    inputCpf.value = "";
    radioMale.checked === false;
    radioFemale.checked === false;
    newsletterInputName.value = "";
    newsletterInputEmail.value = "";
}


function showProducts() {
    fetch(url)
        .then(response => {
            response.json().then(data => {
                putOnProductContainer(data)
                console.log(data);
                url = `https://${data.nextPage}`; //a url irá redirecionar para a próxima pagina| estava faltando o http no link da api
            })
        })
        .catch(error => console.error(error));

        
}

showProducts()

function putOnProductContainer(data) {
    for (let i = 0; i < data.products.length; i++) {
        productsGrid.innerHTML = productsGrid.innerHTML + `
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

btnNextPage.addEventListener("click", (e) => {
    e.preventDefault();
   
    showProducts()

})

btnNewsletter.addEventListener("click", (e) => {
    e.preventDefault();
    validateFormNewsletter();
    if (formComplete === true) {
        sendNewslleter();
        cleanForm();
    }

})
function validateFormNewsletter() {
    if (newsletterInputName.value === "") {
        error[4].innerText = "Por favor, digite seu nome.";
        formNewsletter.name.focus;

        newsletterInputName.style.border = "1px solid red";
        formComplete = false;
    }
    else {
        error[4].innerText = "";
        newsletterInputName.style.border = "1px solid green";
        formComplete = true;
    }

    if (newsletterInputEmail.value === "") {
        error[5].innerText = "Por favor, digite seu e-mail.";
        formNewsletter.email.focus;

        newsletterInputEmail.style.border = "1px solid red";
        formComplete = false;
    }
    else {
        error[5].innerText = "";
        newsletterInputEmail.style.border = "1px solid green";
        formComplete = true;
    }
    let validateRegexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (newsletterInputEmail.value.match(validateRegexEmail)) {
        error[5].innerText = "";
        newsletterInputEmail.style.border = "1px solid green";
       
    }
    else {
        error[5].innerText = "Por favor, digite um e-mail válido.";
        formNewsletter.email.focus;

        newsletterInputEmail.style.border = "1px solid red";
        formComplete = false;

    }

}
function sendNewslleter() {
    sendNewslleterMessage.innerText = "Obrigada por assinar nossa newslleter. Verifique sua caixa de e-mail!";

}