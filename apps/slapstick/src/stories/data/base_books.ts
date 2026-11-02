export default [
	{
		"id": 0,
		"payoutMultiplier": 0,
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
			{
				"index": 1,
				"type": "setTotalWin",
				"amount": 0
			},
			{
				"index": 2,
				"type": "finalWin",
				"amount": 0
			}
		],
		"criteria": "0",
		"baseGameWins": 0.0,
		"freeGameWins": 0.0
	},
	{
		"id": 1,
		"payoutMultiplier": 0,
		"events": [
			{
				"index": 0,
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
							"multiplier": 1
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
							"name": "H2"
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
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					63,
					20,
					38
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 1,
				"type": "setTotalWin",
				"amount": 0
			},
			{
				"index": 2,
				"type": "finalWin",
				"amount": 0
			}
		],
		"criteria": "0",
		"baseGameWins": 0.0,
		"freeGameWins": 0.0
	},
	{
		"id": 2,
		"payoutMultiplier": 0,
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
							"name": "L3"
						},
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
						}
					]
				],
				"paddingPositions": [
					38,
					63,
					53
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 1,
				"type": "setTotalWin",
				"amount": 0
			},
			{
				"index": 2,
				"type": "finalWin",
				"amount": 0
			}
		],
		"criteria": "0",
		"baseGameWins": 0.0,
		"freeGameWins": 0.0
	},
	{
		"id": 3,
		"payoutMultiplier": 50,
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
					]
				],
				"paddingPositions": [
					19,
					22,
					19
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
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
			{
				"index": 2,
				"type": "setWin",
				"amount": 50,
				"winLevel": 2
			},
			{
				"index": 3,
				"type": "setTotalWin",
				"amount": 50
			},
			{
				"index": 4,
				"type": "finalWin",
				"amount": 50
			}
		],
		"criteria": "basegame",
		"baseGameWins": 0.5,
		"freeGameWins": 0.0
	},
	{
		"id": 4,
		"payoutMultiplier": 100,
		"events": [
			{
				"index": 0,
				"type": "reveal",
				"board": [
					[
						{
							"name": "L2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 1
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 1
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 1
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
							"name": "L2"
						},
						{
							"name": "H1"
						},
						{
							"name": "S",
							"scatter": true
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
							"name": "W",
							"wild": true,
							"multiplier": 1
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
					58,
					51,
					56
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 1,
				"type": "winInfo",
				"totalWin": 100,
				"wins": [
					{
						"symbol": "L2",
						"kind": 3,
						"win": 100,
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
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 1
						}
					}
				]
			},
			{
				"index": 2,
				"type": "setWin",
				"amount": 100,
				"winLevel": 3
			},
			{
				"index": 3,
				"type": "setTotalWin",
				"amount": 100
			},
			{
				"index": 4,
				"type": "finalWin",
				"amount": 100
			}
		],
		"criteria": "basegame",
		"baseGameWins": 1.0,
		"freeGameWins": 0.0
	},
	{
		"id": 5,
		"payoutMultiplier": 50,
		"events": [
			{
				"index": 0,
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
							"multiplier": 1
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
					64,
					40,
					31
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
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
					}
				]
			},
			{
				"index": 2,
				"type": "setWin",
				"amount": 50,
				"winLevel": 2
			},
			{
				"index": 3,
				"type": "setTotalWin",
				"amount": 50
			},
			{
				"index": 4,
				"type": "finalWin",
				"amount": 50
			}
		],
		"criteria": "basegame",
		"baseGameWins": 0.5,
		"freeGameWins": 0.0
	},
	{
		"id": 6,
		"payoutMultiplier": 500,
		"events": [
			{
				"index": 0,
				"type": "reveal",
				"board": [
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
							"name": "H2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 1
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
					49,
					25,
					57
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 1,
				"type": "winInfo",
				"totalWin": 500,
				"wins": [
					{
						"symbol": "H3",
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
							"multiplier": 1,
							"winWithoutMult": 500,
							"globalMult": 1,
							"lineMultiplier": 1
						}
					}
				]
			},
			{
				"index": 2,
				"type": "setWin",
				"amount": 500,
				"winLevel": 5
			},
			{
				"index": 3,
				"type": "setTotalWin",
				"amount": 500
			},
			{
				"index": 4,
				"type": "finalWin",
				"amount": 500
			}
		],
		"criteria": "basegame",
		"baseGameWins": 5.0,
		"freeGameWins": 0.0
	},
	{
		"id": 7,
		"payoutMultiplier": 1000,
		"events": [
			{
				"index": 0,
				"type": "reveal",
				"board": [
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
							"name": "H2"
						},
						{
							"name": "H2"
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
							"name": "S",
							"scatter": true
						}
					]
				],
				"paddingPositions": [
					27,
					12,
					63
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 1,
				"type": "winInfo",
				"totalWin": 1000,
				"wins": [
					{
						"symbol": "H2",
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
							"multiplier": 1,
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 1
						}
					}
				]
			},
			{
				"index": 2,
				"type": "setWin",
				"amount": 1000,
				"winLevel": 5
			},
			{
				"index": 3,
				"type": "setTotalWin",
				"amount": 1000
			},
			{
				"index": 4,
				"type": "finalWin",
				"amount": 1000
			}
		],
		"criteria": "basegame",
		"baseGameWins": 10.0,
		"freeGameWins": 0.0
	},
	{
		"id": 8,
		"payoutMultiplier": 1000,
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
							"multiplier": 1
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
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 1
						}
					]
				],
				"paddingPositions": [
					34,
					24,
					22
				],
				"gameType": "basegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 1,
				"type": "winInfo",
				"totalWin": 1000,
				"wins": [
					{
						"symbol": "H2",
						"kind": 3,
						"win": 1000,
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
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 1
						}
					}
				]
			},
			{
				"index": 2,
				"type": "setWin",
				"amount": 1000,
				"winLevel": 5
			},
			{
				"index": 3,
				"type": "setTotalWin",
				"amount": 1000
			},
			{
				"index": 4,
				"type": "finalWin",
				"amount": 1000
			}
		],
		"criteria": "basegame",
		"baseGameWins": 10.0,
		"freeGameWins": 0.0
	},
	{
		"id": 9,
		"payoutMultiplier": 3400,
		"events": [
			{
				"index": 0,
				"type": "reveal",
				"board": [
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
					48,
					15,
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
						},
						{
							"name": "H2"
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
					51,
					11,
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
				"totalWin": 400,
				"wins": [
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
				"index": 6,
				"type": "setWin",
				"amount": 400,
				"winLevel": 4
			},
			{
				"index": 7,
				"type": "setTotalWin",
				"amount": 400
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
							"name": "H2"
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
							"name": "H3"
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
					30,
					40,
					60
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
				"amount": 400
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
							"name": "W",
							"wild": true,
							"multiplier": 5
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
					64,
					52,
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
				"index": 13,
				"type": "winInfo",
				"totalWin": 300,
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
					},
					{
						"symbol": "L3",
						"kind": 3,
						"win": 250,
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
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					}
				]
			},
			{
				"index": 14,
				"type": "setWin",
				"amount": 300,
				"winLevel": 4
			},
			{
				"index": 15,
				"type": "setTotalWin",
				"amount": 700
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
						},
						{
							"name": "S",
							"scatter": true
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
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					21,
					20,
					53
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
				"amount": 700
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
					67,
					35,
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
				"index": 21,
				"type": "winInfo",
				"totalWin": 300,
				"wins": [
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
				"index": 22,
				"type": "setWin",
				"amount": 300,
				"winLevel": 4
			},
			{
				"index": 23,
				"type": "setTotalWin",
				"amount": 1000
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
							"multiplier": 2
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
							"name": "L2"
						},
						{
							"name": "L2"
						}
					]
				],
				"paddingPositions": [
					8,
					17,
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
				"index": 26,
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
							"multiplier": 2,
							"winWithoutMult": 200,
							"globalMult": 1,
							"lineMultiplier": 2
						}
					}
				]
			},
			{
				"index": 27,
				"type": "setWin",
				"amount": 400,
				"winLevel": 4
			},
			{
				"index": 28,
				"type": "setTotalWin",
				"amount": 1400
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
					37,
					52,
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
				"index": 31,
				"type": "winInfo",
				"totalWin": 2000,
				"wins": [
					{
						"symbol": "H3",
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
							"multiplier": 2,
							"winWithoutMult": 500,
							"globalMult": 1,
							"lineMultiplier": 2
						}
					},
					{
						"symbol": "H3",
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
							"multiplier": 2,
							"winWithoutMult": 500,
							"globalMult": 1,
							"lineMultiplier": 2
						}
					}
				]
			},
			{
				"index": 32,
				"type": "setWin",
				"amount": 2000,
				"winLevel": 6
			},
			{
				"index": 33,
				"type": "setTotalWin",
				"amount": 3400
			},
			{
				"index": 34,
				"type": "updateFreeSpin",
				"amount": 7,
				"total": 8
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
					12,
					14,
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
				"index": 36,
				"type": "setTotalWin",
				"amount": 3400
			},
			{
				"index": 37,
				"type": "freeSpinEnd",
				"amount": 3400,
				"winLevel": 5
			},
			{
				"index": 38,
				"type": "finalWin",
				"amount": 3400
			}
		],
		"criteria": "freegame",
		"baseGameWins": 0.0,
		"freeGameWins": 34.0
	},
	{
		"id": 10,
		"payoutMultiplier": 1700,
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
							"name": "H1"
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
					6,
					52,
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
							"name": "H1"
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
							"name": "S",
							"scatter": true
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
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					57,
					39,
					23
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
					46,
					27,
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
							"name": "W",
							"wild": true,
							"multiplier": 2
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
							"name": "L2"
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
					67,
					51,
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
				"index": 13,
				"type": "winInfo",
				"totalWin": 500,
				"wins": [
					{
						"symbol": "L2",
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
							"multiplier": 2,
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 2
						}
					},
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
				"index": 14,
				"type": "setWin",
				"amount": 500,
				"winLevel": 5
			},
			{
				"index": 15,
				"type": "setTotalWin",
				"amount": 700
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
					]
				],
				"paddingPositions": [
					57,
					28,
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
				"index": 18,
				"type": "setTotalWin",
				"amount": 700
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
					1,
					6,
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
				"index": 21,
				"type": "setTotalWin",
				"amount": 700
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
					55,
					11,
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
				"index": 24,
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
							"winWithoutMult": 200,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					}
				]
			},
			{
				"index": 25,
				"type": "setWin",
				"amount": 1000,
				"winLevel": 5
			},
			{
				"index": 26,
				"type": "setTotalWin",
				"amount": 1700
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
							"name": "W",
							"wild": true,
							"multiplier": 2
						}
					],
					[
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
					31,
					37,
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
				"index": 29,
				"type": "setTotalWin",
				"amount": 1700
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
							"name": "S",
							"scatter": true
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
					54,
					49,
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
				"index": 32,
				"type": "setTotalWin",
				"amount": 1700
			},
			{
				"index": 33,
				"type": "freeSpinEnd",
				"amount": 1700,
				"winLevel": 4
			},
			{
				"index": 34,
				"type": "finalWin",
				"amount": 1700
			}
		],
		"criteria": "freegame",
		"baseGameWins": 0.0,
		"freeGameWins": 17.0
	},
	{
		"id": 11,
		"payoutMultiplier": 14250,
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
						}
					]
				],
				"paddingPositions": [
					19,
					35,
					16
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
				"totalWin": 50,
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
					}
				]
			},
			{
				"index": 2,
				"type": "setWin",
				"amount": 50,
				"winLevel": 2
			},
			{
				"index": 3,
				"type": "setTotalWin",
				"amount": 50
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
						"row": 2
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
							"multiplier": 5
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
					53,
					2,
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
				"index": 7,
				"type": "winInfo",
				"totalWin": 14000,
				"wins": [
					{
						"symbol": "H1",
						"kind": 3,
						"win": 14000,
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
							"multiplier": 7,
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 7
						}
					}
				]
			},
			{
				"index": 8,
				"type": "setWin",
				"amount": 14000,
				"winLevel": 9
			},
			{
				"index": 9,
				"type": "setTotalWin",
				"amount": 14050
			},
			{
				"index": 10,
				"type": "updateFreeSpin",
				"amount": 1,
				"total": 8
			},
			{
				"index": 11,
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
							"multiplier": 5
						},
						{
							"name": "H1"
						}
					]
				],
				"paddingPositions": [
					3,
					67,
					30
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					1
				]
			},
			{
				"index": 12,
				"type": "setTotalWin",
				"amount": 14050
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
							"name": "L2"
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
					],
					[
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
					54,
					62,
					60
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
				"amount": 14050
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
							"name": "W",
							"wild": true,
							"multiplier": 2
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
							"name": "L2"
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
					53,
					7,
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
				"index": 18,
				"type": "setTotalWin",
				"amount": 14050
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
							"name": "L2"
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
					15,
					62,
					21
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
				"amount": 14050
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
							"name": "H2"
						}
					]
				],
				"paddingPositions": [
					24,
					18,
					10
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
				"index": 25,
				"type": "setWin",
				"amount": 200,
				"winLevel": 4
			},
			{
				"index": 26,
				"type": "setTotalWin",
				"amount": 14250
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
					38,
					35,
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
				"index": 29,
				"type": "setTotalWin",
				"amount": 14250
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
					45,
					21,
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
				"index": 32,
				"type": "setTotalWin",
				"amount": 14250
			},
			{
				"index": 33,
				"type": "freeSpinEnd",
				"amount": 14200,
				"winLevel": 7
			},
			{
				"index": 34,
				"type": "finalWin",
				"amount": 14250
			}
		],
		"criteria": "freegame",
		"baseGameWins": 0.5,
		"freeGameWins": 142.0
	},
	{
		"id": 12,
		"payoutMultiplier": 250,
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
							"name": "H2"
						},
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
					31,
					14,
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
						"row": 3
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
					31,
					27,
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
					35,
					13,
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
				"index": 8,
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
					21,
					67,
					67
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					1
				]
			},
			{
				"index": 13,
				"type": "setTotalWin",
				"amount": 200
			},
			{
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
			{
				"index": 15,
				"type": "updateFreeSpin",
				"amount": 3,
				"total": 12
			},
			{
				"index": 16,
				"type": "reveal",
				"board": [
					[
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
					67,
					55,
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
				"index": 17,
				"type": "setTotalWin",
				"amount": 200
			},
			{
				"index": 18,
				"type": "updateFreeSpin",
				"amount": 4,
				"total": 12
			},
			{
				"index": 19,
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
					64,
					27,
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
				"index": 20,
				"type": "setTotalWin",
				"amount": 200
			},
			{
				"index": 21,
				"type": "updateFreeSpin",
				"amount": 5,
				"total": 12
			},
			{
				"index": 22,
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
					47,
					1,
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
				"index": 23,
				"type": "setTotalWin",
				"amount": 200
			},
			{
				"index": 24,
				"type": "updateFreeSpin",
				"amount": 6,
				"total": 12
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
					19,
					37,
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
				"index": 26,
				"type": "setTotalWin",
				"amount": 200
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
							"name": "L3"
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
					]
				],
				"paddingPositions": [
					11,
					25,
					41
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
				"amount": 200
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
							"name": "S",
							"scatter": true
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
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					9,
					28,
					23
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
				"amount": 200
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
					17,
					35,
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
				"index": 35,
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
			{
				"index": 36,
				"type": "setWin",
				"amount": 50,
				"winLevel": 2
			},
			{
				"index": 37,
				"type": "setTotalWin",
				"amount": 250
			},
			{
				"index": 38,
				"type": "updateFreeSpin",
				"amount": 10,
				"total": 12
			},
			{
				"index": 39,
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
							"name": "W",
							"wild": true,
							"multiplier": 3
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
					60,
					52,
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
				"index": 40,
				"type": "setTotalWin",
				"amount": 250
			},
			{
				"index": 41,
				"type": "updateFreeSpin",
				"amount": 11,
				"total": 12
			},
			{
				"index": 42,
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
					24,
					28,
					56
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 43,
				"type": "setTotalWin",
				"amount": 250
			},
			{
				"index": 44,
				"type": "freeSpinEnd",
				"amount": 250,
				"winLevel": 2
			},
			{
				"index": 45,
				"type": "finalWin",
				"amount": 250
			}
		],
		"criteria": "freegame",
		"baseGameWins": 0.0,
		"freeGameWins": 2.5
	},
	{
		"id": 13,
		"payoutMultiplier": 3600,
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
							"name": "H2"
						},
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
					20,
					14,
					1
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
						"row": 3
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
					23,
					16,
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
							"name": "H2"
						},
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
						}
					]
				],
				"paddingPositions": [
					26,
					42,
					56
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
				"totalWin": 2000,
				"wins": [
					{
						"symbol": "H3",
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
							"multiplier": 1,
							"winWithoutMult": 500,
							"globalMult": 1,
							"lineMultiplier": 1
						}
					},
					{
						"symbol": "H3",
						"kind": 3,
						"win": 1000,
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
							"winWithoutMult": 500,
							"globalMult": 1,
							"lineMultiplier": 2
						}
					},
					{
						"symbol": "H3",
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
							"multiplier": 1,
							"winWithoutMult": 500,
							"globalMult": 1,
							"lineMultiplier": 1
						}
					}
				]
			},
			{
				"index": 9,
				"type": "setWin",
				"amount": 2000,
				"winLevel": 6
			},
			{
				"index": 10,
				"type": "setTotalWin",
				"amount": 2000
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
					]
				],
				"paddingPositions": [
					15,
					67,
					6
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
				"amount": 2000
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
					51,
					1,
					66
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					1
				]
			},
			{
				"index": 16,
				"type": "setTotalWin",
				"amount": 2000
			},
			{
				"index": 17,
				"type": "freeSpinRetrigger",
				"totalFs": 12,
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
						"row": 3
					}
				]
			},
			{
				"index": 18,
				"type": "updateFreeSpin",
				"amount": 4,
				"total": 12
			},
			{
				"index": 19,
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
							"name": "H2"
						}
					]
				],
				"paddingPositions": [
					20,
					18,
					10
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
				"type": "setTotalWin",
				"amount": 2000
			},
			{
				"index": 21,
				"type": "updateFreeSpin",
				"amount": 5,
				"total": 12
			},
			{
				"index": 22,
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
							"name": "H2"
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
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					39,
					55,
					53
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
				"type": "winInfo",
				"totalWin": 1000,
				"wins": [
					{
						"symbol": "H2",
						"kind": 3,
						"win": 1000,
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
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 1
						}
					}
				]
			},
			{
				"index": 24,
				"type": "setWin",
				"amount": 1000,
				"winLevel": 5
			},
			{
				"index": 25,
				"type": "setTotalWin",
				"amount": 3000
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
							"name": "L2"
						},
						{
							"name": "L2"
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
					47,
					61,
					21
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
				"amount": 3000
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
					16,
					38,
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
				"index": 31,
				"type": "setTotalWin",
				"amount": 3000
			},
			{
				"index": 32,
				"type": "updateFreeSpin",
				"amount": 8,
				"total": 12
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
							"name": "L1"
						},
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
						}
					]
				],
				"paddingPositions": [
					14,
					4,
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
				"type": "setTotalWin",
				"amount": 3000
			},
			{
				"index": 35,
				"type": "updateFreeSpin",
				"amount": 9,
				"total": 12
			},
			{
				"index": 36,
				"type": "reveal",
				"board": [
					[
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
					35,
					38,
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
				"index": 37,
				"type": "winInfo",
				"totalWin": 400,
				"wins": [
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
				"index": 38,
				"type": "setWin",
				"amount": 400,
				"winLevel": 4
			},
			{
				"index": 39,
				"type": "setTotalWin",
				"amount": 3400
			},
			{
				"index": 40,
				"type": "updateFreeSpin",
				"amount": 10,
				"total": 12
			},
			{
				"index": 41,
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
							"name": "H2"
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
							"name": "L2"
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
					56,
					60,
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
				"index": 42,
				"type": "winInfo",
				"totalWin": 200,
				"wins": [
					{
						"symbol": "L2",
						"kind": 3,
						"win": 100,
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
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 1
						}
					},
					{
						"symbol": "L2",
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
							"multiplier": 1,
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 1
						}
					}
				]
			},
			{
				"index": 43,
				"type": "setWin",
				"amount": 200,
				"winLevel": 4
			},
			{
				"index": 44,
				"type": "setTotalWin",
				"amount": 3600
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
							"name": "H1"
						},
						{
							"name": "H1"
						},
						{
							"name": "S",
							"scatter": true
						}
					]
				],
				"paddingPositions": [
					62,
					13,
					65
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
				"amount": 3600
			},
			{
				"index": 48,
				"type": "freeSpinEnd",
				"amount": 3600,
				"winLevel": 5
			},
			{
				"index": 49,
				"type": "finalWin",
				"amount": 3600
			}
		],
		"criteria": "freegame",
		"baseGameWins": 0.0,
		"freeGameWins": 36.0
	},
	{
		"id": 14,
		"payoutMultiplier": 4500,
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
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					31,
					15,
					35
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
					41,
					36,
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
					39,
					54,
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
					34,
					14,
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
					]
				],
				"paddingPositions": [
					47,
					12,
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
					]
				],
				"paddingPositions": [
					20,
					19,
					64
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
							"name": "H2"
						},
						{
							"name": "H2"
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					65,
					36,
					53
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
				"totalWin": 2500,
				"wins": [
					{
						"symbol": "H3",
						"kind": 3,
						"win": 2500,
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
							"winWithoutMult": 500,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					}
				]
			},
			{
				"index": 21,
				"type": "setWin",
				"amount": 2500,
				"winLevel": 6
			},
			{
				"index": 22,
				"type": "setTotalWin",
				"amount": 2500
			},
			{
				"index": 23,
				"type": "updateFreeSpin",
				"amount": 6,
				"total": 8
			},
			{
				"index": 24,
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
					21,
					23,
					49
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					1
				]
			},
			{
				"index": 25,
				"type": "setTotalWin",
				"amount": 2500
			},
			{
				"index": 26,
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
						"row": 2
					}
				]
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
							"name": "W",
							"wild": true,
							"multiplier": 2
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
					31,
					67,
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
				"index": 29,
				"type": "winInfo",
				"totalWin": 2000,
				"wins": [
					{
						"symbol": "H2",
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
							"multiplier": 1,
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 1
						}
					},
					{
						"symbol": "H2",
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
							"multiplier": 1,
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 1
						}
					}
				]
			},
			{
				"index": 30,
				"type": "setWin",
				"amount": 2000,
				"winLevel": 6
			},
			{
				"index": 31,
				"type": "setTotalWin",
				"amount": 4500
			},
			{
				"index": 32,
				"type": "updateFreeSpin",
				"amount": 8,
				"total": 12
			},
			{
				"index": 33,
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
					]
				],
				"paddingPositions": [
					11,
					6,
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
				"index": 34,
				"type": "setTotalWin",
				"amount": 4500
			},
			{
				"index": 35,
				"type": "updateFreeSpin",
				"amount": 9,
				"total": 12
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
							"multiplier": 3
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
							"name": "H3"
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
							"name": "W",
							"wild": true,
							"multiplier": 2
						}
					]
				],
				"paddingPositions": [
					50,
					43,
					55
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
				"type": "setTotalWin",
				"amount": 4500
			},
			{
				"index": 38,
				"type": "updateFreeSpin",
				"amount": 10,
				"total": 12
			},
			{
				"index": 39,
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
							"name": "S",
							"scatter": true
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
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					30,
					23,
					40
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
				"type": "setTotalWin",
				"amount": 4500
			},
			{
				"index": 41,
				"type": "updateFreeSpin",
				"amount": 11,
				"total": 12
			},
			{
				"index": 42,
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
							"multiplier": 2
						},
						{
							"name": "H3"
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
						},
						{
							"name": "H3"
						}
					]
				],
				"paddingPositions": [
					8,
					59,
					53
				],
				"gameType": "freegame",
				"anticipation": [
					0,
					0,
					0
				]
			},
			{
				"index": 43,
				"type": "setTotalWin",
				"amount": 4500
			},
			{
				"index": 44,
				"type": "freeSpinEnd",
				"amount": 4500,
				"winLevel": 5
			},
			{
				"index": 45,
				"type": "finalWin",
				"amount": 4500
			}
		],
		"criteria": "freegame",
		"baseGameWins": 0.0,
		"freeGameWins": 45.0
	},
	{
		"id": 15,
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
					20,
					54,
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
					]
				],
				"paddingPositions": [
					11,
					8,
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
				"type": "winInfo",
				"totalWin": 22000,
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
						"symbol": "L1",
						"kind": 3,
						"win": 1000,
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
							"winWithoutMult": 200,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					},
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
					}
				]
			},
			{
				"index": 6,
				"type": "setWin",
				"amount": 22000,
				"winLevel": 9
			},
			{
				"index": 7,
				"type": "setTotalWin",
				"amount": 22000
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
							"name": "H3"
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
							"name": "L3"
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
							"name": "L1"
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					3,
					46,
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
				"index": 10,
				"type": "winInfo",
				"totalWin": 500,
				"wins": [
					{
						"symbol": "L3",
						"kind": 3,
						"win": 250,
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
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					},
					{
						"symbol": "L3",
						"kind": 3,
						"win": 250,
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
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					}
				]
			},
			{
				"index": 11,
				"type": "setWin",
				"amount": 500,
				"winLevel": 5
			},
			{
				"index": 12,
				"type": "setTotalWin",
				"amount": 22500
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
							"name": "H2"
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
							"multiplier": 5
						}
					]
				],
				"paddingPositions": [
					39,
					1,
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
				"index": 15,
				"type": "setTotalWin",
				"amount": 22500
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
						}
					]
				],
				"paddingPositions": [
					0,
					25,
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
				"index": 18,
				"type": "winInfo",
				"totalWin": 75000,
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
					}
				]
			},
			{
				"index": 19,
				"type": "setWin",
				"amount": 75000,
				"winLevel": 9
			},
			{
				"index": 20,
				"type": "setTotalWin",
				"amount": 97500
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
							"name": "H3"
						},
						{
							"name": "H2"
						}
					]
				],
				"paddingPositions": [
					44,
					45,
					40
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
				"type": "winInfo",
				"totalWin": 32500,
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
							"winWithoutMult": 500,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					},
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
							"winWithoutMult": 500,
							"globalMult": 1,
							"lineMultiplier": 5
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
				"index": 24,
				"type": "setWin",
				"amount": 32500,
				"winLevel": 9
			},
			{
				"index": 25,
				"type": "setTotalWin",
				"amount": 130000
			},
			{
				"index": 26,
				"type": "updateFreeSpin",
				"amount": 5,
				"total": 8
			},
			{
				"index": 27,
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
							"multiplier": 5
						}
					],
					[
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
					46,
					46,
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
				"index": 28,
				"type": "winInfo",
				"totalWin": 14500,
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
					},
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
					},
					{
						"symbol": "L1",
						"kind": 3,
						"win": 2000,
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
							"winWithoutMult": 200,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					}
				]
			},
			{
				"index": 29,
				"type": "setWin",
				"amount": 14500,
				"winLevel": 9
			},
			{
				"index": 30,
				"type": "setTotalWin",
				"amount": 144500
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
					22,
					19,
					50
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
				"amount": 144500
			},
			{
				"index": 34,
				"type": "updateFreeSpin",
				"amount": 7,
				"total": 8
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
							"name": "H3"
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
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					3,
					0,
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
				"index": 36,
				"type": "winInfo",
				"totalWin": 155000,
				"wins": [
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
							"multiplier": 10,
							"winWithoutMult": 500,
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
				"index": 37,
				"type": "wincap",
				"amount": 250000
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
		"id": 16,
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
					18,
					15,
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
							"name": "H2"
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
							"name": "H3"
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
					64,
					60,
					61
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
							"name": "H2"
						},
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
							"multiplier": 3
						}
					]
				],
				"paddingPositions": [
					46,
					20,
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
				"index": 8,
				"type": "winInfo",
				"totalWin": 500,
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
					}
				]
			},
			{
				"index": 9,
				"type": "setWin",
				"amount": 500,
				"winLevel": 5
			},
			{
				"index": 10,
				"type": "setTotalWin",
				"amount": 500
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
							"name": "L2"
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
					3,
					42,
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
				"index": 13,
				"type": "setTotalWin",
				"amount": 500
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
							"name": "W",
							"wild": true,
							"multiplier": 5
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
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
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
					39,
					7,
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
				"index": 16,
				"type": "winInfo",
				"totalWin": 80500,
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
				"index": 17,
				"type": "setWin",
				"amount": 80500,
				"winLevel": 9
			},
			{
				"index": 18,
				"type": "setTotalWin",
				"amount": 81000
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
							"name": "H2"
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
							"name": "L1"
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
							"name": "H1"
						},
						{
							"name": "H2"
						}
					]
				],
				"paddingPositions": [
					42,
					17,
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
				"index": 21,
				"type": "winInfo",
				"totalWin": 157600,
				"wins": [
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
								"row": 1
							},
							{
								"reel": 2,
								"row": 1
							}
						],
						"meta": {
							"lineIndex": 1,
							"multiplier": 15,
							"winWithoutMult": 5000,
							"globalMult": 1,
							"lineMultiplier": 15
						}
					},
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
				"index": 22,
				"type": "setWin",
				"amount": 157600,
				"winLevel": 9
			},
			{
				"index": 23,
				"type": "setTotalWin",
				"amount": 238600
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
							"name": "H1"
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
							"name": "H3"
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
							"multiplier": 3
						}
					]
				],
				"paddingPositions": [
					1,
					13,
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
				"index": 26,
				"type": "winInfo",
				"totalWin": 15500,
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
							"winWithoutMult": 500,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					},
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
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					}
				]
			},
			{
				"index": 27,
				"type": "wincap",
				"amount": 250000
			},
			{
				"index": 28,
				"type": "setTotalWin",
				"amount": 250000
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
						}
					]
				],
				"paddingPositions": [
					10,
					47,
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
				"index": 31,
				"type": "setTotalWin",
				"amount": 250000
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
							"multiplier": 3
						}
					],
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
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						}
					]
				],
				"paddingPositions": [
					34,
					36,
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
				"type": "freeSpinEnd",
				"amount": 250000,
				"winLevel": 10
			},
			{
				"index": 37,
				"type": "finalWin",
				"amount": 250000
			}
		],
		"criteria": "wincap",
		"baseGameWins": 0.0,
		"freeGameWins": 2500
	},
	{
		"id": 17,
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
							"name": "H2"
						},
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
					5,
					14,
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
						"row": 2
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
							"name": "L3"
						},
						{
							"name": "L2"
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
							"name": "H2"
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
					]
				],
				"paddingPositions": [
					44,
					4,
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
				"type": "winInfo",
				"totalWin": 8600,
				"wins": [
					{
						"symbol": "H2",
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
							"multiplier": 8,
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					},
					{
						"symbol": "L2",
						"kind": 3,
						"win": 600,
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
							"multiplier": 6,
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 6
						}
					}
				]
			},
			{
				"index": 6,
				"type": "setWin",
				"amount": 8600,
				"winLevel": 8
			},
			{
				"index": 7,
				"type": "setTotalWin",
				"amount": 8600
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
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 5
						},
						{
							"name": "L1"
						}
					]
				],
				"paddingPositions": [
					15,
					33,
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
				"index": 10,
				"type": "winInfo",
				"totalWin": 81900,
				"wins": [
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
							"winWithoutMult": 500,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					},
					{
						"symbol": "L1",
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
							"multiplier": 10,
							"winWithoutMult": 200,
							"globalMult": 1,
							"lineMultiplier": 10
						}
					},
					{
						"symbol": "L3",
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
							"multiplier": 10,
							"winWithoutMult": 50,
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
						"symbol": "L3",
						"kind": 3,
						"win": 400,
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
							"winWithoutMult": 50,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					}
				]
			},
			{
				"index": 11,
				"type": "setWin",
				"amount": 81900,
				"winLevel": 9
			},
			{
				"index": 12,
				"type": "setTotalWin",
				"amount": 90500
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
					]
				],
				"paddingPositions": [
					36,
					26,
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
				"index": 15,
				"type": "winInfo",
				"totalWin": 245000,
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
							"winWithoutMult": 1000,
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
				"index": 16,
				"type": "wincap",
				"amount": 250000
			},
			{
				"index": 17,
				"type": "setTotalWin",
				"amount": 250000
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
							"name": "L3"
						},
						{
							"name": "L2"
						},
						{
							"name": "H2"
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
							"multiplier": 3
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
						},
						{
							"name": "L3"
						}
					]
				],
				"paddingPositions": [
					28,
					4,
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
				"index": 20,
				"type": "winInfo",
				"totalWin": 6000,
				"wins": [
					{
						"symbol": "H2",
						"kind": 3,
						"win": 5000,
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
							"winWithoutMult": 1000,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					},
					{
						"symbol": "L2",
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
				"type": "setTotalWin",
				"amount": 250000
			},
			{
				"index": 22,
				"type": "updateFreeSpin",
				"amount": 4,
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
							"name": "L2"
						},
						{
							"name": "L2"
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
							"name": "H1"
						}
					]
				],
				"paddingPositions": [
					26,
					37,
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
				"index": 24,
				"type": "winInfo",
				"totalWin": 115000,
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
							"winWithoutMult": 2000,
							"globalMult": 1,
							"lineMultiplier": 5
						}
					},
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
				"index": 25,
				"type": "setTotalWin",
				"amount": 250000
			},
			{
				"index": 26,
				"type": "updateFreeSpin",
				"amount": 5,
				"total": 8
			},
			{
				"index": 27,
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
							"multiplier": 3
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
							"multiplier": 3
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
							"multiplier": 5
						},
						{
							"name": "L1"
						},
						{
							"name": "H1"
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
					11,
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
				"index": 28,
				"type": "winInfo",
				"totalWin": 17600,
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
						"symbol": "L1",
						"kind": 3,
						"win": 1600,
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
							"winWithoutMult": 200,
							"globalMult": 1,
							"lineMultiplier": 8
						}
					}
				]
			},
			{
				"index": 29,
				"type": "setTotalWin",
				"amount": 250000
			},
			{
				"index": 30,
				"type": "updateFreeSpin",
				"amount": 6,
				"total": 8
			},
			{
				"index": 31,
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
					34,
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
				"index": 32,
				"type": "winInfo",
				"totalWin": 1900,
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
							"winWithoutMult": 100,
							"globalMult": 1,
							"lineMultiplier": 3
						}
					},
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
				"index": 33,
				"type": "setTotalWin",
				"amount": 250000
			},
			{
				"index": 34,
				"type": "updateFreeSpin",
				"amount": 7,
				"total": 8
			},
			{
				"index": 35,
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
							"multiplier": 5
						},
						{
							"name": "W",
							"wild": true,
							"multiplier": 3
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
							"multiplier": 5
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
					11,
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
				"index": 36,
				"type": "winInfo",
				"totalWin": 160400,
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
						"symbol": "L3",
						"kind": 3,
						"win": 400,
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
							"winWithoutMult": 50,
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
				"index": 37,
				"type": "setTotalWin",
				"amount": 250000
			},
			{
				"index": 38,
				"type": "freeSpinEnd",
				"amount": 250000,
				"winLevel": 10
			},
			{
				"index": 39,
				"type": "finalWin",
				"amount": 250000
			}
		],
		"criteria": "wincap",
		"baseGameWins": 0.0,
		"freeGameWins": 2500
	}
];
