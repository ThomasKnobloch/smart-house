/**
 * Responsible for the DOM manipulation of the house floor plan
 */

var PlanView = function(roomList) {
  this.roomModelList = roomList;
  this.init();
};

PlanView.prototype = {
  init: function() {
    // Bind the SVG container
    this.bindChildren();

    // Check if the SVG content is already fully loaded
    if (this.$container.find('g').length !== 0) {
      // Update the SVG
      this.setup();
    } else {
      $('object').on('load', () => {
        // Rebind and update the SVG element when it's loaded
        this.bindChildren().setup();
      });
    }
  },

  bindChildren: function() {
    this.$container = $('object').contents();

    return this;
  },

  setup: function() {
    this.roomModelList.forEach(room => {
      this.setupRoomHandlers(room);
      this.getContent(room);
    });

    return this;
  },

  setupRoomHandlers: function(roomModel) {
    // Listen to models' events
    roomModel.lightEvent.attach(this.updateLight.bind(this, roomModel));
    roomModel.curtainsEvent.attach(this.updateCurtains.bind(this, roomModel));
    roomModel.temperatureEvent.attach(
      this.updateTemperature.bind(this, roomModel)
    );

    return this;
  },

  getContent: function(roomModel) {
    // Retrieve initial data
    roomModel.getLightState();
    roomModel.getCurtainsState();
    roomModel.getTemperature();
  },

  /* -------------------- Model Event Dispatcher Listeners ----------------- */

  updateLight: function(roomModel) {
    // The room name is used to link the data (model) with the SVG DOM element
    var $lightImage = this.$container.find('g#' + roomModel.name + ' .light');
    roomModel.isLightOn ? $lightImage.show() : $lightImage.hide();
  },

  updateCurtains: function(roomModel) {
    // The room name is used to link the data (model) with the SVG DOM element
    var $curtainsPath = this.$container.find(
      'g#' + roomModel.name + ' .curtains'
    );
    var $curtainsRect = this.$container.find(
      'g#' + roomModel.name + ' .window-light'
    );
    roomModel.isCurtainsOpened ? $curtainsPath.hide() : $curtainsPath.show();
    roomModel.isCurtainsOpened ? $curtainsRect.show() : $curtainsRect.hide();
  },

  updateTemperature: function(roomModel) {
    // The room name is used to link the data (model) with the SVG DOM element
    var $temperatureText = this.$container.find(
      'g#' + roomModel.name + ' .temperature'
    );
    $temperatureText.html(roomModel.temperature + '°');
  }
};
