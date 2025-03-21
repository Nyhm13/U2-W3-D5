const dataURL='https://striveschool-api.herokuapp.com/api/product/'
const myToken= "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMmVhMzM4MzRiZjAwMTUwMDA3MDYiLCJpYXQiOjE3NDI1NDg2NDQsImV4cCI6MTc0Mzc1ODI0NH0.1RZ4GYbgl38OrS1t_stcJXSFkLSz56xNU0NMm63fNHA"

const mouseOverImg="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2XyYLD34x5JT5njiUq49NqQhKQQC2Z48NBQ&s"


const updateYear= function(){
const footerDate=document.getElementById('year')
footerDate.innerText=new Date().getFullYear()}
updateYear()

const hideSpinner= function(){
    const spinner=document.getElementById('spinner')
    spinner.classList.add('d-none')
}



const URLparams=new URLSearchParams(location.search)

const prodottoId=URLparams.get('id')
console.log(prodottoId)  //corrisponde al attuale id del prodotto

const getProductDetails=function(){
    fetch(dataURL+prodottoId,{
        headers:{
            "Authorization":myToken
        }
    })
    .then((response)=>{
        if(response.ok){
            console.log('non cado malato',response)
            return response.json()
        }else{
            throw new Error('cado malato')
        }
    })
    .then((data)=>{
        hideSpinner()
        console.log(data)
        const nameProduct=document.getElementById('name')
        const descriptionProduct=document.getElementById('description')
        const priceProduct=document.getElementById('price-brand')
        const imgProduct=document.getElementById('imageUrl')
        nameProduct.innerText=data.name
        descriptionProduct.innerText=data.description
        priceProduct.innerText=`${data.price}€ - ${data.brand}`
        imgProduct.src=data.imageUrl

        imgProduct.addEventListener('mouseover',function(){
            imgProduct.src=mouseOverImg
        })
        imgProduct.addEventListener('mouseout',function(){
            imgProduct.src=data.imageUrl})


    })
    
    .catch((error)=>{
        hideSpinner()
        console.log(error)
    })
}

const deleteProduct=function(){
    fetch(dataURL+prodottoId,{
        method: 'DELETE',
        headers:{
            "Authorization":myToken
        }
    })
    .then((response)=>{
        if (response.ok) {
            alert('prodotto eliminato')
            location.assign('/index.html')
        } else {
            throw new Error('cado malato')
        }
        
    })
    .catch((error)=>{
        console.log(error)
    })
}

const deleteBtn=document.getElementById('delete')
deleteBtn.addEventListener('click',deleteProduct)


 getProductDetails()