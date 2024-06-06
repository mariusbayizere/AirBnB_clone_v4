$(document).ready(function() {
  const amenities = {};

  $('input[type="checkbox"]').change(function() {
    if (this.checked) {
      amenities[$(this).data('id')] = $(this).data('name');
    } else {
      delete amenities[$(this).data('id')];
    }
    const amenityNames = Object.values(amenities);
    if (amenityNames.length > 0) {
      $('div.amenities h4').text(amenityNames.join(', '));
    } else {
      $('div.amenities h4').html('&nbsp;');
    }
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
