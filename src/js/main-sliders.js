import $ from "jquery";
import {sameHeights} from "./x-widgets.js"

const autoplayToggle = _ => {
	$(".stock-slider:not(.active) .swiper-list")[0].swiper.autoplay.stop();
	$(".stock-slider.active .swiper-list")[0].swiper.autoplay.start();
}, slidersToggle = sliderId => {
	$(".stock-slider").removeClass("active");
	$(".stock-slider#"+sliderId).addClass("active");

	autoplayToggle();
};

$(_ => {
	let sliders = document.querySelectorAll(".stock-slider .swiper-list");

	if (!sliders.length)
		return

	for (let slider of sliders){
		let sliderObject = slider.closest(".stock-slider");

		new Swiper(slider, {
			slidesPerView: 3,
			spaceBetween: 30,
			loop: true,
			navigation: {
				prevEl: sliderObject.querySelector(".slick-prev"),
				nextEl: sliderObject.querySelector(".slick-next")
			},
			watchOverflow: true,
			autoplay: sliderObject.classList.contains("active"),
			breakpoints: {
				1100: {
					spaceBetween: 15
				},
				1000: {
					slidesPerView: 2,
					navigation: false,
					spaceBetween: 18,
					pagination: {
						el: slider.querySelector(".swiper-pagination"),
						type: "bullets",
						clickable: true,
						dynamicBullets: true,
					}
				},
				660: {
					slidesPerView: 1,
					pagination: {
						el: slider.querySelector(".swiper-pagination"),
						type: "bullets",
						clickable: true,
						dynamicBullets: true,
					}
				}
			},
			on: {
				init(){
					sameHeights($(".stock-slider__slide .cat-item__img"))
				}
			}
		})

		slider.addEventListener("mouseover", function(){
			this.swiper.autoplay.stop()
		})

		slider.addEventListener("mouseout", function(){
			this.swiper.autoplay.start()
		})
	}

	autoplayToggle();

	$(".main-sliders__title").click(function(){
		let $this = $(this);

		if ($this.hasClass("active"))
			return

		let id = $this.data("id");

		$(".main-sliders__title").removeClass("active")
		$this.addClass("active");

		slidersToggle(id);
	});

	$(".sliders-switcher").click(e => {
		$(".main-sliders__title:not(.active)").trigger("click");
	});
});