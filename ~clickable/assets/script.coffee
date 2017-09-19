###
	       OA TEMPLATE 4.0
	----------------------------
	Desenvolvido em CoffeeScript

		Código: Fabiane Lima
###

# ----- Pré-carregamento das imagens ----- #
imgs =	['assets/img/bg.png']

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
	resp = []
	data =	[
				{
					txt: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					pos: [50, 30]
				}
				{
					txt: '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					pos: [20, 20]
				}
				{
					txt: '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					pos: [10, 30]
				}
				{
					txt: '4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					pos: [30, 70]
				}
				{
					txt: '5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					pos: [50, 50]
				}
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

			func.callEnd()

		start: ->
			func.dismiss()

			for i in data
				resp.push data.indexOf(i)
				$('.clickarea').append('<div></div>')
				$('.clickarea div:nth-child(' + (count + 1) + ')').css
					top: data[count].pos[0] + '%', left: data[count].pos[1] + '%'
				count++

		showC: ($el) ->
			ctrl.push $el.index()
			$el.css { pointerEvents: 'none', opacity: '0.6' }

			$('.content').fadeOut()
			$('.dimmer').fadeIn()
			$('.modal').html(data[$el.index()].txt + '<button class="dismiss">Fechar</button>')

		callEnd: ->
			if ctrl.length isnt data.length then return false
			else
				for i in ctrl
					if ctrl.indexOf(i) is resp.indexOf(i)
						setTimeout ->
							func.end()
						, 1000

# ----- Eventos ----- #
	$(document).on 'click', '.start', -> func.start()
	$(document).on 'click', '.help', -> func.help()
	$(document).on 'click', '.info', -> func.info()
	$(document).on 'click', '.end', -> func.end()
	$(document).on 'click', '.dismiss', -> func.dismiss()
	$(document).on 'click', '.clickarea *', -> func.showC $(this)
	$(document).on 'click', '.again', -> location.reload()
