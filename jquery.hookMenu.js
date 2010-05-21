jQuery.fn.hookMenu = function(settings) {
	settings = jQuery.extend({
		'growUp':false,
		'position':'absolute'		
	},settings);
	var hook_menu = new Array();
	var hook_menu_x = new Array();
	var hook_menu_xy = new Array();
	var hook_menu_xc = new Array();
	var current_hook = new Array();
	this.each(function(i) {
		current_hook[i] = jQuery(this);
		hook_menu[i] = jQuery(this).next('ul.hook_menu');
		if(hook_menu[i].length) {
			current_hook[i].append('<span class="hook_menu_x">Expand</span>');
			hook_menu_x[i] = current_hook[i].children('span.hook_menu_x').eq(0);
			current_hook[i].wrapInner('<span class="hook_menu_xc"/>');
			hook_menu_xc[i] = current_hook[i].children().eq(0);
			hook_menu_xy[i] = {
				'width': Math.max(hook_menu_xc[i].outerWidth(),175),
				'top': current_hook[i].offset().top + current_hook[i].height(),
				'left': current_hook[i].offset().left
			};
			hook_menu[i].recalcCoords = function() {
				hook_menu[i].css({
					'left': current_hook[i].offset().left,
					'top': hook_menu_xc[i].offset().top + hook_menu_xc[i].height(),
					'width': Math.max(hook_menu_xc[i].outerWidth(),175)
				});
			}
			hook_menu[i].css({
				'position': settings.position,
				'display': 'none',
				'left': hook_menu_xy[i].left,
				'width': hook_menu_xy[i].width,
				'top': hook_menu_xy[i].top
			});
			hook_menu_x[i].bind({
				mouseenter: function(e) {
					jQuery(this).parent().toggleClass('hook_highlight');
				},
				mouseout: function(e) {
					jQuery(this).parent().toggleClass('hook_highlight');
				},
				click: function(e) {
					hook_menu[i].recalcCoords();
					hook_menu[i].show();
				}
			});
			hook_menu[i].bind({
				mouseout: function(e) {
					var isChild = $(e.currentTarget).has($(e.relatedTarget)).length;
					if(!(isChild)) {
						hook_menu[i].fadeOut('fast');
					}
				},
				click: function(e) {
					hook_menu[i].fadeOut('fast');
				}
			});
		}
	});
	return this;
};