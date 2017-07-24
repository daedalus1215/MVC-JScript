var PenguinModel = function PenguinModel(XMLHttpRequest) {
    this.XMLHttpRequest = XMLHttpRequest;
};


PenguinModel.prototype.getPenguin = function getPenguin(index, fn) {
    var oReq = new this.XMLHttpRequest();

    oReq.onload = function onload(e) {
        var ajaxResponse = JSON.parse(e.currentTarget.responseText);
        // the index must be an integer type, else this fails
        var penguin = ajaxResponse[index];

        penguin.index = index;
        penguin.count = ajaxResponse.length;

        fn(penguin);
    };

    oReq.open('GET', 'https://codepen.io/beautifulcoder/pen/vmOOLr.js', true);
    oReq.send();
};