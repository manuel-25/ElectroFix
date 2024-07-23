export const products = [
    { id: 15, name: 'Air Fryer' },
    { id: 1, name: 'Smartphone' },
    { id: 3, name: 'Televisor' },
    { id: 2, name: 'Consola' },
    { id: 11, name: 'Notebook' },
    { id: 15, name: 'Microondas' },
    { id: 4, name: 'Horno Eléctrico' },
    { id: 5, name: 'Cafetera' },
    { id: 6, name: 'Pava Eléctrica' },
    { id: 7, name: 'Tostadora' },
    { id: 8, name: 'Plancha' },
    { id: 9, name: 'Secadora de Pelo' },
    { id: 10, name: 'Planchita de Pelo' },
    { id: 12, name: 'Cava de Vino' },
    { id: 13, name: 'Ventilador' },
    { id: 14, name: 'Estufa' },
]

export const brandsByCategory = {
    1: ['Apple', 'Samsung', 'Xiaomi', 'Motorola', 'LG', 'Huawei', 'Nokia', 'Alcatel', 'Otros'],
    2: ['Sony', 'Xbox', 'Nintendo', 'Otros'],
    3: ['Samsung', 'Apple', 'LG', 'BGH', 'Sony', 'Philco', 'Noblex', 'Hisense', 'Otros'],
    4: ['Ultracomb', 'Peabody', 'BGH', 'Atma', 'Philco', 'Liliana', 'Midea', 'Yelmo', 'Otros'],
    5: ['Peabody', 'Atma', 'Electrolux', 'Oster', 'Molinex', 'Yelmo', 'Smart Life', 'Nespresso', 'Otros'],
    6: ['Yelmo', 'Peabody', 'Ultra Comb', 'Liliana', 'Atma', 'Philco', 'Winco', 'Molinex', 'Otros'],
    7: ['Atma', 'Molinex', 'Peabody', 'Black and Decker', 'Electro Lux', 'Phillips', 'Daewo', 'Yelmo', 'Otros'],
    8: ['Phillips', 'Atma', 'Ultra Comb', 'Winco', 'Liliana', 'Philco', 'Peabody', 'Tophouse', 'Otros'],
    9: ['Philips', 'GA.MA', 'Rowenta', 'Babyliss', 'Revlon', 'CHI', 'Conair', 'Bellissima', 'Otros'],
    10: ['Surrey', 'Longvie', 'Volcán', 'Orbis', 'Philco', 'Whirlpool', 'Bosch', 'Electrolux', 'Otros'],
    11: ['Samsung', 'Dell', 'HP', 'Lenovo', 'Acer', 'Asus', 'Apple', 'Bangho', 'Otros'],
    12: ['Philco', 'Whirlpool', 'Vondom', 'Tophouse', 'Winco', 'Wine Collection', 'Candy', 'Otros'],
    13: ['Liliana', 'Electro Lux', 'Axel', 'Magiclick', 'Atma', 'Philco', 'Peabody', 'Otros'],
    14: ['Longvie', 'Volcán', 'Orbis', 'Philco', 'Whirlpool', 'Surrey', 'Bosch', 'Electrolux', 'Otros'],
    15: ['Philips', 'GaMa', 'Remington', 'Babyliss', 'Rowenta', 'Arno', 'Braun', 'Taiff', 'Otros']
}

export const detailedBrandsByCategory = {
    0: {
        name: 'Air Fryer',
        brands: {
            'Nef': ['Nef AirFry 123', 'Nef TurboCook'],
            'Philips': ['HD9220/20', 'HD9650/99', 'HD9741/99', 'HD9230/26'],
            'Peabody': ['PE-AF605', 'PE-AF545', 'PE-AF605R'],
            'Suono': ['AF-900', 'AF-850'],
            'Zego': ['ZG-AF700', 'ZG-AF750'],
            'Winco': ['AF-530', 'AF-610'],
            'Yelmo': ['AF-1000', 'AF-950'],
            'Oryx': ['AF-701', 'F-801'],
            'Moulinex': ['EZ4018', 'AF1018'],
            'Atma': ['AF8030E', 'AF8050E'],
            'Ultracomb': ['AF2207', 'AF2209']
        }
    },
    1: {
        name: 'Smartphone',
        brands: {
            'Apple': [
                'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max',
                'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max',
                'iPhone 13', 'iPhone 13 Mini', 'iPhone 13 Pro', 'iPhone 13 Pro Max',
                'iPhone 12', 'iPhone 12 Mini', 'iPhone 12 Pro', 'iPhone 12 Pro Max',
                'iPhone SE (2022)', 'iPhone SE (2020)',
                'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max',
                'iPhone XR', 'iPhone XS', 'iPhone XS Max',
                'iPhone X',
                'iPhone 8', 'iPhone 8 Plus',
                'iPhone 7', 'iPhone 7 Plus'
            ],
            'Samsung': [
                'Galaxy S22', 'Galaxy S22+', 'Galaxy S22 Ultra',
                'Galaxy S21', 'Galaxy S21+', 'Galaxy S21 Ultra', 'Galaxy S21 FE',
                'Galaxy S20', 'Galaxy S20+', 'Galaxy S20 Ultra', 'Galaxy S20 FE',
                'Galaxy S10', 'Galaxy S10+', 'Galaxy S10e', 'Galaxy S10 Lite',
                'Galaxy Note 20', 'Galaxy Note 20 Ultra',
                'Galaxy Note 10', 'Galaxy Note 10+', 'Galaxy Note 10 Lite',
                'Galaxy Note 9',
                'Galaxy Note 8',
                'Galaxy A52', 'Galaxy A52s', 'Galaxy A72', 'Galaxy A32', 'Galaxy A12', 'Galaxy A02s',
                'Galaxy A51', 'Galaxy A71', 'Galaxy A31', 'Galaxy A21s', 'Galaxy A11', 'Galaxy A01',
                'Galaxy A50', 'Galaxy A70', 'Galaxy A30', 'Galaxy A20', 'Galaxy A10',
                'Galaxy Z Fold 3', 'Galaxy Z Flip 3', 'Galaxy Z Fold 2', 'Galaxy Z Flip 2',
                'Galaxy Z Fold', 'Galaxy Z Flip'
            ],
            'Xiaomi': ['Mi 11', 'Redmi Note 10', 'Poco X3', 'Mi 10T', 'Mi 9', 'Redmi Note 9', 'Mi Note 10', 'Redmi Note 8', 'Mi Mix 3', 'Mi 8'],
            'Motorola': ['Moto G100', 'Moto Edge 20', 'Moto G Power', 'Moto G Stylus', 'Moto G Fast', 'Moto E'],
            'LG': ['Velvet', 'Wing', 'V60 ThinQ', 'G8 ThinQ', 'G7 ThinQ'],
            'Huawei': ['P50 Pro', 'Mate 40 Pro', 'P30 Pro', 'Mate 20 Pro', 'P20 Pro'],
            'Nokia': ['8.3 5G', '5.4', '3.4', '2.4', '7.2', '6.2'],
            'Alcatel': ['1S', '3X', '1SE', '5X', '3V', '1V'],
            'Otros': []
        }
    },
    2: {
        name: 'Televisor',
        brands: {
            'Samsung': ['QN90A', 'AU8000', 'The Frame', 'TU7000', 'Q60T', 'RU7100', 'Q90R', 'Q80R', 'Q70R'],
            'LG': ['OLED55C1', 'NANO75UP', 'UN7300', 'GX', 'OLED65CX', 'OLED48CXPUB', 'OLED55BX', 'OLED65B9PUA', 'OLED55B9PUA'],
            'Sony': ['X90J', 'A80J', 'X85J', 'X800H', 'X900H', 'X950G', 'X850G', 'A9G', 'X950H'],
            'Philips': ['OLED 806', 'PUS7506', 'PUS7906', 'The One', 'PUS8506', 'OLED 855', 'PUS9435', 'PUS9435'],
            'Panasonic': ['JZ2000', 'HZ1000', 'GX800', 'GX700', 'HX800', 'HX600', 'FX800', 'FX700'],
            'TCL': ['6-Series', '5-Series', '4-Series', '3-Series', 'S535', 'R635', 'S405', 'R617'],
            'Hisense': ['U8G', 'H9G', 'A6G', 'U7G', 'H8G', 'R8F', 'H9F', 'H8C'],
            'Vizio': ['P-Series', 'M-Series', 'V-Series', 'D-Series', 'E-Series', 'P65Q9-H1', 'M65Q7-H1', 'V505-H9'],
            'ADMIRAL': [],
            'JVC': ['LT-55MAW705', 'LT-43MAW595', 'LT-32MAW384'],
            'THC': [],
            'TOP HOUSE': [],
            'QUINT': [],
            'ENOVA': [],
            'KANJI': [],
            'CANDY': [],
            'KODAK': ['55UHDX7XPRO', '43FHDX7XPRO', '32HDX7XPRO'],
            'TELEFUNKEN': [],
            'RCA': ['RTRU5527', 'RLDED5098-UHD', 'RLDED3258A'],
            'Ken Brown': [],
            'Otros': [],
        }
    },
    3: {
        name: 'Consola',
        brands: {
            'Sony': ['PlayStation 5', 'PlayStation 4 Pro', 'PlayStation 4 Slim', 'PlayStation 3', 'PlayStation 2', 'PS Vita'],
            'Microsoft': ['Xbox Series X', 'Xbox Series S', 'Xbox One X', 'Xbox One S', 'Xbox 360', 'Original Xbox'],
            'Nintendo': ['Switch', 'Switch Lite', 'Switch OLED', '3DS XL', '2DS', 'Wii U'],
            'Otros': []
        }
    },
    4: {
        name: 'Notebook',
        brands: {
            'Apple': ['MacBook Air M1', 'MacBook Pro 14', 'MacBook Pro 16', 'MacBook Air 13', 'MacBook Pro 13', 'MacBook 12'],
            'Dell': ['XPS 15', 'XPS 13', 'Inspiron 15', 'Inspiron 14', 'Alienware m15', 'G5 15'],
            'HP': ['Spectre x360', 'Envy 15', 'Pavilion 14', 'OMEN 15', 'Stream 14', 'Elite Dragonfly'],
            'Lenovo': ['ThinkPad X1 Carbon', 'Yoga 9i', 'IdeaPad 5', 'Legion 5', 'ThinkBook 14', 'Flex 5'],
            'Acer': ['Swift 5', 'Aspire 5', 'Predator Helios 300', 'Spin 3', 'Chromebook 314', 'Nitro 5'],
            'Asus': ['ZenBook 14', 'ROG Zephyrus G14', 'VivoBook 15', 'TUF Gaming A15', 'Chromebook Flip C434', 'ExpertBook B9'],
            'MSI': ['GS66 Stealth', 'GE76 Raider', 'Prestige 14', 'Modern 15', 'Creator 15', 'GF63 Thin'],
            'Razer': ['Blade 15', 'Blade Stealth 13', 'Blade Pro 17', 'Blade 14', 'Razer Book 13', 'Razer Blade Stealth'],
            'Otros': []
        }
    },
    5: {
        name: 'Microondas',
        brands: {
            'LG': ['NeoChef', 'MH6535GDIS', 'MS2595DIS', 'MH6044V', 'LCRT2010ST', 'LMC0975ST', 'LCSP1110ST', 'LCS1112ST'],
            'Samsung': ['ME21M706BAS', 'MG11H2020CT', 'MS14K6000AS', 'MC11K7035CG', 'ME16K3000AS', 'ME18H704SFS', 'MS19M8000AS', 'ME21H706MQG'],
            'Panasonic': ['NN-SN686S', 'NN-SN936B', 'NN-SN966S', 'NN-SD372S', 'NN-SU696S', 'NN-SD681S', 'NN-ST975S', 'NN-SN966SR'],
            'Sharp': ['ZSMC1449FS', 'R-21LCFS', 'SMC1442CS', 'SMC1585BS', 'R1874T', 'R1874TY', 'R651ZS', 'R459YK'],
            'Toshiba': ['EM131A5C-BS', 'EM925A5A-BS', 'EC042A5C-SS', 'ML-EM45PIT', 'EM131A5C-SS', 'EM131A5C-SS', 'EM925A5A-SS', 'EM925A5A-CHS'],
            'Whirlpool': ['WMH31017HS', 'WMC30516HZ', 'WMC20005YB', 'WML55011HS', 'WMC30516HZ', 'WML55011HS', 'WMC20005YW', 'WMC30516HW'],
            'BGH QuickChef': ['BQG34M20B', 'BQG30M10B'],
            'Atma': ['MD1825N', 'MD2011B', 'MD1710B'],
            'Philco': ['PMO20D', 'PMO25D', 'PMO32D'],
            'Daewoo': ['KOR-7LREM', 'KOR-7LREW', 'KOR-6L7B'],
            'RCA': ['RMW733', 'RMW953', 'RMW1182'],
            'Ariston': ['MFO 25 E IX A', 'MHE 30 X'],
            'Hitplus': [],
            'Top House': [],
            'Eslabón de Lujo': [],
            'Likon': [],
            'Westinghouse': [],
            'Otros': []
        }
    },
    6: {
        name: 'Horno Eléctrico',
        brands: {
            'Oster': ['TSSTTVMNDG', 'TSSTTVFDDG', 'TSSTTVFDXL', 'TSSTTVDGXL', 'TSSTTV0000', 'TSSTTVSK01', 'TSSTTVXLDG', 'TSSTTVDFL1'],
            'Black & Decker': ['TO3290XSD', 'TO3250XSB', 'TO3240XSBD', 'TO3230SBD', 'TO3290XSD', 'TO3250XSB', 'TO3240XSBD', 'TO3230SBD'],
            'Breville': ['BOV800XL', 'BOV845BSS', 'BOV900BSS', 'BOV650XL', 'BOV450XL', 'BOV650XL', 'BOV800XL', 'BOV845BSS'],
            'Cuisinart': ['TOA-60', 'TOB-260N1', 'TOB-1010', 'TOA-65', 'TOB-200', 'TOA-60', 'TOB-260N1', 'TOB-1010'],
            'Hamilton Beach': ['31126', '31123D', '31104D', '31103DA', '31126', '31123D', '31104D', '31103DA'],
            'Panasonic': ['NB-G110P', 'FlashXpress', 'NB-G110P', 'FlashXpress', 'NB-G110P', 'FlashXpress', 'NB-G110P', 'FlashXpress'],
            'Atma': [],
            'Enova': [],
            'Kanji Home': [],
            'BGH': [],
            'Ultracomb': [],
            'Yelmo': [],
            'Philco': [],
            'Bonn': [],
            'Ken Brown': [],
            'Otros': []
        }
    },
    7: {
        name: 'Cafetera',
        brands: {
            'Nespresso': ['Essenza Mini', 'Pixie', 'Citiz', 'Lattissima Pro', 'VertuoPlus', 'Inissia', 'Creatista', 'Maestria'],
            'Keurig': ['K-Elite', 'K-Classic', 'K-Mini', 'K-Supreme Plus', 'K-Slim', 'K-Duo', 'K-Cafe', 'K-Compact'],
            'Breville': ['BES870XL', 'BES920XL', 'BES840XL', 'BES500BSS', 'BES878BSS', 'BES980BSS', 'BES990BSS', 'BES878BSS'],
            'DeLonghi': ['Dinamica', 'Magnifica', 'Eletta', 'La Specialista', 'ECAM22110SB', 'EC155', 'EC702', 'EC9335M'],
            'Mr. Coffee': ['Easy Measure', 'Cafe Barista', 'BVMC-PSTX95', 'BVMC-SJX33GT', 'BVMC-ECMP1000', 'BVMC-ECMP1102', 'BVMC-ECMPT1000', 'BVMC-ECMPT1002'],
            'Hamilton Beach': ['FlexBrew', '49980A', '49976', '49979', '49976', '49980Z', '49983', '49995R'],
            'Otros': []
        }
    },
    8: {
        name: 'Pava Eléctrica',
        brands: {
            'Breville': ['BKE820XL', 'BKE830XL', 'BKE700BSS', 'BKE720BSS', 'BKE720BSS', 'BKE820XL', 'BKE830XL', 'BKE700BSS'],
            'Cuisinart': ['CPK-17', 'JK-17P1', 'PTK-330CR', 'DK-17', 'DK-17P1', 'DK-17P1', 'CPK-17', 'JK-17P1'],
            'Hamilton Beach': ['40880', '40885', '41020R', '40919', '40894', '40898', '40919', '40894'],
            'KitchenAid': ['KEK1222PT', 'KEK1322SS', 'KEK1565OB', 'KEK1522CA', 'KEK1522CA', 'KEK1222PT', 'KEK1322SS', 'KEK1565OB'],
            'Mueller': ['Austria Ultra', 'Premium 1500W', 'Ultra Kettle', 'Ultra Kettle', 'Austria Ultra', 'Premium 1500W', 'Ultra Kettle', 'Ultra Kettle'],
            'Ovente': ['KG83B', 'KS88S', 'KP72W', 'KS96S', 'KS96S', 'KG83B', 'KS88S', 'KP72W'],
            'Otros': []
        }
    },
    9: {
        name: 'Tostadora',
        brands: {
            'Breville': ['BTA720XL', 'BTA840XL', 'BTA830XL', 'BTA720XL', 'BTA840XL', 'BTA830XL', 'BTA720XL', 'BTA840XL'],
            'Cuisinart': ['CPT-180P1', 'CPT-160P1', 'CPT-320P1', 'CPT-180P1', 'CPT-160P1', 'CPT-320P1', 'CPT-180P1', 'CPT-160P1'],
            'Hamilton Beach': ['22811', '22633', '22791', '22623', '22623', '22633', '22811', '22791'],
            'KitchenAid': ['KMT2115CU', 'KMT4116CU', 'KMT4229CU', 'KMT2115CU', 'KMT4116CU', 'KMT4229CU', 'KMT2115CU', 'KMT4116CU'],
            'Oster': ['TSSTTRJBG1', 'TSSTTRJBG1-NP', 'TSSTTRWF4S-SHP', 'TSSTTRJBG1', 'TSSTTRJBG1-NP', 'TSSTTRWF4S-SHP', 'TSSTTRJBG1', 'TSSTTRJBG1-NP'],
            'Philips': ['HD2637/90', 'HD2581/90', 'HD2598/00', 'HD2637/90', 'HD2581/90', 'HD2598/00', 'HD2637/90', 'HD2581/90'],
            'Otros': []
        }
    },
    10: {
        name: 'Plancha',
        brands: {
            'Rowenta': ['DW9280', 'DW8080', 'DW5197', 'DW2070', 'DW1150', 'DW6080', 'DW2090', 'DW7180'],
            'Black & Decker': ['D2030', 'IR16X', 'F67E', 'F210', 'ICR05X', 'Irons', 'F67E', 'D1500'],
            'Philips': ['GC5039/30', 'GC9630/20', 'GC4526/87', 'GC2145/29', 'GC1433/30', 'GC4567/79', 'GC5039/30', 'GC9630/20'],
            'Hamilton Beach': ['14210', '19801', '14525', '14210', '14525', '14210', '19801', '14525'],
            'Panasonic': ['NI-L70SRW', 'NI-WL600', 'NI-E660SRW', 'NI-L70SRW', 'NI-WL600', 'NI-E660SRW', 'NI-L70SRW', 'NI-WL600'],
            'Sunbeam': ['GCSBNC-101', 'GCSBCL-317-000', 'SteamMaster', 'GCSBNC-101', 'GCSBCL-317-000', 'SteamMaster', 'GCSBNC-101', 'GCSBCL-317-000'],
            'Otros': []
        }
    },
    11: {
        name: 'Secadora de Pelo',
        brands: {
            'Dyson': ['Supersonic', 'Supersonic', 'Supersonic', 'Supersonic', 'Supersonic', 'Supersonic'],
            'Revlon': ['1875W Infrared', 'One-Step Volumizer', '1875W Volume Booster', '1875W Infrared', 'One-Step Volumizer', '1875W Volume Booster'],
            'Conair': ['InfinitiPro', '1875W Ionic Ceramic', '1875 Watt Turbo', 'InfinitiPro', '1875W Ionic Ceramic', '1875 Watt Turbo'],
            'BaBylissPRO': ['Nano Titanium', 'Ceramix Xtreme', 'Rapido', 'Nano Titanium', 'Ceramix Xtreme', 'Rapido'],
            'T3': ['Cura', 'Featherweight 2', 'Fit', 'Cura', 'Featherweight 2', 'Fit'],
            'Remington': ['D3190 Damage Protection', 'AC2015', 'Pro Hair Dryer with Pearl Ceramic', 'D3190 Damage Protection', 'AC2015', 'Pro Hair Dryer with Pearl Ceramic'],
            'Otros': []
        }
    },
    12: {
        name: 'Planchita de Pelo',
        brands: {
            'GHD': ['Platinum+ Professional', 'Gold Professional', 'Platinum+ Professional', 'Gold Professional', 'Platinum+ Professional', 'Gold Professional'],
            'BaBylissPRO': ['Nano Titanium', 'Porcelain Ceramic', 'Nano Titanium', 'Porcelain Ceramic', 'Nano Titanium', 'Porcelain Ceramic'],
            'Chi': ['Original 1"', 'G2', 'Air Spin N Curl', 'Original 1"', 'G2', 'Air Spin N Curl'],
            'Dyson': ['Corrale', 'Corrale', 'Corrale', 'Corrale', 'Corrale', 'Corrale'],
            'Remington': ['S5500', 'S9520', 'S8598', 'S5500', 'S9520', 'S8598'],
            'T3': ['SinglePass X', 'SinglePass Compact', 'SinglePass X', 'SinglePass Compact', 'SinglePass X', 'SinglePass Compact'],
            'Otros': []
        }
    },
    13: {
        name: 'Cava de Vino',
        brands: {
            'Whynter': ['BWR-401DS', 'BWR-1002SD', 'BWR-401DS', 'BWR-1002SD', 'BWR-401DS', 'BWR-1002SD'],
            'NutriChef': ['PKCWC120', 'PKCWC120', 'PKCWC120', 'PKCWC120', 'PKCWC120', 'PKCWC120'],
            'NewAir': ['AW-121E', 'AW-320ED', 'AW-121E', 'AW-320ED', 'AW-121E', 'AW-320ED'],
            'Ivation': ['IV-FWCT181B', 'IV-FWCT181B', 'IV-FWCT181B', 'IV-FWCT181B', 'IV-FWCT181B', 'IV-FWCT181B'],
            'Kalamera': ['KR-12A2E', 'KR-28ASS', 'KR-12A2E', 'KR-28ASS', 'KR-12A2E', 'KR-28ASS'],
            'Phiestina': ['PH-CWR100', 'PH-29BD', 'PH-CWR100', 'PH-29BD', 'PH-CWR100', 'PH-29BD'],
            'Otros': []
        }
    },
    14: {
        name: 'Ventilador',
        brands: {
            'Dyson': ['Cool AM07', 'Pure Hot + Cool', 'AM09 Hot + Cool'],
            'Honeywell': ['HT-900', 'TurboForce'],
            'Lasko': ['2551 Wind Curve', '1843 18"', '754200', '751320'],
            'Vornado': ['660', '630', 'AVH10', 'VH10'],
            'Rowenta': ['VU5670', 'VU2531', 'DW9280', 'DW8080', 'DW5197', 'DW2070'],
            'Holmes': ['HAPF623R', 'Blizzard'],
            'Sunbeam': ['GCSBNC-101', 'GCSBCL-317-000', 'SteamMaster'],
            'Otros': []
        }
    },
    15: {
        name: 'Estufa',
        brands: {
            'Dyson': ['AM09 Hot + Cool', 'AM09 Hot + Cool'],
            'Lasko': ['754200', '751320'],
            'DeLonghi': ['EW7707CM', 'TRD40615E'],
            'Honeywell': ['HCE200W', 'HCE100B'],
            'Vornado': ['AVH10', 'VH10'],
            'Duraflame': ['3D Infrared Electric Fireplace', 'Portable Electric'],
            'Otros': []
        }
    }
}

export const categories = [
    'Smartphone', 'Consola', 'Televisor', 'Horno Eléctrico', 'Cafetera',
    'Pava Eléctrica', 'Tostadora', 'Plancha', 'Secadora de Pelo', 'Planchita de Pelo',
    'Notebook', 'Cava de Vino', 'Ventilador', 'Estufa', 'Microondas'
]

export const faultsByCategory = {
    1: ['No enciende', 'No inicia sistema', 'Pantalla rota / dañada', 'Falla pantalla táctil', 'Pantalla en negro / con líneas', 'No carga', 'Falla el audio', 'Problemas de batería', 'Problemas de software', 'Tapa trasera dañada', 'Otra'],
    2: ['No enciende', 'Errores de sistema', 'No lee discos', 'Problemas con los joystick', 'Pantalla en negro', 'Sobrecalentamiento', 'Se congela', 'Falla de almacenamiento', 'Mantenimiento / Limpieza', 'Otra'],
    3: ['No enciende', 'No hay imagen', 'Sin sonido', 'Imagen distorsionada', 'Problemas con el control remoto', 'Problemas con las conexiones HDMI/AV', 'Otra'],
    4: ['No enciende', 'Enciende no calienta', 'Ruidos fuertes', 'Salen chispas', 'Problemas con el temporizador', 'Se apaga solo', 'Otra'],
    5: ['No enciende', 'Enciende no calienta', 'Pierde agua' ,'No muele café', 'Olor a quemado', 'Salen chispas', 'Humo', 'Problemas con la bomba de agua', 'Mantenimiento / Limpieza', 'Otra'],
    6: ['No enciende', 'Enciende no calienta', 'Olor a quemado', 'Salen chispas', 'Ruidos fuertes', 'Problemas con el termostato', 'Otra'],
    7: ['No enciende', 'Enciende no calienta', 'Olor a quemado', 'Salen chispas', 'Humo', 'Problemas con el temporizador', 'Otra'],
    8: ['No enciende', 'No calienta', 'Olor a quemado', 'Salen chispas', 'Ruidos fuertes', 'Problemas con el rociador de vapor', 'Base dañada', 'Otra'],
    9: ['No enciende', 'No calienta', 'Olor a quemado', 'Ruidos fuertes', 'Se apaga sola', 'Problemas con el motor', 'Otra'],
    10: ['No enciende', 'No calienta', 'Olor a quemado', 'Problemas con las placas', 'Cable dañado', 'Otra'],
    11: ['No enciende', 'No inicia sistema operativo', 'Pantalla rota', 'Pantalla Azul', 'No carga / problema con el cargador', 'Falla del teclado', 'Bisagras dañadas / rotas', 'No hay imagen', 'Se sobrecalienta', 'Se apaga', 'Mantenimiento / limpieza', 'Virus', 'Olvidé la contraseña', 'Ingreso líquido / se mojó', 'Batería dura poco / no anda', 'Problemas de teclado', 'Otra'],
    12: ['No enciende', 'No enfría', 'Ruidos fuertes', 'Problemas con el termostato', 'Fugas de líquido refrigerante', 'Otra'],
    13: ['No enciende', 'Ruidos fuertes', 'No gira', 'Problemas con el motor', 'Vibración excesiva', 'Otra'],
    14: ['No enciende', 'No calienta', 'Olor a quemado', 'Salta la térmica', 'Problemas con el termostato', 'Se apaga sola', 'Otra'],
    15: ['No enciende', 'No calienta', 'Olor a quemado', 'Ruidos fuertes', 'Problemas con la puerta', 'Problemas con el temporizador', 'Se apaga sola', 'Otra']
}

export const brandLogos = [
    { src: '/brands/apple.png', alt: 'Apple' },
    { src: '/brands/Samsung.png', alt: 'Samsung' },
    { src: '/brands/Microsoft.png', alt: 'Microsoft' },
    { src: '/brands/Sony_Log.png', alt: 'Sony' },
    { src: '/brands/HP.png', alt: 'HP' },
    { src: '/brands/Dell.png', alt: 'Dell' },
    { src: '/brands/LG.png', alt: 'LG' },
    { src: '/brands/Lenovo.png', alt: 'Lenovo' },
    { src: '/brands/Nintendo.png', alt: 'Nintendo' },
    { src: '/brands/Huawei.png', alt: 'Huawei' },
    { src: '/brands/Motorola.png', alt: 'Motorola' },
    { src: '/brands/Asus.png', alt: 'Asus' },
    { src: '/brands/Acer.png', alt: 'Acer' },
    { src: '/brands/Xbox.png', alt: 'Xbox' },
    { src: '/brands/Philips.png', alt: 'Philips' },
    { src: '/brands/TCL.png', alt: 'TCL' },
    { src: '/brands/HIsense.png', alt: 'Hisense' },
    { src: '/brands/BGH.png', alt: 'BGH' },
    { src: '/brands/Bangho.png', alt: 'Bangho' },
    { src: '/brands/Alcatel.png', alt: 'Alcatel' },
]

export const reviews = [
    {
        id: 1,
        name: 'Daniel Petrone',
        rating: 5,
        comment: 'Exelente atencion , muy buen trabajo y rapido, todo perfecto , muy recomendable',
        profilePic: 'https://lh3.googleusercontent.com/a/ACg8ocLZermqMpgm-jmmOuqM5wQXxGtoUSSW0TKFje0IDSdYzZ57HA=w60-h60-p-rp-mo-br100',
        timeAgo: 'Hace un mes',
        url: 'https://www.google.com/maps/contrib/103782907861104787038/reviews/@-37.741386,-64.957331,6z/data=!4m3!8m2!3m1!1e1?hl=es-419&entry=ttu'
    },
    {
        id: 2,
        name: 'Eugenia Andujar',
        rating: 5,
        comment: 'Unos genios!! Arreglaron el ventilador en re poco tiempo y funciona re bien. Nos explicaron cada paso. Son muy amables. Muchas gracias! :)',
        profilePic: 'https://lh3.googleusercontent.com/a/ACg8ocKLTtxu6h20QVrZeama3LwfX55guZj3cVMCB8_H-ISt4QCIpg=w60-h60-p-rp-mo-br100',
        timeAgo: 'Hace 4 meses',
        url: 'https://www.google.com/maps/contrib/108126814334509832821?hl=es-419&ved=1t:31294&ictx=111'
    },
    {
        id: 3,
        name: 'Maria Florencia Gianni',
        rating: 5,
        comment: 'Super recomiendo! unos genios los chicos me solucionaron el problema de mi plancha de un dia para otro!',
        profilePic: 'https://lh3.googleusercontent.com/a-/ALV-UjUOuXbNU2y2reksHYdYpFBbB0OUiyqUWRxrLh3zVnrf6RhKqoc=w60-h60-p-rp-mo-br100',
        timeAgo: 'Hace 6 meses',
        url: 'https://www.google.com/maps/contrib/102927586818368431798?hl=es-419&ved=1t:31294&ictx=111'
    },
    {
        id: 4,
        name: 'Liliana Camaron',
        rating: 5,
        comment: 'Excelente atención, muy profesionales y  cumplen con los tiempos de entrega. Muy recomendables',
        profilePic: 'https://lh3.googleusercontent.com/a-/ALV-UjVjqMzU-Y_TdQRckdSy9N7mgcqEVPW476n8rXBd1EYlTu_IKHhNSg=w60-h60-p-rp-mo-br100',
        timeAgo: 'Hace 8 meses',
        url: 'https://www.google.com/maps/contrib/110487861240920629631?hl=es-419&ved=1t:31294&ictx=111'
    },
    {
        id: 5,
        name: 'Lucio Mejias',
        rating: 5,
        comment: 'Muy profesionales! Tenía una cava de vinos que parecía perdida y me la recuperaron! El mejor de service de Quilmes!',
        profilePic: 'https://lh3.googleusercontent.com/a/ACg8ocL9AV7zpVhvbhxxJT3USnJ1YoZwefUGF55cGhVTV3PQP0WvXQ=w60-h60-p-rp-mo-br100',
        timeAgo: 'Hace un año',
        url: 'https://www.google.com/maps/contrib/112499526229381407473?hl=es-419&ved=1t:31294&ictx=111'
    },
    {
        id: 6,
        name: 'Rosana R. Kogan',
        rating: 4,
        comment: 'Pude reparar mi horno eléctrico, lo mejor es que lo retiraron a domicilio!',
        profilePic: 'https://lh3.googleusercontent.com/a-/ALV-UjUZviKLwMreDInY68ixgCsgYgicOf2yEX2YC3r75aaisf87ycM=w60-h60-p-rp-mo-br100',
        timeAgo: 'Hace un año',
        url: 'https://www.google.com/maps/contrib/110740870314712365654?hl=es-419&ved=1t:31294&ictx=111'
    },
]