module.exports = {
	formats: 'local woff2 woff',
	custom: {
		"Gotham Pro": {
			variants: {
				normal: {
					400: {
						url: {
							woff: "../fonts/Reg/GothamPro.woff"
						}
					},
					// 500: {
					// 	url: {
					// 		woff2: "../fonts/Bold/GothamPro-Bold.woff2",
					// 		woff: "../fonts/Bold/GothamPro-Bold.woff"
					// 	}
					// },
					700: {
						url: {
							woff: "../fonts/Bold/GothamPro-Bold.woff"
						}
					}
				}
			}
		},
		"Gilmer": {
			variants: {
				normal: {
					700: {
						url: {
							woff: "../fonts/Gilmer Bold/Gilmer-Bold.woff"
						}
					}
				}
			}
		}
	}
}