export function collapse($) {
    $(document).ready(function () {
        $('#collapse-product-guarantee').hide();
        $('#collapse-product-comment').hide();
        $('#collapse-describe').show();
        $('#describe').addClass('active');
        $('#product-comment').removeClass('active');
        $('#product-guarantee').removeClass('active');
        $('#describe').click(function () {
            setTimeout(function () {
                if ($('#product-guarantee').hasClass('active')) {
                    $('#product-guarantee').removeClass('active');
                }
                if($('#product-comment').hasClass('active')) {
                    $('#product-comment').removeClass('active');
                }
                $('#describe').addClass('active');
                $('#collapse-product-guarantee').hide();
                $('#collapse-product-comment').hide();
                $('#collapse-describe').show();
            }, 200)
        })

        $('#product-guarantee').click(function () {
            setTimeout(function () {
                if ($('#describe').hasClass('active')) {
                    $('#describe').removeClass('active');
                    
                }
                if($('#product-comment').hasClass('active')) {
                    $('#product-comment').removeClass('active');
                }
                $('#product-guarantee').addClass('active');
                $('#collapse-describe').hide();
                $('#collapse-product-comment').hide();
                $('#collapse-product-guarantee').show();
            }, 200)
        })

        $('#product-comment').click(function () {
            setTimeout(function () {
                if ($('#describe').hasClass('active')) {
                    $('#describe').removeClass('active');
                    
                }
                if ($('#product-guarantee').hasClass('active')) {
                    $('#product-guarantee').removeClass('active');   
                }
                $('#product-comment').addClass('active');
                $('#collapse-describe').hide();
                $('#collapse-product-guarantee').hide();
                $('#collapse-product-comment').show();
            }, 200)
        })
    })

}