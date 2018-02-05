var serverApi = {
  data: null,

  init: function() {
    serverApi.config = {
      urlBase: 'mock-server/'
    };

    return serverApi.setup();
  },

  setup: function() {
    // Load the content of the static file in memory to replace a "server" side
    return serverApi.getHouseObject().done(function(data) {
      serverApi.data = data;
    });
  },

  /**
   * Get the content of a static file
   */
  getHouseObject: function() {
    return $.get(serverApi.config.urlBase + 'house.json');
  },

  /* -------------------- Fake server HTTP/GET requests ----------------- */

  getRoomList: function() {
    return $.Deferred().resolve(Object.keys(serverApi.data));
  },

  getRoomLightState: function(roomName) {
    return $.Deferred().resolve(serverApi.data[roomName]['light']);
  },

  getRoomCurtainsState: function(roomName) {
    return $.Deferred().resolve(serverApi.data[roomName]['curtains']);
  },

  getRoomTemperature: function(roomName) {
    return $.Deferred().resolve(serverApi.data[roomName]['temperature']);
  },

  /* -------------------- Fake server HTTP/SET requests ----------------- */

  changeRoomProperty(roomName, roomProperty, value) {
    serverApi.data[roomName][roomProperty] = value;

    return $.Deferred().resolve(value);
  }
};
