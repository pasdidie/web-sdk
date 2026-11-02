export default {
	"reveal": {
		"index": 0,
		"type": "reveal",
		"board": [
			[
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "L2"
				}
			],
			[
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "W",
					"wild": true,
					"multiplier": 1
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				}
			],
			[
				{
					"name": "H3"
				},
				{
					"name": "S",
					"scatter": true
				},
				{
					"name": "H3"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				}
			]
		],
		"paddingPositions": [
			40,
			25,
			1
		],
		"gameType": "basegame",
		"anticipation": [
			0,
			0,
			0
		]
	},
	"setTotalWin": {
		"index": 1,
		"type": "setTotalWin",
		"amount": 0
	},
	"finalWin": {
		"index": 2,
		"type": "finalWin",
		"amount": 0
	},
	"winInfo": {
		"index": 1,
		"type": "winInfo",
		"totalWin": 50,
		"wins": [
			{
				"symbol": "L3",
				"kind": 3,
				"win": 50,
				"positions": [
					{
						"reel": 0,
						"row": 3
					},
					{
						"reel": 1,
						"row": 2
					},
					{
						"reel": 2,
						"row": 1
					}
				],
				"meta": {
					"lineIndex": 5,
					"multiplier": 1,
					"winWithoutMult": 50,
					"globalMult": 1,
					"lineMultiplier": 1
				}
			}
		]
	},
	"setWin": {
		"index": 2,
		"type": "setWin",
		"amount": 50,
		"winLevel": 2
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
				"row": 2
			},
			{
				"reel": 2,
				"row": 1
			}
		]
	},
	"updateFreeSpin": {
		"index": 3,
		"type": "updateFreeSpin",
		"amount": 0,
		"total": 8
	},
	"freeSpinEnd": {
		"index": 37,
		"type": "freeSpinEnd",
		"amount": 3400,
		"winLevel": 5
	},
	"freeSpinRetrigger": {
		"index": 14,
		"type": "freeSpinRetrigger",
		"totalFs": 12,
		"positions": [
			{
				"reel": 0,
				"row": 2
			},
			{
				"reel": 1,
				"row": 3
			},
			{
				"reel": 2,
				"row": 2
			}
		]
	},
	"wincap": {
		"index": 37,
		"type": "wincap",
		"amount": 250000
	}
};
