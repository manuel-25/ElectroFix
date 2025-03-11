//Lista de Categorias en orden que aparecen
export const products = [
    { id: 1, name: 'Air Fryer' },
    { id: 3, name: 'Aspiradora Robot' },
    { id: 2, name: 'Aspiradora' },
    { id: 4, name: 'Cafetera' },
    { id: 5, name: 'Cava de Vino' },
    { id: 13, name: 'Televisor' },
    { id: 7, name: 'Estufa eléctrica' },
    { id: 8, name: 'Freidora Industrial' },
    { id: 9, name: 'Horno Eléctrico' },
    { id: 15, name: 'Horno Empotrable' },
    { id: 10, name: 'Microondas' },
    { id: 14, name: 'Ventilador' },
    { id: 16, name: 'Anafe eléctrico' },
    { id: 17, name: 'Anafe a Inducción' },
    { id: 18, name: 'Cocina Eléctrica' },
    { id: 11, name: 'Notebook' },
    { id: 12, name: 'Smartphone' },
    { id: 6, name: 'Consola' },
  ]

// Lista de IDs de categorías con NEW TAG
export const newCategoryIds = [8, 16, 17, 18]

export const discountCategoryIds = [10, 9]

//Detalles adicionales por Categorias
export const additionalDetailsConfig = [
    {
        categoryId: 14,
        categoryName: "Ventilador",
        label: "¿Su ventilador es de ...?",
        type: "select",
        options: [
            { value: "piso", label: "Piso" },
            { value: "pared", label: "Pared" },
        ]
    }
]

//Marcas por Categorias
export const detailedBrandsByCategory = {
    1: {
        name: 'Air Fryer',
        brands: {
            'Nef': ['TurboCook'],
            'Philips': [],
            'Peabody': [],
            'Suono': [],
            'Zego': [],
            'Winco': [],
            'Yelmo': [],
            'Oryx': [],
            'Moulinex': [],
            'Atma': [],
            'Ultracomb': [],
            'Otros': []
        }
    },
    12: {
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
    13: {
        name: 'Televisor',
        brands: {
            'Samsung': [],
            'LG': [],
            'Sony': [],
            'Philips': [],
            'Panasonic': [],
            'TCL': [],
            'Hisense': [],
            'Vizio': [],
            'Apple': ['Apple TV 4K (2nd generation)', 'Apple TV 4K (1st generation)', 'Apple TV HD'],
            'ADMIRAL': [],
            'JVC': [],
            'THC': [],
            'TOP HOUSE': [],
            'RCA': [],
            'Ken Brown': [],
            'Sanyo': [],
            'Otros': [],
        }
    },   
    6: {
        name: 'Consola',
        brands: {
            'Sony': ['PlayStation 5','PlayStation 5 Pro' ,'PlayStation 4 Pro', 'PlayStation 4 Slim', 'PlayStation 4', 'PlayStation 3'],
            'Microsoft': ['Xbox Series X', 'Xbox Series S', 'Xbox One X', 'Xbox One S', 'Xbox 360', 'Original Xbox'],
            'Nintendo': ['Switch', 'Switch Lite', 'Switch OLED', '3DS XL', '2DS', 'Wii U'],
            'Otros': []
        }
    },
    11: {
        name: 'Notebook',
        brands: {
            'Apple': ['MacBook Air', 'MacBook Pro 14', 'MacBook Pro 16', 'MacBook Air 13', 'MacBook Pro 13', 'MacBook 12'],
            'Dell': ['XPS 15', 'XPS 13', 'Inspiron 15', 'Inspiron 14', 'Alienware m15', 'G5 15'],
            'HP': ['Spectre x360', 'Envy 15', 'Pavilion 14', 'OMEN 15', 'Stream 14', 'Elite Dragonfly'],
            'Lenovo': ['ThinkPad X1 Carbon', 'Yoga 9i', 'IdeaPad 5', 'Legion 5', 'ThinkBook 14', 'Flex 5'],
            'Acer': ['Swift 5', 'Aspire 5', 'Predator Helios 300', 'Spin 3', 'Chromebook 314', 'Nitro 5'],
            'Asus': ['ZenBook 14', 'ROG Zephyrus G14', 'VivoBook 15', 'TUF Gaming A15', 'Chromebook Flip C434', 'ExpertBook B9'],
            'MSI': ['GS66 Stealth', 'GE76 Raider', 'Prestige 14', 'Modern 15', 'Creator 15', 'GF63 Thin'],
            'Razer': ['Blade 15', 'Blade Stealth 13', 'Blade Pro 17', 'Blade 14', 'Razer Book 13', 'Razer Blade Stealth'],
            'Inspiron': [],
            'Otros': []
        }
    },
    10: {
        name: 'Microondas',
        brands: {
            'Samsung': [],
            'LG': [],
            'Panasonic': [],
            'Whirlpool': [],
            'Sharp': [],
            'Toshiba': [],
            'Daewoo': [],
            'Philco': [],
            'BGH QuickChef': [''],
            'RCA': [],
            'Atma': [''],
            'Ariston': [],
            'Westinghouse': [],
            'Eslabón de Lujo': [],
            'Top House': [],
            'Likon': [],
            'Hitplus': [],
            'Otros': []
        }    
    },
    9: {
        name: 'Horno Eléctrico',
        brands: {
            'Breville': [],
            'Cuisinart': [],
            'Panasonic': ['FlashXpress'],
            'Oster': [],
            'Black & Decker': [],
            'Hamilton Beach': [],
            'Smeg': [],
            'Atma': [],
            'Enova': [],
            'Kanji Home': [],
            'BGH': [],
            'Ultracomb': [],
            'Philco': [],
            'Yelmo': [],
            'Bonn': [],
            'Ken Brown': [],
            'Otros': []
        }
    },
    4: {
        name: 'Cafetera',
        brands: {
            'Nespresso': ['Essenza Mini', 'Pixie', 'Citiz', 'Lattissima Pro', 'VertuoPlus', 'Inissia', 'Creatista', 'Maestria'],
            'Keurig': ['K-Elite', 'K-Classic', 'K-Mini', 'K-Supreme Plus', 'K-Slim', 'K-Duo', 'K-Cafe', 'K-Compact'],
            'DeLonghi': ['Dinamica', 'Magnifica', 'Eletta', 'La Specialista'],
            'Breville': [],
            'Mr. Coffee': ['Easy Measure', 'Cafe Barista', 'BVMC-PSTX95'],
            'Philips': [],
            'Oster': ['Prima Latte'],
            'Hamilton Beach': ['FlexBrew'],
            'Smart Life': [],
            'Atma': [],
            'Ultracomb': [],
            'Espresso': [],
            'Otros': []
        }    
    },
    3: {
        name: 'Aspiradora Robot',
        brands: {
            'Samsung': ['Powerbot-e', 'Jet Bot+', 'Jet Bot'],
            'iRobot': ['Roomba 675', 'Roomba 675 Wi-Fi'],
            'Smart Tek': ['Ava Mini','Ava Mini 2', 'Ava Pro Max', 'Ava Pro X'],
            'Xiaomi': ['E10', 'S10', 'E5', 'X20+', 'E10C', 'X10', 'Q8 Max', 'X20 Pro'],
            'Unnic': ['R10'],
            'Gadnic': ['Clean Duo Z900', 'Z1800', 'Z2000','3' ,'4', '5'],
            'Yelmo': ['As-7070'],
            'Daewoo': ['Delta', 'Sena', 'Maxpro', 'Rider'],
            'Fika': [],
            'Otros': []
        }
    },
    5: {
        name: 'Cava de Vino',
        brands: {
            'Whynter': [],
            'NewAir': [],
            'NutriChef': [],
            'Ivation': [],
            'Kalamera': [],
            'Phiestina': [],
            'Philco': [],
            'Peabody': [],
            'Liliana': [],
            'Exahome': [],
            'Winco': [],
            'Airmax': [],
            'Otros': []
        }
    },
    14: {
        name: 'Ventilador',
        brands: {
            'Liliana': [],
            'Electrolux': [],
            'Otros': []
        }
    },
    7: {
        name: 'Estufa eléctrica',
        brands: {
            'Dyson': ['AM09 Hot + Cool', 'AM09 Hot + Cool'],
            'DeLonghi': [],
            'Honeywell': [],
            'Vornado': [],
            'Lasko': [],
            'Duraflame': ['3D Infrared Electric Fireplace', 'Portable Electric'],
            'Philco': [],
            'Atma': [],
            'Liliana': [],
            'Exahome': [],
            'Otros': []
        }    
    },
    2: {
        name: 'Aspiradora',
        brands: {
            'Samsung': [],
            'Philips': [],
            'Electrolux': [],
            'Black & Decker': [],
            'Philco': [],
            'Daewoo': [],
            'Atma': [],
            'Ultracomb': [],
            'Yelmo': [],
            'Einhell': [],
            'Gadnic': [],
            'Winco': [],
            'Suono': [],
            'Otros': []
        }
    },
    8: {
        name: 'Freidora Industrial',
        brands: {
            'Daewoo': [],
            'Sol Real': [],
            'Turboblender': [],
            'Morelli': [],
            'Depaolo': [],
            'Otros': []
        }
    },
    15: {
        name: 'Horno Empotrable',
        brands: {
            'Atma': [],
            'Samsung': [],
            'Longvie': [],
            'Maverick': [],
            'Florencia': [],
            'Whirpool': [],
            'LG': [],
            'Vondom': [],
            'Morelli': [],
            'Otros': []
        }
    },
    16: {
        name: 'Anafe eléctrico',
        brands: {
            'Westinghouse': [],
            'Oryx': [],
            'Winco': [],
            'Liliana': [],
            'Spica': [],
            'Ultracomb': [],
            'Otros': []
        }
    },
    17: {
        name: 'Anafe a Inducción',
        brands: {
            'Samsung': [],
            'Ormay': [],
            'Telefunken': [],
            'Vondom': [],
            'Electrolux': [],
            'Whirpool': [],
            'Ariston': [],
            'Florencia': [],
            'Top House': [],
            'Otros': []
        }
    },
    18: {
        name: 'Cocina Eléctrica',
        brands: {
            'Philco': [],
            'Atma': [],
            'Vitta': [],
            'Kanji': [],
            'Electrolux': [],
            'Ariston': [],
            'Kacemaster': [],
            'Otros': []
        }
    }
}

//Steps para barra de progreso y variables dinamicas
export const steps = ["Categoría", "Marca", "Modelo", "Falla", "Datos", "Servicio"]

//Fallas por Categorias
export const faultsByCategory = {
    // Air Fryer
    1: ['No enciende', 'No calienta', 'Cocción desigual', 'Ruidos extraños', 'Salen chispas', 'Humo', 'Olor a quemado', 'La pantalla no funciona', 'El temporizador no funciona', 'Se apaga sola', 'Fugas de aceite', 'Mantenimiento / Limpieza', 'Otra'],
    // Aspiradora
    2: ['No enciende', 'Pérdida de succión', 'Ruidos extraños', 'Fugas de aire', 'Problemas con el cable de alimentación', 'Problemas con el filtro', 'Problemas con el cepillo', 'Se apaga sola', 'Fugas de polvo', 'Mantenimiento / Limpieza', 'Otra'],
    // Aspiradora Robot
    3: ['No enciende', 'Ruidos extraños', 'Problemas con el motor', 'Fugas de líquido', 'Se apaga', 'Se sobrecalienta', 'Cambio de baterías', 'Problemas con los accesorios', 'Mantenimiento / Limpieza', 'Otra'],
    // Cafetera
    4: ['No enciende', 'Enciende no calienta', 'Enciende pero no traba', 'Pierde agua', 'No muele café', 'Olor a quemado', 'Salen chispas', 'Humo', 'Problemas con la bomba de agua', 'Mantenimiento / Limpieza', 'Otra'],
    // Cava de Vino
    5: ['No enciende', 'No enfría', 'Ruidos fuertes', 'Problemas con el termostato', 'Fugas de líquido refrigerante', 'Otra'],
    // Consola
    6: ['No enciende', 'Errores de sistema', 'No lee discos', 'Problemas con los joystick', 'Pantalla en negro', 'Sobrecalentamiento', 'Se congela', 'Falla de almacenamiento', 'Mantenimiento / Limpieza', 'Otra'],
    // Estufa eléctrica
    7: ['No enciende', 'No calienta', 'Olor a quemado', 'Salta la térmica', 'Problemas con el termostato', 'Se apaga sola', 'Otra'],
    // Freidora Industrial
    8: ['No enciende', 'No calienta', 'Olor a quemado', 'Salen chispas', 'Ruidos fuertes', 'Fuga de aceite', 'Problemas con el temporizador', 'Se apaga', 'Mantenimiento / Limpieza', 'Otra'],
    // Horno Eléctrico
    9: ['No enciende', 'Enciende no calienta', 'Olor a quemado', 'Salen chispas', 'Humo', 'Problemas con el temporizador', 'No cierra la puerta', 'No corta Temperatura', 'Velas Quemadas', 'Salta la térmica', 'Mantenimiento / Limpieza', 'Otra'],
    // Microondas
    10: ['No enciende', 'Enciende no calienta', 'Ruidos fuertes', 'Salen chispas', 'Problemas con el temporizador', 'Se apaga solo', 'Al inicio ruido fuerte', 'No gira el plato', 'Falla el teclado', 'Otra'],
    // Notebook
    11: ['No enciende', 'Pantalla rota', 'Pantalla Azul', 'No carga / problema con el cargador', 'Bisagras dañadas / rotas', 'No hay imagen', 'Se sobrecalienta', 'Se apaga', 'Mantenimiento / limpieza', 'Ingreso líquido / se mojó', 'Batería dura poco / no anda', 'Problemas de teclado', 'Otra'],
    // Smartphone
    12: ['No enciende', 'No inicia sistema', 'Pantalla rota / dañada', 'Falla pantalla táctil', 'Pantalla en negro / con líneas', 'No carga', 'Falla el audio', 'Problemas de batería', 'Problemas de software', 'Tapa trasera dañada', 'Otra'],
    // Televisor
    13: ['No enciende', 'No hay imagen', 'Sin sonido', 'Imagen distorsionada', 'Pantalla rota / golpeada', 'Problemas con el control remoto', 'Problemas con las conexiones HDMI/AV', 'Otra'],
    // Ventilador
    14: ['No enciende', 'Ruidos fuertes', 'No gira', 'Problemas con el motor', 'Vibración excesiva', 'Mantenimiento / Limpieza', 'Otra'],
    // Horno Empotrable
    15: ['No enciende', 'Enciende pero no calienta', 'Olor a quemado', 'Salen chispas', 'Humo', 'Problemas con el temporizador', 'No cierra la puerta', 'Salta la térmica', 'Mantenimiento / Limpieza', 'Otra'],
    // Anafe eléctrico
    16: ['No enciende', 'No calienta', 'Olor a quemado', 'Salta la térmica', 'Problemas con el termostato', 'Se apaga sola', 'Mantenimiento / Limpieza', 'Otra'],
    // Anafe a Inducción
    17: ['No enciende', 'No calienta', 'Error en el sensor', 'Pantalla táctil no responde', 'Se apaga sola', 'Mantenimiento / Limpieza', 'Otra'],
    // Cocina Eléctrica
    18: ['No enciende', 'No calienta', 'Olor a quemado', 'Salta la térmica', 'Problemas con el termostato', 'Se apaga sola', 'Mantenimiento / Limpieza', 'Otra'],
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

export const faqs = [
    {
        question: "¿Cómo funciona nuestro servicio?",
        answer: "Nuestro servicio es sencillo. Usted realiza la cotización de su equipo en nuestra web y luego nos envía su electrodoméstico mediante correo, lo revisamos y le enviamos una cotización final. Una vez aprobado, realizamos la reparación, lo probamos y se lo devolvemos."
    },
    {
        question: "¿Cómo es el proceso de cotización?",
        answer: "La cotización web es estimada y se realizara una vez que recibimos y revisamos su electrodoméstico. Un técnico especializado evaluará el daño y le enviaremos un presupuesto detallado."
    },
    {
        question: "¿Qué opciones tengo para realizar el envío?",
        answer: "Puede enviar su electrodoméstico a través de Correo Argentino o Andreani."
    },
    {
        question: "¿Cómo se lleva a cabo la revisión del equipo?",
        answer: "Un técnico especializado revisará su electrodoméstico para identificar el problema y determinar las reparaciones necesarias."
    },
    {
        question: "¿Cuánto tardaré en recibir la cotización del producto?",
        answer: "Una vez que recibimos su electrodoméstico, el tiempo estimado para enviarle la cotización es de 2 a 3 días hábiles."
    },
    {
        question: "¿Hay distintas opciones de reparación?",
        answer: "Sí, ofrecemos varias opciones de reparación según el tipo de daño y el costo. Le proporcionaremos todas las opciones disponibles en la cotización."
    },
    {
        question: "¿Cómo se devuelve el equipo reparado?",
        answer: "Una vez reparado, le enviaremos su electrodoméstico a través del mismo servicio de mensajería que utilizó para enviarlo."
    },
    {
        question: "¿Mis datos están seguros?",
        answer: "Sí, tomamos la seguridad de sus datos muy en serio y utilizamos protocolos de seguridad para proteger su información personal."
    },
    {
        question: "¿Qué sucede si no estoy satisfecho con la reparación?",
        answer: "Si no está satisfecho con la reparación, contáctenos para resolver el problema. Ofrecemos garantía de hasta 6 meses."
    },
    {
        question: "¿Se puede realizar seguimiento?",
        answer: "Sí, puede hacer seguimiento del estado de su reparación a través de nuestro sitio web o contactándonos directamente."
    },
    {
        question: "¿Qué métodos de pago se aceptan?",
        answer: "Aceptamos tarjetas de crédito, débito, transferencias bancarias y mercado pago."
    },
    {
        question: "¿Por qué confiar en nosotros?",
        answer: "Contamos con años de experiencia y técnicos altamente calificados. Nuestro compromiso es ofrecer un servicio de alta calidad y rapidez."
    }
]

export const bannerTexts = [
    "🔥 ¡Aprendé a reparar electrodomésticos! Curso presencial en Barracas, CABA. 📍 ",
    "📢 Inscripciones abiertas, cupos limitados.",
    "No te pierdas esta oportunidad de capacitarte. ¡Click acá! 🚀"
]

export const barriosCABA = [
    'Palermo', 'San Telmo', 'Puerto Madero', 'Recoleta', 'Belgrano',
    'Caballito', 'La Boca', 'Flores', 'Barracas', 'Almagro', 
    'Villa Devoto', 'Villa Urquiza', 'Saavedra', 'Villa Luro', 
    'Villa del Parque', 'Colegiales', 'Avellaneda', 'Mataderos', 
    'Liniers', 'Vélez Sarsfield', 'Nueva Pompeya', 'San Cristóbal', 
    'San Nicolás', 'Retiro', 'Monserrat', 'San Fernando', 
    'Balvanera', 'Villa Riachuelo', 'Constitución', 'San Carlos', 
    'Parque Chacabuco', 'Parque Patricios', 'Boedo', 'Paternal', 
    'Chacarita', 'Nuñez', 'Boca', 'La Paternal', 
    'Agronomía', 'Villa Ortúzar', 'Floresta', 'Parque Centenario',
    'Villa Crespo', 'Villa del Parque', 'Devoto', 'Monte Castro',
    'Cerro de la Gloria', 'San José'
]

export const alertConfig = [
    {
      category: "Televisor",
      fault: "Pantalla rota / golpeada",
      title: "Pantallas rotas o golpeadas",
      message: "Lamentablemente las pantallas que se rompen por golpes/caídas no tienen reparación, ni reemplazo viable ya que no se fabrican para repuesto. Si cuentas con un seguro de hogar, podemos emitir un presupuesto membretado para que lo presentes a tu aseguradora. Consulte el valor según el modelo de su equipo.",
      buttons: [
        { label: "Continuar", action: "continue" },
        { label: "Volver al inicio", action: "restart" },
      ],
    },
    // Agrega más alertas aca según sea necesario
]
  