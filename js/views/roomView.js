/**
 * Responsible for the DOM manipulation of the room controllers
 */

var RoomView = function(model) {
  this.model = model;

  this.lightEvent = new Event(this);
  this.curtainsEvent = new Event(this);
  this.temperatureEvent = new Event(this);

  this.init();
};

RoomView.prototype = {
  init: function() {
    this.bindContainer()
      .build()
      .bindChildren()
      .setupHandlers()
      .getContent();
  },

  bindContainer: function() {
    this.$container = $('#switchboard');

    return this;
  },

  /**
   * DOM insertions based on the model's content
   */
  build: function() {
    this.lightId = this.model.name + '-light';
    this.curtainsId = this.model.name + '-curtains';
    this.temperatureId = this.model.name + '-temperature';

    // Room header element
    var html = `
    <li class="mdl-list__item">
        <div class="room-view ${this.model.name}-card mdl-card mdl-shadow--2dp">
            <div class="mdl-card__title mdl-card--expand">
                <h2 class="mdl-card__title-text">${this.model.name}</h2>
            </div>
        <div class="mdl-card__supporting-text">
    `;

    // Room light switch element
    html += `
    <label id="${this.lightId}-switch" class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="${this.lightId}">
        <input type="checkbox" id="${this.lightId}" class="mdl-switch__input">
        <span class="mdl-switch__label">Light</span>
      </label>`;

    // Room curtains switch element
    html += `<label id="${this.curtainsId}-switch" class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="${this.curtainsId}">
        <input type="checkbox" id="${this.curtainsId}" class="mdl-switch__input">
        <span class="mdl-switch__label">Curtains</span>
      </label>`;

    // Room temerature input element
    html += `
    <form action="#">
        <div id="${this.temperatureId}-textfield"class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="${this.temperatureId}">
            <label class="mdl-textfield__label" for="${this.temperatureId}">Temperature...</label>
            <span class="mdl-textfield__error">Input is not a number!</span>
        </div>
    </form>`;

    html += `
        </div>
    </div>`;

    this.$container.append(html);

    // Register new elements for the MDL Library
    componentHandler.upgradeDom();

    return this;
  },

  bindChildren: function() {
    // DOM elements used to listen user events
    this.$lightInput = this.$container.find('#' + this.lightId);
    this.$curtainsInput = this.$container.find('#' + this.curtainsId);
    this.$temperatureInput = this.$container.find('#' + this.temperatureId);
    
    // DOM elements used to update the view (with MDL)
    this.$lightSwitch = this.$container.find('#' + this.lightId + '-switch');
    this.$curtainsSwitch = this.$container.find(
      '#' + this.curtainsId + '-switch'
    );
    this.$temperatureTextField = this.$container.find(
      '#' + this.temperatureId + '-textfield'
    );

    return this;
  },

  setupHandlers: function() {
    this.$lightInput.change(this.switchLightButton.bind(this));
    this.$curtainsInput.change(this.moveCurtainsButton.bind(this));
    this.$temperatureInput.keyup(this.temperatureInput.bind(this));

    // Listen to model's events
    this.model.lightEvent.attach(this.onLightChange.bind(this));
    this.model.curtainsEvent.attach(this.onCurtainsChange.bind(this));
    this.model.temperatureEvent.attach(this.onTemperatureChange.bind(this));

    return this;
  },

  getContent: function() {
    // Retrieve initial data
    this.model.getLightState();
    this.model.getCurtainsState();
    this.model.getTemperature();
  },

  /* -------------------- User Event Listeners ----------------- */

  switchLightButton: function() {
    var val = this.$lightInput.prop('checked');
    this.lightEvent.notify(val);
  },

  moveCurtainsButton: function() {
    var val = this.$curtainsInput.prop('checked');
    this.curtainsEvent.notify(val);
  },

  temperatureInput: function() {
    var val = parseInt(this.$temperatureInput.val());
    if (!isNaN(val)) {
      this.temperatureEvent.notify(val);
    }
  },

  /* -------------------- Model Event Dispatcher Listeners ----------------- */

  onLightChange: function() {
    if (this.model.isLightOn) {
      this.$lightSwitch.get(0).MaterialSwitch.on();
    } else {
      this.$lightSwitch.get(0).MaterialSwitch.off();
    }
  },

  onCurtainsChange: function() {
    if (this.model.isCurtainsOpened) {
      this.$curtainsSwitch.get(0).MaterialSwitch.on();
    } else {
      this.$curtainsSwitch.get(0).MaterialSwitch.off();
    }
  },

  onTemperatureChange: function() {
    this.$temperatureTextField
      .get(0)
      .MaterialTextfield.change(this.model.temperature);
  }
};
