// Thank you to Rob M from https://stackoverflow.com/questions/29855098/is-there-a-built-in-javascript-function-similar-to-os-path-join
function pathJoin(parts, sep){
    var separator = sep || '/';
    var replace   = new RegExp(separator+'{1,}', 'g');
    return parts.join(separator).replace(replace, separator);
 }

$(document).ready(function () {
    // Make user events availible
    $("#initial_prompt>button").on("click", clear_prompt)
    console.log("If you are reading this then I somehow got this page to load without a catastrpohic failure")
})