$(document).ready(function () {
    $('#collapse-product-guarantee').hide();
    $('.scroll-btn').hide()
    $(window).scroll(function () {
        $('header').addClass('header-fix');
        let currentHeight = $(window).scrollTop();
        if (currentHeight >= 100) {
            $('.scroll-btn').fadeIn("slow");
        } else {
            $('.scroll-btn').fadeOut("slow");
        }
        if (currentHeight <= 100) {
            $('header').removeClass('header-fix')
        }
    })

    $('.scroll-btn button').click(function () {
        $("html, body").animate({ scrollTop: "0" }, 300);
    })


    $('#describe').click(function () {
        setTimeout(function () {
            if ($('#product-guarantee').hasClass('active')) {
                $('#product-guarantee').removeClass('active');
                $('#describe').addClass('active');
                $('#collapse-product-guarantee').hide();
                $('#collapse-describe').show();

            } else {
                $('#describe').addClass('active');
                $('#collapse-product-guarantee').hide();
                $('#collapse-describe').show();
            }
        }, 200)
    })

    $('#product-guarantee').click(function () {
        setTimeout(function () {
            if ($('#describe').hasClass('active')) {
                $('#describe').removeClass('active');
                $('#product-guarantee').addClass('active');
                $('#collapse-describe').hide();
                $('#collapse-product-guarantee').show();

            } else {
                $('#product-guarantee').addClass('active');
                $('#collapse-describe').hide();
                $('#collapse-product-guarantee').show();
            }
        }, 200)
    })



})
