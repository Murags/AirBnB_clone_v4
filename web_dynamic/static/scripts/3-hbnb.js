let amenities = {};
document.addEventListener("DOMContentLoaded", function (){
    $(".popover ul input").change(function (){
        let amenity_id = $(this).attr("data-id");
        let amenity_name = $(this).attr("data-name");

        if ($(this).is(":checked")){
            amenities[amenity_id] = amenity_name;
        }
        else{
            delete amenities[amenity_id];
        }

        let amenities_list = Object.values(amenities).join(', ');

        $('.amenities h4').html(amenities_list);
    });

    fetch('http://localhost:5001/api/v1/status/')
    .then(response=>{
        return response.json();
    })
    .then(data =>{
        if (data.status == 'OK'){
            $('#api_status').addClass('available');
        }
        else{
            $('#api_status').removeClass('available');
        }
    })
    .catch(error => {
        console.error('Error:', error)
    });

    fetch('http://localhost:5001/api/v1/places_search/', {method:"POST",
    headers:{'Content-Type': "Application/json"},
    body:JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        for (const place of data) {
            let article = document.createElement('article');
            let title_box = document.createElement('div');
            title_box.setAttribute('class', 'title_box');
            let place_name = document.createElement('h2');

            place_name.innerHTML = place.name;
            title_box.append(place_name);

            let price_by_night = document.createElement('div');
            price_by_night.setAttribute('class', 'price_by_night');
            price_by_night.innerHTML = place.price_by_night;
            title_box.append(price_by_night);
            article.append(title_box);

            let information = document.createElement('div');
            information.setAttribute('class', 'information');

            let max_guest = document.createElement('div');
            max_guest.setAttribute('class', 'max_guest');
            max_guest.innerHTML = `${place.max_guest} Guest`;

            let number_rooms = document.createElement('div');
            number_rooms.setAttribute('class', 'number_rooms');
            number_rooms.innerHTML = `${place.number_rooms} Bedrooms`;

            let number_bathrooms = document.createElement('div');
            number_bathrooms.setAttribute('class', 'number_bathrooms');
            number_bathrooms.innerHTML = `${place.number_bathrooms} bathrooms`;

            information.append(max_guest);
            information.append(number_rooms);
            information.append(number_bathrooms);

            article.append(information);

            // let user = document.createElement('div');
            // user.setAttribute('class', 'user');
            // user.innerHTML= place.user.first_name;

            // article.append(user);

            let description = document.createElement('div');
            description.setAttribute('class', 'description');
            description.innerHTML = place.description;

            article.append(description);

            document.querySelector('.places').append(article);
        };
});
})
