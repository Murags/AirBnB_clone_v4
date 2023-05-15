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
        console.log(data);

        if (data.status == 'OK'){
            console.log("yes");
            $('#api_status').addClass('available');
        }
        else{
            $('#api_status').removeClass('available');
        }
    })
    .catch(error => {
        console.error('Error:', error)
    });
})
