
/*
	       OA TEMPLATE 4.0
	----------------------------
	Desenvolvido em CoffeeScript

		Código: Fabiane Lima
 */

(function() {
  $(function() {
    var count, ctrl, data, func, imgs, resp;
    count = 0;
    ctrl = [];
    resp = [];
    data = [
      {
        txt: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        pos: [50, 30]
      }, {
        txt: '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        pos: [20, 20]
      }, {
        txt: '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        pos: [10, 30]
      }, {
        txt: '4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        pos: [30, 70]
      }, {
        txt: '5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        pos: [50, 50]
      }
    ];
    imgs = ['assets/img/bg.png'];
    func = {
      preload: function(imgs) {
        var counter;
        counter = 0;
        return $(imgs).each(function() {
          counter++;
          $('<img />').attr('src', this).appendTo('body').css({
            display: 'none'
          });
          if (counter === imgs.length) {
            $('main').css({
              opacity: '1'
            });
            return $('body').css({
              background: '#e7e7e7'
            });
          }
        });
      },
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
        return $('.modal').html('<h1>Finalizando...</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>');
      },
      dismiss: function() {
        $('.content').fadeIn();
        $('.dimmer').fadeOut();
        return func.callEnd();
      },
      start: function() {
        var i, j, len, results;
        func.dismiss();
        results = [];
        for (j = 0, len = data.length; j < len; j++) {
          i = data[j];
          resp.push(data.indexOf(i));
          $('.clickarea').append('<div></div>');
          $('.clickarea div:nth-child(' + (count + 1) + ')').css({
            top: data[count].pos[0] + '%',
            left: data[count].pos[1] + '%'
          });
          results.push(count++);
        }
        return results;
      },
      showC: function($el) {
        ctrl.push($el.index());
        $el.css({
          pointerEvents: 'none',
          opacity: '0.6'
        });
        $('.content').fadeOut();
        $('.dimmer').fadeIn();
        return $('.modal').html(data[$el.index()].txt + '<button class="dismiss">Fechar</button>');
      },
      callEnd: function() {
        var i, j, len, results;
        if (ctrl.length !== data.length) {
          return false;
        } else {
          results = [];
          for (j = 0, len = ctrl.length; j < len; j++) {
            i = ctrl[j];
            if (ctrl.indexOf(i) === resp.indexOf(i)) {
              results.push(setTimeout(function() {
                return func.end();
              }, 1000));
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      }
    };
    $(window).on('load', function() {
      return func.preload(imgs);
    });
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
    $(document).on('click', '.clickarea *', function() {
      return func.showC($(this));
    });
    return $(document).on('click', '.again', function() {
      return location.reload();
    });
  });

}).call(this);
