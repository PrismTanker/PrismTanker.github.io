const DATAPATH = "database.json";
const DEFAULTSELECTIONCOUNT = 1;
// Fixed headings in json database

$.holdReady(true) //Corresponding Release in below ajax callback
var cardData;
$.ajax({
    url: DATAPATH,
    async: true, //Asynch false depreciated, using holdReady method instead
    dataType: 'json',
    success: function (json) {
        cardData = json;

        // Set default selected status for each card
        for (set in cardData) {
            cardSet = cardData[set].cards; //.cards and ['cards'] are equivilant
            for (cardIndex in cardSet) {
                card = cardSet[cardIndex];
                card.selectCount = DEFAULTSELECTIONCOUNT;
            }            
        }

        $.holdReady(false)
    }
});