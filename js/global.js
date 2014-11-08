;
(function ($) {
    $(document).ready(function() {
        var sf, $body;
        var breakpoint = 767;
        var breakpoint2 = 992;
        $(document).ready(function() {


            $(function() {
                $("img.lazy").lazyload({
                    effect: "fadeIn"
                });
            });

            $('.searchToggle').click(function() {
                $('.searchContainer').toggleClass('open');
            });


            $('#closeButton').click(function() {
                $('#mainNavCollapse').collapse('hide');
            });
            var $input = $('input, textarea');
            if ($input) {
                $input.placeholder();
            }

            /* To fix the z-index problem for embedded videos in IE */
            $('iframe').each(function() {
                var url = $(this).attr("src");
                var char = "?";
                if (url.indexOf("?") != -1) {
                    var char = "&";
                }

                $(this).attr("src", url + char + "wmode=transparent");
            });


            $body = $('body');
            sf = $('ul.sf-menu');
            if ($body.width() >= breakpoint2) {
                // enable superfish when the page first loads if we're on desktop
                sf.superfish({
                    cssArrows: false,
                    delay: 0,
                    speed: 0,
                    autoArrows: false
                });
            };
        });

        $(window).resize(function() {
            if ($body.width() >= breakpoint2 && !sf.hasClass('sf-js-enabled')) {
                // you only want SuperFish to be re-enabled once (sf.hasClass)
                sf.superfish('init', {
                    cssArrows: false,
                    delay: 0,
                    speed: 0,
                    autoArrows: false
                });
            } else if ($body.width() < breakpoint2) {
                // smaller screen, disable SuperFish
                sf.superfish('destroy');
            }
        });
    });
})(jQuery);

(function ($) {

    // common helper

    $.fn.plupdown = function (options) {
        options = $.extend({
            callback: function () { },
            loadingHtml: "<ul><li class='loading'>Loading...</li></ul>",
            opener: true,
            openerClass: "opener",
            resultsClass: "dropmenu"
        }, options);

        var target = $(this);
        var isForm = this.is("form");

        var close = function (e) {
            if ($(e.target).closest(".inner").any())
                return;
            $(".dropmenu").each(function () {
                $($(this).data("opener")).removeClass("open");
            }).removeData("opener").remove();
            $(document).unbind("click", close);
            $(document).unbind("submit", close);
        };

        var open = function (e) {
            e.preventDefault();
            if ($(this).is(".open"))
                return;
            e.stopPropagation();
            close(e);
            $(this).addClass("open");

            var o = $(this).offset();
            var h = $(this).height();

            var url = isForm ? this.action : this.href;
            var data = isForm ? $(this).serialize() : {};
            var $r = $("<div/>").addClass(options.resultsClass).appendTo(target.parent())
                .html("<a href='javascript:' class='closer close' aria-hidden='true'>&times;</a><div class='inner'/>")
                .data("opener", this);
            $r.children(".inner")
                .html(options.loadingHtml)
                .load(url, data, options.callback);

            $(document.body).bind("click", close);
            $(document.body).bind("submit", close);
        };

        var $o = this.bind(isForm ? "submit" : "click", open);
        if (options.opener)
            $o.addClass(options.openerClass).append("<span class='arrow'>&nbsp;</span>");

        return this;
    };

    $.fn.any = function () {
        return this.length > 0;
    };

    $.fn.clearonfocus = function () {
        this.each(function () { this.title = this.value; })
            .focus(function () { if (this.value === this.title) this.value = ""; })
            .blur(function () { if (this.value === "") this.value = this.title; });
    };

    $(document).ready(function () {
        // Search

        function highlight(text, container) {
            if (container == undefined || container == null) {
                container = "div.container *";
                return;
            }

            setTimeout(function () {
                var splits = text.split(" ");
                for (var i in splits)
                    $(container).highlight(splits[i]);
            }, 1);
        }

        $("#searchform input").clearonfocus();

        $("#searchform").plupdown({
            callback: function () {
                var value = $("#searchFormInput").val();
                var here = location.href.replace(/#.*/, "");
                $("a", this).each(function (i) {
                    if (i === 0) this.focus();
                    if (this.href === here)
                        $(this).focus().click(function () {
                            $("span.highlight").removeClass("highlight");
                            highlight(value);
                        });
                    this.href += "#q=" + value;
                });
                
                highlight(value, $("a", this));
            },
            opener: false
        });

        if (location.hash.match("^#q=")) {
            var text = location.hash.substr(3).replace(/[+]/g, " ");

            $("#searchform input").attr("value", text);
            $("#searchform").submit();

            highlight(text);
        }


        

       






    });

})(jQuery);



// Shift the sidenav before the content on mobile.

// window resize ////////////////////////////
var lastWindowHeight = $(window).height();
var lastWindowWidth = $(window).width();

$(window).resize(function () {

    //confirm window was actually resized
    if ($(window).height() != lastWindowHeight || $(window).width() != lastWindowWidth) {

        //set this windows size
        lastWindowHeight = $(window).height();
        lastWindowWidth = $(window).width();

        //call my function
        if (Modernizr.mq('only all and (max-width: 991px)')) {



            //functions for mobile only...

            $(".bodyContent").prepend($(".subNavContainer"));


        } else {



            //functions for desktop only...

             $(".sidebar").prepend($(".subNavContainer"));



        }


    }

}); // end on resize window //////////////////////




if (Modernizr.mq('only all and (max-width: 991px)')) {


    $(document).ready(function () {

        // mobile only functions...

        $(".bodyContent").prepend($(".subNavContainer"));


    });



} else {

    $(document).ready(function () {

        // desktop only functions...

        $(".sidebar").prepend($(".subNavContainer"));



    }); // end onready

} // end modernizr /////////////////////////////
