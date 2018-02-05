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
    <label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="${
      this.lightId
    }">
        <input type="checkbox" id="${this.lightId}" class="mdl-switch__input">
        <span class="mdl-switch__label">Light</span>
      </label>`;

    // Room curtains switch element
    html += `<label class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="${
      this.curtainsId
    }">
        <input type="checkbox" id="${
          this.curtainsId
        }" class="mdl-switch__input">
        <span class="mdl-switch__label">Curtains</span>
      </label>`;

    // Room temerature input element
    html += `
    <form action="#">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
            <input class="mdl-textfield__input" type="text" pattern="-?[0-9]*(\.[0-9]+)?" id="${
              this.temperatureId
            }">
            <label class="mdl-textfield__label" for="${
              this.temperatureId
            }">Temperature...</label>
            <span class="mdl-textfield__error">Input is not a number!</span>
        </div>
    </form>`;

    html += `
        </div>
    </div>`;

    this.$container.append(html);

    return this;
  },

  bindChildren: function() {
    this.$lightSwitch = this.$container.find('#' + this.lightId);
    this.$curtainsSwitch = this.$container.find('#' + this.curtainsId);
    this.$temperatureInput = this.$container.find('#' + this.temperatureId);

    return this;
  },

  setupHandlers: function() {
    this.$lightSwitch.change(this.switchLightButton.bind(this));
    this.$curtainsSwitch.change(this.moveCurtainsButton.bind(this));
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

  /* -------------------- Event Dispatcher Listeners ----------------- */

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
