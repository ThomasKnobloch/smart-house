var PlanView = function(roomList) {
  this.roomListModel = roomList;
  this.init();
};

PlanView.prototype = {
  init: function() {
    this.bindChildren().setupHandlers();
  },

  bindChildren: function() {
    this.$container = $('object').contents();

    return this;
  },

  setupHandlers: function() {
    this.roomListModel.forEach(room => {
      //Init
      this.updateLight(room);
      this.updateCurtains(room);
      this.updateTemperature(room);

      /**
       * Event Dispatcher
       */
      room.lightEvent.attach(this.updateLight.bind(this, room));
      room.curtainsEvent.attach(this.updateCurtains.bind(this, room));
      room.temperatureEvent.attach(this.updateTemperature.bind(this, room));
    });

    return this;
  },

  /* -------------------- Handlers From Event Dispatcher ----------------- */

  updateLight: function(roomModel) {
    var $lightImage = this.$container.find('g#' + roomModel.name + ' .light');
    roomModel.isLightOn ? $lightImage.show() : $lightImage.hide();
  },

  updateCurtains: function(roomModel) {
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
    var $temperatureText = this.$container.find(
      'g#' + roomModel.name + ' .temperature'
    );
    $temperatureText.html(roomModel.temperature + '°');
  }
};
