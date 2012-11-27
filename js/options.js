document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("showNA").addEventListener("click", function () { localStorage.showNA = (this.checked ? '1' : '0'); });
    document.getElementById("imgLocation").addEventListener("change", function () { localStorage.imgLocation = this[this.selectedIndex].value; fillPreviewIcons(); });
});

function fillPreviewIcons() {
    var divobj = document.getElementById("preview_icons");
    var content = "";
    var foldericons = localStorage.imgLocation;
    
    for (var i = -1; i <= 10; i++) {
        content += "<img src=\"images/numbers/" + foldericons + "/icon" + i + ".png\" />";
    }

    divobj.innerHTML = content;
}


function fillValues() {
    if (localStorage.showNA == "1")
        document.getElementById("showNA").checked = true;

    for (var i = 0; i < document.getElementById("imgLocation").length; i++) {
        if (localStorage.imgLocation == document.getElementById("imgLocation")[i].value) {
            document.getElementById("imgLocation")[i].selected = true;
        }
    }
}

fillValues();
fillPreviewIcons();