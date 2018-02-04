var HouseSwitchboard = {
  setup: function() {
    var models = [];

    for (const roomName in serverApi.data) {
      var model = new RoomModel(
        roomName,
        serverApi.data[roomName].light,
        serverApi.data[roomName].curtains,
        serverApi.data[roomName].temperature
      );

      var view = new RoomView(model);
      var controller = new RoomController(model, view);

      models.push(model);
    }

    var planView = new PlanView(models);
  }
};

$(serverApi.init().done(HouseSwitchboard.setup));
