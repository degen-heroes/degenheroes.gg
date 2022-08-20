jQuery(document).ready(function ($) {
  $('.js-select').niceSelect();
  $(document).on('click', '.menu-btn', function () {
    $(this).toggleClass('is-active');
    $('.sidebar').toggleClass('is-show');
  });
  const mediaHeader = window.matchMedia('(max-width: 959px)');

  function handleHeader(e) {
    if (e.matches) {
      $('.menu-btn').removeClass('is-active');
      $('.sidebar').removeClass('is-show');
      $(document).on('click', '.menu-btn', function () {
        $('body').toggleClass('no-scroll');
      });
    } else {
      $('.menu-btn').addClass('is-active');
      $('.sidebar').addClass('is-show');
      $('body').removeClass('no-scroll');
    }
  }

  /////////////////////////////////////////////////////////////////
  // Preloader
  /////////////////////////////////////////////////////////////////

  var $preloader = $('#page-preloader'),
    $spinner = $preloader.find('.spinner-loader');
  $spinner.fadeOut();
  $preloader.delay(50).fadeOut('slow');
});
