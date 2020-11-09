// initializing the count of article with the local storage
if (sessionStorage.getItem('nombreArticle') != null && is_int(sessionStorage.getItem('nombreArticle'))) {
    var nmbrArticle = sessionStorage.getItem('nombreArticle');
} else {
    var nmbrArticle = 0;
}
sessionStorage.setItem("nombreArticle", nmbrArticle);

// FUNCTION'S SECTION
    // function testing the type of a variable
    function is_int(value) {
        if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
            return true;
        } else {
            return false;
        }
    }
// END OF FUNCTION'S SECTION

function loadArticle() {
    if(document.getElementById('menuCatalogue').value === 'catalog1') {
        var catalog = catalog1
    } else if(document.getElementById('menuCatalogue').value === 'catalog2') {
        var catalog = catalog2
    }

    for (let i = 0; i < catalog.length; i++) {


        console.log(catalog.name)
        // creation of an article
        var content = document.getElementById('wrapperArticle').innerHTML;
        
        content = content + '<section class="article">'+
                                '<h1>' + catalog[i].name + '</h1>'+
                                '<img src="' + catalog[i].image + '" alt="' + catalog[i].name + '">'+
                                '<div class="detail">'+
                                    '<p><h2>Description :</h2><span>' + catalog[i].description + '</span></p>'+
                                '</div>'+
                                '<div class="ajoutPanier">'+
                                    '<span>' + catalog[i].price + '.00€</span>'+
                                    '<div class="button button__Panier" id="' + catalog[i].Id + '">Ajoutez au Panier</div>'+
                                '</div>'+
                            '</section>';
        document.getElementById('wrapperArticle').innerHTML = content;
        
        // gestion nombre articles
        $(".button__Panier").click(function () {
            var idProd = this.getAttribute("id");
            nmbrArticle++;

            sessionStorage.setItem("article" + nmbrArticle, idProd);
            sessionStorage.setItem("nombreArticle", nmbrArticle);

            document.querySelector('nav').querySelector('i').textContent = nmbrArticle;
            loadArticlePanier();
        });
    }
}


function loadArticlePanier() {
    for (let i = 1; i <= nmbrArticle; i++) {
        var article = sessionStorage.getItem("article" + i);
        var numCatalog = parseInt(article.toString().split('')[0])
        var numArticle = parseInt(article.toString().split('')[1])
        console.log(numArticle);

        if(numCatalog === 1) {
            var catalog = catalog1
        } else if(numCatalog === 2) {
            var catalog = catalog2
        }

        var content = "";
        var totalPrice = 0;

        totalPrice = totalPrice + catalog[numArticle].price;
        // document.querySelector(".totalPrice").textContent = totalPrice + '€';

        // creation of an article
        content = content + '<section class="article">'+
                                '<h1>' + catalog[numArticle].name + '</h1>'+
                                '<img src="' + catalog[numArticle].imageUrl + '" alt="' + catalog[numArticle].name + '">'+
                                '<div class="detail">'+
                                    '<p>'+
                                        '<h2>Description :</h2>'+
                                        '<span>' + catalog[numArticle].description + '</span>'+
                                    '</p>'+
                                '</div>'+
                                '<div class="ajoutPanier"><span>' + catalog[numArticle].price + ' €</span></div>'+
                            '</section>';

        document.querySelector('#wrapperPanier').querySelector('div').innerHTML = content;
    }
}

$('.selectCatalogue').click(() => loadArticle())




// gestion nombre articles
if (nmbrArticle > 0) {
    document.querySelector('nav').querySelector('i').textContent = nmbrArticle;
}
