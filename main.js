(function(){

	const defaults = {};
	
	class Slider {
		constructor(options){
			this.options = Object.assign({}, defaults, options);
			this.init();
		}

		init(){
			const that = this;
			this.carouselElm = document.querySelector('[data-target="carousel"]');
			const itemElm = this.carouselElm.querySelector('[data-target="card"]');
			const items = this.carouselElm.querySelectorAll('[data-target="card"]');
			const buttonsElm = document.querySelector('[data-action="slideLeft"]').parentElement;
			const itemElmStyle = getComputedStyle(itemElm);
			const itemElmMarginRight = itemElmStyle.marginRight.match(/\d+/g)[0];
			this.carouselWidth = this.carouselElm.offsetWidth;
			this.pos = 0;
			this.xMax = -((items.length/this.options.itemsInView)*this.carouselWidth) + this.carouselWidth;
			this.boundFunc = this.onClickListener.bind(this);
			this.destroy();
			buttonsElm.addEventListener('click', this.boundFunc);
		}

		onClickListener(event) {
			if(event.target.matches('[data-action="slideLeft"]')){
				this.moveLeft();
			} else {
				this.moveRight();
			}
		}

		moveRight(){
			if(this.pos > this.xMax){
				this.pos -= this.carouselWidth;
				this.slideTo(this.pos);
			}
		}

		moveLeft(){
			if(this.pos < 0){
				this.pos += this.carouselWidth;
				this.slideTo(this.pos);
			}
		}

		slideTo(pos){
			const that = this;
			requestAnimationFrame(function(){
				that.carouselElm.style.transform = `translate(${pos}px)`;
			});
		}

		destroy(){
			if(!this.buttonsElm){
				return;
			}
			this.buttonsElm.removeEventListener('click', this.boundFunc);
		}

	}

	window.Slider = Slider;

})();