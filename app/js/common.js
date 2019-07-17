$(function() {

	var itemValue = 0,
		mainItemValue = 0;

	$('.top__list .list__item').click(function(){	
		mainItemValue = $('.list__item:first').text();
		itemValue = $(this).text();
		$(this).text(mainItemValue);
		$('.top__list .list__item:first').text(itemValue);	
	});

	var canvasElipse = document.querySelector('.slide-elipse'),
		ctxElipse = canvasElipse.getContext('2d');	
	canvasElipse.width = Math.round($('.item__img').width());
	canvasElipse.height = Math.round($('.item__img').width());
	var xc = canvasElipse.width / 2,
		yc = canvasElipse.height / 2;
	var grd = ctxElipse.createLinearGradient(0, 0, 170, 0)
		grd.addColorStop(1, "#4293C1");
		grd.addColorStop(0.2, "#ADE1FF");
	function getRadians(degree) {
			return Math.PI / 180 * degree;
		}	
	var progresStatus = 0;
	var arcRadius = canvasElipse.width / 2 - 5;
	function progressBar() {
		ctxElipse.clearRect(0,0,canvasElipse.width,canvasElipse.height);
		ctxElipse.beginPath();
		ctxElipse.lineWidth = 10;
		ctxElipse.strokeStyle = grd;
		ctxElipse.arc(xc, yc ,arcRadius, 0, getRadians(progresStatus),false);
		ctxElipse.stroke();
		progresStatus++;
		if (progresStatus > 360) {
			clearInterval(intervalID);
			progresStatus = 0;
		}	
	};

	var intervalID = setInterval(progressBar, 100/3.6);			

// SLICK SLIDER 
	$('.products__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		autoplay: true,
		autoplaySpeed: 10000,
		pauseOnHover: false,
		fade: true,
		responsive: [
			{
				breakpoint: 480,
				settings: {
					dots: false,
					arrows: true
				}
			}
		]

	});
	progressBar();
	$('.products__slider').on('beforeChange', function () {
		ctxElipse.clearRect(0,0,canvasElipse.width,canvasElipse.height);
		clearInterval(intervalID);
		progresStatus = 0;
	})
	$('.products__slider').on('afterChange', function() {
		intervalID = setInterval(progressBar, 100/3.6);	
	});


	var plusBtns = $('.row-item__plus-btn'),
		minusBtns = $('.row-item__minus-btn'),
		inputs = $('.row-item__input'),
		sumInput = $('.row-item__input.sum'),
		sumValue = $('.sum__value'),
		prices = $('.row-item__price'),
		amounts = $('.row-item__amount'),
		sumAmounts = $('.sum__value-amounts');

	plusBtns.on('click', function(event) {
		var id = event.target.attributes.getNamedItem('data-id').value;
		for (var i=0; i < inputs.length; i++) {
			var inputID = inputs[i].attributes.getNamedItem('data-id').value;

			if (inputID == id) {
				var inputVal = parseInt(inputs[i].value,10);
				inputVal++;
				inputs[i].value = inputVal;
			}
		}
		amount(id, inputVal);
		sumQuantity();
		sumAmount();
	});

	minusBtns.on('click', function(event) {
		var id = event.target.attributes.getNamedItem('data-id').value;
		for (var i=0; i < inputs.length; i++) {
			var inputID = inputs[i].attributes.getNamedItem('data-id').value;

			if (inputID == id) {
				var inputVal = parseInt(inputs[i].value,10);
				if (inputVal !== 0) {
					inputVal--;
					inputs[i].value = inputVal;
				} else {
					return;
				}
			}
		}
		amount(id, inputVal);
		sumQuantity();
		sumAmount();
	});

	inputs.change(event, function() {
		var id = event.target.attributes.getNamedItem('data-id').value,
			inputVal = parseInt(event.target.value);
		amount(id, inputVal);
		sumQuantity();
		sumAmount();
	});

	function sumQuantity() {
		var sum = 0;
		for (var i=0; i < inputs.length-1; i++) {
			var inputVal = parseInt(inputs[i].value,10);
			// console.log(inputVal);
			sum = sum + inputVal;
		}
		sumInput.val(sum);
	};

	function amount(id, inputVal) {
		for(var i = 0; i < amounts.length; i++) {
			if (i == id-1) {
				var price = parseInt(prices[id-1].innerHTML, 10);
				amounts[id-1].innerHTML = price * inputVal;
			}
		}
	};

	function sumAmount() {
		var sum = 0;
		for (var i=0; i < inputs.length-1; i++) {
			var amountVal = parseInt(amounts[i].innerHTML,10);
			sum = sum + amountVal;
		}
		sumAmounts.html(sum);
	};
});
