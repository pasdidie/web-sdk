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
					"name": "L1"
				},
				{
					"name": "S",
					"scatter": true
				}
			],
			[
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
					"name": "L2"
				},
				{
					"name": "L2"
				},
				{
					"name": "H3"
				},
				{
					"name": "H3"
				},
				{
					"name": "L3"
				}
			]
		],
		"paddingPositions": [
			3,
			27,
			11
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
		"totalWin": 200,
		"wins": [
			{
				"symbol": "L3",
				"kind": 3,
				"win": 50,
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
					"winWithoutMult": 50,
					"globalMult": 1,
					"lineMultiplier": 1
				}
			},
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
			},
			{
				"symbol": "L3",
				"kind": 3,
				"win": 50,
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
						"row": 3
					}
				],
				"meta": {
					"lineIndex": 4,
					"multiplier": 1,
					"winWithoutMult": 50,
					"globalMult": 1,
					"lineMultiplier": 1
				}
			},
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
		"amount": 200,
		"winLevel": 4
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
				"row": 2
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
		"index": 31,
		"type": "freeSpinEnd",
		"amount": 1400,
		"winLevel": 4
	},
	"freeSpinRetrigger": {
		"index": 6,
		"type": "freeSpinRetrigger",
		"totalFs": 12,
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
	"wincap": {
		"index": 31,
		"type": "wincap",
		"amount": 250000
	}
};
