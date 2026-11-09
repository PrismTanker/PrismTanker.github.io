// Thank you to Rob M from https://stackoverflow.com/questions/29855098/is-there-a-built-in-javascript-function-similar-to-os-path-join
function pathJoin(parts, sep){
    var separator = sep || '/';
    var replace   = new RegExp(separator+'{1,}', 'g');
    return parts.join(separator).replace(replace, separator);
 }

$(document).ready(function () {
    // Make user events availible
    $("#initial_prompt>button").on("click", clear_prompt)
    $("#card_selection_button").on("click", toggleSelector)
    
    $("#filters>input[type='checkbox']").on("change", filterCards) //on should add to all selected TODO check if can do elsewhere
    $("#text_filter").on("keypress", function (e) {
        if (e.code === "Enter") {
            filterText = $(this).val().toLowerCase(); //filterText defined in card_selection.js
            filterCards()
        }
    })
    // console.log("If you are reading this then (theoretically) despite all odds my code loaded without catastropohic failure")
})