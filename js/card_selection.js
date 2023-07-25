// TODO unshittify
const CARDHTML = [
`<div class=\"card_button\" onClick=\"toggleCardCount(this)\" data-set=\"`, 
`\" data-card_no=\"`,
`\">
    <img src=\"`, 
    `\" alt=\"`,
    `\">
    <img src=\"images\\Susremaster.png\" alt=\"Double Selection\">
</div>` 
]

function toggleSelector() {
    [   //We have decided it is real fuck it hours in terms of formatting
        $("#initial_prompt"), 
        $("#the_tool"), 
        $("#card_selector")].forEach(
        function (e) {//forEach behaves differently to Jquery each
            $(e).toggleClass("toggled")
        }
    )
}

function init_browser() {
    // TODO clear existing elements (for lanugage change reruns)
    for (set in cardData) { //cardData defined in load_data.js
        if (set != PATH) {
            let dset = cardData[set]
            let cardSet = dset.cards
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
                )
            }
            $("#card_display").children(".card_button").each(function (e) {
                updateCardDisplay(this)
            })
        }
    }
}

function filter_cards() {
    let filterText = $("#text_filter").val()
    $(".card_button").each(function (i) {
        //Filter cards
        let set = $(this).attr("data-set")
        let card = cardData[set][$(this).attr("data-card_no")]
        if (
                $("#"+ set + "_filter").is(":checked") &&
                (//TODO make case insensitive
                    filterText.length <= 0 ||
                    card.name.includes(filterText) ||
                    card.desc.includes(filterText)
                )                
        ) {
            $(this).removeClass("hidden") //Will not duplicate
        }
        else {
            $(this).addClass("hidden") //Conducts existence check
        }
    })
}

function updateCardDisplay(cardDisplay) {
    let noSelected = cardData[$(cardDisplay).attr("data-set")].cards[$(cardDisplay).attr("data-card_no")].selectCount

    // Double card Indicator
    if (noSelected < 2) {
        $($(cardDisplay).children("img").last()[0]).addClass("hidden") //last should only return single element
    }
    else {
        $($(cardDisplay).children("img").last()[0]).removeClass("hidden")
    }

    // Card unselected
    if (noSelected > 0) {
        $($(cardDisplay).children("img").first()[0]).removeClass("unselected")
    }
    else {
        $($(cardDisplay).children("img").first()[0]).addClass("unselected")
    }
}

function toggleCardCount(cardDisplay) {
    let val = cardData[$(cardDisplay).attr("data-set")].cards[$(cardDisplay).attr("data-card_no")].selectCount
    cardData[$(cardDisplay).attr("data-set")].cards[$(cardDisplay).attr("data-card_no")].selectCount = (val + 1) % 3
    updateCardDisplay(cardDisplay)
}