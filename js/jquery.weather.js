/*
 * jQuery Weather
 * By: J.P. Given (http://johnpatrickgiven.com)
 * Repository: 
 * Created: 3/31/2011
 * Useage: Anyone with proper credit left in source.
 */
(function($) {
	// Global Namespace
    var jqw = {}

    // Define the plugin
    $.fn.weather = function(options) {
	
		jqw.obj = $(this);
		jqw.options = options;
		
		//JSON-P request.
		$.getJSON("http://weatherapi.heroku.com/search/weather.json?location=" + options.location + "&callback=?", function(data) {
			
			// Object root.
			var obj = data.xml_api_reply.weather;
			
			// Error checking.
			if (typeof obj.current_conditions == "undefined") {
				$(jqw.obj).html("Weather unavailable for this region.");
				return;
			}
			
			// Set up vatiables.
			jqw.currentCondition = obj.current_conditions.condition.data;
			jqw.currentTemp = obj.current_conditions.temp_f.data;
			jqw.currentIcon = obj.current_conditions.icon.data.replace(/\//g,'').replace(/igimagesweather/g,'');
			jqw.currentTemp_C = jqw.returnCelcius(obj.current_conditions.temp_f.data);
			jqw.currentWind = obj.current_conditions.wind_condition.data;
			jqw.todaysHigh = obj.forecast_conditions[0].high.data;
			jqw.todaysLow = obj.forecast_conditions[0].low.data;
			jqw.todaysHigh_C = jqw.returnCelcius(obj.forecast_conditions[0].high.data);
			jqw.todaysLow_C = jqw.returnCelcius(obj.forecast_conditions[0].low.data);
			jqw.todaysIcon = obj.forecast_conditions[0].icon.data.replace(/\//g,'').replace(/igimagesweather/g,'');
			jqw.todaysCondition = obj.forecast_conditions[0].condition.data;
			jqw.city = obj.forecast_information.city.data;
			
			// Layout logic
			if (jqw.options.layout == 'horizontal') {
				$(jqw.obj).html('<div id="jqw_hori"></div>');
				$("#jqw_hori").append('<table cellpadding="3" cellspacing="0" border="0"><tr><td><img src="http://weatherapi.heroku.com/images/' + jqw.currentIcon + '"></td><td>' + jqw.city + ' / ' + jqw.currentTemp + '&deg; F</td></tr></table>');
			} else if (jqw.options.layout == 'raw') {
				var layout = '';
				layout += '<ul id="jQuery_weather">';
				layout += '<li id="jqw_city">' + jqw.city + '</li>';
				layout += '<li id="jqw_current_condition">' + jqw.currentCondition + '</li>';
				layout += '<li id="jqw_current_temp">' + jqw.currentTemp + '&deg; F</li>';
				layout += '<li id="jqw_current_temp_c">' + jqw.currentTemp_C + '&deg; C</li>';
				layout += '<li id="jqw_current_icon">http://weatherapi.heroku.com/images/' + jqw.currentIcon + '</li>';
				layout += '<li id="jqw_current_wind">' + jqw.currentWind + '</li>';
				layout += '<li id="jqw_todays_high">' + jqw.todaysHigh + '&deg; F</li>';
				layout += '<li id="jqw_todays_low">' + jqw.todaysLow + '&deg; F</li>';
				layout += '<li id="jqw_todays_high_c">' + jqw.todaysHigh_C + '&deg; C</li>';
				layout += '<li id="jqw_todays_low_c">' + jqw.todaysLow_C + '&deg; C</li>';
				layout += '<li id="jqw_todays_forecast_icon">http://weatherapi.heroku.com/images/' + jqw.todaysIcon + '</li>';
				layout += '<li id="jqw_todays_forcast_condition">' + jqw.todaysCondition + '</li>';
				layout += '</ul>';
				
				$(jqw.obj).html(layout);
			} else {
				$(jqw.obj).html('<div id="jqw_virt" style="text-align: center;"></div>');
				$("#jqw_virt").append(jqw.city + '<br />');
				$("#jqw_virt").append('<img src="http://weatherapi.heroku.com/images/' + jqw.todaysIcon + '"><br />');
				$("#jqw_virt").append(jqw.todaysCondition + ' ' + jqw.todaysHigh + '&deg; | ' + jqw.todaysLow + '&deg;<br />');
			}
		});
		
	
		/*
		 * Simple function to return Celcius
		 */
		jqw.returnCelcius = function (f) {
			var cel = ((f - 32)  *  (5/9));
			return Math.round(cel).toString();
		}
		
    };

})(jQuery);