/**
 * Created by dan.dvoracek on 13/04/2016.
 * Project: tiles-visualisation
 * Description: simple test to demonstrate how quick it is to set up smth like that
 */
// JavaScript boilerplate
(function (window, document, $) {

    "use strict";

    var maldvModule = function () {

        function displayData(response) {
            var barsCount = response.getDataTable().getNumberOfRows();
            var rows = response.getDataTable()['Gf'];

            var countSqrt = Math.sqrt(barsCount+1);
            console.log('There is an amount of ' + (barsCount+1) + ' bars and its squared root is: ' + countSqrt);

            rows.forEach(function(bar){

                console.log(bar['c']);

                // Create variables
                var barName = bar['c'][5]['v'],
                    drinksRedeemed = bar['c'][4]['v'],
                    postcode = bar['c'][6],
                    city = bar['c'][1];
                // check what colour for each tiles
                if(drinksRedeemed >=0 && drinksRedeemed < 10){
                    var colour = '#22403A';
                } else if(drinksRedeemed >= 10 && drinksRedeemed < 30){
                    var colour = '#437F74';
                } else if(drinksRedeemed >= 30 && drinksRedeemed < 60){
                    var colour = '#65BFAE';
                } else if(drinksRedeemed >= 60 && drinksRedeemed < 100){
                    var colour = '#79E5D1';
                } else {
                    var colour = '#87FFE8';
                }
                // Create the bar object in order to parse it to handlebarjs
                var theBar = {'barname': barName, 'drinksredeemed': drinksRedeemed, 'postcode': postcode, 'city': city, 'colour': colour};

                // Get the template we want to use -- located in index.html
                var Source = document.getElementById("tile-template").textContent;
                // Compile the template
                var Template = Handlebars.compile(Source);
                // Generate some HTML code from the compiled template and parse data to it
                var HTML = Template({ bar: theBar });
                // Append each tile one after the other...
                $('#container').append(HTML);
            });

            makeTilesDiscoverable();

        };

        function makeTilesDiscoverable(){
            $('.tiles').hover(function(){
                var thisInfos = $( this ).find('.tiles-info');
                thisInfos.css({'visibility': 'visible'});
                // console.log(thisInfos);
            }, function() {
                var thisInfos = $( this ).find('.tiles-info');
                thisInfos.css({'visibility': 'hidden'});
            });
        };

        return {

            redDesc: function(){

                google.load('visualization', '1', {
                    callback: function () {
                        // Start general in order to return a global object holding all the data that we can do a "sort" against
                        var query2 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1I2EDG87RPLuSKBEuU1tdZ8x4Qf-dt77QDZNn-HrhhDQ/gviz/tq?gid=0&headers=1&tq=select%20*%20order%20by%20E%20desc'); // fetch all data
                        query2.send(displayData);
                    }
                });

            },

            redAsc: function(){

                google.load('visualization', '1', {
                    callback: function () {
                        // Start general in order to return a global object holding all the data that we can do a "sort" against
                        var query2 = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1I2EDG87RPLuSKBEuU1tdZ8x4Qf-dt77QDZNn-HrhhDQ/gviz/tq?gid=0&headers=1&tq=select%20*%20order%20by%20E%20asc'); // fetch all data
                        query2.send(displayData);
                    }
                });

            },

            init: function () {

                google.load('visualization', '1', {
                    callback: function () {
                        // Start general in order to return a global object holding all the data that we can do a "sort" against
                        var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1I2EDG87RPLuSKBEuU1tdZ8x4Qf-dt77QDZNn-HrhhDQ/gviz/tq?gid=0&headers=1&tq=select%20*'); // fetch all data
                        query.send(displayData);
                    }
                });

            }
        };

    };

    $(function () {
        var module = new maldvModule();
        module.init();

        $('#red-asc').on('click', function(){
            $('#container').empty();
            module.redAsc();
        });

        $('#red-desc').on('click', function(){
            $('#container').empty();
            module.redDesc();
        });
        $('.filters').on('click', function(){
            var spans = $(this).find('span');
            if(spans.hasClass('open')){
                $(this).find('span').removeClass('open');
            } else if(!spans.hasClass('open')){
                $(this).find('span').addClass('open');
            }
        });
        $('.filters').on('mouseleave', function(){
            var spans = $(this).find('span');
            $(this).find('span').removeClass('open');
        });

    });

}(window, document, jQuery));