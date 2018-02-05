var RoomView = function(model) {
  this.model = model;

  this.lightEvent = new Event(this);
  this.curtainsEvent = new Event(this);
  this.temperatureEvent = new Event(this);

  this.init();
};

RoomView.prototype = {
  init: function() {
    this.build()
      .setupHandlers()
      .getContent();
  },

  build: function() {
    var room = this.model;
    var lightId = room.name + '-light';
    var curtainsId = room.name + '-curtains';
    var temperatureId = room.name + '-temperature';

    var html =
      `
        <li class="mdl-list__item">
            <div class="room-view ` +
      room.name +
      `-card mdl-card mdl-shadow--2dp">
                <div class="mdl-card__title mdl-card--expand">
                    <h2 class="mdl-card__title-text">` +
      room.name +
      `</h2>
                </div>
            <div class="mdl-card__supporting-text">
    `;

    html +=
      `<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="` +
      lightId +
      `">
        <input type="checkbox" id="` +
      lightId +
      `" class="mdl-switch__input">
        <span class="mdl-switch__label">Light</span>
      </label>`;

    html +=
      `<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="` +
      curtainsId +
      `">
        <input type="checkbox" id="` +
      curtainsId +
      `" class="mdl-switch__input">
        <span class="mdl-switch__label">Curtains</span>
      </label>`;

    html +=
      `
    <form action="#">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="` +
      temperatureId +
      `">
            <label class="mdl-textfield__label" for="` +
      temperatureId +
      `">Temperature...</label>
            <span class="mdl-textfield__error">Input is not a number!</span>
        </div>
    </form>`;

    html += `
        </div>
    </div>`;

    this.$container = $('#switchboard');
    this.$container.append(html);

    this.$lightSwitch = this.$container.find('#' + lightId);
    this.$curtainsSwitch = this.$container.find('#' + curtainsId);
    this.$temperatureInput = this.$container.find('#' + temperatureId);

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

  getContent: function() {
    this.model.getLightState();
    this.model.getCurtainsState();
    this.model.getTemperature();
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
