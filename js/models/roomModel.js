/**
 * The state of each room is stored in our models to centralize the data
 * and make it observable by other components.
 */

var RoomModel = function(name) {
  this.name = name;

  // Default values
  this.isLightOn = false;
  this.isCurtainsOpened = false;
  this.temperature = 0;

  // Model events
  this.lightEvent = new Event(this);
  this.curtainsEvent = new Event(this);
  this.temperatureEvent = new Event(this);
};

RoomModel.prototype = {
  /* -------------------- Getters ----------------- */

  getLightState: function() {
    serverApi.getRoomLightState(this.name).done(this.onLightChange.bind(this));
  },

  getCurtainsState: function() {
    serverApi
      .getRoomCurtainsState(this.name)
      .done(this.onCurtainsChange.bind(this));
  },

  getTemperature: function() {
    serverApi
      .getRoomTemperature(this.name)
      .done(this.onTemperatureChange.bind(this));
  },

  /* -------------------- Setters ----------------- */

  switchLight: function(isLightOn) {
    serverApi
      .changeRoomProperty(this.name, 'light', isLightOn)
      .done(this.onLightChange.bind(this));
  },

  moveCurtains: function(isCurtainsOpened) {
    serverApi
      .changeRoomProperty(this.name, 'curtains', isCurtainsOpened)
      .done(this.onCurtainsChange.bind(this));
  },

  changeTemperature: function(newTemp) {
    serverApi
      .changeRoomProperty(this.name, 'temperature', newTemp)
      .done(this.onTemperatureChange.bind(this));
  },

  /* -------------------- Server Event Callbacks ----------------- */

  onLightChange: function(isLightOn) {
    this.isLightOn = isLightOn;
    this.lightEvent.notify();
  },

  onCurtainsChange: function(isCurtainsOpened) {
    this.isCurtainsOpened = isCurtainsOpened;
    this.curtainsEvent.notify();
  },

  onTemperatureChange: function(newTemp) {
    this.temperature = newTemp;
    this.temperatureEvent.notify();
  }
};
