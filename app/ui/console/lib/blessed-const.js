/**
 * Created by oleg on 10.06.14.
 */



BlessedConst = function() {
	this.button = {
		/** @const {string} */
		HOME: 'home',

		/** @const {string} */
		END: 'end',

		/** @const {string} */
		UP: 'up',

		/** @const {string} */
		DOWN: 'down',

		/** @const {string} */
		INSERT: 'insert',

		/** @const {string} */
		ENTER: 'enter',

		/** @const {string} */
		TAB: 'tab',

		/** @const {string} */
		ESCAPE: 'escape',

		/** @const {string} */
		MOUSE: 'mouse',

		/** @const {string} */
		SPACE: 'space'
	};

	this.event = {
		SCROLL: 'scroll',

		/**
		 * Fired with:
		 * ch,
		 * key {{
		 *      name: string,
		 *      ctrl: boolean,
		 *      meta: boolean,
		 *      shift: boolean,
		 *      sequence: string,
		 *      full: string
		 * }}
		 */
		KEY_PRESS: 'keypress',

		BUTTON_PRESS: 'press',

		FOCUS: 'focus',

		ELEMENT_CLICK: 'element click',

		/**
		 * Fired with: Box, position
		 */
		SELECT: 'select'
	};
};


/**
 */
BlessedConst.prototype.button;
/**
 */
BlessedConst.prototype.event;


module.exports = BlessedConst;
