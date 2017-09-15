###
	       OA TEMPLATE 4.0
	----------------------------
	Desenvolvido em CoffeeScript

		Código: Fabiane Lima
###
$ ->
	count = 0
	data =	[
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
				'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
				'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
			]
	imgs =	[
				'assets/img/img1.png'
				'assets/img/img2.png'
				'assets/img/img3.png'
				'assets/img/img4.png'
				'assets/img/img5.png'
			]
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
			$('.dimmer').delay(200).fadeIn()
			$('.modal').html('<h1>Finalizando...</h1><p></p><button class="info">Referência</button>&nbsp;&nbsp;<button class="again">Ver novamente</button>')

		dismiss: ->
			$('.content').fadeIn()
			$('.dimmer').fadeOut()

		start: ->
			j = 0

			for i in data
				$('.slides').append('
					<section>
						<div>' + i + '</div>
						<img src="' + imgs[j] + '">
					</section>
				')
				j++

			func.dismiss()

		slideshow: ($el) ->
			if $el.attr('class') is 'next'
				count++
				$('.prev').css { pointerEvents: 'auto', opacity: '1' }

				if count < data.length
					$('.slides section').fadeOut()
					$('.slides section:nth-child(' + (count + 1) + ')').fadeIn()
				else func.end()

			if $el.attr('class') is 'prev'
				count--
				$('.slides section').fadeOut()
				$('.slides section:nth-child(' + (count + 1) + ')').fadeIn()

				if count is 0 then $('.prev').css { pointerEvents: 'none', opacity: '0.6' }

	$(window).on 'load', -> func.preload(imgs)
	$(document).on 'click', '.start', -> func.start()
	$(document).on 'click', '.help', -> func.help()
	$(document).on 'click', '.info', -> func.info()
	$(document).on 'click', '.end', -> func.end()
	$(document).on 'click', '.dismiss', -> func.dismiss()
	$(document).on 'click', '.ctrl *', -> func.slideshow $(this)
	$(document).on 'click', '.again', -> location.reload()
