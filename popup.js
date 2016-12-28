var PopupController = function () {
    this.button_ = document.getElementByID('button');
    this.date_ = document.getElementByID('date');
    this.time_ = document.getElementByID('time');
    this.hours_ = document.getElementByID('hours');
    this.addListeners_();
};

function handleClick() {
    console.log("hello");
    getHTTP();
}

PopupController.prototype = {
    button_: null,
    date_: null,
    time_: null,
    hours_: null,
    addListeners_: function () {
        this.button_.addEventListener('click', this.handleClick_.bind(this));
    }
};

document.addEventListener('DOMContentLoaded', function (){
    window.PC = new PopupContoller();
});