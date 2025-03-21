const dataURL='https://striveschool-api.herokuapp.com/api/product/'
const myToken= "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMmVhMzM4MzRiZjAwMTUwMDA3MDYiLCJpYXQiOjE3NDI1NDg2NDQsImV4cCI6MTc0Mzc1ODI0NH0.1RZ4GYbgl38OrS1t_stcJXSFkLSz56xNU0NMm63fNHA"




const updateYear= function(){
const footerDate=document.getElementById('year')
footerDate.innerText=new Date().getFullYear()}
updateYear()

const hideSpinner= function(){
    const spinner=document.getElementById('spinner')
    spinner.classList.add('d-none')
}


class Product {
    constructor(_name,_description,_brand,_imageUrl,_price){
        this.name=_name,
        this.description=_description,
        this.brand=_brand,
        this.imageUrl=_imageUrl,
        this.price=_price
    }
}


const form=document.getElementById('product-form')
form.addEventListener('submit',function(e){
    e.preventDefault()
// blocco riferimenti al inputs forms
const nameInput=document.getElementById('name')
const descriptionInput=document.getElementById('description')
const brandInput=document.getElementById('brand')
const imageUrlInput=document.getElementById('imageUrl')
const priceInput=document.getElementById('price')

const product= new Product(
    nameInput.value,
    descriptionInput.value,
    brandInput.value,
    imageUrlInput.value,
    priceInput.value
)
fetch(dataURL,{
    method:'POST',
    body:JSON.stringify(product),
    headers:{
        "Authorization":myToken,
        'Content-Type':'application/json',
    },
})
.then((response)=>{
    if(response.ok){
        console.log('non cado malato',response)
        alert('prodotto inserito')

        form.reset()
    }else{
        throw new Error('cado malato')
    }
})
.catch((error)=>{
    console.log(error)
    
 })
})
// const formTwo=document.getElementsByName('form')[0]   
// const buttonFormReset = document.getElementById("reset");
// buttonFormReset.addEventListener("click", function (e) {
//   e.preventDefault();
//   const confirmReset = confirm("Sei sicuro di voler resettare il modulo?");
//   if (confirmReset) {
//     form.reset();
//   }
// });     
// ho problemi con questo tasto reset, non riesco a farlo funzionare mi continua a dare errore 
//  del tipo il form non esiste nel dom, ma non capisco il motivo per cui non lo trova