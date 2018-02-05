/**
 * Simple implementation of a Event Dispatcher
 */

var Event = function(sender) {
  this.sender = sender;
  this.listeners = [];
};

Event.prototype = {
  attach: function(listener) {
    this.listeners.push(listener);
  },

  notify: function(args) {
    this.listeners.forEach(listener => {
      listener(this.sender, args);
    });
  }
};
