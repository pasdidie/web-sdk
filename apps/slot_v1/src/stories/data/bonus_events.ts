export default {
	reveal: {
		index: 0,
		type: 'reveal',
		board: [
			[
				{
					name: 'H2'
				},
				{
					name: 'S',
					scatter: true
				},
				{
					name: 'L4'
				},
				{
					name: 'L2'
				},
				{
					name: 'H4'
				}
			],
			[
				{
					name: 'L3'
				},
				{
					name: 'L3'
				},
				{
					name: 'H4'
				},
				{
					name: 'H4'
				},
				{
					name: 'H3'
				}
			],
			[
				{
					name: 'L4'
				},
				{
					name: 'H2'
				},
				{
					name: 'S',
					scatter: true
				},
				{
					name: 'L4'
				},
				{
					name: 'L5'
				}
			],
			[
				{
					name: 'L4'
				},
				{
					name: 'H2'
				},
				{
					name: 'S',
					scatter: true
				},
				{
					name: 'L2'
				},
				{
					name: 'L3'
				}
			],
			[
				{
					name: 'H1'
				},
				{
					name: 'L4'
				},
				{
					name: 'H2'
				},
				{
					name: 'S',
					scatter: true
				},
				{
					name: 'L1'
				}
			]
		],
		paddingPositions: [167, 44, 213, 8, 212],
		gameType: 'basegame',
		anticipation: [0, 0, 0, 1, 2]
	},
	setTotalWin: {
		index: 1,
		type: 'setTotalWin',
		amount: 0
	},
	freeSpinTrigger: {
		index: 2,
		type: 'freeSpinTrigger',
		totalFs: 12,
		positions: [
			{
				reel: 0,
				row: 1
			},
			{
				reel: 2,
				row: 2
			},
			{
				reel: 3,
				row: 2
			},
			{
				reel: 4,
				row: 3
			}
		]
	},
	updateFreeSpin: {
		index: 3,
		type: 'updateFreeSpin',
		amount: 0,
		total: 12
	},
	winInfo: {
		index: 8,
		type: 'winInfo',
		totalWin: 750,
		wins: [
			{
				symbol: 'L5',
				kind: 4,
				win: 150,
				positions: [
					{
						reel: 0,
						row: 1
					},
					{
						reel: 1,
						row: 2
					},
					{
						reel: 2,
						row: 3
					},
					{
						reel: 3,
						row: 2
					}
				],
				meta: {
					lineIndex: 4,
					multiplier: 5,
					winWithoutMult: 30,
					globalMult: 1,
					lineMultiplier: 5
				}
			},
			{
				symbol: 'L5',
				kind: 4,
				win: 300,
				positions: [
					{
						reel: 0,
						row: 3
					},
					{
						reel: 1,
						row: 2
					},
					{
						reel: 2,
						row: 3
					},
					{
						reel: 3,
						row: 2
					}
				],
				meta: {
					lineIndex: 13,
					multiplier: 10,
					winWithoutMult: 30,
					globalMult: 1,
					lineMultiplier: 10
				}
			},
			{
				symbol: 'L5',
				kind: 4,
				win: 300,
				positions: [
					{
						reel: 0,
						row: 2
					},
					{
						reel: 1,
						row: 2
					},
					{
						reel: 2,
						row: 3
					},
					{
						reel: 3,
						row: 2
					}
				],
				meta: {
					lineIndex: 15,
					multiplier: 10,
					winWithoutMult: 30,
					globalMult: 1,
					lineMultiplier: 10
				}
			}
		]
	},
	setWin: {
		index: 9,
		type: 'setWin',
		amount: 750,
		winLevel: 5
	},
	wincap: {
		index: 45,
		type: 'wincap',
		amount: 500000
	},
	freeSpinEnd: {
		index: 53,
		type: 'freeSpinEnd',
		amount: 500000,
		winLevel: 10
	},
	finalWin: {
		index: 54,
		type: 'finalWin',
		amount: 500000
	},
	freeSpinRetrigger: {
		index: 43,
		type: 'freeSpinRetrigger',
		totalFs: 15,
		positions: [
			{
				reel: 1,
				row: 1
			},
			{
				reel: 2,
				row: 2
			},
			{
				reel: 3,
				row: 3
			}
		]
	}
};
