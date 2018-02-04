var RoomController = function(model, view) {
  this.model = model;
  this.view = view;

  this.init();
};

RoomController.prototype = {
  init: function() {
    this.setupHandlers();
  },

  setupHandlers: function() {
    /**
     * Event Dispatcher
     */
    this.view.lightEvent.attach(this.switchLight.bind(this));
    this.view.curtainsEvent.attach(this.moveCurtains.bind(this));
    this.view.temperatureEvent.attach(this.changeTemperature.bind(this));

    return this;
  },

  /* -------------------- Handlers From Event Dispatcher ----------------- */
  switchLight: function(sender, args) {
    this.model.switchLight(args);
  },

  moveCurtains: function(sender, args) {
    this.model.moveCurtains(args);
  },

  changeTemperature: function(sender, args) {
    this.model.changeTemperature(args);
  }
};
