var RoomModel = function(name, isLightOn, isCurtainsOpened, temperature) {
  this.name = name;
  this.isLightOn = isLightOn;
  this.isCurtainsOpened = isCurtainsOpened;
  this.temperature = temperature;

  this.lightEvent = new Event(this);
  this.curtainsEvent = new Event(this);
  this.temperatureEvent = new Event(this);
};

RoomModel.prototype = {
  switchLight: function(isLightOn) {
    // send to server
    serverApi
      .changeRoomProperty(this.name, 'light', isLightOn)
      .done(this.onLightChange.bind(this));
  },

  moveCurtains: function(isCurtainsOpened) {
    // send to server
    serverApi
      .changeRoomProperty(this.name, 'curtains', isCurtainsOpened)
      .done(this.onCurtainsChange.bind(this));
  },

  changeTemperature: function(newTemp) {
    // send to server
    serverApi
      .changeRoomProperty(this.name, 'temperature', newTemp)
      .done(this.onTemperatureChange.bind(this));
  },

  /* 
    Server Event Callbacks
  */

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
