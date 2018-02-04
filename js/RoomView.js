var RoomView = function(model) {
  this.model = model;

  this.lightEvent = new Event(this);
  this.curtainsEvent = new Event(this);
  this.temperatureEvent = new Event(this);

  this.init();
};

RoomView.prototype = {
  init: function() {
    this.build().setupHandlers();
  },

  build: function() {
    var room = this.model;
    var lightId = room.name + '-light';
    var curtainsId = room.name + '-curtains';
    var temperatureId = room.name + '-temperature';

    var html = '<li class="pas inbl"><form><fieldset>';
    html += '<legend>' + room.name + ':</legend>';

    html +=
      '<div class="flex-container"><label for="' +
      lightId +
      '" class="label flex-item-fluid"> Light </label>';
    html += '<input id="' + lightId + '" type="checkbox" class="switch"></div>';

    html +=
      '<div class="flex-container"><label for="' +
      curtainsId +
      '" class="label flex-item-fluid"> Curtains </label>';
    html +=
      '<input id="' + curtainsId + '" type="checkbox" class="switch"></div>';

    html +=
      '<div class="flex-container"><label for="' +
      temperatureId +
      '" class="label flex-item-fluid"> Temperature </label>';

    html += '<input id="' + temperatureId + '" type="number"></div>';
    html += '</fieldset></form></li>';

    this.$container = $('#switchboard');
    this.$container.append(html);

    this.$lightSwitch = this.$container.find('#' + lightId);
    this.$curtainsSwitch = this.$container.find('#' + curtainsId);
    this.$temperatureInput = this.$container.find('#' + temperatureId);

    //Init
    this.onLightChange();
    this.onCurtainsChange();
    this.onTemperatureChange();

    return this;
  },

  setupHandlers: function() {
    this.$lightSwitch.change(this.switchLightButton.bind(this));
    this.$curtainsSwitch.change(this.moveCurtainsButton.bind(this));
    this.$temperatureInput.keyup(this.temperatureInput.bind(this));

    /**
     * Event Dispatcher
     */

    this.model.lightEvent.attach(this.onLightChange.bind(this));
    this.model.curtainsEvent.attach(this.onCurtainsChange.bind(this));
    this.model.temperatureEvent.attach(this.onTemperatureChange.bind(this));

    return this;
  },

  switchLightButton: function() {
    var val = this.$lightSwitch.prop('checked');
    this.lightEvent.notify(val);
  },

  moveCurtainsButton: function() {
    var val = this.$curtainsSwitch.prop('checked');
    this.curtainsEvent.notify(val);
  },

  temperatureInput: function() {
    var val = parseInt(this.$temperatureInput.val());
    if (!isNaN(val)) {
      this.temperatureEvent.notify(val);
    }
  },

  /* -------------------- Handlers From Event Dispatcher ----------------- */

  onLightChange: function() {
    this.$lightSwitch.prop('checked', this.model.isLightOn);
  },

  onCurtainsChange: function() {
    this.$curtainsSwitch.prop('checked', this.model.isCurtainsOpened);
  },

  onTemperatureChange: function() {
    this.$temperatureInput.val(this.model.temperature);
  }
};
