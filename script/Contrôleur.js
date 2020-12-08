// initializing the count of article with the local storage
if (sessionStorage.getItem('nombreArticle_Distinct') != null && is_int(sessionStorage.getItem('nombreArticle_Distinct'))) {
    var nmbrArticle_Distinct = sessionStorage.getItem('nombreArticle_Distinct');
    var nmbrArticle_Total = countArticle();
} else {
    var nmbrArticle_Distinct = 0;
    var nmbrArticle_Total = 0;
}
sessionStorage.setItem("nombreArticle_Distinct", nmbrArticle_Distinct);
sessionStorage.setItem("nombreArticle_Total", nmbrArticle_Total);

// FUNCTION'S SECTION
    // function testing the type of a variable
    function is_int(value) {
        if ((parseFloat(value) == parseInt(value)) && !isNaN(value)) {
            return true;
        } else {
            return false;
        }
    }
    function authQuantity(articleId) {
        var quantitySelected = 0;
        for (let i = 1; i <= nmbrArticle_Distinct; i++) {
            var article = sessionStorage.getItem("article" + i);
            var testedId = parseInt(article.toString().split(' ')[0]);
            var quantity = parseInt(article.toString().split(' ')[1]);
            if(testedId == articleId) {
                quantitySelected = quantitySelected + quantity;
            }
        }
        return quantitySelected;
    }
    function existInPanier(articleId) {
        for (let i = 1; i <= nmbrArticle_Distinct; i++) {
            var article = sessionStorage.getItem("article" + i);
            var testedId = parseInt(article.toString().split(' ')[0]);
            if(testedId == articleId) {
                return i
            }
        }
        return 0;
    }
    function countArticle() {
        var res = 0;
        for (let a = 1; a <= nmbrArticle_Distinct; a++) {
            var article = sessionStorage.getItem("article" + a);
            var quantity = parseInt(article.toString().split(' ')[1]);

            res += quantity;
        }
        return res;
    }
// END OF FUNCTION'S SECTION

function loadArticle() {
    var count = 0;

    document.getElementById('wrapperArticle').querySelector('.target').innerHTML = '';
    if(document.getElementById('menuCatalogue').value === 'catalog1') {
        var catalog = catalog1
    } else if(document.getElementById('menuCatalogue').value === 'catalog2') {
        var catalog = catalog2
    }

    for (let i = 0; i < catalog.length; i++) {
        var quantity = authQuantity(catalog[i].Id)
        // creation of an article
        var content = document.getElementById('wrapperArticle').querySelector('.target').innerHTML;
        

        var regexT = '^' + $(".inputSearch").val() +"\\w";
        var regex = new RegExp(regexT, "g");
        console.log(catalog[i].name);
    
        if(catalog[i].name.match(regex) || $(".inputSearch").val() == null) {
            count++;
            content = content + '<section class="article">'+
                                '<h1>' + catalog[i].name + '</h1>'+
                                '<img src="' + catalog[i].image + '" alt="' + catalog[i].name + '">'+
                                '<div class="detail">'+
                                    '<p><h2>Description :</h2><span>' + catalog[i].description + '</span></p>'+
                                '</div>'+
                                '<div class="ajoutPanier">'+
                                    '<span>' + catalog[i].price + '.00€</span>'+
                                    '<select class="quantSelected">';

                                    for (let b = 0; b <= 9 - quantity; b++) {
                                        if(b == 1){
                                            content = content + '<option value="'+ b +'" selected>'+ b +'</option>'
                                        } else {
                                            content = content + '<option value="'+ b +'">'+ b +'</option>'
                                        }
                                    }

                    content = content + '</select>';
                                    if (quantity == 9) {
                                        content = content + '<div class="button button__Panier disabled" id="' + catalog[i].Id + '">Ajoutez au Panier</div>'
                                    } else {
                                        content = content + '<div class="button button__Panier" id="' + catalog[i].Id + '">Ajoutez au Panier</div>'
                                    }
            content = content + '</div>'+
                            '</section>';
            document.getElementById('wrapperArticle').querySelector('.target').innerHTML = content;
        } else if(count == 0) {
            document.getElementById('wrapperArticle').querySelector('.target').innerHTML = "CHEH Y'A PAS D'ARTICLES";
        }
        
        // gestion nombre articles dans panier
        $(".button__Panier").click(function () {
            if (!$(this).hasClass("disabled")){
                var quant = $(this).prev().val()
                
                if (quant > 0) {
                    var idProd = this.getAttribute("id");
                    var placeArticle = existInPanier(idProd);
                    if(placeArticle > 0) {
                        var article = sessionStorage.getItem("article" + placeArticle);
                        var quantExistant = parseInt(article.toString().split(' ')[1]);
                        var quantFinal = parseInt(quant) + parseInt(quantExistant);
                        nmbrArticle_Total = nmbrArticle_Total + quant;
                        
                        sessionStorage.setItem("article" + placeArticle, idProd + ' ' + quantFinal);
                        sessionStorage.setItem("nombreArticle_Total", nmbrArticle_Total);
                    } else {
                        nmbrArticle_Distinct++;
                        nmbrArticle_Total = nmbrArticle_Total + quant;
    
                        sessionStorage.setItem("article" + nmbrArticle_Distinct, idProd + ' ' + quant);
                        sessionStorage.setItem("nombreArticle_Distinct", nmbrArticle_Distinct);
                        sessionStorage.setItem("nombreArticle_Total", nmbrArticle_Total);
                    }
                    location.reload();
                }
            }
        });
    }
}

function initPanier() {
    var totalPrice = 0;
    for (let a = 1; a <= nmbrArticle_Distinct; a++) {
        var content = document.querySelector('#wrapperPanier').querySelector('.targetPanier').innerHTML;
        var article = sessionStorage.getItem("article" + a);
        var numCatalog = parseInt(article.toString().split('')[0]);
        var numArticle = parseInt(article.toString().split('')[1]);
        var quant = parseInt(article.toString().split(' ')[1]);

        if(quant > 0) {
            if(numCatalog === 1) {
                var catalog = catalog1
            } else if(numCatalog === 2) {
                var catalog = catalog2
            }
            console.log(catalog[numArticle].image);
    
    
            totalPrice = totalPrice + authQuantity(catalog[numArticle].Id) * parseInt(catalog[numArticle].price);
            document.querySelector(".totalPrice").textContent = 'Pris Total : ' + totalPrice + '€';
    
            // creation of an article
            newContent =    '<section class="article">'+
                                '<h1>' + catalog[numArticle].name + '</h1>'+
                                '<img src="' + catalog[numArticle].image + '" alt="' + catalog[numArticle].name + '">'+
                                '<div class="detail">'+
                                    '<p>'+
                                        '<h2>Description :</h2>'+
                                        '<span>' + catalog[numArticle].description + '</span>'+
                                    '</p>'+
                                    '<p>'+
                                        '<h2>Quantité :</h2>'+
                                        '<span>' + authQuantity(catalog[numArticle].Id) + '</span>'+
                                    '</p>'+
                                    '<p>'+
                                        '<h2>Prix :</h2>'+
                                        '<span>' + catalog[numArticle].price + ' €</span>'+
                                    '</p>'+
                                    '<p>'+
                                        '<i class="fas fa-2x fa-trash-alt delete" place="article'+ a +'" id="'+ catalog[numArticle].Id +'"></i>'+
                                    '</p>'+
                                '</div>'+
                            '</section>';
    
            document.querySelector('#wrapperPanier').querySelector('.targetPanier').innerHTML = content + newContent;
        }
    }

    $('.delete').click(function() {
        var numArticleInPanier = this.getAttribute("place");
        var Id = this.getAttribute("id");
        
        sessionStorage.setItem(numArticleInPanier, Id +' '+ 0);
        console.log(numArticleInPanier);
        location.reload();
    })
}

// Initialization of the page
initPanier();
loadArticle();
// END - Initialization

$('.selectCatalogue').click(() => {
    loadArticle()
});

$(".inputSearch").on('input', () => {
    loadArticle();
})


// gestion nombre articles
if (nmbrArticle_Distinct > 0) {
    document.querySelector('nav').querySelector('i').textContent = nmbrArticle_Total;
}
