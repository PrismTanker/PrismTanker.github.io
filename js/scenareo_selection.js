const SELECTIONSIZE = 3
var activeSelection;

function clear_prompt() {
    $("#tool_reset").on("click", init_tool);
    $("#initial_prompt").addClass("hidden");
    $("#the_tool").removeClass("hidden");
    init_tool();
} 

function init_tool() {
    // Reset tool visibility
    $("#card_selector").removeClass("hidden");
    $("#results_display").addClass("hidden");

    //Reset prompts
    $("#the_tool > h1:first-child").html("Eliminate cards by selecting them")
    $("#tool_reset").siblings("h3").each(function (i) { // should contain a single element
        $(this).html("You can reselect cards and start again at any time")
    });

    activeSelection = {"remainingSets": 0};
    for (set in cardData) { // TODO should probably break this down into functions. // cardData defined in load_data.js
        if (set != PATH){  // PATH defined in load_data.js
            // Build weighted set of card indexes
            let selectionIndicies = [];
            dset = cardData[set];
            cardSet = dset.cards;
            for (cardIndex in cardSet) {
                for (let i = 0; i < cardSet[cardIndex].selectCount; i++){
                    selectionIndicies.push(cardIndex);
                }
            }

            // Select distinct cards (mimicking random card draw as close as possible)
            theChosenOnes = [];
            while (theChosenOnes.length < SELECTIONSIZE){
                if (selectionIndicies.length <= 0) {
                    // Implies a fucky wucky with card selection restrictions
                    throw new Error("Selected Card List Exhausted (This should not happen)");
                }

                choice = Math.floor(Math.random() * selectionIndicies.length);
                candidate = selectionIndicies[choice];
                selectionIndicies.splice(choice, 1); // Remove candidate from list
                if (!theChosenOnes.includes(candidate)) {
                    theChosenOnes.push(candidate);
                }
            }

            // Build Card set
            rootImgFolder = cardData.path;
            setFolder = dset.path;
            activeSelection.remainingSets++;
            activeSelection[set] = [{"selectionID": 0, "name": dset.default.name, "path": pathJoin([rootImgFolder, setFolder, dset.default.img])}];// Always include base card
            for (i in theChosenOnes) {
                activeSelection[set].push({"selectionID": parseInt(i)+1, "name": cardSet[theChosenOnes[i]].name, "path": pathJoin([rootImgFolder, setFolder, cardSet[theChosenOnes[i]].img])}); //pathJoin defined in script.js
            }

            // Display cards
            imgParent = '#'.concat(set, "_tool > .card_row")
            $(imgParent.concat(" img")).each(function (i) { //Storing and iterating over $(selection) has iterable metadata and goes goofy, use each instead.
                $(this).attr({ // Remember to wrap things in $ to use JQuery methods
                    "src": activeSelection[set][i].path, // Realistically at this point I should be using a backend database but, uh, No.
                    "alt": activeSelection[set][i].name,
                    "data-selID": activeSelection[set][i].selectionID //Unique ID to map element back to internal representation
                });
                $(this).removeClass("hidden locked")
            });
            
            // If not set up, configure event handlers while we are here. Apparantly its bad practice to add event handlers to children directly
            $(imgParent).each(function (i) { // Should only contain one element
                if(this.onclick == undefined) {
                    (function (t,s) {
                        t.onclick = function (event) { // Alternate click event add method, detectable by the above if statement but only allows one handler
                            selectCard(event.target, s);
                        }
                    }) (this,set); // IIFE to capture current set value
                }
            });
        }                    
    }
}

function selectCard(card, set) {
    if (activeSelection[set].length > 1) {
        $(card).addClass("hidden");
        // Remove card from candidates
        activeSelection[set] = activeSelection[set].filter(choice => choice.selectionID != $(card).attr('data-selID'));

        if (activeSelection[set].length <= 1) {
            // Store chosen card in results
            $("#".concat(set, "_result > img:first-of-type")).attr({
                "src": activeSelection[set][0].path, //If we overshoot this then we deserve to error
                "alt": activeSelection[set][0].name
            })
            
            // Apply styling to selected card
            $(card).siblings("img[data-selID=\"".concat(activeSelection[set][0].selectionID, "\"]")).each(function (i) { //Should only contain single element
                $(this).addClass("locked");
            });

            activeSelection.remainingSets--;
        }
    }

    if (activeSelection.remainingSets <= 0) {
        displayResults()
    }
}

function displayResults() {
    $("#card_selector").addClass("hidden");
    $("#results_display").removeClass("hidden");
    $("#the_tool > h1:first-child").html("Selected Scenareo")
    $("#tool_reset").siblings("h3").each(function (i) { // should contain a single element
        $(this).html("Choose another Scenareo")
    });
}