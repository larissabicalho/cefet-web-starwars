// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.co/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução


// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.co/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

$(document).ready(() => {
	let episode = localStorage.getItem('episode');
	if(episode)
		introduction(episode);
});

const episodeNumbers = id => {
	let episodes = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
	return episodes[parseInt(id)];
}

const introduction = text => {
	localStorage.setItem('episode', text);
	$('.reading-animation').html(text);
}
//audio
var audio = new Audio("musica.ogg");

audio.onended = function() {
    playAudio()
};

function playAudio() {
    audio.currentTime = 0;
    audio.play();
}

//pega e preenche no html 
$.ajax({
	url: 'https://swapi.co/api/films',
	method: 'get',
	success: response => {
		let $ul = $('#movies ul');

		let movies = response.results.sort((first, second) => first.episode_id - second.episode_id)
		
		movies.forEach(movie => {
			let $li = $('<li>', {
				'data-episode-url': movie.url, 
				'text': 'Episode ' + episodeNumbers
			(movie.episode_id)
			});

			$ul.append($li);
		});
	}
});

// quando o filme for clicado , exibe introducao
$("#movies ul").on('click', 'li', function(e){
	let url = $(e.target).data('episode-url');

	$.ajax({
		url: url,
		method: 'get',
		success: response => {
			let episode = episodeNumbers
		(response.episode_id);
			let text = 'Episode ' + episode + '\n' +
					 	response.title + '\n\n' +
                         response.opening_crawl;

            introduction(text);
            playAudio();
		}
	});
});