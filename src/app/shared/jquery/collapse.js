export function collapse($) {
    $(document).ready(function () {
        $('#collapse-product-guarantee').hide();
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

}