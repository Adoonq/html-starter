function Modality() {

	var root = this,
			controls = document.querySelectorAll('[data-mdlt]');

	this.activeList = [];

	for (var i = 0; i < controls.length; i++) {
		controls[i].addEventListener('click', function() {
			root.open(this.dataset.mdlt);
		})
	}

	function createModal(el, name) {
		var elem = document.createElement('div');
				elem.className = 'modality';

		var config = {
			dialog: {type: 'div', class: 'dialog', content: false},
			header: {type: 'div', class: 'header', content: false},
			title: {type: 'h3', class: 'title', content: 'Заказать звонок'},
			close: {type: 'button', class: 'close', content: '<i class="fas fa-times"></i>'},
			content: {type: 'div', class: 'content', content: false}
		}

		var elements = [];

		for (var prop in config) {
			elements[prop] = createElem(config[prop].type, config[prop].class, config[prop].content);
		}

		elements['header'].appendChild(elements['title']);
		elements['header'].appendChild(elements['close']);
		elements['content'].appendChild(el.cloneNode(true));

		elements['dialog'].appendChild(elements['header']);
		elements['dialog'].appendChild(elements['content']);

		elements['close'].onclick = root.close.bind(root, name);

		elem.appendChild(elements['dialog']);

		return elem;
	}

	function createElem(elemType, elemClass, elemContent) {
		var elem = document.createElement(elemType);
				elem.className = elemClass ? 'modality-' + elemClass : '';
				elem.innerHTML = elemContent ? elemContent : '';

		return elem;
	}

	this.open = function(name) {
		var element = document.getElementById(name);

		if (element) {
			root.activeList[name] = document.body.appendChild(createModal(element, name));

			setTimeout(function () {
				document.body.classList.add('modality-active');
				root.activeList[name].classList.add('modality-open');
			}, 250);
		} else console.log('Modality:', '[' + name + '] not found!');
	}

	this.close = function(name) {
		if (root.activeList[name]) {
			document.body.classList.remove('modality-active');
			root.activeList[name].classList.remove('modality-open')

			setTimeout(function () {
				root.activeList[name].remove();
				delete root.activeList[name];
			}, 250);
		} else console.log('Modality:', '[' + name + '] not found!');
	}

}
