/* global -Misago */
/* exported Misago */
(function () {
  'use strict';

  window.Misago = function() {
    var ns = Object.getPrototypeOf(this);
    var self = this;

    // Context data
    this.context = {
      // Empty settings
      SETTINGS: {}
    };

    // Services init/destroy
    this._initServices = function(services) {
      var orderedServices = new ns.OrderedList(services).order(false);
      orderedServices.forEach(function (item) {
        var factory = null;
        if (item.item.factory !== undefined) {
          factory = item.item.factory;
        } else {
          factory = item.item;
        }

        var serviceInstance = factory(self);
        if (serviceInstance) {
          self[item.key] = serviceInstance;
        }
      });
    };

    this._destroyServices = function(services) {
      var orderedServices = new ns.OrderedList(services).order();
      orderedServices.reverse();
      orderedServices.forEach(function (item) {
        if (item.destroy !== undefined) {
          item.destroy(self);
        }
      });
    };

    // App init/destory
    this.setup = false;
    this.init = function(setup) {
      this.setup = {
        fixture: ns.get(setup, 'fixture', null),
        inTest: ns.get(setup, 'inTest', false)
      };

      this._initServices(ns._services);
    };

    this.destroy = function() {
      this._destroyServices(ns._services);
    };
  };


  // Services registry
  var proto = window.Misago.prototype;
  proto._services = [];

  proto.addService = function(name, factory, order) {
    proto._services.push({
      key: name,
      item: factory,
      after: proto.get(order, 'after'),
      before: proto.get(order, 'before')
    });
  };
}());
