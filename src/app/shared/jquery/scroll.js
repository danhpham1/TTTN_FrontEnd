export function scrollTop($) {
    $(document).ready(function () {
        $('.scroll-btn').hide()
        $(window).scroll(function () {
            let currentHeight = $(window).scrollTop();
            if (currentHeight >= 300) {
                $('header').addClass('header-fix');
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
    })
}