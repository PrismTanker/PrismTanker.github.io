const SELECTIONSIZE = 3

var active_selection = {};

function clear_prompt() {
    $("#initial_prompt").css({"display": "none"});
    $("#the_tool").css({"display": "inline"});
    init_tool();
} 

function init_tool() {
    let theChosenOnes = {};
    for (set in cardData) { // cardData defined in load_data.js
        if (set != PATH){ // PATH defined in load_data.js
            // Build weighted set of card indexes
            let selectionIndicies = [];
            dset = cardData[set]
            cardSet = dset.cards;
            for (cardIndex in cardSet) {
                for (let i = 0; i < cardSet[cardIndex].selectCount; i++){
                    selectionIndicies.push(cardIndex);
                }
            }

            // Select distinct cards (mimicking random card draw as close as possible)
            theChosenOnes[set] = [];
            while (theChosenOnes[set].length < SELECTIONSIZE){
                if (selectionIndicies.length <= 0) {
                    throw new Error("Selected Card List Exhausted (This should not happen)");
                }
                choice = Math.floor(Math.random() * selectionIndicies.length);
                candidate = selectionIndicies[choice];
                selectionIndicies.splice(choice, 1); // Remove candidate from list
                if (!theChosenOnes[set].includes(candidate)) {
                    theChosenOnes[set].push(candidate);
                }
            }

            // Build Card set
            rootImgFolder = cardData.path;
            setFolder = dset.path;
            active_selection[set] = [pathJoin([rootImgFolder, setFolder, dset.default.img])];// Always include base card
            for (i in theChosenOnes[set]) {
                active_selection[set].push(pathJoin([rootImgFolder, setFolder, cardSet[theChosenOnes[set][i]].img]));
            }

            // Display cards
            imBlocks = $('#'.concat(set, "_tool > .card_row img"))
            for (i in imBlocks) {
                imBlocks[i].src = active_selection[set][i]
            }
        }                    
    }
}