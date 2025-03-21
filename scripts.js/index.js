const dataURL = "https://striveschool-api.herokuapp.com/api/product/";
const myToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMmVhMzM4MzRiZjAwMTUwMDA3MDYiLCJpYXQiOjE3NDI1NDg2NDQsImV4cCI6MTc0Mzc1ODI0NH0.1RZ4GYbgl38OrS1t_stcJXSFkLSz56xNU0NMm63fNHA";

const updateYear = function () {
  const footerDate = document.getElementById("year");
  footerDate.innerText = new Date().getFullYear();
};
updateYear();

const hideSpinner = function () {
  const spinner = document.getElementById("spinner");
  spinner.classList.add("d-none");
};

const getData = function () {
  fetch(dataURL, {
    headers: {
      Authorization: myToken,
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("non cado malato", response);
        return response.json();
      } else {
        throw new Error("cado malato");
      }
    })
    .then((data) => {
      hideSpinner();
      console.log(data);

      const row = document.getElementById("products-row");
      data.forEach((product) => {
        row.innerHTML += `
            <div class="col col-12 col-lg-3 col-md-4 col-sm-6">
              <div class="card ">
                <img src=${product.imageUrl} class="card-img-top " alt="immagine prodotto" />
                <div class="card-body bg-secondary-subtle">
                  <h5 class="card-title text-primary">${product.name}</h5>
                  <p class="card-text fw-semibold">${product.description}</p>
                  <p class="card-text fw-semibold"><span class="text-danger fw-bold fs-5">Prezzo</span>:${product.price}€ / Marca- ${product.brand}</p>                  
                  <button class="btn   "><a href="/details.html?id=${product._id}" class="btn btn-primary">Vai ai dettagli</a></button>
                          
                </div>
              </div>
            </div>
          `;
      });
    })
    .catch((error) => {
      hideSpinner();
      console.log(error);
      document.getElementById("product-details").innerHTML = `<p class="text-danger">Errore nel caricamento dei dettagli del prodotto.</p>`;
    });
};

getData();
