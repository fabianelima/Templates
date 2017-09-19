
/*
	       OA TEMPLATE 4.0
	----------------------------
	Desenvolvido em CoffeeScript

		Código: Fabiane Lima
 */

(function() {
  var imgs, preload;

  imgs = ['assets/img/img1.png', 'assets/img/img2.png', 'assets/img/img3.png', 'assets/img/img4.png', 'assets/img/img5.png'];

  preload = function(imgs) {
    var counter;
    counter = 0;
    $(imgs).each(function() {
      $('<img />').attr('src', this).appendTo('body').css({
        display: 'none'
      });
      return counter++;
    });
    if (counter === imgs.length) {
      $('main').css({
        opacity: '1'
      });
      return $('body').css({
        background: '#e7e7e7'
      });
    }
  };

  $(window).on('load', function() {
    return preload(imgs);
  });

  $(function() {
    var count, data, func;
    count = 0;
    data = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'];
    func = {
      help: function() {
        $('.content').fadeOut();
        $('.dimmer').fadeIn();
        return $('.modal').html('<h1>Ajuda</h1><p></p><button class="dismiss">Fechar</button>');
      },
      info: function() {
        return $('.modal').html('<h1>Referência</h1><p></p><button class="end">Voltar</button>');
      },
      end: function() {
        $('.content').fadeOut();
        $('.dimmer').delay(200).fadeIn();
        return $('.modal').html('<h1>Finalizando...</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>');
      },
      dismiss: function() {
        $('.content').fadeIn();
        return $('.dimmer').fadeOut();
      },
      start: function() {
        var i, j, k, len;
        j = 0;
        for (k = 0, len = data.length; k < len; k++) {
          i = data[k];
          $('.slides').append('<section> <div>' + i + '</div> <img src="' + imgs[j] + '"> </section>');
          j++;
        }
        return func.dismiss();
      },
      slideshow: function($el) {
        if ($el.attr('class') === 'next') {
          count++;
          $('.prev').css({
            pointerEvents: 'auto',
            opacity: '1'
          });
          if (count < data.length) {
            $('.slides section').fadeOut();
            $('.slides section:nth-child(' + (count + 1) + ')').fadeIn();
          } else {
            func.end();
          }
        }
        if ($el.attr('class') === 'prev') {
          count--;
          $('.slides section').fadeOut();
          $('.slides section:nth-child(' + (count + 1) + ')').fadeIn();
          if (count === 0) {
            return $('.prev').css({
              pointerEvents: 'none',
              opacity: '0.6'
            });
          }
        }
      }
    };
    $(document).on('click', '.start', function() {
      return func.start();
    });
    $(document).on('click', '.help', function() {
      return func.help();
    });
    $(document).on('click', '.info', function() {
      return func.info();
    });
    $(document).on('click', '.end', function() {
      return func.end();
    });
    $(document).on('click', '.dismiss', function() {
      return func.dismiss();
    });
    $(document).on('click', '.ctrl *', function() {
      return func.slideshow($(this));
    });
    return $(document).on('click', '.again', function() {
      return location.reload();
    });
  });

}).call(this);
