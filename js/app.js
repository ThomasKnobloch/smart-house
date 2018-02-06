var App = {
  /**
   * Serialize the server object into RoomModel
   */
  createRooms: function(roomNameList) {
    return roomNameList.map(function(roomName) {
      return new RoomModel(roomName);
    });
  },

  /**
   * Create the room views displayed on the left of the page
   */
  setupSwitchboard: function(rooms) {
    rooms.forEach(roomModel => {
      var view = new RoomView(roomModel);
      var controller = new RoomController(roomModel, view);
    });
  },

  /**
   * Create the view that manipulate the floor plan (SVG)
   */
  setupPlan: function(rooms) {
    var planView = new PlanView(rooms);
  }
};

serverApi.init().done(function() {
  serverApi.getRoomList().done(function(roomNameList) {
    $(function() {
      // Create the views (DOM insertions) when the DOM is ready
      var roomModels = App.createRooms(roomNameList);
      App.setupSwitchboard(roomModels);
      App.setupPlan(roomModels);
    });
  });
});
