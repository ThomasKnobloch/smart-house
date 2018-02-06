/**
 * Responsible for receiving user events (forwarded by the view)
 * and updating the model.
 */

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
    // Listen to view's events
    this.view.lightEvent.attach(this.switchLight.bind(this));
    this.view.curtainsEvent.attach(this.moveCurtains.bind(this));
    this.view.temperatureEvent.attach(this.changeTemperature.bind(this));

    return this;
  },

  /* -------------------- View Event Dispatcher Listeners ----------------- */

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
