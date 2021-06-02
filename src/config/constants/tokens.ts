const tokens = {
  bnb: {
    symbol: 'BNB',
    projectLink: 'https://www.binance.com/',
  },
  cake: {
    symbol: 'ONEK',
    address: {
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
      1337: '0x646A336CD183dc947D3AdbEfb19c3cF637720318',
      97: '0xa35062141Fa33BCA92Ce69FeD37D0E8908868AAe',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  busd: {
    symbol: 'BUSD',
    address: {
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      1337: '0x21a59654176f2689d12E828B77a783072CD26680',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.paxos.com/busd/',
  },
  syrup: {
    symbol: 'SYRUP',
    address: {
      56: '0x009cF7bC57584b7998236eff51b98A168DceA9B0',
      1337: '0x0aEE5241c9BA3d193A70e6D11Dd5d91A00ECDfeC',
      97: '0xfE1e507CeB712BDe086f3579d2c03248b2dB77f9',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  bunny: {
    symbol: 'BUNNY',
    address: {
      56: '0xc9849e6fdb743d08faee3e34dd2d1bc69ea11a51',
      1337: '0xCfEB869F69431e42cdB54A4F4f105C19C080A601',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://pancakebunny.finance/',
  },
  dfd: {
    symbol: 'DFD',
    address: {
      56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      1337: '0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://dusd.finance/',
  },
  alpaca: {
    symbol: 'ALPACA',
    address: {
      56: '0x8f0528ce5ef7b51152a59745befdd91d97091d2f',
      1337: '0xC89Ce4735882C9F0f0FE26686c53074E09B0D550',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.alpacafinance.org/',
  },
  xed: {
    symbol: 'XED',
    address: {
      56: '0x5621b5a3f4a8008c4ccdd1b942b121c8b1944f1f',
      1337: '0xD833215cBcc3f914bD1C9ece3EE7BF8B14f841bb',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://www.exeedme.com/',
  },
  lto: {
    symbol: 'LTO',
    address: {
      56: '0x857b222fc79e1cbbf8ca5f78cb133d1b7cf34bbd',
      1337: '0x9561C133DD8580860B6b7E504bC5Aa500f0f06a7',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://ltonetwork.com/',
  },
  wbnb: {
    symbol: 'WBNB',
    address: {
      56: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      1337: '0x5f8e26fAcC23FA4cbd87b8d9Dbbd33D5047abDE1',
      97: '0xae13d989dac2f0debff460ac112a837c89baa7cd',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  tkn6: {
    symbol: 'TKN6',
    address: {
      56: '',
      1337: '0xe982E462b094850F12AF94d21D470e21bE9D0E9C',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  tkn7: {
    symbol: 'TKN7',
    address: {
      56: '',
      1337: '0x59d3631c86BbE35EF041872d502F218A39FBa150',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  tkn8: {
    symbol: 'TKN8',
    address: {
      56: '',
      1337: '0x0290FB167208Af455bB137780163b7B7a9a10C16',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  tkn9: {
    symbol: 'TKN9',
    address: {
      56: '',
      1337: '0x9b1f7F645351AF3631a656421eD2e40f2802E6c0',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  tkn10: {
    symbol: 'TKN10',
    address: {
      56: '',
      1337: '0x67B5656d60a809915323Bf2C40A8bEF15A152e3e',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  tkn11: {
    symbol: 'TKN11',
    address: {
      56: '',
      1337: '0x2612Af3A521c2df9EAF28422Ca335b04AdF3ac66',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  tkn12: {
    symbol: 'TKN12',
    address: {
      56: '',
      1337: '0xA57B8a5584442B467b4689F1144D269d096A3daF',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  tkn13: {
    symbol: 'TKN13',
    address: {
      56: '',
      1337: '0x26b4AFb60d6C903165150C6F0AA14F8016bE4aec',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  tkn14: {
    symbol: 'TKN14',
    address: {
      56: '',
      1337: '0x630589690929E9cdEFDeF0734717a9eF3Ec7Fcfe',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  tkn15: {
    symbol: 'TKN15',
    address: {
      56: '',
      1337: '0x0E696947A06550DEf604e82C26fd9E493e576337',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  tkn16: {
    symbol: 'TKN16',
    address: {
      56: '',
      1337: '0xDb56f2e9369E0D7bD191099125a3f6C370F8ed15',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  tkn17: {
    symbol: 'TKN17',
    address: {
      56: '',
      1337: '0xA94B7f0465E98609391C623d0560C5720a3f2D33',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  tkn18: {
    symbol: 'TKN18',
    address: {
      56: '',
      1337: '0x6eD79Aa1c71FD7BdBC515EfdA3Bd4e26394435cC',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  tkn19: {
    symbol: 'TKN19',
    address: {
      56: '',
      1337: '0xb09bCc172050fBd4562da8b229Cf3E45Dc3045A6',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  },
  tkn20: {
    symbol: 'TKN20',
    address: {
      56: '',
      1337: '0xFC628dd79137395F3C9744e33b1c5DE554D94882',
      97: '',
    },
    decimals: 18,
    projectLink: 'https://pancakeswap.finance/',
  }
}

export default tokens
