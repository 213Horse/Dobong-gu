$(document).ready(function () {
    var mainSlider = $('.main-slider');
    var totalItems;

    mainSlider.owlCarousel({
        items: 1,
        loop: false,
        autoplay: false,
        nav: false,
        dots: false,
        onInitialized: function (event) {
            totalItems = event.item.count;
            $('.total-pages').text(totalItems);
            updatePageNumber(event.item.index);
            updateNavButtons(event.item.index);
        },
        onChanged: function (event) {
            updatePageNumber(event.item.index);
            updateNavButtons(event.item.index);
        }
    });

    $('.icon-sl-prev').click(function () {
        mainSlider.trigger('prev.owl.carousel');
    });

    $('.icon-sl-next').click(function () {
        mainSlider.trigger('next.owl.carousel');
    });

    $('.icon-sl-prev-mobile').click(function () {
        mainSlider.trigger('prev.owl.carousel');
    });

    $('.icon-sl-next-mobile').click(function () {
        mainSlider.trigger('next.owl.carousel');
    });

    // Function to sync the page number display
    function updatePageNumber(currentIndex) {
        var currentPage = (currentIndex % totalItems) + 1;
        $('.current-page').text(currentPage);
    }

    // Function to update the state of navigation buttons
    function updateNavButtons(currentIndex) {

        $('.icon-sl-prev').removeClass('icon-sl-prev-gray');
        $('.icon-sl-next').removeClass('icon-sl-next-gray');

        if (currentIndex === 0) {
            $('.icon-sl-prev').addClass('icon-sl-prev-gray');
        }
        if (currentIndex === totalItems - 1) {
            $('.icon-sl-next').addClass('icon-sl-next-gray');
        }
    }
});
