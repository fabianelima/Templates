###
	       OA TEMPLATE 4.0
	----------------------------
	Desenvolvido em CoffeeScript

		Código: Fabiane Lima
###

# ----- Pré-carregamento das imagens ----- #
imgs =	['assets/img/help.png']

preload = (imgs) ->
	counter = 0

	$(imgs).each ->
		$('<img />').attr('src', this).appendTo('body').css { display: 'none' }
		counter++

	if counter is imgs.length
		$('main').css { opacity: '1' }
		$('body').css { background: '#e7e7e7' }

$(window).on 'load', -> preload(imgs)


# ----- Funções e dados ----- #
$ ->
	count = 0
	ctrl = []
	endit = []
	data =	[
				[
					'draggable 1'
					'draggable 2'
					'draggable 3'
					'draggable 4'
					'draggable 5'
					'draggable 6'
				]
				[
					'draggable 1'
					'draggable 2'
					'draggable 3'
					'draggable 4'
					'draggable 5'
					'draggable 6'
				]
			]
	func =
		help: ->
			$('.content').fadeOut()
			$('.dimmer').fadeIn()
			$('.modal').html('<h1>Ajuda</h1><p></p><button class="dismiss">Fechar</button>')

		info: -> $('.modal').html('<h1>Referência</h1><p></p><button class="end">Voltar</button>')

		end: ->
			$('.content').fadeOut()
			$('.dimmer').fadeIn()
			$('.modal').html('<h1>Finalizando...</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>')

		dismiss: ->
			$('.content').fadeIn()
			$('.dimmer').fadeOut()

		start: ->
			func.dismiss()
			func.rNumber()

			for i in data[1]
				$('.droppie').append('<div>' + i + '</div>')

			func.draggie()
			func.droppie()

		rNumber: ->
			randy = Math.floor(Math.random() * data[0].length)

			if ctrl.length < data[0].length
				if ctrl.indexOf(randy) is -1
					ctrl.push randy
					$('.draggie').append('
						<div>' + data[0][randy] + '</div>
					')

				func.rNumber()

		draggie: ->
			$('.draggie').children().draggable
				cursor: 'move'
				revert: (event, ui) ->
					this.data('uiDraggable').originalPosition =
						top: 0
						left: 0
					!event

		droppie: ->
			$('.droppie').children().droppable
				tolerance: 'touch'
				accept: (e) ->
					if $(this).html() is e.html() then return true

				drop: (e, ui) ->
					endit.push $(this).index()
					$('.ui-draggable-dragging').fadeOut()
					$(this).css
						color: 'black'
						background: 'white'
						boxShadow: '0 0 0.5em rgba(0,0,0,0.6)'

					if endit.length is ctrl.length
						$('.draggie').fadeOut()

						setTimeout ->
							func.end()
						, 800

# ----- Eventos ----- #
	$(document).on 'click', '.start', -> func.start()
	$(document).on 'click', '.help', -> func.help()
	$(document).on 'click', '.info', -> func.info()
	$(document).on 'click', '.end', -> func.end()
	$(document).on 'click', '.dismiss', -> func.dismiss()
	$(document).on 'click', '.again', -> location.reload()
