import $ from "jquery"
import is from "is_js"
import Cookies from "js-cookie"
import Swiper from "swiper/dist/js/swiper.js";
import "./main-sliders.js"
// import "./team.js"
import "./timeline.js"
import "./tovar.js"
import "./ordering.js"
import "./range.js"
import "./tabs.js"
import "./lc.js"
import "./standart-page.js"

import mobileMenu from "./mobile-menu.js"
import {Sticky, sameHeights} from "./x-widgets.js"

window.$ = $;
window.jQuery = $;
window.Swiper = Swiper;

require("./jquery.menu-aim.js");
require("./jquery.fancybox.js");
require("../css/jquery.fancybox.css");

const openHeadSubmenu = $el => {
	$el.find(".head-menu__link").addClass("active");
	$el.find(".head-menu__submenu").addClass("js__visible");	
},
closeHeadSubmenu = _ => {
	$(".head-menu__link").removeClass("active");
	$(".head-menu__submenu").removeClass("js__visible");
},

opendMainSubmenu = $el => {

	let $submenu = $el.find(".main-cat__submenu"),
		$menu = $el.closest(".main-cat");

	if (!$submenu.length)
		return

	$el.find(".main-cat__link").addClass("js__active");

	if (!window.matchMedia("screen and (max-width: 660px)").matches){
		if (!$submenu.hasClass("js__align-bot"))
			if ($submenu.offset().top + $submenu.outerHeight() > $menu.offset().top + $menu.outerHeight())
				$submenu.addClass("js__align-bot")
			else
				$submenu.removeClass("js__align-bot")
	}else{
		$submenu.slideToggle(300);
	}

},
closeMainSubmenu = e => {

	if (window.matchMedia("screen and (max-width: 660px)").matches){
		$(".main-cat__link.js__active + .main-cat__submenu").slideUp(300)
	}

	$(".main-cat__link.have-sub").removeClass("js__active");

	// $(".main-cat__submenu").removeClass("js__align-bot");
};

document.addEventListener("DOMContentLoaded", e => {

	$('.cookie-cont .btn').click(function(){
		Cookies.set('cookie', true, { expires: 1 });
		$('body').addClass('js__cookie-hidden');
	});



	let swiper = new Swiper(".main-slider", {
		effect: "fade",
		slidesPerView: 1,
		loop: true,
		roundLengths: true,
		pagination: {
			el: ".swiper-pagination",
			type: "bullets",
			clickable: true
		}
	});

	if (!is.touchDevice()){
		$(".head-bot").menuAim({
			submenuSelector: ".head-cart__popup",
			submenuDirection: "below",
			rowSelector: "> div[class*='head-bot']",
			activate(el){
				$(el).find(".head-cart__popup").addClass("js__visible")
			},
			deactivate(){
				$(".head-cart__popup").removeClass("js__visible");
			},
			exitMenu(){
				$(".head-cart__popup").removeClass("js__visible");
			}
		});

		$(".main-cat").menuAim({
			// submenuSelector: ".main-cat__link",
			// rowSelector: ".main-cat__item",
			activate(el){
				let $menuRow = $(el);

				opendMainSubmenu($menuRow);
			},
			deactivate: closeMainSubmenu,
			exitMenu: closeMainSubmenu
		});

		$(".head-menu").menuAim({
			submenuDirection: "below",
			activate(el){
				openHeadSubmenu($(el));				
			},
			deactivate: closeHeadSubmenu,
			exitMenu: closeHeadSubmenu
		});
	}else{
		$(".head-menu__link.have-sub").click(function(e){
			let $this = $(this);

			$(".head-menu__link.have-sub").removeClass("active");

			$(".head-menu__submenu").removeClass("js__visible");

			openHeadSubmenu($this.closest("li"));

			e.preventDefault();
		});

		$("body").on("click", e => {
			let $this = $(e.target);

			if (!$this.is($(".head-menu__link.have-sub"))
				&& !$(".head-menu__link.have-sub").has($this).length
				&& !$this.is($(".head-menu__submenu"))
				&& !$(".head-menu__submenu").has($this).length)
			{
				closeHeadSubmenu();
			}

			if (!$this.is($(".main-cat__link.have-sub"))
				&& !$(".main-cat__link.have-sub").has($this).length
				&& !$this.is($(".main-cat__submenu"))
				&& !$(".main-cat__submenu").has($this).length)
			{
				closeMainSubmenu();
			}
		})


		$(".main-cat__link.have-sub").click(function(e){
			let $this = $(this);

			closeMainSubmenu()

			opendMainSubmenu($this.closest("li"))

			e.preventDefault()
		})
	}

	$(".main-cat__submenu__close").click(closeMainSubmenu);

	window.menu = new mobileMenu({
		burger: ".head__burger",
		menu: ".head__mobile-menu",
		submenu: {
			titleSelector: ".head__mobile-menu .have-sub",
			submenuSelector: ".submenu",
		},
		menuActiveClass: "js__opened",
		bodyActiveClass: "js__menu-opened",
		ignoreWarnings: false,
		fixBody: false,
		media: "screen and (max-width: 1000px)"
	});

	window.filter = new mobileMenu({
		burger: ".filter__btn",
		menu: ".filter",
		menuActiveClass: "js__opened",
		bodyActiveClass: "js__filter-opened",
		ignoreWarnings: true,
		fixBody: true,
		media: "screen and (max-width: 1000px)"
	});

	$(".filter__close").click(_ => {
		filter.closeMenu();
	});

	$(".filter-btn").click(function(){

		if ($(window).width() <= 1000)
			return

		let $this = $(this);

		$this.toggleClass("js__opened");

		$("body").toggleClass("js__filter-opened")

		$(".filter").slideToggle(300)

		if ($this.hasClass("js__opened"))
			$("html, body").animate({
				scrollTop: $(".filter").offset().top - 15
			}, 300)
	});

	$("body").on("click", function(event){
		let $target = $(event.target),
			$filter = $(".filter"),
			$btn = $(".filter-btn");

		if (!$target.is($btn)
			&& !$btn.has($target).length
			&& !$target.is($filter)
			&& !$filter.has($target).length)
		{
			$(".filter-btn").removeClass("js__opened")

			$("body").removeClass("js__filter-opened")

			$(".filter").slideUp(300)
		}
	})

	// $("body").on("click", "a.fancybox", function(){
	// 	let href = $(this).attr("href");

	// 	$.fancybox.open({
	// 		src: href,
	// 		trapFocus: false,
	// 		touch: is.touchDevice(),
	// 		buttons: ["fullscreen", "slideShow", "close"],
	// 		image: {
	// 			preload: true,
	// 		},
	// 		transitionEffect: "slide",
	// 		afterShow(){
	// 			console.log(1234)
	// 		}
	// 	});
	// });

	$(".fancybox").fancybox({
		trapFocus: false,
		touch: is.touchDevice(),
		buttons: ["fullscreen", "slideShow", "close"],
		image: {
			preload: true,
		},
		transitionEffect: "slide",
		afterShow(){
			// console.log(1234)
		}
	})

	Sticky($("[data-widget=\"sticky-holder\"]"))
	sameHeights($(".cat2.plate .cat-item__img"))

	;(function(){
		let fCheckboxes = document.querySelectorAll(".filter__checkboxes");

		if (!fCheckboxes.length)
			return

		for (var el of fCheckboxes){
			let prev = el.closest(".filter__block").querySelector(".filter__title");

			prev.classList.add("js__can-toggle");

			prev.addEventListener("click", function(){
				if (this.classList.contains("js__opened")){
					this.classList.remove("js__opened")
				}else{
					this.classList.add("js__opened")
				}
			})
		}
	})()

})