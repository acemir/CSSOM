var TESTS = [
	{
		input: "/* fuuuu */",
		result: {
			cssRules: [],
			parentStyleSheet: null
		}
	},
	{
		input: "/**/",
		result: {
			cssRules: [],
			parentStyleSheet: null
		}
	},
	{
		input: "/*a {content: '* {color:#000}'}*/",
		result: {
			cssRules: [],
			parentStyleSheet: null
		}
	},
	{
		input: "a {color: red}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "a",
						style: {
							0: "color",
							color: "red",
							__starts: 2,
							length: 1
						},
						parentRule: null,
						__starts: 0,
						__ends: 14
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "a {color: yellow !important; color: red; }",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "a",
						style: {
							0: "color",
							color: "yellow",
							_importants: {
								color: "important"
							},
							__starts: 2,
							length: 1
						},
						parentRule: null,
						__starts: 0,
						__ends: 42
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: ".left {float: left;}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: ".left",
						style: {
							0: "float",
							'float': "left",
							__starts: 6,
							length: 1
						},
						parentRule: null,
						__starts: 0,
						__ends: 20
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "h1 {font-family: 'Times New Roman', Helvetica Neue, sans-serif }",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "h1",
						style: {
							0: "font-family",
							"font-family": "'Times New Roman', Helvetica Neue, sans-serif",
							__starts: 3,
							length: 1
						},
						parentRule: null,
						__starts: 0,
						__ends: 64
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "h2 {font: normal\n1.6em\r\nTimes New Roman,\tserif  ;}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "h2",
						style: {
							0: "font",
							font: "normal\n1.6em\r\nTimes New Roman,\tserif",
							__starts: 3,
							length: 1
						},
						parentRule: null,
						__starts: 0,
						__ends: 50
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "h3 {font-family: 'times new roman'} ",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "h3",
						style: {
							0: "font-family",
							'font-family': "'times new roman'",
							__starts: 3,
							length: 1
						},
						parentRule: null,
						__starts: 0,
						__ends: 35
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: ".icon>*{background-image: url(../images/ramona_strong.gif);}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: ".icon>*",
						style: {
							0: "background-image",
							"background-image": "url(../images/ramona_strong.gif)",
							__starts: 7,
							length: 1
						},
						parentRule: null,
						__starts: 0,
						__ends: 60
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "a[run|=one] {color: red}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "a[run|=one]",
						style: {
							0: "color",
							color: "red",
							__starts: 2,
							length: 1
						},
						parentRule: null,
						__starts: 0,
						__ends: 14
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "*/**/{}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "*",
						style: {
							__starts: 5,
							length: 0
						},
						parentRule: null,
						__starts: 0,
						__ends: 7
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "/**/*{}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "*",
						style: {
							__starts: 5,
							length: 0
						},
						parentRule: null,
						__starts: 4,
						__ends: 7
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "* /**/*{}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "* *",
						style: {
							__starts: 7,
							length: 0
						},
						parentRule: null,
						__starts: 0,
						__ends: 9
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "*/*/*/ *{}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "* *",
						style: {
							__starts: 8,
							length: 0
						},
						parentRule: null,
						__starts: 0,
						__ends: 10
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "#a {b:c;}\n#d {e:f}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "#a",
						style: {
							0: "b",
							b: "c",
							__starts: 3,
							length: 1
						},
						parentRule: null,
						__starts: 0,
						__ends: 9
					}, {
						cssRules: [],
						selectorText: "#d",
						style: {
							0: "e",
							e: "f",
							__starts: 13,
							length: 1
						},
						parentRule: null,
						__starts: 10,
						__ends: 18
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[1].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[1].style.parentRule = result.cssRules[1];
			return result;
		})()
	},
	{
		input: "* {	border:	none	} \n#foo {font-size: 12px; background:#fff;}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "*",
						style: {
							0: "border",
							border: "none",
							__starts: 2,
							length: 1
						},
						parentRule: null,
						__starts: 0,
						__ends: 18
					},
					{
						cssRules: [],
						selectorText: "#foo",
						style: {
							0: "font-size",
							"font-size": "12px",
							1: "background",
							background: "#fff",
							__starts: 25,
							length: 2
						},
						parentRule: null,
						__starts: 20,
						__ends: 60
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[1].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[1].style.parentRule = result.cssRules[1];
			return result;
		})()
	},
	{
		input: "span {display: inline-block !important; vertical-align: middle !important} .error{color:red!important;}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "span",
						style: {
							0: "display",
							1: "vertical-align",
							display: "inline-block",
							"vertical-align": "middle",
							__starts: 5,
							length: 2
						},
						parentRule: null,
						__starts: 0,
						__ends: 74
					},
					{
						cssRules: [],
						selectorText: ".error",
						style: {
							0: "color",
							color: "red",
							__starts: 81,
							length: 1
						},
						parentRule: null,
						__starts: 75,
						__ends: 103
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[1].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[1].style.parentRule = result.cssRules[1];
			return result;
		})()
	},
	{
		input: 'img:not(/*)*/[src]){background:url(data:image/png;base64,FooBar)}',
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: 'img:not([src])',
						parentRule: null,
						style: {
							0: 'background',
							background: 'url(data:image/png;base64,FooBar)',
							length: 1
						}
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "body{background-image: url(')');}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: 'body',
						parentRule: null,
						style: {
							0: 'background-image',
							'background-image': "url(')')",
							length: 1
						}
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: ".gradient{background: -moz-linear-gradient(/*);*/top, #1E5799 0%, #7db9e8 100%)}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: '.gradient',
						parentRule: null,
						style: {
							0: 'background',
							background: '-moz-linear-gradient(top, #1E5799 0%, #7db9e8 100%)',
							length: 1
						}
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: ".calc{width: calc(100% - 15px);}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: '.calc',
						parentRule: null,
						style: {
							0: 'width',
							width: 'calc(100% - 15px)',
							length: 1
						}
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: ".gradient{background-image: linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%);}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: '.gradient',
						parentRule: null,
						style: {
							0: 'background-image',
							"background-image": 'linear-gradient(transparent 50%, rgba(69, 142, 209, 0.04) 50%)',
							length: 1
						}
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "@media handheld, only screen and (max-device-width: 480px) {body{max-width:480px}}",
		result: (function() {
			var result = {
				cssRules: [
					{
						conditionText: "handheld, only screen and (max-device-width: 480px)",
						media: {
							0: "handheld",
							1: "only screen and (max-device-width: 480px)",
							length: 2
						},
						cssRules: [
							{
								cssRules: [],
								selectorText: "body",
								style: {
									0: "max-width",
									"max-width": "480px",
									__starts: 64,
									length: 1
								},
								__starts: 60,
								__ends: 81
							}
						],
						parentRule: null,
						__starts: 0,
						__ends: 82
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "@media screen, screen, screen {/* Match Firefox and Opera behavior here rather than WebKit. \nSane person shouldn't write like this anyway. */}",
		result: (function() {
			var result = {
				cssRules: [
					{
						conditionText: "screen, screen, screen",
						media: {
							0: "screen",
							1: "screen",
							2: "screen",
							length: 3
						},
						cssRules: [],
						parentRule: null,
						__starts: 0,
						__ends: 142
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			return result;
		})()
	},
	{
		input: "@media/**/print {*{background:#fff}}",
		result: (function() {
			var result = {
				cssRules: [
					{
						conditionText: "print",
						media: {
							0: "print",
							length: 1
						},
						cssRules: [
							{
								cssRules: [],
								selectorText: "*",
								style: {
									0: "background",
									background: "#fff",
									__starts: 18,
									length: 1
								},
								__starts: 17,
								__ends: 35
							}
						],
						parentRule: null,
						__starts: 0,
						__ends: 36
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		input: "a{}@media all{b{color:#000}}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "a",
						style: {
							__starts: 1,
							length: 0
						},
						parentRule: null,
						__starts: 0,
						__ends: 3
					},
					{
						conditionText: "all",
						media: {
							0: "all",
							length: 1
						},
						cssRules: [
							{
								cssRules: [],
								selectorText: "b",
								style: {
									0: "color",
									color: "#000",
									__starts: 15,
									length: 1
								},
								__starts: 14,
								__ends: 27
							}
						],
						parentRule: null,
						__starts: 3,
						__ends: 28
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[1].parentStyleSheet = result.cssRules[1].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[1].cssRules[0].parentRule = result.cssRules[1];
			result.cssRules[1].cssRules[0].style.parentRule = result.cssRules[1].cssRules[0];
			return result;
		})()
	},
	{
		input: "@media(hover:hover){}",
		result: (function() {
			var result = {
				cssRules: [
					{
						conditionText: "(hover:hover)",
						media: {
							0: "(hover:hover)",
							length: 1
						},
						cssRules: [],
						parentRule: null,
						__starts: 0,
						__ends: 21
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			return result;
		})()
	},
	{
		input: "@mediaall {}",
		result: {
			cssRules: [],
			parentStyleSheet: null
		}
	},
	{
		input: "some invalid junk @media projection {body{background:black}}",
		result: {
			cssRules: [],
			parentStyleSheet: null
		}
	},
	{
		// Warning: While this code might appear to work in some browsers,
		// placing @font-face inside a @media query is not considered correct CSS usage.
		// Browsers are expected to process @font-face at the global level, independent of media conditions.
		// Some browsers might still parse it without errors,
		// but it's not reliable behavior and could lead to inconsistent results across different platforms.
		// FIXED: @font-face can only be nested on a CSSScopeRule or a CSSConditionRule without a nested CSSStyleRule in the parent chain.
		input: "@media screen{a{color:blue !important;background:red;} @font-face { font-family: 'Arial2'; } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						conditionText: "screen",
						media: {
							0: "screen",
							length: 1
						},
						cssRules: [
							{
								cssRules: [],
								selectorText: "a",
								style: {
									0: "color",
									1: "background",
									color: "blue",
									background: "red",
									length: 2
								}
							},
							{
								style: {
									0: "font-family",
									"font-family": "'Arial2'",
									length: 1
								}
							}
						],
						parentRule: null
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[1].parentStyleSheet =  result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[1].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[1];
			return result;
		})()
	},
	{
		input: "@media (min-width: 768px){@media (min-resolution: 0.001dpcm) {a{color: green}}}",
		result: (function() {
			var result = {
				cssRules: [
					{
						conditionText: "(min-width: 768px)",
						media: {
							0: "(min-width: 768px)",
							length: 1
						},
						cssRules: [
							{
								conditionText: "(min-resolution: 0.001dpcm)",
								media: {
									0: "(min-resolution: 0.001dpcm)",
									length: 1
								},
								cssRules: [
									{
										cssRules: [],
										selectorText: "a",
										style: {
											0: "color",
											length: 1,
											parentRule: "..",
											_importants: {
												color: ""
											},
											color: "green"
										}
									}
								],
							}
						],
						parentRule: null
					}
				],
				parentStyleSheet: null
			};

			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];

			return result;
		})()
	},
	{
		input: "@supports (display: grid) { html { display: grid; } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						conditionText: "(display: grid)",
						cssRules: [
							{
								cssRules: [],
								selectorText: "html",
								style: {
									0: "display",
									display: "grid",
									length: 1
								},
							}
						],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		input: "@supports not (display: grid) { html { display: flex; } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						conditionText: "not (display: grid)",
						cssRules: [
							{
								cssRules: [],
								selectorText: "html",
								style: {
									0: "display",
									display: "flex",
									length: 1
								},
							}
						],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		input: '@import url(partial.css);\ni {font-style: italic}',
		result: (function() {
			var result = {
				cssRules: [
					{
						href: 'partial.css',
						layerName: null,
						supportsText: null,
						media: {
							length: 0
						},
						parentRule: null,
						styleSheet: {
							media: {
								length: 0
							},
							disabled: false,
							href: null,
							cssRules: []
						}
					},
					{
						cssRules: [],
						selectorText: "i",
						parentRule: null,
						style: {
							0: 'font-style',
							'font-style': 'italic',
							length: 1
						}
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].styleSheet.parentStyleSheet = result.cssRules[1].parentStyleSheet = result;
			result.cssRules[1].style.parentRule = result.cssRules[1];
			return result;
		})()
	},
	{
		input: '@import "partial.css";\ni {font-style: italic}',
		result: (function() {
			var result = {
				cssRules: [
					{
						href: 'partial.css',
						layerName: null,
						supportsText: null,
						media: {
							length: 0
						},
						parentRule: null,
						styleSheet: {
							media: {
								length: 0
							},
							disabled: false,
							href: null,
							cssRules: []
						}
					},
					{
						cssRules: [],
						selectorText: "i",
						parentRule: null,
						style: {
							0: 'font-style',
							'font-style': 'italic',
							length: 1
						}
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].styleSheet.parentStyleSheet = result.cssRules[1].parentStyleSheet = result;
			result.cssRules[1].style.parentRule = result.cssRules[1];
			result.cssRules[0].styleSheet.parentStyleSheet = result;
			return result;
		})()
	},
	{
		input: "@import 'partial.css';\ni {font-style: italic}",
		result: (function() {
			var result = {
				cssRules: [
					{
						href: 'partial.css',
						layerName: null,
						supportsText: null,
						media: {
							length: 0
						},
						parentRule: null,
						styleSheet: {
							media: {
								length: 0
							},
							disabled: false,
							href: null,
							cssRules: []
						}
					},
					{
						cssRules: [],
						selectorText: "i",
						parentRule: null,
						style: {
							0: 'font-style',
							'font-style': 'italic',
							length: 1
						}
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].styleSheet.parentStyleSheet = result.cssRules[1].parentStyleSheet = result;
			result.cssRules[1].style.parentRule = result.cssRules[1];
			return result;
		})()
	},
	{
		input: '@import url(partial.css) screen and (max-width: 400px);\ni {font-style: italic}',
		result: (function() {
			var result = {
				cssRules: [
					{
						href: 'partial.css',
						layerName: null,
						supportsText: null,
						media: {
							0: "screen and (max-width: 400px)",
							length: 1
						},
						parentRule: null,
						styleSheet: {
							media: {
								length: 0
							},
							disabled: false,
							href: null,
							cssRules: []
						}
					},
					{
						cssRules: [],
						selectorText: "i",
						parentRule: null,
						style: {
							0: 'font-style',
							'font-style': 'italic',
							length: 1
						}
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].styleSheet.parentStyleSheet = result.cssRules[1].parentStyleSheet = result;
			result.cssRules[1].style.parentRule = result.cssRules[1];
			return result;
		})()
	},
	{
		input: '@import url(partial.css) layer(default) supports(display: grid) screen and (max-width: 400px);\ni {font-style: italic}',
		result: (function() {
			var result = {
				cssRules: [
					{
						href: 'partial.css',
						layerName: "default",
						media: {
							0: "screen and (max-width: 400px)",
							length: 1
						},
						parentRule: null,
						styleSheet: {
							media: {
								length: 0
							},
							disabled: false,
							href: null,
							cssRules: []
						},
						supportsText: "display: grid"
					},
					{
						cssRules: [],
						selectorText: "i",
						parentRule: null,
						style: {
							0: 'font-style',
							'font-style': 'italic',
							length: 1
						}
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].styleSheet.parentStyleSheet = result.cssRules[1].parentStyleSheet = result;
			result.cssRules[1].style.parentRule = result.cssRules[1];
			return result;
		})()
	},
	// 
	{
		input: '@import url(partial.css) layer;',
		result: (function() {
			var result = {
				cssRules: [
					{
						href: 'partial.css',
						layerName: "",
						supportsText: null,
						media: {
							length: 0
						},
						parentRule: null,
						styleSheet: {
							media: {
								length: 0
							},
							disabled: false,
							href: null,
							cssRules: []
						}
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].styleSheet.parentStyleSheet = result;
			return result;
		})()
	},
	{
		input: "@font-face { font-family: Delicious; font-weight: bold; src: url('Delicious-Bold.otf'); }",
		result: (function() {
			var result = {
				cssRules: [
					{
						parentRule: null,
						style: {
							0: 'font-family',
							1: 'font-weight',
							2: 'src',
							'font-family': 'Delicious',
							'font-weight': 'bold',
							'src': 'url(\'Delicious-Bold.otf\')',
							length: 3
						}
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "@host { body { background: red; } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: {
							0: {
								cssRules: [],
								selectorText: "body",
								style: {
									0: "background",
									length: 1,
									parentRule: "..",
									background: "red"
								}
							}
						},
						parentRule: null
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "@starting-style { body { background: red; } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: {
							0: {
								cssRules: [],
								selectorText: "body",
								style: {
									0: "background",
									length: 1,
									parentRule: "..",
									background: "red"
								}
							}
						},
						parentRule: null
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "@starting-style { @media screen { body { background: red; } } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: {
							0: {
								conditionText: "screen",
								media: {
									0: "screen",
									length: 1
								},
								cssRules: {
									0: {
										cssRules: [],
										parentRule: "../..",
										parentStyleSheet: "../../../../../..",
										selectorText: "body",
										style: {
											0: "background",
											length: 1,
											parentRule: "..",
											background: "red",
										},
									},
								}
							},
						},
						parentRule: null,
					},
				],
				parentStyleSheet: null,
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "@media screen { @starting-style { body { background: red; } } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						conditionText: "screen",
						media: {
							0: "screen",
							length: 1
						},
						cssRules: {
							0: {
								cssRules: {
									0: {
										cssRules: [],
										parentRule: "../..",
										parentStyleSheet: "../../../../../..",
										selectorText: "body",
										style: {
											0: "background",
											length: 1,
											parentRule: "..",
											background: "red",
										},
									},
								},
							},
						},
						parentRule: null
					},
				],
				parentStyleSheet: null,
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		// Non-vendor prefixed @keyframes rule, from Twitter Bootstrap (progress-bars):
		input: '@keyframes progress-bar-stripes {\n  from  { background-position: 0 0; }\n  to    { background-position: 40px 0; }\n}',
		result: (function() {
			var result = {
				cssRules: [
					{
						name: "progress-bar-stripes",
						_vendorPrefix: undefined,
						cssRules: [
							{
								keyText: "from",
								style: {
									0: "background-position",
									'background-position': "0 0",
									length: 1
								}
							},
							{
								keyText: "to",
								style: {
									0: "background-position",
									'background-position': "40px 0",
									length: 1
								}
							}
						],
						parentRule: null
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[1].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[1].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[1];
			return result;
		})()
	},
	{
		// @keyframes with invalid vendor prefix followed by a valid one (make sure that the RegExp.lastIndex trick works as expected):
		// CHANGED: @keyframes with invalid vendor prefix must be ignored.
		input: '@-moz-keyframes foo {} @--keyframes bar {} @-webkit-keyframes quux {}',
		result: (function() {
			var result = {
				cssRules: [
					{
						name: "foo",
						_vendorPrefix: "-moz-",
						cssRules: [],
						parentRule: null
					},
					{
						name: "quux",
						_vendorPrefix: "-webkit-",
						cssRules: [],
						parentRule: null
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[1].parentStyleSheet = result;
			return result;
		})()
	},
	{
		input: "@-some-ridiculously-long-vendor-prefix-that-must-be-supported-keyframes therulename /*comment*/{0%{top:0px; left:0px; background:red;}100% {top:4em; left:40px; background:maroon;}}",
		result: (function() {
			var result = {
				cssRules: [
					{
						name: "therulename",
						_vendorPrefix: '-some-ridiculously-long-vendor-prefix-that-must-be-supported-',
						cssRules: [
							{
								keyText: "0%",
								style: {
									0: "top",
									1: "left",
									2: "background",
									top: "0px",
									left: "0px",
									background: "red",
									length: 3
								}
							},
							{
								keyText: "100%",
								style: {
									0: "top",
									1: "left",
									2: "background",
									top: "4em",
									left: "40px",
									background: "maroon",
									length: 3
								}
							}
						],
						parentRule: null
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[1].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[1].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[1];
			return result;
		})()
	},
	{
		input: "@-webkit-keyframes mymove {\nfrom {top:0px}\nto {top:200px}\n}",
		result: (function() {
			var result = {
				cssRules: [
					{
						name: "mymove",
						_vendorPrefix: '-webkit-',
						cssRules: [
							{
								keyText: "from",
								style: {
									0: "top",
									top: "0px",
									length: 1
								}
							},
							{
								keyText: "to",
								style: {
									0: "top",
									top: "200px",
									length: 1
								}
							}
						],
						parentRule: null
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[1].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[1].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[1];
			return result;
		})()
	},
	{
		input: "@-webkit-keyframes mymovepercent {\n0% {top:0px;}\n50% {top:200px;}\n100% {top:300px;}}",
		result: (function() {
			var result = {
				cssRules: [
					{
						name: "mymovepercent",
						_vendorPrefix: '-webkit-',
						cssRules: [
							{
								keyText: "0%",
								style: {
									0: "top",
									top: "0px",
									length: 1
								}
							},
							{
								keyText: "50%",
								style: {
									0: "top",
									top: "200px",
									length: 1
								}
							},
							{
								keyText: "100%",
								style: {
									0: "top",
									top: "300px",
									length: 1
								}
							}
						],
						parentRule: null
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[1].parentStyleSheet = result.cssRules[0].cssRules[2].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[1].parentRule = result.cssRules[0].cssRules[2].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[1];
			result.cssRules[0].cssRules[2].style.parentRule = result.cssRules[0].cssRules[2];
			return result;
		})()
	},
	{
		input: "@-moz-document url(http://www.w3.org/), url-prefix(http://www.w3.org/Style/), domain(mozilla.org), regexp(\"https:.*\")\n{\n/*comments*/\nbody { color: purple; background: yellow; }\n}",
		result: (function() {
			var result = {
				cssRules: [
					{
						matcher: {
							0: "url(http://www.w3.org/)",
							1: "url-prefix(http://www.w3.org/Style/)",
							2: "domain(mozilla.org)",
							3: "regexp(\"https:.*\")",
							length: 4
						},
						cssRules: [
							{
								cssRules: [],
								selectorText: "body",
								style: {
									0: "color",
									1: "background",
									length: 2,
									__starts: 138,
									color: "purple",
									background: "yellow"
								},
								__starts: 133,
								__ends: 176
							}
						],
						parentRule: null,
						__starts: 0,
						__ends: 178
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];

			return result;
		})()
	},
	{
		input: "@container sidebar (min-width: 400px) { body{max-width:480px} }",
		result: (function() {
			var result = {
				cssRules: [
					{
						conditionText: "sidebar (min-width: 400px)",
						containerName: "sidebar",
						containerQuery: "(min-width: 400px)",
						cssRules: [
							{
								cssRules: [],
								selectorText: "body",
								style: {
									0: "max-width",
									"max-width": "480px",
									__starts: 64,
									length: 1
								},
								__starts: 60,
								__ends: 81
							}
						],
						parentRule: null,
						__starts: 0,
						__ends: 82
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "a{}@-moz-document/**/url-prefix(http://www.w3.org/Style/){body { color: purple; background: yellow; }}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: 'a',
						style: {
							length: 0,
							__starts: 1
						},
						parentRule: null,
						__starts: 0,
						__ends: 3
					},
					{
						matcher: {
							0: "url-prefix(http://www.w3.org/Style/)",
							length: 1
						},
						cssRules: [
							{
								cssRules: [],
								selectorText: "body",
								style: {
									0: "color",
									1: "background",
									length: 2,
									__starts: 64,
									color: "purple",
									background: "yellow"
								},
								__starts: 59,
								__ends: 102
							}
						],
						parentRule: null,
						__starts: 3,
						__ends: 103
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[1].parentStyleSheet = result.cssRules[1].cssRules[0].parentStyleSheet = result;
			result.cssRules[1].cssRules[0].parentRule = result.cssRules[1];
			result.cssRules[1].cssRules[0].style.parentRule = result.cssRules[1].cssRules[0];
			result.cssRules[0].style.parentRule = result.cssRules[0];

			return result;
		})()
	},
	{
		input: "@layer custom-layer { div { display: block; } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						name: "custom-layer",
						cssRules: [
							{
								cssRules: [],
								selectorText: "div",
								style: {
									0: "display",
									display: "block",
									length: 1
								},
							}
						],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		input: "@layer { div { display: block; } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						name: "",
						cssRules: [
							{
								cssRules: [],
								selectorText: "div",
								style: {
									0: "display",
									display: "block",
									length: 1
								},
							}
						],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		// Missing support for @layer statement and handle a comma separated layer-name list
		input: "@layer one, two; p {}",
		result: (function() {
			var result = {
				cssRules: [
					{
						nameList: ["one", "two"],
						parentRule: null,
					},
					{
						selectorText: "p",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result.cssRules[1].parentStyleSheet = result;
			result.cssRules[1].style.parentRule = result.cssRules[1];
			return result;
		})()
	},
	{
		// Non-ASCII and escaped characters
		input: "#a\ b {} #åèiöú {}",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "#a\ b",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					},
					{
						selectorText: "#åèiöú",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result.cssRules[1].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[1].style.parentRule = result.cssRules[1];
			return result;
		})()
	},
	{
		// Escaped special characters in class, id, and element names
		input: "#a\\@media\\!important:is(.b\\!):has(c\\@) {}",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "#a\\@media\\!important:is(.b\\!):has(c\\@)",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		// Deeply nested complex selector
		input: "#target2:has(:not(.item, :nth-last-child(3))) {}",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "#target2:has(:not(.item, :nth-last-child(3)))",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					},				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		// Onlu single name without dots is valid in @counter-style rule
		input: "@counter-style { } @counter-style foo { } @counter-style foo bar { } @counter-style foo.bar{ }",
		result: (function() {
			var result = {
				cssRules: [
					{
						name: "foo",
						parentRule: null,
					},
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result;
			return result;
		})()
	},
];

var CSS_NAMESPACE_TESTS = [
	{
		// Namespace selector with universal namespace
		input: "*|body { color: red; }",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "*|body",
						style: {
							0: "color",
							color: "red",
							__starts: 7,
							length: 1
						},
						parentRule: null,
						__starts: 0,
						__ends: 21
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		// Namespace selector with empty prefix (default namespace)
		input: "|p { font-size: 14px; }",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "|p",
						style: {
							0: "font-size",
							"font-size": "14px",
							__starts: 4,
							length: 1
						},
						parentRule: null,
						__starts: 0,
						__ends: 22
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		// Mixed namespace and regular selectors
		input: "*|body, div { color: blue; }",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "*|body, div",
						style: {
							0: "color",
							color: "blue",
							__starts: 14,
							length: 1
						},
						parentRule: null,
						__starts: 0,
						__ends: 28
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		// Valid namespace with declaration
		input: "@namespace custom url('http://example.com'); custom|div { color: green; }",
		result: (function() {
			var result = {
				cssRules: [
					{
						prefix: "custom",
						namespaceURI: "http://example.com",
						parentStyleSheet: null,
						parentRule: null,
					},
					{
						cssRules: [],
						selectorText: "custom|div",
						style: {
							0: "color",
							color: "green",
							__starts: 60,
							length: 1
						},
						parentRule: null,
						__starts: 45,
						__ends: 74
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[1].parentStyleSheet = result;
			result.cssRules[1].style.parentRule = result.cssRules[1];
			return result;
		})()
	},
	{
		// Namespace selector with custom prefix
		input: "custom|div { margin: 10px; }",
		result: (function() {
			var result = {
				cssRules: [],
				parentStyleSheet: null
			};
			return result;
		})()
	},
	{
		// Valid namespace with declaration
		input: "@namespace wrong invaldurl('http://example.com'); wrong|div { color: green; }",
		result: (function() {
			var result = {
				cssRules: [],
				parentStyleSheet: null
			};
			return result;
		})()
	},

];

var CSS_NESTING_TESTS = [
	{	
		// Nested Selector
		input: "a { &.x { color: black; } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							length: 0
						},
						cssRules: [
							{
								cssRules: [],
								selectorText: "&.x",
								style: {
									0: "color",
									color: "black",
									length: 1
								},
							}
						],
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		// Nested At-Rule selector
		input: "a { @media all { color: aqua; } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							length: 0
						},
						cssRules: [
							{
								conditionText: "all",
								media: {
									0: "all",
									length: 1
								},
								cssRules: [
									{
										style: {
											0: "color",
											color: "aqua",
											length: 1
										}
									}
								],
							}
						],
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0].cssRules[0];
			return result;
		})()
	},
	{	
		// Nested Selector + Nested At-Rule Selector
		input: "a { &.x { color: black; } @media all { color: aqua; } color: red; }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							length: 0
						},
						cssRules: [
							{
								cssRules: [],
								selectorText: "&.x",
								style: {
									0: "color",
									color: "black",
									length: 1
								},
							},
							{
								conditionText: "all",
								media: {
									0: "all",
									length: 1
								},
								cssRules: [
									{
										style: {
											0: "color",
											color: "aqua",
											length: 1
										}
									}
								],
							},
							{
								style: {
									0: "color",
									color: "red",
									length: 1
								},
							},
						],
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[1].parentStyleSheet = result.cssRules[0].cssRules[1].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[2].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[1].parentRule = result.cssRules[0].cssRules[2].parentRule = result.cssRules[0];
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[1].cssRules[0].parentRule = result.cssRules[0].cssRules[1];
			result.cssRules[0].cssRules[1].cssRules[0].style.parentRule = result.cssRules[0].cssRules[1].cssRules[0];
			result.cssRules[0].cssRules[2].style.parentRule = result.cssRules[0].cssRules[2];
			return result;
		})()
	},
	{
		// At-Rule + Nested At-Rule Selector
		input: "@media all { a {color: aqua; }} b { @media print { color: blue; } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						conditionText: "all",
						media: {
							0: "all",
							length: 1
						},
						cssRules: [
							{
								cssRules: [],
								selectorText: "a",
								style: {
									0: "color",
									color: "aqua",
									length: 1
								},
							}
						],
						parentRule: null
					},
					{
						selectorText: "b",
						style: {
							length: 0
						},
						cssRules: [
							{
								conditionText: "print",
								media: {
									0: "print",
									length: 1
								},
								cssRules: [
									{
										style: {
											0: "color",
											color: "blue",
											length: 1
										}
									}
								],
							}
						],
						parentRule: null
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[1].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[1].cssRules[0].parentStyleSheet = result.cssRules[1].cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[1].style.parentRule = result.cssRules[1].cssRules[0].parentRule = result.cssRules[1];
			result.cssRules[1].cssRules[0].cssRules[0].parentRule = result.cssRules[1].cssRules[0];
			result.cssRules[1].cssRules[0].cssRules[0].style.parentRule = result.cssRules[1].cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		// Style Declaration + Nested  Selector
		input: "a { color: aqua; &.x { color: black; } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							0: "color",
							color: "aqua",
							length: 1
						},
						cssRules: [
							{
								cssRules: [],
								selectorText: "&.x",
								style: {
									0: "color",
									color: "black",
									length: 1
								},
							},
						],
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		// Style Declaration + Nested At-Rule Selector
		input: "a { color: aqua; @starting-style { color: snow; } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							0: "color",
							color: "aqua",
							length: 1
						},
						cssRules: [
							{
								cssRules: [{
									style: {
										0: "color",
										color: "snow",
										length: 1
									},
								}],
							},
						],
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		// Nested Selector + Nested Selector
		input: "a { &.x { color: black; } &.y { color: yellow; } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							length: 0
						},
						cssRules: [
							{
								cssRules: [],
								selectorText: "&.x",
								style: {
									0: "color",
									color: "black",
									length: 1
								},
							},
							{
								cssRules: [],
								selectorText: "&.y",
								style: {
									0: "color",
									color: "yellow",
									length: 1
								},
							},
						],
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[1].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[1].parentRule = result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[1];
			return result;
		})()
	},
	{
		// Deep Nested Selector
		input: "a { &.x { color: black; &.y { color: yellow; } } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							length: 0
						},
						cssRules: [
							{
								cssRules: [
									{
										cssRules: [],
										selectorText: "&.y",
										style: {
											0: "color",
											color: "yellow",
											length: 1
										},
									}
								],
								selectorText: "&.x",
								style: {
									0: "color",
									color: "black",
									length: 1
								},
							},
						],
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		// Style Declaration + Nested Selector + Nested Selector
		input: "a { color: aqua; &.x { color: black; } &.y { color: yellow; } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							0: "color",
							color: "aqua",
							length: 1
						},
						cssRules: [
							{
								cssRules: [],
								selectorText: "&.x",
								style: {
									0: "color",
									color: "black",
									length: 1
								},
							},
							{
								cssRules: [],
								selectorText: "&.y",
								style: {
									0: "color",
									color: "yellow",
									length: 1
								},
							},
						],
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[1].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[1].parentRule = result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[1];
			return result;
		})()
	},
	{
		// Declaration + Nested Selector + Nested Declaration
		input: "a { color: aqua; &.x { color: black; } float: left; }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							0: "color",
							color: "aqua",
							length: 1
						},
						cssRules: [
							{
								cssRules: [],
								selectorText: "&.x",
								style: {
									0: "color",
									color: "black",
									length: 1
								},
							},
							{
								style: {
									0: "float",
									float: "left",
									length: 1
								},
							}
						],
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[1].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[1].parentRule = result.cssRules[0];
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[1];
			return result;
		})()
	},
	{
		// Style Declaration + Nested At-Rule Selector + Nested Declaration
		input: "a { color: aqua; @starting-style { color: snow; } float: left;}",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							0: "color",
							color: "aqua",
							length: 1
						},
						cssRules: [
							{
								cssRules: [{
									style: {
										0: "color",
										color: "snow",
										length: 1
									},
								}],
							},
							{
								style: {
									0: "float",
									float: "left",
									length: 1
								},
							},
						],
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[1].parentStyleSheet = result.cssRules[0].cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[1].parentRule = result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[1]
			result.cssRules[0].cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		// Style Declaration + Nested At-Rule Selector + Nested Declaration + Another Nested Selector
		input: "a { color: aqua; @starting-style { color: snow; } float: left; &.x { color: black; } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							0: "color",
							color: "aqua",
							length: 1
						},
						cssRules: [
							{
								cssRules: [{
									style: {
										0: "color",
										color: "snow",
										length: 1
									},
								}],
							},
							{
								style: {
									0: "float",
									float: "left",
									length: 1
								},
							},
							{
								cssRules: [],
								selectorText: "&.x",
								style: {
									0: "color",
									color: "black",
									length: 1
								},
							},
						],
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[1].parentStyleSheet = result.cssRules[0].cssRules[2].parentStyleSheet = result.cssRules[0].cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[1].parentRule = result.cssRules[0].cssRules[2].parentRule = result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[1]
			result.cssRules[0].cssRules[2].style.parentRule = result.cssRules[0].cssRules[2]
			result.cssRules[0].cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		// Style Declaration + Nested At-Rule Selector with Deep Nested Selector + Nested Declaration
		input: "a { color: aqua; @starting-style { color: snow; &.x { color: black; } } float: left; }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							0: "color",
							color: "aqua",
							length: 1
						},
						cssRules: [
							{
								cssRules: [
									{
										style: {
											0: "color",
											color: "snow",
											length: 1
										},
									},
									{
										cssRules: [],
										selectorText: "&.x",
										style: {
											0: "color",
											color: "black",
											length: 1
										},
									}
								],
							},
							{
								style: {
									0: "float",
									float: "left",
									length: 1
								},
							},
						],
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[1].parentStyleSheet = result.cssRules[0].cssRules[0].cssRules[1].parentStyleSheet = result.cssRules[0].cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[1].parentRule = result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[0].cssRules[1].parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[1]
			result.cssRules[0].cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[0].cssRules[1];
			return result;
		})()
	},
	{		
		// Nested Selector (ensure each selector contains '&' at the beginning, except for selectors that already have '&' somewhere)
		input: "a { x, .y { } #z & { } > & { } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							length: 0
						},
						cssRules: [
							{
								cssRules: [],
								selectorText: "& x, & .y",
								style: {
									length: 0
								},
							},
							{
								cssRules: [],
								selectorText: "#z &",
								style: {
									length: 0
								},
							},
							{
								cssRules: [],
								selectorText: "& > &",
								style: {
									length: 0
								},
							}
						],
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[1].parentStyleSheet = result.cssRules[0].cssRules[2].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[1].parentRule = result.cssRules[0].cssRules[2].parentRule = result.cssRules[0];
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[1];
			result.cssRules[0].cssRules[2].style.parentRule = result.cssRules[0].cssRules[2];
			return result;
		})()
	},
	{	
		// Nested Selector (keep & when it comes right after pseudo-class function )
		input: ".foo { :is(div)& { color: green; }}",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: ".foo",
						style: {
							length: 0
						},
						cssRules: [
							{
								cssRules: [],
								selectorText: ":is(div)&",
								style: {
									0: "color",
									color: "green",
									length: 1
								},
							}
						],
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		// Deep Nested At-Rule Selector + Deep Nested Selector + Nested Declaration
		input: "@media only screen { @starting-style { html { &:not([lang]) { color: gray; } background: plum } } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						conditionText: "only screen",
						media: {
							0: "only screen",
							length: 1
						},
						cssRules: [
							{
								cssRules: [
									{
										cssRules: [
											{
												cssRules: [],
												selectorText: "&:not([lang])",
												style: {
													0: "color",
													color: "gray",
													length: 1,
												},
											},
											{
												style: {
													0: "background",
													background: "plum",
													length: 1,
												},
											}
										],
										selectorText: "html",
										style: {
											length: 0
										}
									}
								]
							}
						],
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].cssRules[0].cssRules[1].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0].cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[0].cssRules[0].cssRules[1].parentRule = result.cssRules[0].cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0].cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[0].cssRules[0].cssRules[1];
			return result;
		})()
	},
	{
		// @scope should allow CSSNestedDeclarations
		input: "@scope { color: red; }",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [{
							style: {
								0: "color",
								color: "red",
								length: 1
							},
						}],
						start: null,
						end: null,
						parentRule: null,
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		// Edge case with a CSSNestedDeclarations at the end, after a nested selector inside a deep nested at-rule 
		input: "@scope { @scope { a { } } left: 1px; }",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [{
							cssRules: [{
								cssRules: [],
								selectorText: "a",
								style: {
									length: 0
								}
							}],
							start: null,
							end: null,
						},{
							style: {
								0: "left",
								left: "1px",
								length: 1
							},
						}],
						start: null,
						end: null,
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[1].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[1].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[1];
			return result;
		})()
	},
{
		// Edge case with a CSSNestedDeclarations at the end, after a nested selector inside a deep nested at-rule 
		input: "@media { @media { a { } } left: 1px; }",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [{
							cssRules: [{
								cssRules: [],
								selectorText: "a",
								style: {
									length: 0
								}
							}],
							conditionText: "",
							media: {
								length: 0
							},
						}],
						conditionText: "",
						media: {
							length: 0
						},
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		// BUG: CSS nesting with & selector followed by @media inside @layer throws TypeError
		// "Cannot read properties of null (reading 'constructor')" at parse.js:1446
		// The order matters: & nesting BEFORE @media fails, but @media BEFORE & nesting works
		input: "@layer components { .A { &:hover { color: red; } } @media (min-width: 0) { .B { color: blue; } } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						name: "components",
						cssRules: [
							{
								selectorText: ".A",
								style: {
									length: 0
								},
								cssRules: [
									{
										cssRules: [],
										selectorText: "&:hover",
										style: {
											0: "color",
											color: "red",
											length: 1
										},
									}
								],
							},
							{
								conditionText: "(min-width: 0)",
								media: {
									0: "(min-width: 0)",
									length: 1
								},
								cssRules: [
									{
										cssRules: [],
										selectorText: ".B",
										style: {
											0: "color",
											color: "blue",
											length: 1
										},
									}
								],
							}
						],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[1].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[1].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[1].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[1].cssRules[0].parentRule = result.cssRules[0].cssRules[1];
			result.cssRules[0].cssRules[1].cssRules[0].style.parentRule = result.cssRules[0].cssRules[1].cssRules[0];
			return result;
		})()
	},
];

var VALIDATION_TESTS = [
	// Invalid At-Rule Block: should be ignored and the next valid selectors should remain
	{
		input: "@mediaall {} p {}",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "p",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	// At-Rule with invalid junk before it: should be ignored and the next valid selectors should remain
	{
		input: "some invalid junk @media projection {body{background:black}} p {}",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "p",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	// Invalid At-Rule: should be ignored and the previous and next valid selectors should remain
	{
		input: "a{} @mediaall @media projection {body{background:black}} p {}",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					},
					{
						selectorText: "p",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result.cssRules[1].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[1].style.parentRule = result.cssRules[1];
			return result;
		})()
	},
	{
		// Invalid Nested At-Rule Block: should ignore the rule block only and mantain the following declarations + nested selectors + nested declarations
		input: "p { @mediaall @media projection {body{background:black}} color: red; }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "p",
						style: {
							0: "color",
							color: "red",
							length: 1
						},
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		// Invalid At-Rule Statement: should ignore the statement and the next selector, the following valid selectors should remain
		input: "a {} invalid@import url(\"grid.css\"); p {} b {} ",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					},
					{
						selectorText: "b",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result.cssRules[1].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[1].style.parentRule = result.cssRules[1];
			return result;
		})()
	},
	{
		// Nested @import: cannot be nested, should be ignored (still need to verify other at-rules that cannot be nested)
		input: "p { @import url(grid.css); color: red }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "p",
						style: {
							0: "color",
							color: "red",
							length: 1
						},
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		// Invalid Nesting Declaration inside root scoped At-Rule Block: should ignore the nested declaration and the next selector, but mantain the next valid selector
		input: "@media all { color: aqua; p {} a {} color: indigo; i {} b{} color: black; }",
		result: (function() {
			var result = {
				cssRules: [
					{
						conditionText: "all",
						media: {
							0: "all",
							length: 1
						},
						cssRules: [
							{
								cssRules: [],
								selectorText: "a",
								style: {
									length: 0
								},
							},
							{
								cssRules: [],
								selectorText: "b",
								style: {
									length: 0
								},
							}
						],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[1].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[1].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[1];
			return result;
		})()
	},
	{
		// Invalid At-Rule Block: @font-face cannot be declared within a CSS selector
		input: "p { @font-face { font-family: 'MyCustomFont' }}",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "p",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		// Invalid At-Rule Block: @layer can have only one layer-name, in this case is invalid and should be ignored
		input: "@layer one, two {} p {}",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "p",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		// Invalid Nested At-Rule statement: @layer statement seems valid, but is inside a nested rule, so it must be ignored
		input: "p { @layer one, two; color: pink}",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "p",
						style: {
							0: "color",
							color: "pink",
							length: 1
						},
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		// Unclosed @layer statement
		input: "@layer one",
		result: (function() {
			var result = {
				cssRules: [
					{
						nameList: ["one"],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result;
			return result;
		})()
	},
	{
		input: '@import "partial.css"',
		result: (function() {
			var result = {
				cssRules: [
					{
						href: 'partial.css',
						layerName: null,
						supportsText: null,
						media: {
							length: 0
						},
						parentRule: null,
						styleSheet: {
							media: {
								length: 0
							},
							disabled: false,
							href: null,
							cssRules: []
						}
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].styleSheet.parentStyleSheet = result;
			return result;
		})()
	},
	// In the browser, an empty layer() is not processed as a unamed layer
	// invalid layer declaration should be parsed as <general-enclosed> media query
	{
		input: '@import "partial.css" layer()',
		result: (function() {
			var result = {
				cssRules: [
					{
						href: 'partial.css',
						layerName: null,
						supportsText: null,
						media: {
							0: 'layer()',
							length: 1
						},
						parentRule: null,
						styleSheet: {
							media: {
								length: 0
							},
							disabled: false,
							href: null,
							cssRules: []
						}
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].styleSheet.parentStyleSheet = result;
			return result;
		})()
	},
	// In the browser, an invalid name inside layer() is not processed as a layer
	// invalid layer declaration should be parsed as <general-enclosed> media query
	{
		input: '@import "partial.css" layer(1invalid-name)',
		result: (function() {
			var result = {
				cssRules: [
					{
						href: 'partial.css',
						layerName: null,
						supportsText: null,
						media: {
							0: 'layer(1invalid-name)',
							length: 1
						},
						parentRule: null,
						styleSheet: {
							media: {
								length: 0
							},
							disabled: false,
							href: null,
							cssRules: []
						}
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].styleSheet.parentStyleSheet = result;
			return result;
		})()
	},
	{
		// Invalid @layer name in a layer block rule
		input: "@layer 1invalid-name {}",
		result: {
			cssRules: [],
			parentStyleSheet: null
		}
	},
	{
		// Invalid @layer name in a layer statement rule
		input: "@layer valid-name, 1invalid-name;",
		result: {
			cssRules: [],
			parentStyleSheet: null
		}
	},
	{
		// Valid @layer statement with dot between letters (should be valid)
		input: "@layer valid.name;",
		result: (function() {
			var result = {
				cssRules: [
					{
						nameList: ["valid.name"],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result;
			return result;
		})()
	},
	{
		// Valid @layer block with dot between letters (should be valid)
		input: "@layer valid.name {}",
		result: (function() {
			var result = {
				cssRules: [
					{
						name: "valid.name",
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result;
			return result;
		})()
	},
	{
		// CSSLayerStatementRule can appear:
		// - At the top level of a stylesheet.
		// - Inside CSSLayerBlockRule.
		// - Inside grouping rules (CSSMediaRule, CSSSupportsRule, CSSContainerRule, etc.)
		// It cannot appear:
		// - Inside CSSStyleRule (or any nested context that has a CSSStyleRule in its parent chain)
		input: "@layer outer { @layer foo.bar, baz; }",
		result: (function() {
			var result = {
				cssRules: [
					{
						name: "outer",
						cssRules: [
							{
								nameList: ["foo.bar", "baz"],
								parentRule: null,
							}
						],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		// Should auto-close the div
		input: "div { @media screen { color: red; & { color: red; }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "div",
						style: {
							length: 0
						},
						cssRules: [
							{
								conditionText: "screen",
								media: {
									0: "screen",
									length: 1
								},
								cssRules: [
									{
										style: {
											0: "color",
											color: "red",
											length: 1
										}
									},
									{
										cssRules: [],
										selectorText: "&",
										style: {
											0: "color",
											color: "red",
											length: 1
										}
									}
								]
							}
						],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].cssRules[1].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[1].parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[0].cssRules[1];
			return result;
		})()
	},
	{
		// Invalid selectors inside pseudo-classes with selector lists
		// - Invalid !& nested selector should be ignored
		// - Invalid selectors inside pseudo-classes with selector lists should be ignored and & should be prepended to the valid ones
		// 	 - Exception: When there is any ocurrence of & inside the pseudo-class with selector lists, the validation is ignored and the selector is kept as-is without prepending &
		input: ".a { !& {} :is(@invalid, .b, @bad, .c):not(@bad, .d) { color: red; } :is(!& .foo, .e) { color: green; } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: ".a",
						style: {
							length: 0
						},
						cssRules: [
							{
								cssRules: [],
								selectorText: "& :is(.b, .c):not(.d)",
								style: {
									0: "color",
									color: "red",
									length: 1
								},
							},
							{
								cssRules: [],
								selectorText: ":is(!& .foo, .e)",
								style: {
									0: "color",
									color: "green",
									length: 1
								},
							}
						],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[1].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[1].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[1].style.parentRule = result.cssRules[0].cssRules[1];
			return result;
		})()
	},
	{
		// Unexpected closing followed by invalid block folowed by valid block
		input: "a{} b{}} c{} d{}",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					},
					{
						selectorText: "b",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					},
					{
						selectorText: "d",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result.cssRules[1].parentStyleSheet = result.cssRules[2].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[1].style.parentRule = result.cssRules[1];
			result.cssRules[2].style.parentRule = result.cssRules[2];
			return result;
		})()
	},
	{
		// Unexpected opening brace followed valid blocks
		input: "a{} b{}{ c{} d{}",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					},
					{
						selectorText: "b",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result.cssRules[1].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[1].style.parentRule = result.cssRules[1];
			return result;
		})()
	},
	{
		// Unexpected opening brace followed valid blocks followed by a matched closing brace followed by a valid block
		input: "a{} b{}{ c{} d{}} e{}",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					},
					{
						selectorText: "b",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					},
					{
						selectorText: "e",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result.cssRules[1].parentStyleSheet = result.cssRules[2].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[1].style.parentRule = result.cssRules[1];
			result.cssRules[2].style.parentRule = result.cssRules[2];
			return result;
		})()
	},
	{
		// Ignoring invalid css declaration values in a general approach, keeping the valid ones
		input: "a { background: red :; color: pink; outline: 1px solid red : }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							0: "color",
							color: "pink",
							length: 1
						},
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		// Ignoring invalid selectors in a general approach
		input: "@invalid { this is not valid css }",
		result: {
			cssRules: [],
			parentStyleSheet: null
		}
	},
	{
		// Ignoring invalid nested selectors in a general approach
		input: "a { b{} @invalid { this is not valid css } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							length: 0
						},
						cssRules: [
							{
								selectorText: "& b",
								style: {
									length: 0
								},
								cssRules: [],
								parentRule: null,
							}
						],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		// Support attribute selector's case-insensitive flag
		input: "input[dir=auto i]:is([type=search i], [type=tel i], [type=url i],\n[type=email i]), textarea[dir=auto i], pre[dir=auto i], img:is([sizes=\"auto\" i], [sizes^='auto,' i])  {}",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "input[dir=auto i]:is([type=search i], [type=tel i], [type=url i], [type=email i]), textarea[dir=auto i], pre[dir=auto i], img:is([sizes=\"auto\" i], [sizes^='auto,' i])",
						style: {
							length: 0
						},
						cssRules: [],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			}
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		// Invalid newline inside quotes
		input: ":lang(\"\nen\") {}",
		result: {
			cssRules: [],
			parentStyleSheet: null
		}
	},
	{	
		// Invalid Nested Selector
		input: "a { &div { color: black; } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						selectorText: "a",
						style: {
							length: 0
						},
						cssRules: [
						],
						parentRule: null,
					},
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
{
		input: "a {color: red",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "a",
						style: {
							0: "color",
							color: "red",
							length: 1
						},
						parentRule: null,
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "a {color: red",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [],
						selectorText: "a",
						style: {
							0: "color",
							color: "red",
							length: 1
						},
						parentRule: null,
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			return result;
		})()
	},
	{
		input: "a { b {",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [{
							cssRules: [],
							selectorText: "& b",
							style: {
								length: 0
							}
						}],
						selectorText: "a",
						style: {
							length: 0
						},
						parentRule: null,
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		input: "a { b {}",
		result: (function() {
			var result = {
				cssRules: [
					{
						cssRules: [{
							cssRules: [],
							selectorText: "& b",
							style: {
								length: 0
							}
						}],
						selectorText: "a",
						style: {
							length: 0
						},
						parentRule: null,
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].style.parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			return result;
		})()
	},
	{
		// Invalid double backslash before exclamation mark
		input: ".a\\\\! {}",
		result: {
			cssRules: [],
			parentStyleSheet: null
		}
	},
	{
		// Nested declarations inside deeply nested at-rules inside a style rule inside a at-rule
		input: "@layer x { .a { @media all { @media all { color: red } } } }",
		result: (function() {
			var result = {
				cssRules: [
					{
						name: "x",
						cssRules: [
							{
								selectorText: ".a",
								style: {
									length: 0
								},
								cssRules: [
									{
										conditionText: "all",
										media: {
											0: "all",
											length: 1
										},
										cssRules: [
											{
												conditionText: "all",
												media: {
													0: "all",
													length: 1
												},
												cssRules: [
													{
														style: {
															0: "color",
															color: "red",
															length: 1
														}
													}
												]
											}
										]
									}
								],
								parentRule: null,
							}
						],
						parentRule: null,
					}
				],
				parentStyleSheet: null
			};
			result.cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].parentRule = result.cssRules[0];
			result.cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].cssRules[0].cssRules[0].parentStyleSheet = result;
			result.cssRules[0].cssRules[0].cssRules[0].cssRules[0].cssRules[0].parentRule = result.cssRules[0].cssRules[0].cssRules[0].cssRules[0];
			result.cssRules[0].cssRules[0].cssRules[0].cssRules[0].cssRules[0].style.parentRule = result.cssRules[0].cssRules[0].cssRules[0].cssRules[0].cssRules[0];
			return result;
		})()
	}
]

function itParse(input, result) {
	var parsed = CSSOM.parse(input);

	// Performance could optimized in order of magnitude but it’s alreaddy good enough
	// First handle circular references
	uncircularOwnProperties(parsed);
	uncircularOwnProperties(result);
	
	// Then materialize getters as own properties before comparison
	materializeGetters(parsed);
	materializeGetters(result);

	removeUnderscored(parsed);
	removeUnderscored(result);

	// Add defaults to root result
	if (!result.media) {
		result.media = {
			length: 0
		}
	}
	if (!result.disabled) {
		result.disabled = false;
	}
	if (!result.href) {
		result.href = null;
	}

	expect(parsed).toEqualOwnProperties(result);
}

describe('CSSOM', function () {
	describe('parse', function () {

		TESTS.forEach(function (test) {
			given(test.input, itParse.bind(this, test.input, test.result));
		});

		given('a{content:"\\""}', function (input) {
			var parsed = CSSOM.parse(input);
			expect(parsed.cssRules[0].style.content).toBe('"\\""');
		});

		given("a{content:'\\''}", function (input) {
			var parsed = CSSOM.parse(input);
			expect(parsed.cssRules[0].style.content).toBe("'\\''");
		});

		given('a{content:"abc\\"\\"d\\"ef"}', function (input) {
			var parsed = CSSOM.parse(input);
			expect(parsed.cssRules[0].style.content).toBe('"abc\\"\\"d\\"ef"');
		});

		given("a{content:'abc\\'\\'d\\'ef'}", function (input) {
			var parsed = CSSOM.parse(input);
			expect(parsed.cssRules[0].style.content).toBe("'abc\\'\\'d\\'ef'");
		});

		given("@invalid { this is not valid css }", function (input) {
			var parseErrors = [];
			var parseErrorHandler = function(error) {
				parseErrors.push(error);
			}
			CSSOM.parse(input, undefined, parseErrorHandler);
			expect(parseErrors.length).toBe(1);
		});

		given("@scope {}", function (input) {
			var parsed = CSSOM.parse(input);
			expect(parsed.cssRules[0].start).toBe(null);
			expect(parsed.cssRules[0].end).toBe(null);
		});

		given("@scope(.start) to (.end){}", function (input) {
			var parsed = CSSOM.parse(input);
			expect(parsed.cssRules[0].start).toBe(".start");
			expect(parsed.cssRules[0].end).toBe(".end");
		});

		given("@scope(.a)to (.b){}", function (input) {
			var parsed = CSSOM.parse(input);
			expect(parsed.cssRules[0].start).toBe(".a");
			expect(parsed.cssRules[0].end).toBe(".b");
		});

		given("@scope to (.end-only){}", function (input) {
			var parsed = CSSOM.parse(input);
			expect(parsed.cssRules[0].start).toBe(null);
			expect(parsed.cssRules[0].end).toBe(".end-only");
		});
	});

	describe('parse CSS NAMESPACE', function () {
		CSS_NAMESPACE_TESTS.forEach(function (test) {
			given(test.input, itParse.bind(this, test.input, test.result));
		});
	});

	describe('parse CSS NESTING', function () {
		CSS_NESTING_TESTS.forEach(function (test) {
			given(test.input, itParse.bind(this, test.input, test.result));
		});
	});

	describe('parse VALIDATION', function () {
		VALIDATION_TESTS.forEach(function (test) {
			given(test.input, itParse.bind(this, test.input, test.result));
		});
	});
});


/**
 * Recursively remove all keys which start with '_', except "_vendorPrefix", which needs to be tested against.
 * @param {Object} object
 */
function removeUnderscored(object) {
	if (!object) {
		return;
	}
	var keys = Object.keys(object);
	for (var i = 0, length = keys.length; i < length; i++) {
		var key = keys[i];
		if (key[0] === '_' && key !== '_vendorPrefix') {
			delete object[key];
		} else {
			var value = object[key];
			if (typeof value === 'object') {
				removeUnderscored(value);
			}
		}
	}
}
