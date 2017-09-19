
/*
	       OA TEMPLATE 4.0
	----------------------------
	Desenvolvido em CoffeeScript

		Código: Fabiane Lima
 */

(function() {
  var imgs, preload;

  imgs = ['assets/img/help.png'];

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
    var alt, count, data, func, score;
    count = 0;
    score = 0;
    alt = void 0;
    data = [
      {
        titl: 'Título da questão',
        text: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        answ: true,
        feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
      }, {
        titl: 'Título da questão',
        text: '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        answ: true,
        feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
      }, {
        titl: 'Título da questão',
        text: '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        answ: false,
        feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
      }, {
        titl: 'Título da questão',
        text: '4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        answ: false,
        feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
      }, {
        titl: 'Título da questão',
        text: '5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        answ: true,
        feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
      }
    ];
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
        $('.dimmer').fadeIn();
        $('.modal').html('<h1></h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>');
        if (score < 1) {
          $('.modal h1').html('Você não acertou nenhuma questão!');
        }
        if (score > 1) {
          $('.modal h1').html('Você acertou ' + score + ' questões!');
        }
        if (score === 1) {
          return $('.modal h1').html('Você acertou uma questão!');
        }
      },
      dismiss: function() {
        $('.content').fadeIn();
        return $('.dimmer').fadeOut();
      },
      start: function() {
        var i, j, k, len, results;
        j = 0;
        func.dismiss();
        results = [];
        for (k = 0, len = data.length; k < len; k++) {
          i = data[k];
          $('.t-or-f').append('<section> <div class="txt"> <h1>' + data[j].titl + '</h1> <p>' + data[j].text + '</p> </div> <div class="ctrl"> <button class="true">verdadeiro</button> <button class="false">falso</button> </div> </section>');
          results.push(j++);
        }
        return results;
      },
      verify: function($el) {
        $('.ctrl').css({
          pointerEvents: 'none'
        });
        if ($el.attr('class') === 'true') {
          alt = true;
        } else if ($el.attr('class') === 'false') {
          alt = false;
        }
        $('.content').fadeOut();
        $('.dimmer').fadeIn();
        $('.modal').html('<h1></h1><p>' + data[count].feed + '</p><button class="nxt">Próxima</button>');
        if (alt === data[count].answ) {
          score++;
          return $('.modal h1').html('Resposta correta!');
        } else {
          return $('.modal h1').html('Resposta errada!');
        }
      },
      nxt: function() {
        count++;
        if (count < data.length) {
          func.dismiss();
          $('.ctrl').css({
            pointerEvents: 'auto'
          });
          $('.t-or-f section:nth-child(' + count + ')').fadeOut();
          return $('.t-or-f section:nth-child(' + (count + 1) + ')').fadeIn();
        } else {
          return setTimeout(function() {
            return func.end();
          }, 500);
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
    $(document).on('click', '.true, .false', function() {
      return func.verify($(this));
    });
    $(document).on('click', '.nxt', function() {
      return func.nxt();
    });
    return $(document).on('click', '.again', function() {
      return location.reload();
    });
  });

}).call(this);
