const data_json_path = "database.json"

$.holdReady(true) //Corresponding Release in below ajax callback
var card_data;
$.ajax({
    url: data_json_path,
    async: true, //Asynch false depreciated, using holdReady method instead
    dataType: 'json',
    success: function (json) {
        card_data = JSON.parse(json);
        console.log(card_data)
        $.holdReady(false)
    }
});