$(function() {
	var apiEntryPoint = '/';
	var socket = new WebSocket("ws://kicum:8081/ws");

	socket.onopen = function() {
		console.log("Соединение установлено.");
	};

	socket.onclose = function(event) {
		if (event.wasClean) {
			console.log('Соединение закрыто чисто');
		} else {
			console.log('Обрыв соединения'); // например, "убит" процесс сервера
		}
		console.log('Код: ' + event.code + ' причина: ' + event.reason);
	};

	socket.onmessage = function(event) {
		console.log("Получены данные " + event.data);
		update(JSON.parse(event.data));
	};

	socket.onerror = function(error) {
		console.log("Ошибка " + error.message);
	};
	
	var api = {
		resume: function() {
			socket.send('resume');
			return api._call('video/resume');
		},
		play: function(id) {
			socket.send(JSON.stringify({play: id}));
			return api._call('video/resume');
		},
		pause: function() {
			socket.send('pause');
			return api._call('video/pause');
		},
		next: function() {
			socket.send('next');
			console.log('next');
		},
		prev: function() {
			socket.send('prev');
			console.log('prev');
		},
		getCurrentList: function() {
			socket.send('get-list');
			console.log('get-list');
		},
		_call: function(method, opt_args) {
			return $.ajax({
				url: apiEntryPoint + method,
				data: opt_args || {},
				dataType: 'json'
			});
		}
	};
	window.api = api;

	var update = function(audioTracks) {
		var $list = $('.js-video-list');
				$list.empty();
				audioTracks.forEach(function(item) {
					var $row = $('<tr><td></td></tr>');
					$row.find('td').text(item.artist + ' - ' + item.title);
					$row.data('url', item.id);
					$list.append($row);
				});
	};
	setInterval(api.getCurrentList.bind(api), 10 * 1000);

	//var updateVideoList = function() {
	//	api.getCurrentList()
	//		.then(function(audioTracks) {
	//			var $list = $('.js-video-list');
	//			$list.empty();
	//			audioTracks.forEach(function(item) {
	//				var $row = $('<tr><td></td></tr>');
	//				$row.find('td').text(item);
	//				$row.data('url', item);
	//				$list.append($row);
	//			});
	//		});
	//};

	//updateVideoList();


	//var updateLayoutList = function() {
	//	$.when(api.getLayouts(), api.getCurrentLayout())
	//		.done(function(layouts, currentLayout) {
	//			layouts = layouts[0];
	//			currentLayout = currentLayout[0];
	//			var currentLayoutName = currentLayout['title'];
	//			var $list = $('.js-layout-list')
	//			$list.empty();
	//			layouts.forEach(function(layoutObj) {
	//				var layoutName = layoutObj['title'];
	//				var $col = $('<div class="col-xs-6 col-md-3"><a href="#" class="thumbnail"><img alt="" src="" style="height: 100px; width: 100%; display: block;"></a></div>');
	//				$col.find('img').attr('src', 'img/layout/' + layoutName + '.png');
	//				$col.data('layoutName', layoutName);
	//
	//				if (currentLayoutName === layoutName) {
	//					$col.find('a').addClass('console.log-success');
	//				}
	//
	//				$list.append($col);
	//			});
	//		});
	//};
	//
	//updateLayoutList();
	//
	//setInterval(updateLayoutList, 1000);


	$('.js-btn-prev').click(function() {
		api.prev();
	});

	$('.js-btn-next').click(function() {
		api.next();
	});

	$('.js-btn-play').click(function() {
		api.resume();
	});

	$('.js-btn-pause').click(function() {
		api.pause();
	});

	$('.js-video-list').on('click', 'tr', function() {
		api.play($(this).data('url'));
	});

	$('.js-layout-list').on('click', '.col-xs-6', function() {
		var layoutName = $(this).data('layoutName');
		//api.setLayout(layoutName)
		//	.then(function() {
		//		updateLayoutList();
		//	});
	});
});