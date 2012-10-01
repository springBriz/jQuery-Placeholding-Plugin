/**
 * PlaceHolding
 * 
 * @description	mimic placeholder
 * @author		aprilbriz@gmail.com
 * 
 * @require		jQuery 1.7 or later
 * @usage		$('form').placeholding();
 */
(function($){
	$.fn.extend({
		placeholding: function() {
			if ((function(){ return ('placeholder' in document.createElement('input')); })() === true){
				return false;
			}

			var STATUS = { ON: 1, OFF: 0 };

			//
			function whenBlur($elmt){
				if ($elmt.val() == ''){
					$elmt.data('originalcolor', $elmt.css('color'));
					$elmt.css('color', 'rgb(153, 153, 153)');
					$elmt.val($elmt.attr('placeholder'));
					$elmt.data('placeholdingstatus', STATUS.ON);
				}else{
					$elmt.data('placeholdingstatus', STATUS.OFF);
				}
			}
			
			//
			function whenFocus($elmt){
				if ($elmt.data('placeholdingstatus') === STATUS.ON){
					$elmt.val('');
					$elmt.css('color', $elmt.data('originalcolor'));
				}
			}

			return this.each(function(){
				// allow only form tag
				if (this.tagName.toLowerCase() !== 'form'){
					return false;
				}

				// prevent duplicating
				if ($(this).data('placeholdingapplied') === '1'){
					return false;
				}
				$(this).data('placeholdingapplied', '1');

				// bind event handler to input & textarea elements
				$(this).on({
					'focus': function(){
						whenFocus($(this));
					},
					'blur': function(){
						whenBlur($(this));
					}
				}, 'input[placeholder], textarea[placeholder]');

				// bind submit handler
				$(this).on('submit', function(){
					$('input[placeholder], textarea[placeholder]', this).each(function(i, e){
						whenFocus($(e));
					});
				});

				// init (triggering blur event)
				$('input[placeholder], textarea[placeholder]', this).trigger('blur');
			});
		}
	});
})(jQuery);
