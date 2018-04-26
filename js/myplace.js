function showMyPlaces() {
    var myPlaces = JSON.parse(localStorage.myPlaceList) || [];
    $myplace.empty();
    myPlaces.forEach(element => {
        $imgDiv = createImgCard(element.name, element.url, false);
        $myplace.append($imgDiv);
    });
}