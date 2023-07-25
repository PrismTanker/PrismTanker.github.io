const DATAPATH = "database.json";
const DEFAULTSELECTIONCOUNT = 1;

//To be skipped in iteration all over the shop
PATH = "path"

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
            if (set != PATH) {
                cardSet = cardData[set].cards; //.cards and ['cards'] are equivilant
                for (cardIndex in cardSet) {
                    cardSet[cardIndex].selectCount = DEFAULTSELECTIONCOUNT;
                } 
            }           
        }
        // putting this here for now, probably restructure this when adding languages
        init_browser()
        filter_cards()
        
        $.holdReady(false)
    }
});

