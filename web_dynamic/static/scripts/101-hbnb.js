$(document).ready(function() {
    const url = 'http://0.0.0.0:5001/api/v1/places_search/';
    const reviewUrl = 'http://0.0.0.0:5001/api/v1/reviews/';
    let reviewsLoaded = false;

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

    function fetchReviews() {
        $.ajax({
            url: reviewUrl,
            type: 'GET',
            contentType: 'application/json',
            success: function(reviews) {
                $('div.reviews').empty();
                reviews.forEach(function(review) {
                    $('div.reviews').append(
                        `<article>
                            <div class="review_text">${review.text}</div>
                            <div class="review_user">by ${review.user.first_name} ${review.user.last_name}</div>
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

    const selectedAmenities = {};
    const selectedStates = {};
    const selectedCities = {};

    function updateLocationsText() {
        const selected = [...Object.values(selectedStates), ...Object.values(selectedCities)];
        $('div.locations h4').text(selected.join(', '));
    }

    $('div.amenities input[type="checkbox"]').change(function() {
        if (this.checked) {
            selectedAmenities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete selectedAmenities[$(this).attr('data-id')];
        }
    });

    $('div.locations input[type="checkbox"]').change(function() {
        const id = $(this).attr('data-id');
        const name = $(this).attr('data-name');
        if (this.checked) {
            if ($(this).parent().parent().is('ul')) {
                selectedCities[id] = name;
            } else {
                selectedStates[id] = name;
            }
        } else {
            if ($(this).parent().parent().is('ul')) {
                delete selectedCities[id];
            } else {
                delete selectedStates[id];
            }
        }
        updateLocationsText();
    });

    // Fetch places when the Search button is clicked
    $('button').click(function() {
        const amenities = Object.keys(selectedAmenities);
        const states = Object.keys(selectedStates);
        const cities = Object.keys(selectedCities);

        fetchPlaces({ amenities: amenities, states: states, cities: cities });
    });

    // Toggle reviews on click
    $('span.toggle-reviews').click(function() {
        if (reviewsLoaded) {
            $('div.reviews').empty();
            $(this).text('show');
            reviewsLoaded = false;
        } else {
            fetchReviews();
            $(this).text('hide');
            reviewsLoaded = true;
        }
    });
});
