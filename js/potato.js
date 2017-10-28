(function () {
	'use strict';
	var modalToggles = document.querySelectorAll('[data-toggle="modal"]');

	modalToggles.forEach(function (item) {
		var target = document.querySelector(item.getAttribute('data-target'));
		if (target !== null || target !== undefined) {
			item.addEventListener('click', function (e) {
				e.preventDefault();
				toggleModal(target);
			}, false);

			var closeButtons = target.querySelectorAll('[data-action="close"]');
			closeButtons.forEach(function (item) {
				item.addEventListener('click', function (e) {
					e.preventDefault();
					toggleModal(target);
				}, false);
			});

			target.addEventListener('click', function (e) {
				e.preventDefault();
				if (e.target === target) {
					toggleModal(target);
				}
			});

			document.addEventListener('keydown', function (e) {
				if (target.className.split(' ').indexOf('open') >= 0) {
					if (e.keyCode === 27 || e.which === 27) {
						e.preventDefault();
						toggleModal(target);
					}
				}
			}, false);
		}
	});

	var toggleModal = function (target) {
		var classList = target.className.split(' ');
		if (classList.indexOf('open') >= 0) {
			target.classList.remove('open');
			setTimeout(function () {
				document.querySelector('body').classList.remove('hide-overflow');
				document.body.removeAttribute('style');
			}, 300)
		}
		else {
			target.classList.add('open');
			document.querySelector('body').classList.add('hide-overflow');
			document.querySelector('body').style.paddingRight = getScrollbarWidth() + 'px';
		}
	};

	var getScrollbarWidth = function () {
		var se = document.createElement('div');
		se.style.position = 'absolute';
		se.style.top = '-99999px';
		se.style.width = '100px';
		se.style.height = '100px';
		se.style.overflow = 'scroll';
		se.style.opacity = '0';
		document.body.appendChild(se);
		var sw = se.offsetWidth - se.clientWidth;
		document.body.removeChild(se);
		return sw;
	};

}());
