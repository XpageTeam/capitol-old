import $ from "jquery";
import is from "is_js";

$(_ => {
	let smallSlider, bigSlider;

	if (is.desktop())
		smallSlider = new Swiper(".tovar-slider-small .swiper-list", {
			slidesPerView: 3,
			spaceBetween: 15,
			roundLengths: true,
			loopFillGroupWithBlank: true,
			watchOverflow: true,
			navigation: {
				prevEl: ".tovar-slider-small .slick-prev",
				nextEl: ".tovar-slider-small .slick-next"
			},
		});

	bigSlider = new Swiper(".tovar-slider", {
		effect: "fade",
		navigation: false,
		roundLengths: true,
		loop: true,
		thumbs: {
			swiper: smallSlider,
		},
		breakpoints: {
			1000: {
				navigation: is.desktop(),
				pagination: {
					el: ".tovar-slider .swiper-pagination",
					type: "bullets",
					clickable: true,
					dynamicBullets: true,
				}
			}
		}
	});

	$("body").on("click", ".tovar-counter__input", function(){
		let $this = $(this);

		$this.closest(".tovar-counter").find(".tovar-counter__radio").prop("checked", true);
	});
});