(function () {
  'use strict';

  var MockContainer = function(context) {
    this.context = context;
  };

  QUnit.module("Conf service");

  QUnit.test("service factory", function(assert) {
    var settings = {
      'forum_name': 'Misago Community'
    };

    var container = new MockContainer({SETTINGS: settings});
    var service = getMisagoService('conf');
    service(container);

    assert.equal(container.settings, settings,
      "service has set preloaded config as settings attribute on container.");
  });
}());
