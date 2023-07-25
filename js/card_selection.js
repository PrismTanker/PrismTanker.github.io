// TODO unshittify
const CARDHTML = [
`<div class=\"card_button\" onClick=\"toggleCardCount(this)\" data-set=\"`, 
`\" data-card_no=\"`,
`\">
    <img src=\"`, 
    `\" alt=\"`,
    `\">
    <img src=\"images/double_card.png\" alt=\"Double Selection\">
</div>` 
];

var filterText = "";

function toggleSelector() {
    if ($("#card_selector").hasClass("toggled")) {
        $("#card_selection_button").html("Apply");
        showHideSelector();  
    }

    else {
        // Validate Selection
        let epicGamerMoment = true;
        for (set in cardData) { //cardData defined in load_data.js
            if (set != PATH) { // PATH defined in load_data.js
                let count = 0;
                cardSet = cardData[set].cards;
                for (card in cardSet) {
                    count += cardSet[card].selectCount;
                }
                if (count < SELECTIONSIZE) { // SELECTIONSIZE defined in scenareo_selection.js
                    epicGamerMoment = false;
                }
            }
        }

        if (epicGamerMoment) {
            $("#invalid_selection_warning").addClass("hidden"); // Clear warning text if visible
            $("#card_selection_button").html("Card Selection");
            showHideSelector();
        }
        else {
            // Warn user of invalid selection
            $("#invalid_selection_warning").removeClass("hidden");
        } 
    }
}

function showHideSelector() {
    [   //We have decided it is real fuck it hours in terms of formatting
        $("#initial_prompt"), 
        $("#the_tool"), 
        $("#card_selector")].forEach(
        function (e) {//forEach behaves differently to Jquery each
            $(e).toggleClass("toggled");
        }
    );
}

function initBrowser() {
    // TODO clear existing elements (for lanugage change reruns)
    for (set in cardData) {
        if (set != PATH) {
            let dset = cardData[set];
            let cardSet = dset.cards;
            for (card in cardSet) {
                $("#card_display").append(
                        CARDHTML[0] +
                        String(set) +
                        CARDHTML[1] +
                        String(card) +
                        CARDHTML[2] +
                        pathJoin([ //pathJoin defined in script.js
                            cardData.path, 
                            dset.path, 
                            cardSet[card].img
                        ]) + 
                        CARDHTML[3] +
                        cardSet[card].name + 
                        CARDHTML[4] 
                );
            }
            $("#card_display").children(".card_button").each(function (e) {
                updateCardDisplay(this);
            });
        }
    }
}

function filterCards() {
    $(".card_button").each(function (i) {
        //Filter cards
        let set = $(this).attr("data-set");
        let card = cardData[set].cards[$(this).attr("data-card_no")];

        if (
                $("#"+ set + "_filter").is(":checked") &&
                (
                    filterText.length <= 0 ||
                    card.name.toLowerCase().includes(filterText) ||
                    card.desc.toLowerCase().includes(filterText)
                )                
        ) {
            $(this).removeClass("hidden"); //Will not duplicate
        }

        else {
            $(this).addClass("hidden"); //Conducts existence check
        }
    })
}

function updateCardDisplay(cardDisplay) {
    let noSelected = cardData[$(cardDisplay).attr("data-set")].cards[$(cardDisplay).attr("data-card_no")].selectCount;

    // Double card Indicator
    if (noSelected < 2) {
        $($(cardDisplay).children("img").last()[0]).addClass("hidden"); //last should only return single element
    }
    else {
        $($(cardDisplay).children("img").last()[0]).removeClass("hidden");
    }

    // Card unselected
    if (noSelected > 0) {
        $($(cardDisplay).children("img").first()[0]).removeClass("unselected");
    }
    else {
        $($(cardDisplay).children("img").first()[0]).addClass("unselected");
    }
}

function toggleCardCount(cardDisplay) {
    let val = cardData[$(cardDisplay).attr("data-set")].cards[$(cardDisplay).attr("data-card_no")].selectCount;
    cardData[$(cardDisplay).attr("data-set")].cards[$(cardDisplay).attr("data-card_no")].selectCount = (val + 1) % 3;
    updateCardDisplay(cardDisplay);
}
