$(function() {

  var animating = true;

  $('.block-link').on('click', function() {
    console.log('block link clicked');

    if(animating) {
      $(this).addClass('open')
        .parent().addClass('pause-animation');
      animating = false;
    } else {
      $('.block-link.open').removeClass('open');
      $(this).parent().removeClass('pause-animation');
      animating = true;
    }

    return false;
  });

});
