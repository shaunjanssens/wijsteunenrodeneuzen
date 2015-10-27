/**
 * @author: Shaun Janssens
 */
$(document).ready(function() {

    Handlebars.registerHelper('each_reverse', function(context) {
        var options = arguments[arguments.length - 1];
        var ret = '';

        if (context && context.length > 0) {
            for (var i = context.length - 1; i >= 0; i--) {
                ret += options.fn(context[i]);
            }
        } else {
            ret = options.inverse(this);
        }

        return ret;
    });

    var sponsors = {
        data: {},

        init: function () {
            sponsors.getItems();
        },
    
        getItems: function () {
            jQuery.ajax({
                url: "../json/sponsors.json",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    sponsors.data = data;
                    sponsors.renderItems();
                },
                error: function (xhr, textStatus, errorThrown) {
                    alert("Error: fout bij ophalen van JSON. Code: " + xhr.status);
                }
            });
        },

        renderItems: function() {
            var source   = $("#items-template").html();
            var template = Handlebars.compile(source);
            $(".main .container").append(template(sponsors.data));

            $("img.lazy").show().lazyload({
                threshold: 400,
                effect: "fadeIn",
                placeholder: ""
            });
        }
    };

    var page = {
        init: function () {
            var hash = $(location).attr('hash');
            page.change(hash);
        },

        change: function(page) {
            console.log(page);

            $(".main .container").empty();

            if(page == "#actie" || page == "actie") {
                var source   = $("#actie-template").html();
                var template = Handlebars.compile(source);
                $(".main .container").append(template());
            }
            else if (page == "#steun" || page == "steun") {
                var source   = $("#steun-template").html();
                var template = Handlebars.compile(source);
                $(".main .container").append(template());
            } else {
                sponsors.getItems();
            }
        }
    };

    page.init();

    $(document).on("touchend click", ".logo", function(event){
        document.location.hash = "home";
        page.change("home");
    });

    $(document).on("touchend click", "#steun", function(event){
        page.change("steun");
    });

    $(document).on("touchend click", "#actie", function(event){
        page.change("actie");
    });
});