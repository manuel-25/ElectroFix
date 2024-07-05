export const products = [
    { id: 1, name: 'Smartphone' },
    { id: 3, name: 'Televisor' },
    { id: 2, name: 'Consola' },
    { id: 11, name: 'Notebook' },
    { id: 15, name: 'Microondas' },
    { id: 4, name: 'Horno Electrico' },
    { id: 5, name: 'Cafetera' },
    { id: 6, name: 'Pava Eléctrica' },
    { id: 7, name: 'Tostadora' },
    { id: 8, name: 'Plancha' },
    { id: 9, name: 'Secadora de Pelo' },
    { id: 10, name: 'Planchita de Pelo' },
    { id: 12, name: 'Cava de Vino' },
    { id: 13, name: 'Ventilador' },
    { id: 14, name: 'Estufa' }
]

export const brandsByCategory = {
    1: ['Apple', 'Samsung', 'Xiaomi', 'Motorola', 'Alcatel', 'Nokia', 'LG', 'Huawei', 'Otros'],
    2: ['Sony', 'Xbox', 'Nintendo', 'Otros'],
    3: ['Samsung', 'Apple', 'LG', 'BGH', 'JVC', 'Hisense', 'Sony', 'Philco', 'Admiral', 'RCA', 'Noblex', 'Phillips', 'TCL', 'Pioner', 'Telefunken', 'Ken Brown', 'Otros'],
    4: ['Ultracomb', 'Peabody', 'BGH', 'Atma', 'Philco', 'Kanji', 'Morelli', 'Smartlife', 'Alpaca', 'Enova', 'Tedge', 'Tivoli', 'Liliana', 'Midea', 'Daewo', 'Yelmo', 'Black and Decker', 'Tophouse', 'Smart Tech', 'Axel', 'Otros'],
    5: ['Peabody', 'Atma', 'Electrolux', 'Oster', 'Molinex', 'Yelmo', 'Smart Life', 'Nesspreso', 'Otros'],
    6: ['Yelmo', 'Peabody', 'Ultra Comb', 'Liliana', 'Atma', 'Smart Life', 'Phillips', 'Winco', 'Molinex', 'Daewo', 'Oster', 'Philco', 'Tophouse', 'Otros'],
    7: ['Atma', 'Molinex', 'Peabody', 'Black and Decker', 'Electro Lux', 'Phillips', 'Daewo', 'Yelmo', 'Ultra Comb', 'Winco', 'Smart Life', 'Liliana', 'Oster', 'Smart Tech', 'Otros'],
    8: ['Phillips', 'Atma', 'Ultra Comb', 'Winco', 'Liliana', 'Philco', 'Peabody', 'Tophouse', 'Otros'],
    9: ['Gama', 'Otros'],
    10: ['Otros'],
    11: ['Dell', 'Samsung','HP', 'Lenovo', 'Acer', 'Asus', 'Apple', 'Bangho', 'Microsoft', 'Exo', 'Vaio', ' BGH', 'Noblex', 'Samsung', 'Otros'],
    12: ['Vondom', 'Philco', 'Whirlpool', 'Tophouse', 'Winco', 'Wine Collection', 'Candy', 'Ultra Comb', 'Wine Frost', 'Otros'],
    13: ['Liliana', 'Electro Lux', 'Axel', 'Magiclick', 'Atma', 'Philco', 'Peabody', 'Otros'],
    14: ['Otros'],
    15: ['Otros']
}

export const categories = [
    'Smartphone', 'Consola', 'Televisor', 'Horno Eléctrico', 'Cafetera',
    'Pava Eléctrica', 'Tostadora', 'Plancha', 'Secadora de Pelo', 'Planchita de Pelo',
    'Notebook', 'Cava de Vino', 'Ventilador', 'Estufa', 'Microondas'
]

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