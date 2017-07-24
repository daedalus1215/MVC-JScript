var PenguinController = function PenguinController(penguinView, penguinModel) {
    this.penguinView = penguinView;
    this.penguinModel = penguinModel;
};


PenguinController.prototype.initialize = function initialize() {
    this.penguinView.onClickGetPenguin = this.onClickGetPenguin.bind(this);
};

PenguinController.prototype.onClickGetPenguin = function onClickGetPenguin(e) {
    var target = e.currentTarget;
    var index = parseInt(target.dataset.penguinIndex, 10);

    this.penguinModel.getPenguin(index, this.showPenguin.bind(this));
};

PenguinController.prototype.showPenguin = function showPenguin(penguinModelData) {
    var penguinViewModel = {
        name: penguinModelData.name,
        imageUrl: penguinModelData.imageUrl,
        size: penguinModelData.size,
        favoriteFood: penguinModelData.favoriteFood
    };

    penguinViewModel.previousIndex = penguinModelData.index - 1;
    penguinViewModel.nextIndex = penguinModelData.index + 1;

    if (penguinModelData.index === 0) {
        penguinViewModel.previousIndex = penguinModelData.count - 1;
    }

    if (penguinModelData.index === penguinModelData.count - 1) {
        penguinViewModel.previousIndex = penguinModelData.count - 1;
    }

    this.penguinView.render(penguinViewModel);
};

/// MODEL

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



/// VIEW

var PenguinView = function PenguinView(element) {
    this.element = element;

    this.onClickGetPenguin = null;
}



PenguinView.prototype.render = function render(viewModel) {
    this.element.innerHTML = '<h3>' + viewModel.name + '</h3>' +
        '<img class="penguin-image" src="' + viewModel.imageUrl +
        '" alt="' + viewModel.name + '" />' +
        '<p><b>Size:</b> ' + viewModel.size + '</p>' +
        '<p><b>Favorite food:</b> ' + viewModel.favoriteFood + '</p>' +
        '<a id="previousPenguin" class="previous button" href="javascript:void(0);"' +
        ' data-penguin-index="' + viewModel.previousIndex + '">Previous</a> ' +
        '<a id="nextPenguin" class="next button" href="javascript:void(0);"' +
        ' data-penguin-index="' + viewModel.nextIndex + '">Next</a>';

    this.previousIndex = viewModel.previousIndex;
    this.nextIndex = viewModel.nextIndex;

    // Wire up click events, and let the controller handle events
    var previousPenguin = this.element.querySelector('#previousPenguin');
    previousPenguin.addEventListener('click', this.onClickGetPenguin);

    var nextPenguin = this.element.querySelector('#nextPenguin');
    nextPenguin.addEventListener('click', this.onClickGetPenguin);
    nextPenguin.focus();
};