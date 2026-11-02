export default {
	"reveal": {
		"index": 0,
		"type": "reveal",
		"board": [
			[
				{
					"name": "H2"
				},
				{
					"name": "S",
					"scatter": true
				},
				{
					"name": "H2"
				},
				{
					"name": "H3"
				},
				{
					"name": "H3"
				}
			],
			[
				{
					"name": "H3"
				},
				{
					"name": "H1"
				},
				{
					"name": "H1"
				},
				{
					"name": "S",
					"scatter": true
				},
				{
					"name": "L2"
				}
			],
			[
				{
					"name": "H2"
				},
				{
					"name": "H2"
				},
				{
					"name": "H3"
				},
				{
					"name": "S",
					"scatter": true
				},
				{
					"name": "H3"
				}
			]
		],
		"paddingPositions": [
			32,
			-2,
			-1
		],
		"gameType": "basegame",
		"anticipation": [
			0,
			0,
			1
		]
	},
	"setTotalWin": {
		"index": 1,
		"type": "setTotalWin",
		"amount": 0
	},
	"freeSpinTrigger": {
		"index": 2,
		"type": "freeSpinTrigger",
		"totalFs": 8,
		"positions": [
			{
				"reel": 0,
				"row": 1
			},
			{
				"reel": 1,
				"row": 3
			},
			{
				"reel": 2,
				"row": 3
			}
		]
	},
	"updateFreeSpin": {
		"index": 3,
		"type": "updateFreeSpin",
		"amount": 0,
		"total": 8
	},
	"winInfo": {
		"index": 14,
		"type": "winInfo",
		"totalWin": 200,
		"wins": [
			{
				"symbol": "L1",
				"kind": 3,
				"win": 200,
				"positions": [
					{
						"reel": 0,
						"row": 1
					},
					{
						"reel": 1,
						"row": 1
					},
					{
						"reel": 2,
						"row": 1
					}
				],
				"meta": {
					"lineIndex": 1,
					"multiplier": 1,
					"winWithoutMult": 200,
					"globalMult": 1,
					"lineMultiplier": 1
				}
			}
		]
	},
	"setWin": {
		"index": 15,
		"type": "setWin",
		"amount": 200,
		"winLevel": 4
	},
	"freeSpinEnd": {
		"index": 29,
		"type": "freeSpinEnd",
		"amount": 200,
		"winLevel": 2
	},
	"finalWin": {
		"index": 30,
		"type": "finalWin",
		"amount": 200
	},
	"freeSpinRetrigger": {
		"index": 17,
		"type": "freeSpinRetrigger",
		"totalFs": 12,
		"positions": [
			{
				"reel": 0,
				"row": 1
			},
			{
				"reel": 1,
				"row": 1
			},
			{
				"reel": 2,
				"row": 2
			}
		]
	},
	"wincap": {
		"index": 14,
		"type": "wincap",
		"amount": 250000
	}
};
