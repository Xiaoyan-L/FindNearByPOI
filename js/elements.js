function createImgCard(name, url, needBtn) {
    var $image_card = $('<div/>', {
        "class": 'card' 
    });
    var $img = $('<img/>', {
        'src': url,
        'alt': name,
        'class': 'card-img-top img-fluid'
    });
    var $card_body = $('<div/>', {
        "class": 'card-body'   
    });
    var $card_name = $('<h5/>', {
        'class': 'card-title',
        text: name
    })
    $card_body.append($card_name);
    if(needBtn) {
        var $pin_btn = $('<a/>', {
            text: 'save',
            "class": 'btn btn-danger text-white',
            herf: '#',
            on: {
                click: function() {
                    //TODO: if photo has already saved, give a message or disable button
                    var myplace = {
                        name: name,
                        url: url
                    }
                    if (!localStorage.myPlaceList) {
                        localStorage.myPlaceList = JSON.stringify([myplace]);
                    } else {
                        var placeList = JSON.parse(localStorage.myPlaceList);
                        placeList.push(myplace);
                        localStorage.myPlaceList = JSON.stringify(placeList);
                    }
                    alert("You saved this photo successfully!");
                }
            }
        });
       $card_body.append($pin_btn);  
    }
    $image_card.append($img);
    $image_card.append($card_body);
    
    return $image_card;
}