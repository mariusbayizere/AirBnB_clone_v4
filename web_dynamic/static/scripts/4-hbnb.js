$(document).ready(function() {
    const url = 'http://0.0.0.0:5001/api/v1/places_search/';
    
    function fetchPlaces(data) {
        $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(places) {
                $('section.places').empty();
                places.forEach(function(place) {
                    $('section.places').append(
                        `<article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                            </div>
                            <div class="description">
                                ${place.description}
                            </div>
                        </article>`
                    );
                });
            },
            error: function(error) {
                console.error(error);
            }
        });
    }

    // Initial fetch without filters
    fetchPlaces({});

    // Fetch places when the Search button is clicked
    $('button').click(function() {
        const amenities = [];
        $('div.amenities input:checked').each(function() {
            amenities.push($(this).attr('data-id'));
        });
        fetchPlaces({ amenities: amenities });
    });
});
