(function (Misago) {
  'use strict';

  Misago.ForumNavbar = {
    view: function(ctrl, _) {
      var desktopNavbar = [];

      if (_.settings.forum_branding_display) {
        desktopNavbar.push(
          _.component(Misago.BrandFull, _.settings.forum_branding_text));
      }

      desktopNavbar.push(m('ul.nav.navbar-nav', [
        m('li',
          m("a", {config: m.route, href: _.router.url('index')}, 'Index')
        )
      ]));

      var navbarStyle = '.navbar.navbar-default.navbar-static-top';

      return m('nav' + navbarStyle + '[role="navigation"]', [
        m('.container.navbar-full.hidden-xs.hidden-sm', desktopNavbar)
      ]);
    }
  };
}(Misago.prototype));
