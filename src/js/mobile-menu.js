export default class mobileMenu{
	set burger(selector){
		this._burger = document.querySelectorAll(selector)[0]
	}
	get burger(){
		return this._burger
	}

	set menu(selector){
		this._menu = document.querySelectorAll(selector)[0]
	}
	get menu(){
		return this._menu
	}

	set error(message){
		if (this.settings.ignoreWarnings)
			return

		this._error = true
		this.errorMessage(message + " Меню не работает.")
	}

	set subTitles(selector){
		this._titles = document.querySelectorAll(selector)
	}
	get subTitles(){
		return this._titles
	}

	set subMenu(selector){
		this._subMenu = document.querySelectorAll(selector)
	}
	get subMenu(){
		return this._subMenu
	}


	constructor(settings = {
		burger: ".burger",
		menu: ".mobile-menu",
		submenu: {
			titleSelector: ".mobile-menu__sub-title",
			submenuSelector: ".mobile-menu__submenu",
		},
		menuActiveClass: "js__opened",
		bodyActiveClass: "js__menu-opened",
		ignoreWarnings: false,
		fixBody: false,
	}){

		this.settings = settings

		this.burger = settings.burger
		this.menu = settings.menu

		if (settings.submenu){
			this.subTitles = settings.submenu.titleSelector
			this.subMenu = settings.submenu.submenuSelector
		}

		if (!this.burger){
			this.error = "Бургер не найден."
			return
		}

		if (!this.menu){
			this.error = "Мобильное меню не найдено."
			return
		}


		this.body = document.getElementsByTagName("body")[0]

		this.state = false

		this.bindEvents()
	}

	openMenu(){
		if (!window.matchMedia(this.settings.media).matches)
			return

		if (this.settings.fixBody){
			this.body.style.top = -window.pageYOffset + "px"
			this.body.style.position = "fixed"
		}

		this.burger.classList.add("js__active")
		this.menu.classList.add(this.settings.menuActiveClass)
		this.body.classList.add(this.settings.bodyActiveClass)

		this.state = true
	}
	closeMenu(){
		if (!window.matchMedia(this.settings.media).matches || !this.state)
			return

		let top = null;
		
		if (this.settings.fixBody){
			top = Math.abs(parseInt(this.body.style.top))

			this.body.style.top = ""
			this.body.style.position = ""
		}

		this.burger.classList.remove("js__active")
		this.menu.classList.remove(this.settings.menuActiveClass)
		this.body.classList.remove(this.settings.bodyActiveClass)

		if (this.settings.fixBody)
			$(window).scrollTop(top)

		this.state = false
	}
	toggleMenu(){
		if (!window.matchMedia(this.settings.media).matches)
			return

		if (this.state)
			this.closeMenu()
		else
			this.openMenu()
	}

	opendSubmenu(subTitle){
		
	}
	closeSubmenu(subTitle){

	}
	toggleSubmenu(subTitle){
		if (subTitle.classList.contains("js__opened"))
			subTitle.classList.remove("js__opened")
		else
			subTitle.classList.add("js__opened")

		$(subTitle).closest("li").find(this.settings.submenu.submenuSelector)
			.slideToggle(300)
	}

	bindEvents(){

		this.burger.addEventListener("click", e => {
			this.toggleMenu()
		})

		let self = this;

		if (this.settings.submenu)
			if (this.subTitles.length)
				for (var subTitle of this.subTitles)
					subTitle.addEventListener("click", function(e) {
						e.preventDefault()
						self.toggleSubmenu(this)
					})

		document.body.addEventListener("click", event => {
			let $target = $(event.target);

			if (!$target.is(this.burger)
				&& !$(this.burger).has($target).length
				&& !$target.is($(this.menu))
				&& !$(this.menu).has($target).length)
			{
				this.closeMenu()
			}
		})
	}

	errorMessage(message = ""){
		console.error(message)
	}
}