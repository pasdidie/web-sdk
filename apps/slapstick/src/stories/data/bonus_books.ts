export default [
	{
		"id": 0,
		"payoutMultiplier": 11850,
		"events": [
			{
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
			{
				"index": 1,
				"type": "setTotalWin",
				"amount": 0
			},
			{
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
			{
				"index": 3,
				"type": "updateFreeSpin",
				"amount": 0,
				"total": 8
			},
			{
				"index": 4,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
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
							"name": "W",
							"wild": true,
							"multiplier": 5
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
							"name": "H2"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					17,
					54,
					36
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
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
			{
				"index": 6,
				"type": "setWin",
				"amount": 50,
				"winLevel": 2
			},
			{
				"index": 7,
				"type": "setTotalWin",
				"amount": 50
			},
			{
				"index": 8,
				"type": "updateFreeSpin",
				"amount": 1,
				"total": 8
			},
			{
				"index": 9,
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
							"name": "S",
							"scatter": true
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
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
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						}
					]
				],
				"paddingPositions": [
					21,
					35,
					57
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 10,
				"type": "winInfo",
				"totalWin": 8100,
				"wins": [
					{
						"symbol": "H1",
						"kind": 3,
						"win": 8000,
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
							"multiplier": 4,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 4
						}
					},
					{
						"symbol": "L3",
						"kind": 3,
						"win": 100,
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
							"multiplier": 2,
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 2
						}
					}
				]
			},
			{
				"index": 11,
				"type": "setWin",
				"amount": 8100,
				"winLevel": 8
			},
			{
				"index": 12,
				"type": "setTotalWin",
				"amount": 8150
			},
			{
				"index": 13,
				"type": "updateFreeSpin",
				"amount": 2,
				"total": 8
			},
			{
				"index": 14,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
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
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
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
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						}
					]
				],
				"paddingPositions": [
					28,
					38,
					31
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 15,
				"type": "setTotalWin",
				"amount": 8150
			},
			{
				"index": 16,
				"type": "updateFreeSpin",
				"amount": 3,
				"total": 8
			},
			{
				"index": 17,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
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
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H2"
						}
					]
				],
				"paddingPositions": [
					63,
					25,
					51
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 18,
				"type": "winInfo",
				"totalWin": 2500,
				"wins": [
					{
						"symbol": "H3",
						"kind": 3,
						"win": 2500,
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
							"multiplier": 5,
							"winWithoutMult": 500,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					}
				]
			},
			{
				"index": 19,
				"type": "setWin",
				"amount": 2500,
				"winLevel": 6
			},
			{
				"index": 20,
				"type": "setTotalWin",
				"amount": 10650
			},
			{
				"index": 21,
				"type": "updateFreeSpin",
				"amount": 4,
				"total": 8
			},
			{
				"index": 22,
				"type": "reveal",
				"board": [
					[
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H3"
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
							"name": "L2"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						}
					]
				],
				"paddingPositions": [
					23,
					18,
					63
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 23,
				"type": "setTotalWin",
				"amount": 10650
			},
			{
				"index": 24,
				"type": "updateFreeSpin",
				"amount": 5,
				"total": 8
			},
			{
				"index": 25,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "L1"
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
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						}
					]
				],
				"paddingPositions": [
					8,
					8,
					14
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 26,
				"type": "winInfo",
				"totalWin": 1200,
				"wins": [
					{
						"symbol": "L1",
						"kind": 3,
						"win": 1200,
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
							"multiplier": 6,
							"winWithoutMult": 200,
							"globalMult": 1,
							"lineMultiplier": 6
						}
					}
				]
			},
			{
				"index": 27,
				"type": "setWin",
				"amount": 1200,
				"winLevel": 5
			},
			{
				"index": 28,
				"type": "setTotalWin",
				"amount": 11850
			},
			{
				"index": 29,
				"type": "updateFreeSpin",
				"amount": 6,
				"total": 8
			},
			{
				"index": 30,
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
							"name": "S",
							"scatter": true
						},
						{
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						}
					]
				],
				"paddingPositions": [
					15,
					2,
					32
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 31,
				"type": "setTotalWin",
				"amount": 11850
			},
			{
				"index": 32,
				"type": "updateFreeSpin",
				"amount": 7,
				"total": 8
			},
			{
				"index": 33,
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
							"name": "L3"
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
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					14,
					59,
					36
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 34,
				"type": "setTotalWin",
				"amount": 11850
			},
			{
				"index": 35,
				"type": "freeSpinEnd",
				"amount": 11850,
				"winLevel": 7
			},
			{
				"index": 36,
				"type": "finalWin",
				"amount": 11850
			}
		],
		"criteria": "freegame",
		"baseGameWins": 0.0,
		"freeGameWins": 118.5
	},
	{
		"id": 1,
		"payoutMultiplier": 1200,
		"events": [
			{
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
							"name": "S",
							"scatter": true
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
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
							"name": "L1"
						},
						{
							"name": "L1"
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
							"name": "S",
							"scatter": true
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					5,
					16,
					36
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					1
				]
			},
			{
				"index": 1,
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
							"winWithoutMult": 200,
							"globalMult": 1,
							"lineMultiplier": 1
						}
					}
				]
			},
			{
				"index": 2,
				"type": "setWin",
				"amount": 200,
				"winLevel": 4
			},
			{
				"index": 3,
				"type": "setTotalWin",
				"amount": 200
			},
			{
				"index": 4,
				"type": "freeSpinTrigger",
				"totalFs": 8,
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
						"row": 2
					}
				]
			},
			{
				"index": 5,
				"type": "updateFreeSpin",
				"amount": 0,
				"total": 8
			},
			{
				"index": 6,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
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
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
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
							"multiplier": 2
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						}
					]
				],
				"paddingPositions": [
					58,
					31,
					16
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 7,
				"type": "setTotalWin",
				"amount": 200
			},
			{
				"index": 8,
				"type": "updateFreeSpin",
				"amount": 1,
				"total": 8
			},
			{
				"index": 9,
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
							"name": "L3"
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
							"name": "H3"
						},
						{
							"name": "H3"
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
							"name": "L1"
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
					5,
					32,
					7
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 10,
				"type": "setTotalWin",
				"amount": 200
			},
			{
				"index": 11,
				"type": "updateFreeSpin",
				"amount": 2,
				"total": 8
			},
			{
				"index": 12,
				"type": "reveal",
				"board": [
					[
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
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
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L2"
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
							"name": "H1"
						}
					]
				],
				"paddingPositions": [
					54,
					55,
					8
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 13,
				"type": "setTotalWin",
				"amount": 200
			},
			{
				"index": 14,
				"type": "updateFreeSpin",
				"amount": 3,
				"total": 8
			},
			{
				"index": 15,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
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
							"name": "H3"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					59,
					15,
					58
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 16,
				"type": "setTotalWin",
				"amount": 200
			},
			{
				"index": 17,
				"type": "updateFreeSpin",
				"amount": 4,
				"total": 8
			},
			{
				"index": 18,
				"type": "reveal",
				"board": [
					[
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
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
							"name": "S",
							"scatter": true
						},
						{
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
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
							"name": "L1"
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
					54,
					2,
					7
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 19,
				"type": "setTotalWin",
				"amount": 200
			},
			{
				"index": 20,
				"type": "updateFreeSpin",
				"amount": 5,
				"total": 8
			},
			{
				"index": 21,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
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
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
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
							"name": "L3"
						},
						{
							"name": "H3"
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
					55,
					41,
					24
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 22,
				"type": "winInfo",
				"totalWin": 800,
				"wins": [
					{
						"symbol": "L1",
						"kind": 3,
						"win": 800,
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
							"multiplier": 4,
							"winWithoutMult": 200,
							"globalMult": 1,
							"lineMultiplier": 4
						}
					}
				]
			},
			{
				"index": 23,
				"type": "setWin",
				"amount": 800,
				"winLevel": 5
			},
			{
				"index": 24,
				"type": "setTotalWin",
				"amount": 1000
			},
			{
				"index": 25,
				"type": "updateFreeSpin",
				"amount": 6,
				"total": 8
			},
			{
				"index": 26,
				"type": "reveal",
				"board": [
					[
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
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
							"name": "W",
							"wild": true,
							"multiplier": 2
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
							"name": "L3"
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
							"name": "L1"
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					54,
					26,
					39
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 27,
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
							"winWithoutMult": 200,
							"globalMult": 1,
							"lineMultiplier": 1
						}
					}
				]
			},
			{
				"index": 28,
				"type": "setWin",
				"amount": 200,
				"winLevel": 4
			},
			{
				"index": 29,
				"type": "setTotalWin",
				"amount": 1200
			},
			{
				"index": 30,
				"type": "updateFreeSpin",
				"amount": 7,
				"total": 8
			},
			{
				"index": 31,
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
							"name": "L3"
						},
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "H1"
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
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						}
					],
					[
						{
							"name": "H3"
						},
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
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					20,
					39,
					54
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 32,
				"type": "setTotalWin",
				"amount": 1200
			},
			{
				"index": 33,
				"type": "freeSpinEnd",
				"amount": 1000,
				"winLevel": 4
			},
			{
				"index": 34,
				"type": "finalWin",
				"amount": 1200
			}
		],
		"criteria": "freegame",
		"baseGameWins": 2.0,
		"freeGameWins": 10.0
	},
	{
		"id": 2,
		"payoutMultiplier": 25550,
		"events": [
			{
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
							"name": "S",
							"scatter": true
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "H1"
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
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					5,
					54,
					0
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					1
				]
			},
			{
				"index": 1,
				"type": "setTotalWin",
				"amount": 0
			},
			{
				"index": 2,
				"type": "freeSpinTrigger",
				"totalFs": 8,
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
						"row": 2
					}
				]
			},
			{
				"index": 3,
				"type": "updateFreeSpin",
				"amount": 0,
				"total": 8
			},
			{
				"index": 4,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
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
							"name": "H2"
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
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					65,
					33,
					38
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 5,
				"type": "winInfo",
				"totalWin": 350,
				"wins": [
					{
						"symbol": "L3",
						"kind": 3,
						"win": 50,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 1,
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 1
						}
					},
					{
						"symbol": "L3",
						"kind": 3,
						"win": 150,
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
							"multiplier": 3,
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 3
						}
					},
					{
						"symbol": "L3",
						"kind": 3,
						"win": 150,
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
							"multiplier": 3,
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 3
						}
					}
				]
			},
			{
				"index": 6,
				"type": "setWin",
				"amount": 350,
				"winLevel": 4
			},
			{
				"index": 7,
				"type": "setTotalWin",
				"amount": 350
			},
			{
				"index": 8,
				"type": "updateFreeSpin",
				"amount": 1,
				"total": 8
			},
			{
				"index": 9,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "L1"
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
							"name": "L1"
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
							"name": "H2"
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
					33,
					27,
					20
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 10,
				"type": "setTotalWin",
				"amount": 350
			},
			{
				"index": 11,
				"type": "updateFreeSpin",
				"amount": 2,
				"total": 8
			},
			{
				"index": 12,
				"type": "reveal",
				"board": [
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "L3"
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
							"name": "L1"
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
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					1,
					19,
					27
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 13,
				"type": "setTotalWin",
				"amount": 350
			},
			{
				"index": 14,
				"type": "updateFreeSpin",
				"amount": 3,
				"total": 8
			},
			{
				"index": 15,
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
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
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
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					37,
					41,
					36
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 16,
				"type": "setTotalWin",
				"amount": 350
			},
			{
				"index": 17,
				"type": "updateFreeSpin",
				"amount": 4,
				"total": 8
			},
			{
				"index": 18,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
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
							"name": "H1"
						},
						{
							"name": "H1"
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
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					28,
					4,
					49
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 19,
				"type": "setTotalWin",
				"amount": 350
			},
			{
				"index": 20,
				"type": "updateFreeSpin",
				"amount": 5,
				"total": 8
			},
			{
				"index": 21,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					59,
					37,
					59
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 22,
				"type": "winInfo",
				"totalWin": 16000,
				"wins": [
					{
						"symbol": "H1",
						"kind": 3,
						"win": 16000,
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
							"multiplier": 8,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					}
				]
			},
			{
				"index": 23,
				"type": "setWin",
				"amount": 16000,
				"winLevel": 9
			},
			{
				"index": 24,
				"type": "setTotalWin",
				"amount": 16350
			},
			{
				"index": 25,
				"type": "updateFreeSpin",
				"amount": 6,
				"total": 8
			},
			{
				"index": 26,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "S",
							"scatter": true
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
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
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
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					2,
					13,
					27
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 27,
				"type": "setTotalWin",
				"amount": 16350
			},
			{
				"index": 28,
				"type": "updateFreeSpin",
				"amount": 7,
				"total": 8
			},
			{
				"index": 29,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
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
							"name": "W",
							"wild": true,
							"multiplier": 2
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
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					57,
					52,
					58
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 30,
				"type": "winInfo",
				"totalWin": 9200,
				"wins": [
					{
						"symbol": "L2",
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
							"multiplier": 2,
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 2
						}
					},
					{
						"symbol": "L2",
						"kind": 3,
						"win": 500,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 5,
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					},
					{
						"symbol": "L2",
						"kind": 3,
						"win": 500,
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
							"multiplier": 5,
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					},
					{
						"symbol": "H1",
						"kind": 3,
						"win": 8000,
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
							"multiplier": 4,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 4
						}
					}
				]
			},
			{
				"index": 31,
				"type": "setWin",
				"amount": 9200,
				"winLevel": 8
			},
			{
				"index": 32,
				"type": "setTotalWin",
				"amount": 25550
			},
			{
				"index": 33,
				"type": "freeSpinEnd",
				"amount": 25550,
				"winLevel": 7
			},
			{
				"index": 34,
				"type": "finalWin",
				"amount": 25550
			}
		],
		"criteria": "freegame",
		"baseGameWins": 0.0,
		"freeGameWins": 255.5
	},
	{
		"id": 3,
		"payoutMultiplier": 300,
		"events": [
			{
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
							"name": "L3"
						},
						{
							"name": "S",
							"scatter": true
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
							"name": "H3"
						},
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
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
							"name": "L3"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					18,
					15,
					48
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					1
				]
			},
			{
				"index": 1,
				"type": "setTotalWin",
				"amount": 0
			},
			{
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
						"row": 2
					},
					{
						"reel": 2,
						"row": 1
					}
				]
			},
			{
				"index": 3,
				"type": "updateFreeSpin",
				"amount": 0,
				"total": 8
			},
			{
				"index": 4,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "S",
							"scatter": true
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
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
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
					2,
					56,
					20
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 5,
				"type": "setTotalWin",
				"amount": 0
			},
			{
				"index": 6,
				"type": "updateFreeSpin",
				"amount": 1,
				"total": 8
			},
			{
				"index": 7,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
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
							"name": "H3"
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
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					58,
					48,
					26
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 8,
				"type": "setTotalWin",
				"amount": 0
			},
			{
				"index": 9,
				"type": "updateFreeSpin",
				"amount": 2,
				"total": 8
			},
			{
				"index": 10,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						}
					],
					[
						{
							"name": "L1"
						},
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
							"name": "H3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						}
					]
				],
				"paddingPositions": [
					65,
					14,
					29
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 11,
				"type": "setTotalWin",
				"amount": 0
			},
			{
				"index": 12,
				"type": "updateFreeSpin",
				"amount": 3,
				"total": 8
			},
			{
				"index": 13,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "S",
							"scatter": true
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
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					60,
					49,
					12
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 14,
				"type": "setTotalWin",
				"amount": 0
			},
			{
				"index": 15,
				"type": "updateFreeSpin",
				"amount": 4,
				"total": 8
			},
			{
				"index": 16,
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
							"name": "L1"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
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
							"name": "H2"
						}
					],
					[
						{
							"name": "S",
							"scatter": true
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
					]
				],
				"paddingPositions": [
					49,
					54,
					1
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 17,
				"type": "setTotalWin",
				"amount": 0
			},
			{
				"index": 18,
				"type": "updateFreeSpin",
				"amount": 5,
				"total": 8
			},
			{
				"index": 19,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "S",
							"scatter": true
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
							"name": "H1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					2,
					1,
					50
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					1
				]
			},
			{
				"index": 20,
				"type": "setTotalWin",
				"amount": 0
			},
			{
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
			{
				"index": 22,
				"type": "updateFreeSpin",
				"amount": 6,
				"total": 12
			},
			{
				"index": 23,
				"type": "reveal",
				"board": [
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
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
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "H2"
						}
					]
				],
				"paddingPositions": [
					56,
					6,
					15
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 24,
				"type": "winInfo",
				"totalWin": 300,
				"wins": [
					{
						"symbol": "L2",
						"kind": 3,
						"win": 300,
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
							"multiplier": 3,
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 3
						}
					}
				]
			},
			{
				"index": 25,
				"type": "setWin",
				"amount": 300,
				"winLevel": 4
			},
			{
				"index": 26,
				"type": "setTotalWin",
				"amount": 300
			},
			{
				"index": 27,
				"type": "updateFreeSpin",
				"amount": 7,
				"total": 12
			},
			{
				"index": 28,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "H3"
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
							"name": "L2"
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
							"name": "H1"
						}
					]
				],
				"paddingPositions": [
					61,
					42,
					8
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 29,
				"type": "setTotalWin",
				"amount": 300
			},
			{
				"index": 30,
				"type": "updateFreeSpin",
				"amount": 8,
				"total": 12
			},
			{
				"index": 31,
				"type": "reveal",
				"board": [
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
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
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					64,
					6,
					12
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 32,
				"type": "setTotalWin",
				"amount": 300
			},
			{
				"index": 33,
				"type": "updateFreeSpin",
				"amount": 9,
				"total": 12
			},
			{
				"index": 34,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
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
							"name": "H3"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					46,
					30,
					35
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 35,
				"type": "setTotalWin",
				"amount": 300
			},
			{
				"index": 36,
				"type": "updateFreeSpin",
				"amount": 10,
				"total": 12
			},
			{
				"index": 37,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
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
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "S",
							"scatter": true
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
							"name": "L3"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					41,
					66,
					2
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 38,
				"type": "setTotalWin",
				"amount": 300
			},
			{
				"index": 39,
				"type": "updateFreeSpin",
				"amount": 11,
				"total": 12
			},
			{
				"index": 40,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
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
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
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
							"name": "L2"
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
					24,
					13,
					48
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 41,
				"type": "setTotalWin",
				"amount": 300
			},
			{
				"index": 42,
				"type": "freeSpinEnd",
				"amount": 300,
				"winLevel": 2
			},
			{
				"index": 43,
				"type": "finalWin",
				"amount": 300
			}
		],
		"criteria": "freegame",
		"baseGameWins": 0.0,
		"freeGameWins": 3.0
	},
	{
		"id": 4,
		"payoutMultiplier": 10750,
		"events": [
			{
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
							"name": "L3"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					4,
					34,
					36
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					1
				]
			},
			{
				"index": 1,
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
			{
				"index": 2,
				"type": "setWin",
				"amount": 200,
				"winLevel": 4
			},
			{
				"index": 3,
				"type": "setTotalWin",
				"amount": 200
			},
			{
				"index": 4,
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
						"row": 2
					}
				]
			},
			{
				"index": 5,
				"type": "updateFreeSpin",
				"amount": 0,
				"total": 8
			},
			{
				"index": 6,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
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
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					58,
					17,
					42
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 7,
				"type": "setTotalWin",
				"amount": 200
			},
			{
				"index": 8,
				"type": "updateFreeSpin",
				"amount": 1,
				"total": 8
			},
			{
				"index": 9,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						}
					]
				],
				"paddingPositions": [
					59,
					67,
					34
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 10,
				"type": "setTotalWin",
				"amount": 200
			},
			{
				"index": 11,
				"type": "updateFreeSpin",
				"amount": 2,
				"total": 8
			},
			{
				"index": 12,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
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
							"name": "L2"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
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
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					13,
					48,
					35
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 13,
				"type": "winInfo",
				"totalWin": 150,
				"wins": [
					{
						"symbol": "L3",
						"kind": 3,
						"win": 150,
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
							"multiplier": 3,
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 3
						}
					}
				]
			},
			{
				"index": 14,
				"type": "setWin",
				"amount": 150,
				"winLevel": 3
			},
			{
				"index": 15,
				"type": "setTotalWin",
				"amount": 350
			},
			{
				"index": 16,
				"type": "updateFreeSpin",
				"amount": 3,
				"total": 8
			},
			{
				"index": 17,
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
							"name": "L3"
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
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
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
							"name": "L3"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					5,
					59,
					2
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 18,
				"type": "setTotalWin",
				"amount": 350
			},
			{
				"index": 19,
				"type": "updateFreeSpin",
				"amount": 4,
				"total": 8
			},
			{
				"index": 20,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
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
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
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
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					10,
					10,
					66
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 21,
				"type": "winInfo",
				"totalWin": 10000,
				"wins": [
					{
						"symbol": "H1",
						"kind": 3,
						"win": 10000,
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
							"multiplier": 5,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					}
				]
			},
			{
				"index": 22,
				"type": "setWin",
				"amount": 10000,
				"winLevel": 9
			},
			{
				"index": 23,
				"type": "setTotalWin",
				"amount": 10350
			},
			{
				"index": 24,
				"type": "updateFreeSpin",
				"amount": 5,
				"total": 8
			},
			{
				"index": 25,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
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
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "H2"
						}
					]
				],
				"paddingPositions": [
					58,
					32,
					33
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 26,
				"type": "setTotalWin",
				"amount": 10350
			},
			{
				"index": 27,
				"type": "updateFreeSpin",
				"amount": 6,
				"total": 8
			},
			{
				"index": 28,
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
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
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
							"name": "L2"
						},
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					3,
					48,
					50
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					1
				]
			},
			{
				"index": 29,
				"type": "setTotalWin",
				"amount": 10350
			},
			{
				"index": 30,
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
						"row": 1
					}
				]
			},
			{
				"index": 31,
				"type": "updateFreeSpin",
				"amount": 7,
				"total": 12
			},
			{
				"index": 32,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
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
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "H2"
						}
					]
				],
				"paddingPositions": [
					18,
					38,
					33
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 33,
				"type": "setTotalWin",
				"amount": 10350
			},
			{
				"index": 34,
				"type": "updateFreeSpin",
				"amount": 8,
				"total": 12
			},
			{
				"index": 35,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
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
					47,
					46,
					25
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 36,
				"type": "winInfo",
				"totalWin": 400,
				"wins": [
					{
						"symbol": "L1",
						"kind": 3,
						"win": 400,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 2,
							"winWithoutMult": 200,
							"globalMult": 1,
							"lineMultiplier": 2
						}
					}
				]
			},
			{
				"index": 37,
				"type": "setWin",
				"amount": 400,
				"winLevel": 4
			},
			{
				"index": 38,
				"type": "setTotalWin",
				"amount": 10750
			},
			{
				"index": 39,
				"type": "updateFreeSpin",
				"amount": 9,
				"total": 12
			},
			{
				"index": 40,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
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
							"name": "H2"
						},
						{
							"name": "H3"
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
					],
					[
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
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					12,
					16,
					5
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 41,
				"type": "setTotalWin",
				"amount": 10750
			},
			{
				"index": 42,
				"type": "updateFreeSpin",
				"amount": 10,
				"total": 12
			},
			{
				"index": 43,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L1"
						},
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
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
					53,
					2,
					20
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 44,
				"type": "setTotalWin",
				"amount": 10750
			},
			{
				"index": 45,
				"type": "updateFreeSpin",
				"amount": 11,
				"total": 12
			},
			{
				"index": 46,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
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
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						}
					]
				],
				"paddingPositions": [
					9,
					18,
					52
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 47,
				"type": "setTotalWin",
				"amount": 10750
			},
			{
				"index": 48,
				"type": "freeSpinEnd",
				"amount": 10550,
				"winLevel": 7
			},
			{
				"index": 49,
				"type": "finalWin",
				"amount": 10750
			}
		],
		"criteria": "freegame",
		"baseGameWins": 2.0,
		"freeGameWins": 105.5
	},
	{
		"id": 5,
		"payoutMultiplier": 3700,
		"events": [
			{
				"index": 0,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H2"
						},
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
						}
					],
					[
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
					31,
					36,
					46
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					1
				]
			},
			{
				"index": 1,
				"type": "setTotalWin",
				"amount": 0
			},
			{
				"index": 2,
				"type": "freeSpinTrigger",
				"totalFs": 8,
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
						"row": 3
					}
				]
			},
			{
				"index": 3,
				"type": "updateFreeSpin",
				"amount": 0,
				"total": 8
			},
			{
				"index": 4,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
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
							"name": "L2"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
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
							"name": "H2"
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
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					13,
					11,
					27
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 5,
				"type": "setTotalWin",
				"amount": 0
			},
			{
				"index": 6,
				"type": "updateFreeSpin",
				"amount": 1,
				"total": 8
			},
			{
				"index": 7,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
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
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					34,
					29,
					17
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 8,
				"type": "winInfo",
				"totalWin": 200,
				"wins": [
					{
						"symbol": "L3",
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
							"multiplier": 4,
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 4
						}
					}
				]
			},
			{
				"index": 9,
				"type": "setWin",
				"amount": 200,
				"winLevel": 4
			},
			{
				"index": 10,
				"type": "setTotalWin",
				"amount": 200
			},
			{
				"index": 11,
				"type": "updateFreeSpin",
				"amount": 2,
				"total": 8
			},
			{
				"index": 12,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
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
							"name": "L1"
						},
						{
							"name": "L1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					9,
					13,
					12
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 13,
				"type": "winInfo",
				"totalWin": 2000,
				"wins": [
					{
						"symbol": "H2",
						"kind": 3,
						"win": 2000,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 2,
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 2
						}
					}
				]
			},
			{
				"index": 14,
				"type": "setWin",
				"amount": 2000,
				"winLevel": 6
			},
			{
				"index": 15,
				"type": "setTotalWin",
				"amount": 2200
			},
			{
				"index": 16,
				"type": "updateFreeSpin",
				"amount": 3,
				"total": 8
			},
			{
				"index": 17,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
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
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
						}
					],
					[
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
							"name": "L3"
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					9,
					9,
					67
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 18,
				"type": "setTotalWin",
				"amount": 2200
			},
			{
				"index": 19,
				"type": "updateFreeSpin",
				"amount": 4,
				"total": 8
			},
			{
				"index": 20,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
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
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
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
							"name": "L2"
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
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					12,
					21,
					66
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 21,
				"type": "setTotalWin",
				"amount": 2200
			},
			{
				"index": 22,
				"type": "updateFreeSpin",
				"amount": 5,
				"total": 8
			},
			{
				"index": 23,
				"type": "reveal",
				"board": [
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
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
							"name": "S",
							"scatter": true
						},
						{
							"name": "L3"
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					1,
					21,
					21
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					1
				]
			},
			{
				"index": 24,
				"type": "setTotalWin",
				"amount": 2200
			},
			{
				"index": 25,
				"type": "freeSpinRetrigger",
				"totalFs": 12,
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
						"row": 2
					}
				]
			},
			{
				"index": 26,
				"type": "updateFreeSpin",
				"amount": 6,
				"total": 12
			},
			{
				"index": 27,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "H2"
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "H3"
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
							"name": "S",
							"scatter": true
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
					]
				],
				"paddingPositions": [
					67,
					32,
					1
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 28,
				"type": "setTotalWin",
				"amount": 2200
			},
			{
				"index": 29,
				"type": "updateFreeSpin",
				"amount": 7,
				"total": 12
			},
			{
				"index": 30,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
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
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
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
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						}
					]
				],
				"paddingPositions": [
					48,
					25,
					9
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 31,
				"type": "winInfo",
				"totalWin": 800,
				"wins": [
					{
						"symbol": "L1",
						"kind": 3,
						"win": 400,
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
							"multiplier": 2,
							"winWithoutMult": 200,
							"globalMult": 1,
							"lineMultiplier": 2
						}
					},
					{
						"symbol": "L1",
						"kind": 3,
						"win": 200,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 1,
							"winWithoutMult": 200,
							"globalMult": 1,
							"lineMultiplier": 1
						}
					},
					{
						"symbol": "L1",
						"kind": 3,
						"win": 200,
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
							"winWithoutMult": 200,
							"globalMult": 1,
							"lineMultiplier": 1
						}
					}
				]
			},
			{
				"index": 32,
				"type": "setWin",
				"amount": 800,
				"winLevel": 5
			},
			{
				"index": 33,
				"type": "setTotalWin",
				"amount": 3000
			},
			{
				"index": 34,
				"type": "updateFreeSpin",
				"amount": 8,
				"total": 12
			},
			{
				"index": 35,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
						},
						{
							"name": "L3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H1"
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
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						}
					]
				],
				"paddingPositions": [
					66,
					4,
					32
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 36,
				"type": "winInfo",
				"totalWin": 500,
				"wins": [
					{
						"symbol": "L2",
						"kind": 3,
						"win": 500,
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
							"multiplier": 5,
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					}
				]
			},
			{
				"index": 37,
				"type": "setWin",
				"amount": 500,
				"winLevel": 5
			},
			{
				"index": 38,
				"type": "setTotalWin",
				"amount": 3500
			},
			{
				"index": 39,
				"type": "updateFreeSpin",
				"amount": 9,
				"total": 12
			},
			{
				"index": 40,
				"type": "reveal",
				"board": [
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
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
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
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
							"name": "L1"
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
					56,
					39,
					7
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 41,
				"type": "setTotalWin",
				"amount": 3500
			},
			{
				"index": 42,
				"type": "updateFreeSpin",
				"amount": 10,
				"total": 12
			},
			{
				"index": 43,
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
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
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
							"name": "L1"
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
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					3,
					3,
					44
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 44,
				"type": "setTotalWin",
				"amount": 3500
			},
			{
				"index": 45,
				"type": "updateFreeSpin",
				"amount": 11,
				"total": 12
			},
			{
				"index": 46,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
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
							"name": "L2"
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
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 2
						},
						{
							"name": "H2"
						}
					]
				],
				"paddingPositions": [
					13,
					28,
					33
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 47,
				"type": "winInfo",
				"totalWin": 200,
				"wins": [
					{
						"symbol": "L3",
						"kind": 3,
						"win": 100,
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
							"multiplier": 2,
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 2
						}
					},
					{
						"symbol": "L3",
						"kind": 3,
						"win": 100,
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
							"multiplier": 2,
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 2
						}
					}
				]
			},
			{
				"index": 48,
				"type": "setWin",
				"amount": 200,
				"winLevel": 4
			},
			{
				"index": 49,
				"type": "setTotalWin",
				"amount": 3700
			},
			{
				"index": 50,
				"type": "freeSpinEnd",
				"amount": 3700,
				"winLevel": 5
			},
			{
				"index": 51,
				"type": "finalWin",
				"amount": 3700
			}
		],
		"criteria": "freegame",
		"baseGameWins": 0.0,
		"freeGameWins": 37.0
	},
	{
		"id": 6,
		"payoutMultiplier": 250000,
		"events": [
			{
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
							"name": "S",
							"scatter": true
						},
						{
							"name": "L1"
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
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					5,
					35,
					47
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					1
				]
			},
			{
				"index": 1,
				"type": "setTotalWin",
				"amount": 0
			},
			{
				"index": 2,
				"type": "freeSpinTrigger",
				"totalFs": 8,
				"positions": [
					{
						"reel": 0,
						"row": 2
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
			{
				"index": 3,
				"type": "updateFreeSpin",
				"amount": 0,
				"total": 8
			},
			{
				"index": 4,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "H2"
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
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					]
				],
				"paddingPositions": [
					25,
					17,
					25
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 5,
				"type": "winInfo",
				"totalWin": 136000,
				"wins": [
					{
						"symbol": "W",
						"kind": 3,
						"win": 65000,
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
							"multiplier": 13,
							"winWithoutMult": 5000,
							"globalMult": 1,
							"lineMultiplier": 13
						}
					},
					{
						"symbol": "H1",
						"kind": 3,
						"win": 16000,
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
							"multiplier": 8,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					},
					{
						"symbol": "W",
						"kind": 3,
						"win": 55000,
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
							"multiplier": 11,
							"winWithoutMult": 5000,
							"globalMult": 1,
							"lineMultiplier": 11
						}
					}
				]
			},
			{
				"index": 6,
				"type": "setWin",
				"amount": 136000,
				"winLevel": 9
			},
			{
				"index": 7,
				"type": "setTotalWin",
				"amount": 136000
			},
			{
				"index": 8,
				"type": "updateFreeSpin",
				"amount": 1,
				"total": 8
			},
			{
				"index": 9,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					10,
					35,
					14
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 10,
				"type": "winInfo",
				"totalWin": 1400,
				"wins": [
					{
						"symbol": "L3",
						"kind": 3,
						"win": 400,
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
							"multiplier": 8,
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					},
					{
						"symbol": "L2",
						"kind": 3,
						"win": 500,
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
							"multiplier": 5,
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					},
					{
						"symbol": "L2",
						"kind": 3,
						"win": 500,
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
							"multiplier": 5,
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					}
				]
			},
			{
				"index": 11,
				"type": "setWin",
				"amount": 1400,
				"winLevel": 5
			},
			{
				"index": 12,
				"type": "setTotalWin",
				"amount": 137400
			},
			{
				"index": 13,
				"type": "updateFreeSpin",
				"amount": 2,
				"total": 8
			},
			{
				"index": 14,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L3"
						},
						{
							"name": "H2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					27,
					13,
					9
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 15,
				"type": "winInfo",
				"totalWin": 91500,
				"wins": [
					{
						"symbol": "L3",
						"kind": 3,
						"win": 500,
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
							"multiplier": 10,
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					},
					{
						"symbol": "H2",
						"kind": 3,
						"win": 8000,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 8,
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					},
					{
						"symbol": "W",
						"kind": 3,
						"win": 65000,
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
							"multiplier": 13,
							"winWithoutMult": 5000,
							"globalMult": 1,
							"lineMultiplier": 13
						}
					},
					{
						"symbol": "H2",
						"kind": 3,
						"win": 8000,
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
							"multiplier": 8,
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					},
					{
						"symbol": "H2",
						"kind": 3,
						"win": 10000,
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
							"multiplier": 10,
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					}
				]
			},
			{
				"index": 16,
				"type": "setWin",
				"amount": 91500,
				"winLevel": 9
			},
			{
				"index": 17,
				"type": "setTotalWin",
				"amount": 228900
			},
			{
				"index": 18,
				"type": "updateFreeSpin",
				"amount": 3,
				"total": 8
			},
			{
				"index": 19,
				"type": "reveal",
				"board": [
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					]
				],
				"paddingPositions": [
					32,
					44,
					28
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 20,
				"type": "winInfo",
				"totalWin": 36000,
				"wins": [
					{
						"symbol": "H1",
						"kind": 3,
						"win": 16000,
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
							"multiplier": 8,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					},
					{
						"symbol": "H1",
						"kind": 3,
						"win": 20000,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 10,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					}
				]
			},
			{
				"index": 21,
				"type": "wincap",
				"amount": 250000
			},
			{
				"index": 22,
				"type": "setTotalWin",
				"amount": 250000
			},
			{
				"index": 23,
				"type": "updateFreeSpin",
				"amount": 4,
				"total": 8
			},
			{
				"index": 24,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H3"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						}
					]
				],
				"paddingPositions": [
					21,
					43,
					11
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 25,
				"type": "winInfo",
				"totalWin": 20000,
				"wins": [
					{
						"symbol": "H1",
						"kind": 3,
						"win": 20000,
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
							"multiplier": 10,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					}
				]
			},
			{
				"index": 26,
				"type": "setTotalWin",
				"amount": 250000
			},
			{
				"index": 27,
				"type": "updateFreeSpin",
				"amount": 5,
				"total": 8
			},
			{
				"index": 28,
				"type": "reveal",
				"board": [
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					34,
					25,
					42
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 29,
				"type": "winInfo",
				"totalWin": 10000,
				"wins": [
					{
						"symbol": "H2",
						"kind": 3,
						"win": 10000,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 10,
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					}
				]
			},
			{
				"index": 30,
				"type": "setTotalWin",
				"amount": 250000
			},
			{
				"index": 31,
				"type": "updateFreeSpin",
				"amount": 6,
				"total": 8
			},
			{
				"index": 32,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					]
				],
				"paddingPositions": [
					23,
					32,
					1
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 33,
				"type": "winInfo",
				"totalWin": 79800,
				"wins": [
					{
						"symbol": "L2",
						"kind": 3,
						"win": 800,
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
							"multiplier": 8,
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					},
					{
						"symbol": "W",
						"kind": 3,
						"win": 75000,
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
							"multiplier": 15,
							"winWithoutMult": 5000,
							"globalMult": 1,
							"lineMultiplier": 15
						}
					},
					{
						"symbol": "H3",
						"kind": 3,
						"win": 4000,
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
							"multiplier": 8,
							"winWithoutMult": 500,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					}
				]
			},
			{
				"index": 34,
				"type": "setTotalWin",
				"amount": 250000
			},
			{
				"index": 35,
				"type": "updateFreeSpin",
				"amount": 7,
				"total": 8
			},
			{
				"index": 36,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L1"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					]
				],
				"paddingPositions": [
					10,
					27,
					18
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 37,
				"type": "winInfo",
				"totalWin": 16500,
				"wins": [
					{
						"symbol": "H1",
						"kind": 3,
						"win": 16000,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 8,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					},
					{
						"symbol": "L3",
						"kind": 3,
						"win": 500,
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
							"multiplier": 10,
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					}
				]
			},
			{
				"index": 38,
				"type": "setTotalWin",
				"amount": 250000
			},
			{
				"index": 39,
				"type": "freeSpinEnd",
				"amount": 250000,
				"winLevel": 10
			},
			{
				"index": 40,
				"type": "finalWin",
				"amount": 250000
			}
		],
		"criteria": "wincap",
		"baseGameWins": 0.0,
		"freeGameWins": 2500
	},
	{
		"id": 7,
		"payoutMultiplier": 250000,
		"events": [
			{
				"index": 0,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L3"
						},
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "L3"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						}
					],
					[
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
					20,
					35,
					-1
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					1
				]
			},
			{
				"index": 1,
				"type": "setTotalWin",
				"amount": 0
			},
			{
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
						"row": 3
					}
				]
			},
			{
				"index": 3,
				"type": "updateFreeSpin",
				"amount": 0,
				"total": 8
			},
			{
				"index": 4,
				"type": "reveal",
				"board": [
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					],
					[
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
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
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					26,
					1,
					46
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 5,
				"type": "winInfo",
				"totalWin": 86000,
				"wins": [
					{
						"symbol": "W",
						"kind": 3,
						"win": 75000,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 15,
							"winWithoutMult": 5000,
							"globalMult": 1,
							"lineMultiplier": 15
						}
					},
					{
						"symbol": "H2",
						"kind": 3,
						"win": 10000,
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
							"multiplier": 10,
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					},
					{
						"symbol": "L2",
						"kind": 3,
						"win": 1000,
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
							"multiplier": 10,
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					}
				]
			},
			{
				"index": 6,
				"type": "setWin",
				"amount": 86000,
				"winLevel": 9
			},
			{
				"index": 7,
				"type": "setTotalWin",
				"amount": 86000
			},
			{
				"index": 8,
				"type": "updateFreeSpin",
				"amount": 1,
				"total": 8
			},
			{
				"index": 9,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H1"
						},
						{
							"name": "H3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					]
				],
				"paddingPositions": [
					40,
					29,
					22
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 10,
				"type": "winInfo",
				"totalWin": 89000,
				"wins": [
					{
						"symbol": "H1",
						"kind": 3,
						"win": 20000,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 10,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					},
					{
						"symbol": "H3",
						"kind": 3,
						"win": 4000,
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
							"multiplier": 8,
							"winWithoutMult": 500,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					},
					{
						"symbol": "W",
						"kind": 3,
						"win": 65000,
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
							"multiplier": 13,
							"winWithoutMult": 5000,
							"globalMult": 1,
							"lineMultiplier": 13
						}
					}
				]
			},
			{
				"index": 11,
				"type": "setWin",
				"amount": 89000,
				"winLevel": 9
			},
			{
				"index": 12,
				"type": "setTotalWin",
				"amount": 175000
			},
			{
				"index": 13,
				"type": "updateFreeSpin",
				"amount": 2,
				"total": 8
			},
			{
				"index": 14,
				"type": "reveal",
				"board": [
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					]
				],
				"paddingPositions": [
					45,
					45,
					25
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 15,
				"type": "winInfo",
				"totalWin": 25000,
				"wins": [
					{
						"symbol": "H1",
						"kind": 3,
						"win": 20000,
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
							"multiplier": 10,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					},
					{
						"symbol": "H3",
						"kind": 3,
						"win": 5000,
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
							"multiplier": 10,
							"winWithoutMult": 500,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					}
				]
			},
			{
				"index": 16,
				"type": "setWin",
				"amount": 25000,
				"winLevel": 9
			},
			{
				"index": 17,
				"type": "setTotalWin",
				"amount": 200000
			},
			{
				"index": 18,
				"type": "updateFreeSpin",
				"amount": 3,
				"total": 8
			},
			{
				"index": 19,
				"type": "reveal",
				"board": [
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H2"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					]
				],
				"paddingPositions": [
					33,
					8,
					35
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 20,
				"type": "winInfo",
				"totalWin": 21000,
				"wins": [
					{
						"symbol": "H1",
						"kind": 3,
						"win": 20000,
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
							"multiplier": 10,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					},
					{
						"symbol": "L2",
						"kind": 3,
						"win": 1000,
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
							"multiplier": 10,
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					}
				]
			},
			{
				"index": 21,
				"type": "setWin",
				"amount": 21000,
				"winLevel": 9
			},
			{
				"index": 22,
				"type": "setTotalWin",
				"amount": 221000
			},
			{
				"index": 23,
				"type": "updateFreeSpin",
				"amount": 4,
				"total": 8
			},
			{
				"index": 24,
				"type": "reveal",
				"board": [
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						}
					]
				],
				"paddingPositions": [
					6,
					15,
					36
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 25,
				"type": "winInfo",
				"totalWin": 45250,
				"wins": [
					{
						"symbol": "L3",
						"kind": 3,
						"win": 250,
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
							"multiplier": 5,
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					},
					{
						"symbol": "W",
						"kind": 3,
						"win": 45000,
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
							"multiplier": 9,
							"winWithoutMult": 5000,
							"globalMult": 1,
							"lineMultiplier": 9
						}
					}
				]
			},
			{
				"index": 26,
				"type": "wincap",
				"amount": 250000
			},
			{
				"index": 27,
				"type": "setTotalWin",
				"amount": 250000
			},
			{
				"index": 28,
				"type": "updateFreeSpin",
				"amount": 5,
				"total": 8
			},
			{
				"index": 29,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					25,
					38,
					3
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 30,
				"type": "winInfo",
				"totalWin": 250000,
				"wins": [
					{
						"symbol": "H1",
						"kind": 3,
						"win": 20000,
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
							"multiplier": 10,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					},
					{
						"symbol": "H1",
						"kind": 3,
						"win": 20000,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 10,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					},
					{
						"symbol": "W",
						"kind": 3,
						"win": 75000,
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
							"multiplier": 15,
							"winWithoutMult": 5000,
							"globalMult": 1,
							"lineMultiplier": 15
						}
					},
					{
						"symbol": "W",
						"kind": 3,
						"win": 75000,
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
							"multiplier": 15,
							"winWithoutMult": 5000,
							"globalMult": 1,
							"lineMultiplier": 15
						}
					},
					{
						"symbol": "W",
						"kind": 3,
						"win": 75000,
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
							"multiplier": 15,
							"winWithoutMult": 5000,
							"globalMult": 1,
							"lineMultiplier": 15
						}
					}
				]
			},
			{
				"index": 31,
				"type": "setTotalWin",
				"amount": 250000
			},
			{
				"index": 32,
				"type": "updateFreeSpin",
				"amount": 6,
				"total": 8
			},
			{
				"index": 33,
				"type": "reveal",
				"board": [
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L2"
						},
						{
							"name": "L3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					]
				],
				"paddingPositions": [
					32,
					38,
					11
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 34,
				"type": "winInfo",
				"totalWin": 22300,
				"wins": [
					{
						"symbol": "H1",
						"kind": 3,
						"win": 20000,
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
							"multiplier": 10,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					},
					{
						"symbol": "L2",
						"kind": 3,
						"win": 800,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 8,
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					},
					{
						"symbol": "L3",
						"kind": 3,
						"win": 500,
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
							"multiplier": 10,
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					},
					{
						"symbol": "L2",
						"kind": 3,
						"win": 1000,
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
							"multiplier": 10,
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					}
				]
			},
			{
				"index": 35,
				"type": "setTotalWin",
				"amount": 250000
			},
			{
				"index": 36,
				"type": "updateFreeSpin",
				"amount": 7,
				"total": 8
			},
			{
				"index": 37,
				"type": "reveal",
				"board": [
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "H2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "H2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					45,
					15,
					14
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 38,
				"type": "winInfo",
				"totalWin": 90000,
				"wins": [
					{
						"symbol": "H2",
						"kind": 3,
						"win": 10000,
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
							"multiplier": 10,
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					},
					{
						"symbol": "W",
						"kind": 3,
						"win": 65000,
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
							"multiplier": 13,
							"winWithoutMult": 5000,
							"globalMult": 1,
							"lineMultiplier": 13
						}
					},
					{
						"symbol": "H2",
						"kind": 3,
						"win": 5000,
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
							"multiplier": 5,
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					},
					{
						"symbol": "H2",
						"kind": 3,
						"win": 10000,
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
							"multiplier": 10,
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					}
				]
			},
			{
				"index": 39,
				"type": "setTotalWin",
				"amount": 250000
			},
			{
				"index": 40,
				"type": "freeSpinEnd",
				"amount": 250000,
				"winLevel": 10
			},
			{
				"index": 41,
				"type": "finalWin",
				"amount": 250000
			}
		],
		"criteria": "wincap",
		"baseGameWins": 0.0,
		"freeGameWins": 2500
	},
	{
		"id": 8,
		"payoutMultiplier": 250000,
		"events": [
			{
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
							"name": "H1"
						},
						{
							"name": "S",
							"scatter": true
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
							"name": "L1"
						},
						{
							"name": "S",
							"scatter": true
						},
						{
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					4,
					0,
					37
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					1
				]
			},
			{
				"index": 1,
				"type": "setTotalWin",
				"amount": 0
			},
			{
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
						"row": 1
					},
					{
						"reel": 2,
						"row": 1
					}
				]
			},
			{
				"index": 3,
				"type": "updateFreeSpin",
				"amount": 0,
				"total": 8
			},
			{
				"index": 4,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L1"
						},
						{
							"name": "L2"
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H3"
						},
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					]
				],
				"paddingPositions": [
					21,
					40,
					16
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 5,
				"type": "winInfo",
				"totalWin": 7000,
				"wins": [
					{
						"symbol": "H3",
						"kind": 3,
						"win": 5000,
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
							"multiplier": 10,
							"winWithoutMult": 500,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					},
					{
						"symbol": "L1",
						"kind": 3,
						"win": 2000,
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
							"multiplier": 10,
							"winWithoutMult": 200,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					}
				]
			},
			{
				"index": 6,
				"type": "setWin",
				"amount": 7000,
				"winLevel": 8
			},
			{
				"index": 7,
				"type": "setTotalWin",
				"amount": 7000
			},
			{
				"index": 8,
				"type": "updateFreeSpin",
				"amount": 1,
				"total": 8
			},
			{
				"index": 9,
				"type": "reveal",
				"board": [
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
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
							"name": "L2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
						},
						{
							"name": "H1"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						}
					]
				],
				"paddingPositions": [
					6,
					42,
					0
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 10,
				"type": "winInfo",
				"totalWin": 20000,
				"wins": [
					{
						"symbol": "H1",
						"kind": 3,
						"win": 20000,
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
							"multiplier": 10,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					}
				]
			},
			{
				"index": 11,
				"type": "setWin",
				"amount": 20000,
				"winLevel": 9
			},
			{
				"index": 12,
				"type": "setTotalWin",
				"amount": 27000
			},
			{
				"index": 13,
				"type": "updateFreeSpin",
				"amount": 2,
				"total": 8
			},
			{
				"index": 14,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L3"
						},
						{
							"name": "L1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "L1"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "H3"
						},
						{
							"name": "H2"
						},
						{
							"name": "L1"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					7,
					33,
					43
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 15,
				"type": "winInfo",
				"totalWin": 1600,
				"wins": [
					{
						"symbol": "L1",
						"kind": 3,
						"win": 1600,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 8,
							"winWithoutMult": 200,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					}
				]
			},
			{
				"index": 16,
				"type": "setWin",
				"amount": 1600,
				"winLevel": 6
			},
			{
				"index": 17,
				"type": "setTotalWin",
				"amount": 28600
			},
			{
				"index": 18,
				"type": "updateFreeSpin",
				"amount": 3,
				"total": 8
			},
			{
				"index": 19,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						}
					],
					[
						{
							"name": "L3"
						},
						{
							"name": "H3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H2"
						},
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					]
				],
				"paddingPositions": [
					46,
					21,
					47
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 20,
				"type": "winInfo",
				"totalWin": 29800,
				"wins": [
					{
						"symbol": "H3",
						"kind": 3,
						"win": 5000,
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
							"multiplier": 10,
							"winWithoutMult": 500,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					},
					{
						"symbol": "H2",
						"kind": 3,
						"win": 8000,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 8,
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					},
					{
						"symbol": "L2",
						"kind": 3,
						"win": 800,
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
							"multiplier": 8,
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					},
					{
						"symbol": "H1",
						"kind": 3,
						"win": 16000,
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
							"multiplier": 8,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					}
				]
			},
			{
				"index": 21,
				"type": "setWin",
				"amount": 29800,
				"winLevel": 9
			},
			{
				"index": 22,
				"type": "setTotalWin",
				"amount": 58400
			},
			{
				"index": 23,
				"type": "updateFreeSpin",
				"amount": 4,
				"total": 8
			},
			{
				"index": 24,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "L1"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L3"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					]
				],
				"paddingPositions": [
					21,
					38,
					4
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 25,
				"type": "winInfo",
				"totalWin": 66300,
				"wins": [
					{
						"symbol": "L2",
						"kind": 3,
						"win": 1000,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 10,
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					},
					{
						"symbol": "L3",
						"kind": 3,
						"win": 300,
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
							"multiplier": 6,
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 6
						}
					},
					{
						"symbol": "W",
						"kind": 3,
						"win": 65000,
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
							"multiplier": 13,
							"winWithoutMult": 5000,
							"globalMult": 1,
							"lineMultiplier": 13
						}
					}
				]
			},
			{
				"index": 26,
				"type": "setWin",
				"amount": 66300,
				"winLevel": 9
			},
			{
				"index": 27,
				"type": "setTotalWin",
				"amount": 124700
			},
			{
				"index": 28,
				"type": "updateFreeSpin",
				"amount": 5,
				"total": 8
			},
			{
				"index": 29,
				"type": "reveal",
				"board": [
					[
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
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
							"name": "L1"
						},
						{
							"name": "L1"
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
							"name": "H2"
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
					62,
					28,
					20
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 30,
				"type": "winInfo",
				"totalWin": 150,
				"wins": [
					{
						"symbol": "L3",
						"kind": 3,
						"win": 150,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 3,
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 3
						}
					}
				]
			},
			{
				"index": 31,
				"type": "setWin",
				"amount": 150,
				"winLevel": 3
			},
			{
				"index": 32,
				"type": "setTotalWin",
				"amount": 124850
			},
			{
				"index": 33,
				"type": "updateFreeSpin",
				"amount": 6,
				"total": 8
			},
			{
				"index": 34,
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
							"name": "H3"
						},
						{
							"name": "H3"
						},
						{
							"name": "L3"
						}
					],
					[
						{
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L1"
						},
						{
							"name": "L1"
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
							"name": "L1"
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
					26,
					9,
					7
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 35,
				"type": "winInfo",
				"totalWin": 1000,
				"wins": [
					{
						"symbol": "L1",
						"kind": 3,
						"win": 1000,
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
							"multiplier": 5,
							"winWithoutMult": 200,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					}
				]
			},
			{
				"index": 36,
				"type": "setWin",
				"amount": 1000,
				"winLevel": 5
			},
			{
				"index": 37,
				"type": "setTotalWin",
				"amount": 125850
			},
			{
				"index": 38,
				"type": "updateFreeSpin",
				"amount": 7,
				"total": 8
			},
			{
				"index": 39,
				"type": "reveal",
				"board": [
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L2"
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					],
					[
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "H2"
						},
						{
							"name": "H1"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					]
				],
				"paddingPositions": [
					47,
					25,
					26
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 40,
				"type": "winInfo",
				"totalWin": 150000,
				"wins": [
					{
						"symbol": "H1",
						"kind": 3,
						"win": 10000,
						"positions": [
							{
								"reel": 0,
								"row": 2
							},
							{
								"reel": 1,
								"row": 2
							},
							{
								"reel": 2,
								"row": 2
							}
						],
						"meta": {
							"lineIndex": 2,
							"multiplier": 5,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					},
					{
						"symbol": "W",
						"kind": 3,
						"win": 65000,
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
							"multiplier": 13,
							"winWithoutMult": 5000,
							"globalMult": 1,
							"lineMultiplier": 13
						}
					},
					{
						"symbol": "W",
						"kind": 3,
						"win": 65000,
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
							"multiplier": 13,
							"winWithoutMult": 5000,
							"globalMult": 1,
							"lineMultiplier": 13
						}
					},
					{
						"symbol": "H2",
						"kind": 3,
						"win": 10000,
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
							"multiplier": 10,
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					}
				]
			},
			{
				"index": 41,
				"type": "wincap",
				"amount": 250000
			},
			{
				"index": 42,
				"type": "setTotalWin",
				"amount": 250000
			},
			{
				"index": 43,
				"type": "freeSpinEnd",
				"amount": 250000,
				"winLevel": 10
			},
			{
				"index": 44,
				"type": "finalWin",
				"amount": 250000
			}
		],
		"criteria": "wincap",
		"baseGameWins": 0.0,
		"freeGameWins": 2500
	}
];
