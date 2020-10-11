/*$(document).ready(function () {
    var map = null;
    var geocoder = null;
    var lat;
    var lng;
    var marker;

    function showAddress (address) {
        $('#locationAddress').val(address);

        if (GBrowserIsCompatible()) {
            map = new GMap2(document.getElementById("map"));
            map.setCenter(new GLatLng(lat, lng), 1);
            map.setUIToDefault();
            geocoder = new GClientGeocoder();
            googleCoder(address);           
        }      
    }

    function googleCoder (address) {
        geocoder.getLatLng(
            address,
            function (point) {
                if (!point) {
                    null
                } else {
                    console.log(point)
                    map.setCenter(point, 15);
                    var marker = new GMarker(point, {draggable: true});
                    map.addOverlay(marker);

                    lat = marker.getLatLng().lat;
                    lng = marker.getLatLng().lng;
                    $('#locationAddress').attr('lat', marker.getLatLng().lat)
                    $('#locationAddress').attr('lng', marker.getLatLng().lng)

                    GEvent.addListener(marker, "dragend", function () {
                        marker.openInfoWindowHtml(marker.getLatLng().toUrlValue(6));
                    });


                    GEvent.addListener(marker, "click", function () {
                        $('#lat').val($.parseJSON(JSON.stringify(marker.getLatLng())).lat);
                        $('#lng').val($.parseJSON(JSON.stringify(marker.getLatLng())).lng);
                    });
                    GEvent.trigger(marker, "click");
                }
            }
        );
    }   

    $('body').on('keyup', '#address', function () {
        showAddress($(this).val());
    });


});*/