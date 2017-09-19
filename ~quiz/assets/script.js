
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
    alt = void 0;
    count = 0;
    score = 0;
    data = [
      {
        titl: 'Título da questão',
        enun: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        alts: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
        answ: 2,
        feed: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }, {
        titl: 'Título da questão',
        enun: '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        alts: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
        answ: 0,
        feed: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }, {
        titl: 'Título da questão',
        enun: '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        alts: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
        answ: 3,
        feed: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
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
        if (score > 1) {
          $('.modal').html('<h1>Você acertou ' + score + ' questões!</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>');
        } else if (score < 1) {
          $('.modal').html('<h1>Você não acertou nenhuma questão!</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>');
        } else {
          $('.modal').html('<h1>Você acertou uma questão!</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>');
        }
        return $('.modal p').html('oioioi');
      },
      dismiss: function() {
        $('.content').fadeIn();
        return $('.dimmer').fadeOut();
      },
      start: function() {
        var i, j, len, m;
        j = 0;
        for (m = 0, len = data.length; m < len; m++) {
          i = data[m];
          $('.quiz').append('<section> <div class="enun"><h3>' + data[j].titl + '</h3> <p>' + data[j].enun + '</p></div> <div class="alts"><ul></ul></div> <button class="verify">Conferir</button> </section>');
          j++;
        }
        func.putAlts();
        return func.dismiss();
      },
      selectAlt: function($el) {
        alt = $el.index();
        $('.verify').css({
          pointerEvents: 'auto',
          opacity: '1'
        });
        $('.alts li').css({
          background: 'white',
          color: 'black'
        });
        return $el.css({
          background: '#006c7f',
          color: 'white'
        });
      },
      verify: function() {
        $('.content').fadeOut();
        $('.dimmer').fadeIn();
        $('.modal').html('<h1></h1><p>' + data[count].feed + '</p><button class="nxt">Próxima</button>');
        if (alt === data[count].answ) {
          score++;
          return $('.modal h1').html('Resposta certa!');
        } else {
          return $('.modal h1').html('Resposta errada!');
        }
      },
      nxt: function() {
        count++;
        if (count < data.length) {
          func.dismiss();
          func.putAlts();
          $('.verify').css({
            pointerEvents: 'none',
            opacity: '0.6'
          });
          $('.quiz section:nth-child(' + count + ')').fadeOut();
          return $('.quiz section:nth-child(' + (count + 1) + ')').fadeIn();
        } else {
          return setTimeout(function() {
            return func.end();
          }, 400);
        }
      },
      putAlts: function() {
        var k, l, len, m, ref, results;
        l = 0;
        ref = data[count].alts;
        results = [];
        for (m = 0, len = ref.length; m < len; m++) {
          k = ref[m];
          $('.quiz section:nth-child(' + (count + 1) + ') .alts ul').append('<li>' + data[count].alts[l] + '</li>');
          results.push(l++);
        }
        return results;
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
    $(document).on('click', '.alts li', function() {
      return func.selectAlt($(this));
    });
    $(document).on('click', '.verify', function() {
      return func.verify();
    });
    $(document).on('click', '.nxt', function() {
      return func.nxt();
    });
    return $(document).on('click', '.again', function() {
      return location.reload();
    });
  });

}).call(this);
