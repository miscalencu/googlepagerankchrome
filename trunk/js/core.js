function setDefaultVariables() {

    if (!localStorage.showNA) {
        localStorage.showNA = "1";
    }

    if (!localStorage.imgLocation) {
        localStorage.imgLocation = "transparent";
    }
}

setDefaultVariables();