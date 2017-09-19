
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
    var count, ctrl, data, endit, func;
    count = 0;
    ctrl = [];
    endit = [];
    data = [['draggable 1', 'draggable 2', 'draggable 3', 'draggable 4', 'draggable 5', 'draggable 6'], ['draggable 1', 'draggable 2', 'draggable 3', 'draggable 4', 'draggable 5', 'draggable 6']];
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
        return $('.modal').html('<h1>Finalizando...</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>');
      },
      dismiss: function() {
        $('.content').fadeIn();
        return $('.dimmer').fadeOut();
      },
      start: function() {
        var i, j, len, ref;
        func.dismiss();
        func.rNumber();
        ref = data[1];
        for (j = 0, len = ref.length; j < len; j++) {
          i = ref[j];
          $('.droppie').append('<div>' + i + '</div>');
        }
        func.draggie();
        return func.droppie();
      },
      rNumber: function() {
        var randy;
        randy = Math.floor(Math.random() * data[0].length);
        if (ctrl.length < data[0].length) {
          if (ctrl.indexOf(randy) === -1) {
            ctrl.push(randy);
            $('.draggie').append('<div>' + data[0][randy] + '</div>');
          }
          return func.rNumber();
        }
      },
      draggie: function() {
        return $('.draggie').children().draggable({
          cursor: 'move',
          revert: function(event, ui) {
            this.data('uiDraggable').originalPosition = {
              top: 0,
              left: 0
            };
            return !event;
          }
        });
      },
      droppie: function() {
        return $('.droppie').children().droppable({
          tolerance: 'touch',
          accept: function(e) {
            if ($(this).html() === e.html()) {
              return true;
            }
          },
          drop: function(e, ui) {
            endit.push($(this).index());
            $('.ui-draggable-dragging').fadeOut();
            $(this).css({
              color: 'black',
              background: 'white',
              boxShadow: '0 0 0.5em rgba(0,0,0,0.6)'
            });
            if (endit.length === ctrl.length) {
              $('.draggie').fadeOut();
              return setTimeout(function() {
                return func.end();
              }, 800);
            }
          }
        });
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
    return $(document).on('click', '.again', function() {
      return location.reload();
    });
  });

}).call(this);
