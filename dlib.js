var DLIB = (function (app, global, $, undefined) {

	/**
	 * namespace function to create deep object variables on the
	 * app object
	 *
	 * usage: namespace("DLIB.ui.helpers.reverse");
	 *
	 * @param {string} [name] [name of the variable to create on the app object.
	 * use periods (.) to create nested object variables in a single statement.
	 * If a named segment already exists on the object, it will not be replaced.]
	 * @return {object} [the newly created namespaced object on the app object
	 * if it didn't previously exist. otherwise returns the existing top level
	 * app object]
	 */
	app.namespace = function (name) {
			
		var parts = (name.indexOf('.') > -1 ? name.split('.') : [name]),
			parent = app,
			i = (parts[0] == app ? 1 : 0);

		for (; i < parts.length; i += 1) {
			if (typeof parent[parts[i]] === "undefined") {
				parent[parts[i]] = {};
				parent = parent[parts[i]];
			}
		}

		return parent;
	
	};

	app.namespace('ui');

	/**
	 * collapsable is applied to a container to create a simple show/hide toggle
	 * with a child element as the 'teaser/trigger' and another child element as
	 * the 'hidden' data to be toggled on trigger.
	 *
	 * @param {string} [el] [CSS selector of the target container]
	 * @param {object} [options] [optional hash to override function defaults]
	 */
	app.ui.collapsable = (function () {
		var defaults = {},
			collapsable = function(el, options) {
				var $el= $(el);

				$el.on('click', '.collapsable-trigger', function(e) {
					e.preventDefault();

					$el.closest('.collapsable').toggleClass('expanded');

					e.stopPropagation();
				});
			};

		return collapsable;
	})();

	/**
	 * stickyDock when applied to a div will fix that container to the top of
	 * the window when the user scrolls past its position on the page
	 *
	 * @param {string} [el] [CSS selector of the target element]
	 * @param {object} [options] [optional hash to override function defaults]
	 */
	app.ui.stickyDock = (function () {

		var defaults = { 'dir': 'top', 'activeClass': 'docked' },
			stickyDock = function (el, options) {
				var settings = (options) ? $.extend({}, defaults, options) : defaults,
					$el = $(el),
					dockOffset = $el.offset()[settings.dir],
					dockHeight = $el.outerHeight(),
					scrollEvent = function() {
						if ($(global).scrollTop() > dockOffset) {
							$el
								.addClass(settings.activeClass)
								.css({'position': 'fixed', 'top' : '0', 'left': '0', 'width': '100%'})
								.next()
									.css('margin-top', dockHeight);
						} else {
							$el
								.removeClass(settings.activeClass)
								.css({'position': '', 'top': '', 'left': '', 'width': ''})
								.next()
									.css('margin-top','');
						}
					};

				$(global).scroll(scrollEvent);
			};
		
		return stickyDock;

	})();

	app.init = function () {

	};

	app.init();

	return app;

})(DLIB || {}, window, jQuery);