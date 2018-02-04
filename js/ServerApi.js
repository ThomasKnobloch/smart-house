var serverApi = {
  data: null,

  init: function() {
    serverApi.config = {
      urlBase: 'mock-server/'
    };

    return serverApi.setup();
  },

  setup: function() {
    return serverApi.getInitialObject().done(function(data) {
      serverApi.data = data;
    });
  },

  getInitialObject: function() {
    return $.get(serverApi.config.urlBase + 'house.json');
  },

  changeRoomProperty(roomName, roomProperty, value) {
    //Simulate async call
    serverApi.data[roomName][roomProperty] = value;

    return $.Deferred().resolve(value);
  }
};
