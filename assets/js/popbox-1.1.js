/* -- DO NOT REMOVE --
 * jQuery DPopBox plugin v1.1
 * 
 * Author: Dionlee Uy
 * Email: dionleeuy@gmail.com
 *
 * Date: Wed Feb 20 2013
 *
 * @requires jQuery
 * -- DO NOT REMOVE --
 */

 (function($){

 	var PopBox = function(elem, opts) {
 		this.options = opts;
 		this.elem = $(elem);
 		this.popbox = this.elem.parent();
 		this.overlay = this.popbox.parent();
 		var that = this,
 			// overlayColor = this.options.overlay ? (this.options.theme == 'white' ? 'rgba(245, 245, 245, 0.98)' : 'rgba(10, 10, 10, 0.98)') : 'transparent',
 			animTop = this.options.animation == 'bringup' ? $(window).height() : (this.options.animation == 'bringdown' ? -$(window).height() : -1);

 		this.options.close ? this.popbox.delegate('[class="pop-close"]', 'click', $.proxy(this.hide, this)) : this.popbox.find('[class="pop-close"]').hide();
 		// this.overlay.css({backgroundColor: overlayColor});
 		this.overlay.addClass(this.options.overlay ? (this.options.theme == 'white' ? 'light' : 'dark') : 'none');

 		if(this.options.overlayClose) {
 			this.overlay.on('click', $.proxy(this.hide, this));
 			this.popbox.on('click', function(){ return false; });
 		}

 		if(animTop != -1) this.popbox.css({top: animTop});

 		if(this.elem.context.localName == 'img'){
 			this.popbox.append("<div class='img-loading'><div class='preloader'></div></div>");
 			$.preload(elem, function(){
 				that.popbox.find('.img-loading').fadeOut(function(){ $(this).remove(); });
 			});
 		}
 	}

 	PopBox.prototype = {

 		constructor: PopBox,

 		show : function (e) {
 			var that = this;
 			switch(this.options.animation){
				case 'fade':
					this.overlay.fadeIn('fast', function(){ that.popbox.fadeIn(that.options.animationSpeed, boxShown); }); break;
				case 'slide': case 'grow':
					this.popbox.children().css({opacity:0});
					this.overlay.fadeIn('fast', function(){
						that.popbox[that.options.animation == 'slide' ? 'slideDown':'show'](that.options.animationSpeed, boxShown);
					}); break;
				case 'bringup': case 'bringdown':
					this.swingElem(that.popbox, (this.options.animation == "bringup" ? 'up' : 'down'), 'in');
					break;
			}

			function boxShown(){
				that.popbox.children().animate({opacity:1});
				that.elem.trigger('shown');
			}
 		},

 		hide : function (e) {
 			var that = this;
 			switch(this.options.animation){
				case 'fade': this.popbox.fadeOut(this.options.animationSpeed, hideBox); break;
				case 'slide': case 'grow': 
					this.popbox.children().animate({opacity:0},'fast', function(){ 
						that.popbox[that.options.animation == 'slide' ? 'slideUp':'hide'](that.options.animationSpeed, hideBox); 
					}); break;
				case 'bringup': case 'bringdown':
					this.swingElem(that.popbox, (this.options.animation == "bringup" ? 'up' : 'down'), 'out');
					break;
			}

			function hideBox(){
				that.popbox.parent().fadeOut('fast', function(){
					that.elem.trigger('hidden');
					$.clearForm(that.elem);
				});
			}
 		},

 		swingElem : function(pbox, anim, dir){
 			var that = this;
 			switch(dir){
 				case 'in': 
 					pbox.parent().fadeIn('fast'); 
					pbox.css({ display:'block' })
						.animate(
							{ top: '50%' }, 
							{duration: that.options.animationSpeed, easing: "easeOutBack", complete: function(){ that.elem.trigger('shown'); }});
					break;
 				case 'out':
 					pbox.animate(
 						{ top: (anim == 'down' ? -$(window).height() : '150%') }, 
 						{duration: that.options.animationSpeed, easing: "easeOutCubic", complete: function(){ 
 							$(this).hide() 
	 							.parent().fadeOut( function(){
									that.elem.trigger('hidden');
								});
 						}
 					});
 					break;
 			}
 		},

 		hidden : function(cb){ cb(); },

 		shown : function(cb){ cb(); }
 	}

 	$.fn.popbox = function (opts) {
 		return $(this).each(function(){
 			var that = $(this);
 				data = that.data('popbox'),
 				options = $.extend({}, $.fn.popbox.defaults, that.data(), typeof opts == 'object' && opts);

 			if(!data){
 				/* Put elements in place */
				that.addClass('pop-content');
				var oHeight = that.outerHeight(),
 					oWidth = that.outerWidth();
				that.wrap('<div class="pop-overlay"><div class="pop-wrapper"></div></div>'); 
				var titleDiv	 = $('<div class="pop-title"></div>'),
					closeBtn 	 = $('<span class="pop-close" title="Close">&times;</span>'),
					popWrapper 	 = that.parent(),
					overlayWrap	 = that.parent().parent(),
					header		 = popWrapper.find('.title'),
					footer		 = $('<div class="pop-footer"></div>'),
					fOpts		 = that.find('.option');

				titleDiv.append(header);
				if(header.text()) popWrapper.prepend(titleDiv);
				popWrapper.prepend(closeBtn);
				if(that.find('.option').length) popWrapper.append(footer.append(fOpts));

				if(closeBtn.next('img').length > 0){
					that.addClass('image');
				}
 				that.data('popbox', (data = new PopBox(this, options)));

 				$(that.data('trigger')).click(function (e) {
 					e.preventDefault();
 					that.data('popbox')['show']();
 				});
 			}
 			if(typeof opts == 'string') data[opts]();
 			else if(options.show) data.show();
 		});
 	}

 	$.fn.popbox.defaults = {
 		animation: 		'fade',
 		animationSpeed: 380,
 		overlay: 		true,
 		overlayClose: 	false,
 		close: 			true,
 		theme: 			'white',
 	}

 	$.fn.popbox.Constructor = PopBox;

 	$.clearForm = function(form) {
		$(form).find(':input').each(function() {
			switch(this.type) {
				case 'password': case 'email': case 'select-multiple': case 'select-one': case 'text': case 'textarea':
					$(this).val('');  break;
				case 'checkbox': case 'radio':
					this.checked = false;
			}
		});
	}

	$.preload = function (img, cb) {
        var imgLoader = $("<img src='"+$(img).attr('src')+"'/>");

        imgLoader.one("load", function() { cb(); })
	        .each(function() {
				if(this.complete) $(this).load();
			});
    }

 })(jQuery);


 /*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(n,e,t,u,a){return jQuery.easing[jQuery.easing.def](n,e,t,u,a)},easeInQuad:function(n,e,t,u,a){return u*(e/=a)*e+t},easeOutQuad:function(n,e,t,u,a){return-u*(e/=a)*(e-2)+t},easeInOutQuad:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e+t:-u/2*(--e*(e-2)-1)+t},easeInCubic:function(n,e,t,u,a){return u*(e/=a)*e*e+t},easeOutCubic:function(n,e,t,u,a){return u*((e=e/a-1)*e*e+1)+t},easeInOutCubic:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e+t:u/2*((e-=2)*e*e+2)+t},easeInQuart:function(n,e,t,u,a){return u*(e/=a)*e*e*e+t},easeOutQuart:function(n,e,t,u,a){return-u*((e=e/a-1)*e*e*e-1)+t},easeInOutQuart:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e*e+t:-u/2*((e-=2)*e*e*e-2)+t},easeInQuint:function(n,e,t,u,a){return u*(e/=a)*e*e*e*e+t},easeOutQuint:function(n,e,t,u,a){return u*((e=e/a-1)*e*e*e*e+1)+t},easeInOutQuint:function(n,e,t,u,a){return(e/=a/2)<1?u/2*e*e*e*e*e+t:u/2*((e-=2)*e*e*e*e+2)+t},easeInSine:function(n,e,t,u,a){return-u*Math.cos(e/a*(Math.PI/2))+u+t},easeOutSine:function(n,e,t,u,a){return u*Math.sin(e/a*(Math.PI/2))+t},easeInOutSine:function(n,e,t,u,a){return-u/2*(Math.cos(Math.PI*e/a)-1)+t},easeInExpo:function(n,e,t,u,a){return 0==e?t:u*Math.pow(2,10*(e/a-1))+t},easeOutExpo:function(n,e,t,u,a){return e==a?t+u:u*(-Math.pow(2,-10*e/a)+1)+t},easeInOutExpo:function(n,e,t,u,a){return 0==e?t:e==a?t+u:(e/=a/2)<1?u/2*Math.pow(2,10*(e-1))+t:u/2*(-Math.pow(2,-10*--e)+2)+t},easeInCirc:function(n,e,t,u,a){return-u*(Math.sqrt(1-(e/=a)*e)-1)+t},easeOutCirc:function(n,e,t,u,a){return u*Math.sqrt(1-(e=e/a-1)*e)+t},easeInOutCirc:function(n,e,t,u,a){return(e/=a/2)<1?-u/2*(Math.sqrt(1-e*e)-1)+t:u/2*(Math.sqrt(1-(e-=2)*e)+1)+t},easeInElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(1==(e/=a))return t+u;if(i||(i=.3*a),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return-(s*Math.pow(2,10*(e-=1))*Math.sin(2*(e*a-r)*Math.PI/i))+t},easeOutElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(1==(e/=a))return t+u;if(i||(i=.3*a),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return s*Math.pow(2,-10*e)*Math.sin(2*(e*a-r)*Math.PI/i)+u+t},easeInOutElastic:function(n,e,t,u,a){var r=1.70158,i=0,s=u;if(0==e)return t;if(2==(e/=a/2))return t+u;if(i||(i=.3*a*1.5),s<Math.abs(u)){s=u;var r=i/4}else var r=i/(2*Math.PI)*Math.asin(u/s);return 1>e?-.5*s*Math.pow(2,10*(e-=1))*Math.sin(2*(e*a-r)*Math.PI/i)+t:s*Math.pow(2,-10*(e-=1))*Math.sin(2*(e*a-r)*Math.PI/i)*.5+u+t},easeInBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),u*(e/=a)*e*((r+1)*e-r)+t},easeOutBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),u*((e=e/a-1)*e*((r+1)*e+r)+1)+t},easeInOutBack:function(n,e,t,u,a,r){return void 0==r&&(r=1.70158),(e/=a/2)<1?u/2*e*e*(((r*=1.525)+1)*e-r)+t:u/2*((e-=2)*e*(((r*=1.525)+1)*e+r)+2)+t},easeInBounce:function(n,e,t,u,a){return u-jQuery.easing.easeOutBounce(n,a-e,0,u,a)+t},easeOutBounce:function(n,e,t,u,a){return(e/=a)<1/2.75?7.5625*u*e*e+t:2/2.75>e?u*(7.5625*(e-=1.5/2.75)*e+.75)+t:2.5/2.75>e?u*(7.5625*(e-=2.25/2.75)*e+.9375)+t:u*(7.5625*(e-=2.625/2.75)*e+.984375)+t},easeInOutBounce:function(n,e,t,u,a){return a/2>e?.5*jQuery.easing.easeInBounce(n,2*e,0,u,a)+t:.5*jQuery.easing.easeOutBounce(n,2*e-a,0,u,a)+.5*u+t}});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */