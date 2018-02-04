var House = {
  createRooms: function() {
    var models = [];

    for (const roomName in serverApi.data) {
      models.push(
        new RoomModel(
          roomName,
          serverApi.data[roomName].light,
          serverApi.data[roomName].curtains,
          serverApi.data[roomName].temperature
        )
      );
    }

    return models;
  },

  setupSwitchboard: function(rooms) {
    rooms.forEach(roomModel => {
      var view = new RoomView(roomModel);
      var controller = new RoomController(roomModel, view);
    });
  },

  setupPlan: function(rooms) {
    var planView = new PlanView(rooms);
  }
};

serverApi.init().done(function() {
  $(function() {
    var roomModels = House.createRooms();

    House.setupSwitchboard(roomModels);

    $('object').on('load', function() {
      House.setupPlan(roomModels);
    });
  });
});
