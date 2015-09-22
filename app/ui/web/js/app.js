$(function() {
	var apiEntryPoint = '/';
var socket = new WebSocket("ws://localhost:8081/ws");
	
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
	};

	socket.onerror = function(error) {
		console.log("Ошибка " + error.message);
	};
	
	var api = {
		resume: function() {
			socket.send('resume');
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
		getVideoList: function() {
			return api._call('video/all');
		},
		playVideo: function(url) {
			socket.send('play');
			return api._call('video/play/' + encodeURIComponent(url));
		},
		getLayouts: function() {
			return api._call('layout/all');
		},
		setLayout: function(layoutName) {
			return api._call('layout/set/' + encodeURIComponent(layoutName));
		},
		getCurrentLayout: function() {
			return api._call('layout');
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

	//var updateVideoList = function() {
	//	api.getVideoList()
	//		.then(function(videos) {
	//			var $list = $('.js-video-list');
	//			$list.empty();
	//			videos.forEach(function(item) {
	//				var $row = $('<tr><td></td></tr>');
	//				$row.find('td').text(item);
	//				$row.data('url', item);
	//				$list.append($row);
	//			});
	//		});
	//};

	//updateVideoList();
	//
	//setInterval(updateVideoList, 1000);

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
		api.playVideo($(this).data('url'));
	});

	$('.js-layout-list').on('click', '.col-xs-6', function() {
		var layoutName = $(this).data('layoutName');
		//api.setLayout(layoutName)
		//	.then(function() {
		//		updateLayoutList();
		//	});
	});
});