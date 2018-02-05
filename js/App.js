var House = {
  createRooms: function(roomNameList) {
    return roomNameList.map(function(roomName) {
      return new RoomModel(roomName);
    });
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
  serverApi.getRoomList().done(function(roomNameList) {
    $(function() {
      var roomModels = House.createRooms(roomNameList);

      House.setupSwitchboard(roomModels);

      $('object').on('load', function() {
        House.setupPlan(roomModels);
      });
    });
  });
});
