
/*
	       OA TEMPLATE 4.5
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
    var alt, count, ctrl, data, error, func, inOrder, pro, score;
    alt = void 0;
    pro = void 0;
    ctrl = [];
    count = 0;
    score = 0;
    error = 0;
    inOrder = 1;
    data = [
      {
        titl: 'Título da questão',
        enun: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        alts: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
        answ: 0,
        feed: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }, {
        titl: 'Título da questão',
        enun: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        alts: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
        answ: 1,
        feed: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }, {
        titl: 'Título da questão',
        enun: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        alts: ['Alternativa 1', 'Alternativa 2', 'Alternativa 3', 'Alternativa 4'],
        answ: 2,
        feed: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    ];
    func = {
      help: function() {
        $('.dimmer').fadeIn();
        return $('.modal').html('<h1>Ajuda</h1><p></p><button class="dismiss">Fechar</button>');
      },
      info: function() {
        return $('.modal').html('<h1>Referência</h1><p></p><button class="end">Voltar</button>');
      },
      end: function() {
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
        return $('.dimmer').fadeOut();
      },
      rNumber: function() {
        var randy;
        randy = Math.floor(Math.random() * data.length);
        if (ctrl.length < data.length) {
          if (ctrl.indexOf(randy) === -1) {
            ctrl.push(randy);
            $('.quiz').append('<section id="' + randy + '" class="q"> <div class="enun"> <h1>' + (ctrl.indexOf(randy) + 1) + '. ' + data[randy].titl + '</h1> <p>' + data[randy].enun + '</p> </div> <div class="alts"><ul></ul></div> <button class="verify">Conferir</button> </section>');
            pro = true;
          } else {
            pro = false;
          }
          func.putAlts(randy);
          return func.rNumber();
        }
      },
      start: function() {
        func.rNumber();
        func.dismiss();
        return $('.content').fadeIn();
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
        $('.dimmer').delay(500).fadeIn();
        $('.modal').html('<h1></h1><p>' + data[ctrl[count]].feed + '</p><button class="nxt">Prosseguir</button>');
        if (alt === data[ctrl[count]].answ) {
          score++;
          return $('.modal h1').html('Resposta certa!');
        } else {
          error++;
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
      putAlts: function(randy) {
        var testPromise;
        return testPromise = new Promise(function(resolve, reject) {
          if (pro === true) {
            return resolve();
          } else {
            return reject();
          }
        }).then(function(fromResolve) {
          var i, j, k, len, ref, results;
          ref = data[randy].alts;
          results = [];
          for (j = k = 0, len = ref.length; k < len; j = ++k) {
            i = ref[j];
            $('.quiz section:nth-child(' + inOrder + ') .alts ul').append('<li>' + i + '</li>');
            if (j === data[randy].alts.length - 1) {
              inOrder++;
            }
            results.push(console.log(data[randy].answ));
          }
          return results;
        })["catch"](function(fromReject) {});
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
