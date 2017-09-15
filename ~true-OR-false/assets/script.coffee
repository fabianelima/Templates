###
	       OA TEMPLATE 4.0
	----------------------------
	Desenvolvido em CoffeeScript

		Código: Fabiane Lima
###
$ ->
	count = 0
	score = 0
	alt = undefined
	data =	[
				{
					titl: 'Título da questão'
					text: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					answ: true
					feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
				}
				{
					titl: 'Título da questão'
					text: '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					answ: true
					feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
				}
				{
					titl: 'Título da questão'
					text: '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					answ: false
					feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
				}
				{
					titl: 'Título da questão'
					text: '4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					answ: false
					feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
				}
				{
					titl: 'Título da questão'
					text: '5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
					answ: true
					feed: 'Ut enim ad minim veniam, quis nostrud exercitation.'
				}
			]
	imgs =	['assets/img/help.png']
	func =
		preload: (imgs) ->
			counter = 0

			$(imgs).each ->
				counter++
				$('<img />').attr('src', this).appendTo('body').css { display: 'none' }

				if counter is imgs.length
					$('main').css { opacity: '1' }
					$('body').css { background: '#e7e7e7' }

		help: ->
			$('.content').fadeOut()
			$('.dimmer').fadeIn()
			$('.modal').html('<h1>Ajuda</h1><p></p><button class="dismiss">Fechar</button>')

		info: -> $('.modal').html('<h1>Referência</h1><p></p><button class="end">Voltar</button>')

		end: ->
			$('.content').fadeOut()
			$('.dimmer').fadeIn()
			$('.modal').html('<h1></h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>')

			if score < 1 then $('.modal h1').html('Você não acertou nenhuma questão!')
			if score > 1 then $('.modal h1').html('Você acertou ' + score + ' questões!')
			if score is 1 then $('.modal h1').html('Você acertou uma questão!')

		dismiss: ->
			$('.content').fadeIn()
			$('.dimmer').fadeOut()

		start: ->
			j = 0
			func.dismiss()

			for i in data
				$('.t-or-f').append('
					<section>
						<div class="txt">
							<h1>' + data[j].titl + '</h1>
							<p>' + data[j].text + '</p>
						</div>
						<div class="ctrl">
							<button class="true">verdadeiro</button>
							<button class="false">falso</button>
						</div>
					</section>
				')
				j++

		verify: ($el) ->
			$('.ctrl').css { pointerEvents: 'none' }

			if $el.attr('class') is 'true' then alt = true
			else if $el.attr('class') is 'false' then alt = false

			$('.content').fadeOut()
			$('.dimmer').fadeIn()
			$('.modal').html('<h1></h1><p>' + data[count].feed + '</p><button class="nxt">Próxima</button>')

			if alt is data[count].answ
				score++
				$('.modal h1').html('Resposta correta!')
				
			else $('.modal h1').html('Resposta errada!')

		nxt: ->
			count++

			if count < data.length
				func.dismiss()
				$('.ctrl').css { pointerEvents: 'auto' }
				$('.t-or-f section:nth-child(' + count + ')').fadeOut()
				$('.t-or-f section:nth-child(' + (count + 1) + ')').fadeIn()

			else
				setTimeout ->
					func.end()
				, 500

	$(window).on 'load', -> func.preload(imgs)
	$(document).on 'click', '.start', -> func.start()
	$(document).on 'click', '.help', -> func.help()
	$(document).on 'click', '.info', -> func.info()
	$(document).on 'click', '.end', -> func.end()
	$(document).on 'click', '.dismiss', -> func.dismiss()
	$(document).on 'click', '.true, .false', -> func.verify $(this)
	$(document).on 'click', '.nxt', -> func.nxt()
	$(document).on 'click', '.again', -> location.reload()
