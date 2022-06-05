$(window).scroll(function () {
    if ($(this).scrollTop() >= 100 && $(this).scrollTop() < 400) {
        $('.header__nav').addClass('sticky')
    } else if ($(this).scrollTop() >= 400) {
        $('.header__nav').addClass('header__nav--1')
        $('.header__nav').removeClass('sticky')
        // $('.header__nav').removeClass('navbar-brand')


    } else {
        $('.header__nav').removeClass('sticky')
        $('.header__nav').removeClass('header__nav--1')

    }
});