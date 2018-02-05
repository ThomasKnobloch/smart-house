var serverApi = {
  data: null,

  init: function() {
    serverApi.config = {
      urlBase: 'mock-server/'
    };

    return serverApi.setup();
  },

  setup: function() {
    return serverApi.getHouseObject().done(function(data) {
      serverApi.data = data;
    });
  },

  getHouseObject: function() {
    return $.get(serverApi.config.urlBase + 'house.json');
  },

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

  changeRoomProperty(roomName, roomProperty, value) {
    serverApi.data[roomName][roomProperty] = value;

    return $.Deferred().resolve(value);
  }
};
