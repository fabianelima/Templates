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
	alt = undefined
	count = 0
	score = 0
	data =	[
				{
					titl: 'Título da questão'
					enun: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					alts: 	[
								'Alternativa 1'
								'Alternativa 2'
								'Alternativa 3'
								'Alternativa 4'
							]
					answ: 2
					feed: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
				}
				{
					titl: 'Título da questão'
					enun: '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					alts: 	[
								'Alternativa 1'
								'Alternativa 2'
								'Alternativa 3'
								'Alternativa 4'
							]
					answ: 0
					feed: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
				}
				{
					titl: 'Título da questão'
					enun: '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					alts: 	[
								'Alternativa 1'
								'Alternativa 2'
								'Alternativa 3'
								'Alternativa 4'
							]
					answ: 3
					feed: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
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

			if score > 1 then $('.modal').html('<h1>Você acertou ' + score + ' questões!</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>')
			else if score < 1 then $('.modal').html('<h1>Você não acertou nenhuma questão!</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>')
			else $('.modal').html('<h1>Você acertou uma questão!</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>')

			$('.modal p').html('oioioi')

		dismiss: ->
			$('.content').fadeIn()
			$('.dimmer').fadeOut()

		start: ->
			j = 0

			for i in data
				$('.quiz').append('
					<section>
						<div class="enun"><h3>' + data[j].titl + '</h3>
						<p>' + data[j].enun + '</p></div>
						<div class="alts"><ul></ul></div>
						<button class="verify">Conferir</button>
					</section>
				')
				j++

			func.putAlts()
			func.dismiss()

		selectAlt: ($el) ->
			alt = $el.index()
			$('.verify').css { pointerEvents: 'auto', opacity: '1' }
			$('.alts li').css { background: 'white', color: 'black' }
			$el.css { background: '#006c7f', color: 'white' }

		verify: ->
			$('.content').fadeOut()
			$('.dimmer').fadeIn()
			$('.modal').html('<h1></h1><p>' + data[count].feed + '</p><button class="nxt">Próxima</button>')

			if alt is data[count].answ
				score++
				$('.modal h1').html('Resposta certa!')

			else $('.modal h1').html('Resposta errada!')

		nxt: ->
			count++

			if count < data.length
				func.dismiss()
				func.putAlts()
				$('.verify').css { pointerEvents: 'none', opacity: '0.6' }
				$('.quiz section:nth-child(' + count + ')').fadeOut()
				$('.quiz section:nth-child(' + (count + 1) + ')').fadeIn()

			else
				setTimeout ->
					func.end()
				, 400

		putAlts: ->
			l = 0
			for k in data[count].alts
				$('.quiz section:nth-child(' + (count + 1) + ') .alts ul').append('
					<li>' + data[count].alts[l] + '</li>
				')
				l++


# ----- Eventos ----- #
	$(document).on 'click', '.start', -> func.start()
	$(document).on 'click', '.help', -> func.help()
	$(document).on 'click', '.info', -> func.info()
	$(document).on 'click', '.end', -> func.end()
	$(document).on 'click', '.dismiss', -> func.dismiss()
	$(document).on 'click', '.alts li', -> func.selectAlt $(this)
	$(document).on 'click', '.verify', -> func.verify()
	$(document).on 'click', '.nxt', -> func.nxt()
	$(document).on 'click', '.again', -> location.reload()
