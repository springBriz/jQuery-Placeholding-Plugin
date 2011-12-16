/**
 * PlaceHolding
 * 
 * @description	placeholder replacement for IE
 * @author		aprilbriz@gmail.com
 *
 * @usage		$('form').placeholding()
 */

(function($){
     $.fn.extend({
         placeholding: function() {
			var nativeSupport = (function(){
				return ('placeholder' in document.createElement('input'));
			})();
			if (nativeSupport === true){
				return false;
			}

			var STATUS = {
				ON: 1,
				OFF: 0
			};

			return this.each(function(){
				// allow only form tag
				if (this.tagName.toLowerCase() !== 'form'){
					return false;
				}

				// input & textarea tag
				$('input[placeholder], textarea[placeholder]', this).each(function(i, e){
					var $elmt = $(e);
					if ($elmt.data('placeholdingstatus') in STATUS){
						return false;
					}

					function setPlaceholder($elmt){
						if ($.trim($elmt.val()) === ''){
							$elmt.val($elmt.attr('placeholder'));
							$elmt.data('placeholdingstatus', STATUS.ON);
						}else{
							$elmt.data('placeholdingstatus', STATUS.OFF);
						}
					}

					$elmt.bind({
						'focus': function(){
							if ($elmt.data('placeholdingstatus') === STATUS.ON){
								$elmt.val('');
							}
						},
						'blur': function(){
							setPlaceholder($elmt);
						}
					});
					
					// init
					setPlaceholder($elmt);
				});

				// submit handler
				$(this).submit(function(){
					$('input[placeholder], textarea[placeholder]', this).each(function(i, e){
						var $elmt = $(e);
						if ($elmt.data('placeholdingstatus') === STATUS.ON){
							$elmt.val('');
						}
					});
				});
			});
         }
    });
})(jQuery);
