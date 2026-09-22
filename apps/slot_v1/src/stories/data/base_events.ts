export default {
	reveal: {
		index: 0,
		type: 'reveal',
		board: [
			[
				{
					name: 'L2'
				},
				{
					name: 'L1'
				},
				{
					name: 'L4'
				},
				{
					name: 'H2'
				},
				{
					name: 'L1'
				}
			],
			[
				{
					name: 'H1'
				},
				{
					name: 'L5'
				},
				{
					name: 'L2'
				},
				{
					name: 'H3'
				},
				{
					name: 'L4'
				}
			],
			[
				{
					name: 'L3'
				},
				{
					name: 'L5'
				},
				{
					name: 'L3'
				},
				{
					name: 'H4'
				},
				{
					name: 'L4'
				}
			],
			[
				{
					name: 'H4'
				},
				{
					name: 'H3'
				},
				{
					name: 'L4'
				},
				{
					name: 'L5'
				},
				{
					name: 'L1'
				}
			],
			[
				{
					name: 'H3'
				},
				{
					name: 'L3'
				},
				{
					name: 'L3'
				},
				{
					name: 'H1'
				},
				{
					name: 'H1'
				}
			]
		],
		paddingPositions: [216, 205, 195, 16, 65],
		gameType: 'basegame',
		anticipation: [0, 0, 0, 0, 0]
	},
	setTotalWin: {
		index: 1,
		type: 'setTotalWin',
		amount: 0
	},
	finalWin: {
		index: 2,
		type: 'finalWin',
		amount: 0
	},
	winInfo: {
		index: 1,
		type: 'winInfo',
		totalWin: 150,
		wins: [
			{
				symbol: 'H2',
				kind: 3,
				win: 150,
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
						row: 1
					}
				],
				meta: {
					lineIndex: 14,
					multiplier: 1,
					winWithoutMult: 150,
					globalMult: 1,
					lineMultiplier: 1
				}
			}
		]
	},
	setWin: {
		index: 2,
		type: 'setWin',
		amount: 150,
		winLevel: 3
	},
	freeSpinTrigger: {
		index: 2,
		type: 'freeSpinTrigger',
		totalFs: 10,
		positions: [
			{
				reel: 0,
				row: 2
			},
			{
				reel: 2,
				row: 3
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
		total: 10
	},
	freeSpinEnd: {
		index: 41,
		type: 'freeSpinEnd',
		amount: 1140,
		winLevel: 4
	},
	wincap: {
		index: 9,
		type: 'wincap',
		amount: 500000
	},
	freeSpinRetrigger: {
		index: 40,
		type: 'freeSpinRetrigger',
		totalFs: 17,
		positions: [
			{
				reel: 2,
				row: 3
			},
			{
				reel: 3,
				row: 1
			},
			{
				reel: 4,
				row: 1
			}
		]
	}
};
