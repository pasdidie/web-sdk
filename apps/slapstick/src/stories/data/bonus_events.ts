export default {
	"reveal": {
		"index": 0,
		"type": "reveal",
		"board": [
			[
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "S",
					"scatter": true
				},
				{
					"name": "L1"
				}
			],
			[
				{
					"name": "L1"
				},
				{
					"name": "L1"
				},
				{
					"name": "W",
					"wild": true,
					"multiplier": 1
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
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "L3"
				},
				{
					"name": "S",
					"scatter": true
				},
				{
					"name": "L3"
				}
			]
		],
		"paddingPositions": [
			4,
			34,
			15
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
				"row": 3
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
		"index": 5,
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
						"row": 3
					},
					{
						"reel": 2,
						"row": 3
					}
				],
				"meta": {
					"lineIndex": 3,
					"multiplier": 1,
					"winWithoutMult": 50,
					"globalMult": 1,
					"lineMultiplier": 1
				}
			}
		]
	},
	"setWin": {
		"index": 6,
		"type": "setWin",
		"amount": 50,
		"winLevel": 2
	},
	"freeSpinEnd": {
		"index": 35,
		"type": "freeSpinEnd",
		"amount": 11850,
		"winLevel": 7
	},
	"finalWin": {
		"index": 36,
		"type": "finalWin",
		"amount": 11850
	},
	"freeSpinRetrigger": {
		"index": 21,
		"type": "freeSpinRetrigger",
		"totalFs": 12,
		"positions": [
			{
				"reel": 0,
				"row": 2
			},
			{
				"reel": 1,
				"row": 1
			},
			{
				"reel": 2,
				"row": 1
			}
		]
	},
	"wincap": {
		"index": 21,
		"type": "wincap",
		"amount": 250000
	}
};
