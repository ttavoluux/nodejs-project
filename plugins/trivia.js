let currentQuestion = null; // Variable para almacenar la pregunta actual
let gameActive = false; // Para saber si el juego está activo
let gameTimer = null; // Para almacenar el temporizador del juego
let winner = null; // Para almacenar al ganador (si hay uno)

let handler = async (m, { conn, text, usedPrefix, command }) => {
    // Preguntas y respuestas del juego
    const preguntas = [
        {
            pregunta: '¿Cuál es el río más largo del mundo?',
            opciones: ['Amazonas', 'Nilo', 'Yangtsé', 'Misisipi'],
            respuestaCorrecta: 'Amazonas'
        },
        {
            pregunta: '¿En qué año llegó el hombre a la luna?',
            opciones: ['1969', '1959', '1979', '1989'],
            respuestaCorrecta: '1969'
        },
        {
            pregunta: '¿Quién pintó la Mona Lisa?',
            opciones: ['Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Claude Monet'],
            respuestaCorrecta: 'Leonardo da Vinci'
        },
        {
            pregunta: '¿En qué película de Marvel Thor lucha contra su hermana Hela?',
            opciones: ['Thor: Ragnarok', 'Avengers: Endgame', 'Captain America: Civil War'],
            respuestaCorrecta: 'Thor: Ragnarok'
        },
        {
            pregunta: '¿Qué princesa de Disney es conocida por ser una sirena?',
            opciones: ['Aurora', 'Ariel', 'Pocahontas'],
            respuestaCorrecta: 'Ariel'
        },
        {
            pregunta: '¿En qué película de Disney aparece el personaje de Elsa, la Reina de las Nieves?',
            opciones: ['Frozen', 'La Bella Durmiente', 'Encanto'],
            respuestaCorrecta: 'Frozen'
        },
        {
            pregunta: '¿Qué villano aparece en *Avengers: Infinity War* y busca las Gemas del Infinito?',
            opciones: ['Ultron', 'Thanos', 'Loki'],
            respuestaCorrecta: 'Thanos'
        },
        {
            pregunta: '¿En qué película de Marvel Thor lucha contra su hermana Hela?',
            opciones: ['Thor: Ragnarok', 'Avengers: Endgame', 'Captain America: Civil War'],
            respuestaCorrecta: 'Thor: Ragnarok'
        },
        {
            pregunta: '¿Qué princesa de Disney es conocida por ser una sirena?',
            opciones: ['Aurora', 'Ariel', 'Pocahontas'],
            respuestaCorrecta: 'Ariel'
        },
        {
            pregunta: '¿Quién es el alter ego de Bruce Wayne en las películas de DC Comics?',
            opciones: ['Batman', 'Superman', 'Green Lantern'],
            respuestaCorrecta: 'Batman'
        },
        {
            pregunta: '¿En qué película de Marvel el personaje de Doctor Strange es presentado?',
            opciones: ['Avengers: Age of Ultron', 'Doctor Strange', 'Spider-Man: Homecoming'],
            respuestaCorrecta: 'Doctor Strange'
        },
        {
            pregunta: '¿Qué villano es derrotado por Spider-Man en *Spider-Man: No Way Home*?',
            opciones: ['Venom', 'Green Goblin', 'Doctor Octopus'],
            respuestaCorrecta: 'Green Goblin'
        },
        {
            pregunta: '¿Qué superhéroe de DC tiene el poder de la velocidad?',
            opciones: ['Flash', 'Green Lantern', 'Aquaman'],
            respuestaCorrecta: 'Flash'
        },
        {
            pregunta: '¿Cuál es el verdadero nombre de Black Widow en las películas de Marvel?',
            opciones: ['Natasha Romanoff', 'Wanda Maximoff', 'Peggy Carter'],
            respuestaCorrecta: 'Natasha Romanoff'
        },
        {
            pregunta: '¿Qué película de Disney presenta a un joven llamado Aladino y su genio mágico?',
            opciones: ['Aladdin', 'Moana', 'Tarzan'],
            respuestaCorrecta: 'Aladdin'
        },
        {
            pregunta: '¿Qué película de Disney cuenta la historia de una joven que lucha por salvar su hogar en China?',
            opciones: ['Mulan', 'Pocahontas', 'Rapunzel'],
            respuestaCorrecta: 'Mulan'
        },
        {
            pregunta: '¿Quién es el hermano adoptivo de Thor en las películas de Marvel?',
            opciones: ['Loki', 'Odin', 'Valkyrie'],
            respuestaCorrecta: 'Loki'
        },
        {
            pregunta: '¿En qué película de DC aparece el personaje de Harley Quinn?',
            opciones: ['Suicide Squad', 'Wonder Woman', 'Justice League'],
            respuestaCorrecta: 'Suicide Squad'
        },
        {
            pregunta: '¿En qué película de Disney se presenta a un niño llamado Woody?',
            opciones: ['Toy Story', 'Up', 'Cars'],
            respuestaCorrecta: 'Toy Story'
        },
        {
            pregunta: '¿Quién es el alter ego de Peter Parker en las películas de Marvel?',
            opciones: ['Spider-Man', 'Iron Man', 'Captain America'],
            respuestaCorrecta: 'Spider-Man'
        },
        {
            pregunta: '¿En qué película de Disney la protagonista se convierte en una princesa por arte de magia?',
            opciones: ['La Cenicienta', 'Mulan', 'Pocahontas'],
            respuestaCorrecta: 'La Cenicienta'
        },
        {
            pregunta: '¿Qué superhéroe de Marvel es conocido como el "Hombre de Hierro"?',
            opciones: ['Thor', 'Iron Man', 'Black Panther'],
            respuestaCorrecta: 'Iron Man'
        },
        {
            pregunta: '¿Qué película de Disney muestra la historia de un joven llamado Tarzán que crece entre gorilas?',
            opciones: ['Tarzan', 'Hercules', 'La Sirenita'],
            respuestaCorrecta: 'Tarzan'
        },
        {
            pregunta: '¿Qué superhéroe de DC tiene el poder de controlar el agua?',
            opciones: ['Aquaman', 'Green Lantern', 'Superman'],
            respuestaCorrecta: 'Aquaman'
        },
        {
            pregunta: '¿Quién fue el líder del movimiento de independencia de la India?',
            opciones: ['Mahatma Gandhi', 'Nelson Mandela', 'Martin Luther King Jr.'],
            respuestaCorrecta: 'Mahatma Gandhi'
        },
        {
            pregunta: '¿Quién fue el primer presidente de los Estados Unidos?',
            opciones: ['Abraham Lincoln', 'George Washington', 'Thomas Jefferson'],
            respuestaCorrecta: 'George Washington'
        },
        {
            pregunta: '¿Quién pintó la famosa obra *La Mona Lisa*?',
            opciones: ['Michelangelo', 'Leonardo da Vinci', 'Vincent van Gogh'],
            respuestaCorrecta: 'Leonardo da Vinci'
        },
        {
            pregunta: '¿Qué científico desarrolló la teoría de la relatividad?',
            opciones: ['Isaac Newton', 'Albert Einstein', 'Nikola Tesla'],
            respuestaCorrecta: 'Albert Einstein'
        },
        {
            pregunta: '¿Quién fue la famosa reina de Egipto conocida por sus relaciones con Julio César y Marco Antonio?',
            opciones: ['Cleopatra', 'Nefertiti', 'Isabel I'],
            respuestaCorrecta: 'Cleopatra'
        },
        {
            pregunta: '¿Quién fue el líder de la Revolución Mexicana?',
            opciones: ['Emiliano Zapata', 'Francisco Villa', 'Benito Juárez'],
            respuestaCorrecta: 'Emiliano Zapata'
        },
        {
            pregunta: '¿Qué figura histórica fue el principal autor de la independencia de Argentina?',
            opciones: ['José de San Martín', 'Simón Bolívar', 'Bernardo O\'Higgins'],
            respuestaCorrecta: 'José de San Martín'
        },
        {
            pregunta: '¿Quién fue el famoso filósofo griego conocido como el maestro de Alejandro Magno?',
            opciones: ['Aristóteles', 'Platón', 'Sócrates'],
            respuestaCorrecta: 'Aristóteles'
        },
        {
            pregunta: '¿Quién es conocido como el "Padre de la patria" en Estados Unidos?',
            opciones: ['Abraham Lincoln', 'Benjamin Franklin', 'George Washington'],
            respuestaCorrecta: 'George Washington'
        },
        {
            pregunta: '¿Qué explorador es famoso por haber llegado al continente americano en 1492?',
            opciones: ['Hernán Cortés', 'Cristóbal Colón', 'Marco Polo'],
            respuestaCorrecta: 'Cristóbal Colón'
        },
        {
            pregunta: '¿Qué juego se basa en carreras de combate con vehículos, incluyendo el uso de armas y habilidades especiales?',
            opciones: ['Twisted Metal', 'Rocket League', 'Mario Kart'],
            respuestaCorrecta: 'Twisted Metal'
        },
        {
            pregunta: '¿En qué videojuego los jugadores deben sobrevivir en un mundo apocalíptico lleno de criaturas mutantes?',
            opciones: ['The Last of Us', 'Fallout', 'Resident Evil'],
            respuestaCorrecta: 'The Last of Us'
        },
        {
            pregunta: '¿Qué videojuego de construcción permite a los jugadores crear sus propios mundos, edificios, y estructuras a través de bloques virtuales?',
            opciones: ['Roblox', 'Fortnite', 'Minecraft'],
            respuestaCorrecta: 'Minecraft'
        },
        {
            pregunta: '¿En qué juego de cartas digitales los jugadores construyen mazos de cartas para enfrentarse en duelos estratégicos?',
            opciones: ['Magic: The Gathering', 'Hearthstone', 'Yu-Gi-Oh!'],
            respuestaCorrecta: 'Hearthstone'
        },
        {
            pregunta: '¿Qué juego de disparos en tercera persona involucra estrategias de combate con cobertura y enfrentamientos contra zombis?',
            opciones: ['Gears of War', 'The Division', 'Resident Evil'],
            respuestaCorrecta: 'The Division'
        },
        {
            pregunta: '¿En qué juego se juega una serie de rondas para ser el último jugador en pie en una isla?',
            opciones: ['PUBG', 'Fortnite', 'Apex Legends'],
            respuestaCorrecta: 'PUBG'
        },
        {
            pregunta: '¿En qué juego de disparos en línea los jugadores controlan héroes con habilidades únicas para competir en un equipo de cinco contra cinco?',
            opciones: ['Overwatch', 'Apex Legends', 'Valorant'],
            respuestaCorrecta: 'Overwatch'
        },
        {
            pregunta: '¿Qué juego de simulación permite a los jugadores construir y gestionar una granja virtual?',
            opciones: ['Stardew Valley', 'The Sims', 'FarmVille'],
            respuestaCorrecta: 'Stardew Valley'
        },
        {
            pregunta: '¿Qué videojuego es famoso por su modo de juego llamado "Battle Royale", en el que los jugadores se enfrentan hasta que solo quede uno?',
            opciones: ['Fortnite', 'Apex Legends', 'PUBG'],
            respuestaCorrecta: 'PUBG'
        },
        {
            pregunta: '¿Qué videojuego de rol en línea masivo (MMORPG) permite a los jugadores explorar un mundo de fantasía medieval?',
            opciones: ['World of Warcraft', 'Elder Scrolls Online', 'Guild Wars 2'],
            respuestaCorrecta: 'World of Warcraft'
        },
        {
            pregunta: '¿Qué juego de lucha tiene un modo historia épico basado en una franquicia de películas de acción?',
            opciones: ['Mortal Kombat', 'Injustice', 'Tekken'],
            respuestaCorrecta: 'Injustice'
        },
        {
            pregunta: '¿Qué videojuego de aventuras te permite explorar una ciudad futurista con temática de ciencia ficción?',
            opciones: ['Deus Ex', 'Cyberpunk 2077', 'Mass Effect'],
            respuestaCorrecta: 'Cyberpunk 2077'
        },
        {
            pregunta: '¿Quién es el protagonista de la película de Disney *El Rey León*?',
            opciones: ['Simba', 'Mufasa', 'Scar'],
            respuestaCorrecta: 'Simba'
        },
        {
            pregunta: '¿Cuál es el superpoder principal de Spider-Man en las películas de Marvel?',
            opciones: ['Fuerza sobrehumana', 'Agilidad y sentido arácnido', 'Volar'],
            respuestaCorrecta: 'Agilidad y sentido arácnido'
        },
        {
            pregunta: '¿En qué película de DC Comics aparece el personaje de Wonder Woman por primera vez?',
            opciones: ['Justice League', 'Batman v Superman: Dawn of Justice', 'Wonder Woman'],
            respuestaCorrecta: 'Batman v Superman: Dawn of Justice'
        },
        {
            pregunta: '¿Quién es el villano principal de la película *Los Vengadores* de Marvel?',
            opciones: ['Ultron', 'Loki', 'Thanos'],
            respuestaCorrecta: 'Loki'
        },
        {
            pregunta: '¿Qué princesa de Disney tiene como compañera a un cangrejo llamado Sebastián?',
            opciones: ['Aurora', 'Ariel', 'Pocahontas'],
            respuestaCorrecta: 'Ariel'
        },
        {
            pregunta: '¿En qué película de Disney aparece el personaje de Elsa?',
            opciones: ['Frozen', 'Moana', 'Encanto'],
            respuestaCorrecta: 'Frozen'
        },
        {
            pregunta: '¿Quién es el mejor amigo de Iron Man en el Universo Cinematográfico de Marvel?',
            opciones: ['Bruce Banner', 'Steve Rogers', 'James Rhodes'],
            respuestaCorrecta: 'James Rhodes'
        },
        {
            pregunta: '¿En qué película de Marvel aparece por primera vez el personaje de Black Panther?',
            opciones: ['Avengers: Age of Ultron', 'Black Panther', 'Captain America: Civil War'],
            respuestaCorrecta: 'Captain America: Civil War'
        },
        {
            pregunta: '¿Quién es el principal enemigo de Batman en el universo de DC Comics?',
            opciones: ['Lex Luthor', 'Joker', 'Bane'],
            respuestaCorrecta: 'Joker'
        },
        {
            pregunta: '¿Qué película de Disney presenta la historia de una joven llamada Moana?',
            opciones: ['Moana', 'Rapunzel', 'Mérida'],
            respuestaCorrecta: 'Moana'
        },
        {
            pregunta: '¿Qué héroe de Marvel tiene el poder de volar gracias a su traje?',
            opciones: ['Thor', 'Iron Man', 'Black Widow'],
            respuestaCorrecta: 'Iron Man'
        },
        {
            pregunta: '¿Cómo se llama el planeta natal de Superman en el universo de DC?',
            opciones: ['Krypton', 'Asgard', 'Themyscira'],
            respuestaCorrecta: 'Krypton'
        },
        {
            pregunta: '¿Quién es la princesa de Disney que fue maldecida por la bruja Maléfica?',
            opciones: ['Blancanieves', 'Aurora', 'Rapunzel'],
            respuestaCorrecta: 'Aurora'
        },
        {
            pregunta: '¿Qué héroe de Marvel es conocido como el Capitán del Escudo?',
            opciones: ['Iron Man', 'Black Panther', 'Captain America'],
            respuestaCorrecta: 'Captain America'
        },
        {
            pregunta: '¿Qué película de Marvel introduce a los Guardianes de la Galaxia?',
            opciones: ['Avengers: Endgame', 'Guardians of the Galaxy', 'Thor: Ragnarok'],
            respuestaCorrecta: 'Guardians of the Galaxy'
        },
        {
            pregunta: '¿Qué superhéroe de DC tiene como alter ego a Bruce Wayne?',
            opciones: ['Superman', 'Batman', 'Green Lantern'],
            respuestaCorrecta: 'Batman'
        },
        {
            pregunta: '¿Cuál es el nombre de la villana principal de *Frozen*?',
            opciones: ['Ursula', 'Maléfica', 'Elsa'],
            respuestaCorrecta: 'Elsa'
        },
        {
            pregunta: '¿Quién es el hermano de Thor en las películas de Marvel?',
            opciones: ['Loki', 'Hela', 'Odin'],
            respuestaCorrecta: 'Loki'
        },
        {
            pregunta: '¿Qué película de Disney tiene como protagonista a una princesa que vive en un reino de hielo?',
            opciones: ['Frozen', 'Mulan', 'La Bella y la Bestia'],
            respuestaCorrecta: 'Frozen'
        },
        {
            pregunta: '¿Qué superhéroe de DC es conocido como el "Hombre de Acero"?',
            opciones: ['Batman', 'Aquaman', 'Superman'],
            respuestaCorrecta: 'Superman'
        },
        {
            pregunta: '¿Qué película de Marvel reúne a los Vengadores para pelear contra Ultron?',
            opciones: ['Avengers: Age of Ultron', 'Avengers: Infinity War', 'Avengers: Endgame'],
            respuestaCorrecta: 'Avengers: Age of Ultron'
        },
        {
            pregunta: '¿En qué película de DC Comics aparece Aquaman por primera vez?',
            opciones: ['Justice League', 'Aquaman', 'Batman v Superman: Dawn of Justice'],
            respuestaCorrecta: 'Batman v Superman: Dawn of Justice'
        },
        {
            pregunta: "¿Qué estilo musical tiene una gran influencia del folclore tradicional mexicano?",
            opciones: ["Ranchera", "Reggaetón", "Electro"],
            respuestaCorrecta: "Ranchera"
        },
        {
            pregunta: "¿En qué género musical predomina el uso de guitarras eléctricas y amplificadores?",
            opciones: ["Rock", "Jazz", "Tango"],
            respuestaCorrecta: "Rock"
        },
        {
            pregunta: "¿Qué género musical es conocido por su ritmo rápido y enérgico, y tiene orígenes en los años 80 en Estados Unidos?",
            opciones: ["Hip-hop", "Punk", "EDM"],
            respuestaCorrecta: "Punk"
        },
        {
            pregunta: "¿Cuál de estos géneros musicales es conocido por su estilo instrumental y complejidad técnica?",
            opciones: ["Rock progresivo", "Salsa", "Bachata"],
            respuestaCorrecta: "Rock progresivo"
        },
        {
            pregunta: "¿Qué género musical tiene su origen en las comunidades afroamericanas de Nueva Orleans?",
            opciones: ["Jazz", "Blues", "Soul"],
            respuestaCorrecta: "Jazz"
        },
        {
            pregunta: "¿Qué género musical latino es conocido por sus fuertes influencias de África y Cuba?",
            opciones: ["Salsa", "Merengue", "Cumbia"],
            respuestaCorrecta: "Salsa"
        },
        {
            pregunta: "¿En qué género musical predomina el uso del sintetizador y el ritmo electrónico?",
            opciones: ["Rock", "EDM", "Jazz"],
            respuestaCorrecta: "EDM"
        },
        {
            pregunta: "¿Qué género musical tiene sus raíces en la música folklórica de la región andina de Sudamérica?",
            opciones: ["Tango", "Cumbia", "Música andina"],
            respuestaCorrecta: "Música andina"
        },
        {
            pregunta: "¿Qué género musical se originó en el Caribe, específicamente en Cuba?",
            opciones: ["Merengue", "Salsa", "Son cubano"],
            respuestaCorrecta: "Son cubano"
        },
        {
            pregunta: "¿Qué género musical es muy popular en Brasil y tiene influencias africanas y portuguesas?",
            opciones: ["Bossa nova", "Samba", "Tango"],
            respuestaCorrecta: "Samba"
        },
        {
            pregunta: "¿Qué género musical es caracterizado por su uso de bases rítmicas lentas y pesadas con un enfoque lírico sobre fiestas y estilo de vida?",
            opciones: ["Trap", "Salsa", "R&B"],
            respuestaCorrecta: "Trap"
        },
        {
            pregunta: "¿Qué género musical de raíces afroamericanas tiene un enfoque en la improvisación y una rica armonía?",
            opciones: ["Jazz", "Blues", "Soul"],
            respuestaCorrecta: "Jazz"
        },
        {
            pregunta: "¿Qué género musical tiene su origen en la música de los inmigrantes italianos y se caracteriza por sus letras melancólicas y orquestaciones teatrales?",
            opciones: ["Opera", "Tango", "Bolero"],
            respuestaCorrecta: "Opera"
        },
        {
            pregunta: "¿Qué estilo musical tiene influencias del folk y el rock, y es popular en los festivales de música de todo el mundo?",
            opciones: ["Indie rock", "Pop", "Reggaetón"],
            respuestaCorrecta: "Indie rock"
        },
        {
            pregunta: "¿Qué género musical tiene influencias del hip-hop, pero con un ritmo más lento y pesado, especialmente en los últimos años?",
            opciones: ["Trap", "Funk", "Disco"],
            respuestaCorrecta: "Trap"
        },
        {
            pregunta: "¿En qué género musical es más común el uso de la guitarra flamenca y los castanets?",
            opciones: ["Flamenco", "Salsa", "Tango"],
            respuestaCorrecta: "Flamenco"
        },
        {
            pregunta: "¿Qué género musical tiene sus raíces en la música tradicional de Brasil y se caracteriza por su ritmo rápido y festivo?",
            opciones: ["Samba", "Bossa nova", "Reggaetón"],
            respuestaCorrecta: "Samba"
        },
        {
            pregunta: "¿En qué género musical se utilizan comúnmente instrumentos como el violín y el acordeón, especialmente en la música de Europa del Este?",
            opciones: ["Klezmer", "Polka", "Salsa"],
            respuestaCorrecta: "Polka"
        },
        {
            pregunta: "¿Qué género musical originó artistas como Bob Marley y tiene un fuerte ritmo de percusión?",
            opciones: ["Reggae", "Dancehall", "Hip-hop"],
            respuestaCorrecta: "Reggae"
        },
        {
            pregunta: "¿En qué videojuego los jugadores deben construir y defender estructuras con bloques en un mundo abierto?",
            opciones: ["Minecraft", "Fortnite", "PUBG"],
            respuestaCorrecta: "Minecraft"
        },
        {
            pregunta: "¿Cuál de estos juegos es un juego de batalla real desarrollado por Epic Games?",
            opciones: ["Minecraft", "Fortnite", "Call of Duty"],
            respuestaCorrecta: "Fortnite"
        },
        {
            pregunta: "¿Qué videojuego es conocido por su lema '¡Bola de fuego!' y su personaje principal, Mario?",
            opciones: ["Super Mario Bros", "Sonic the Hedgehog", "The Legend of Zelda"],
            respuestaCorrecta: "Super Mario Bros"
        },
        {
            pregunta: "¿Qué juego tiene como protagonistas a un grupo de pequeños seres llamados 'Pikmin'?",
            opciones: ["Pokémon", "Pikmin", "Animal Crossing"],
            respuestaCorrecta: "Pikmin"
        },
        {
            pregunta: "¿En qué videojuego debes completar misiones y recolectar objetos mientras te enfrentas a zombies?",
            opciones: ["Resident Evil", "The Walking Dead", "Left 4 Dead"],
            respuestaCorrecta: "Left 4 Dead"
        },
        {
            pregunta: "¿Qué juego de carreras es famoso por su conducción realista y competiciones globales?",
            opciones: ["Need for Speed", "Gran Turismo", "Mario Kart"],
            respuestaCorrecta: "Gran Turismo"
        },
        {
            pregunta: "¿En qué videojuego los jugadores deben construir un refugio mientras luchan contra enemigos nocturnos?",
            opciones: ["Terraria", "Minecraft", "Stardew Valley"],
            respuestaCorrecta: "Minecraft"
        },
        {
            pregunta: "¿Qué videojuego tiene como protagonistas a criaturas llamadas 'Pokémon' que los jugadores capturan y entrenan?",
            opciones: ["Monster Hunter", "Pokémon", "Digimon"],
            respuestaCorrecta: "Pokémon"
        },
        {
            pregunta: "¿En qué juego de disparos en primera persona los jugadores luchan por dominar puntos estratégicos del mapa en equipos?",
            opciones: ["Call of Duty", "Overwatch", "Battlefield"],
            respuestaCorrecta: "Overwatch"
        },
        {
            pregunta: "¿En qué juego los jugadores controlan un equipo de héroes en un campo de batalla para destruir la base enemiga?",
            opciones: ["Fortnite", "League of Legends", "Dota 2"],
            respuestaCorrecta: "League of Legends"
        },
        {
            pregunta: "¿En qué juego los jugadores deben crear y gestionar su propia ciudad en una isla tropical?",
            opciones: ["SimCity", "Animal Crossing", "Tropico"],
            respuestaCorrecta: "Tropico"
        },
        {
            pregunta: "¿Qué videojuego se juega con piezas en un tablero virtual donde cada jugador controla un ejército para capturar al rey enemigo?",
            opciones: ["Ajedrez", "League of Legends", "Clash Royale"],
            respuestaCorrecta: "Ajedrez"
        },
        {
            pregunta: "¿En qué juego de plataformas debes saltar y correr por diferentes niveles mientras recolectas anillos dorados?",
            opciones: ["Super Mario Bros", "Sonic the Hedgehog", "Donkey Kong"],
            respuestaCorrecta: "Sonic the Hedgehog"
        },
        {
            pregunta: "¿Qué videojuego de aventura presenta un mapa vasto y abierto donde el personaje principal es Link?",
            opciones: ["The Legend of Zelda", "Final Fantasy", "Skyrim"],
            respuestaCorrecta: "The Legend of Zelda"
        },
        {
            pregunta: "¿En qué juego de rol los jugadores exploran mundos abiertos y deben completar misiones y luchar contra monstruos?",
            opciones: ["Skyrim", "Elder Scrolls Online", "Dark Souls"],
            respuestaCorrecta: "Skyrim"
        },
        {
            pregunta: "¿Qué juego de terror en primera persona te pone en la piel de un detective buscando pistas en una ciudad desolada llena de criaturas extrañas?",
            opciones: ["Silent Hill", "Outlast", "Alan Wake"],
            respuestaCorrecta: "Silent Hill"
        },
        {
            pregunta: "¿En qué videojuego de lucha dos jugadores se enfrentan usando personajes con habilidades únicas?",
            opciones: ["Mortal Kombat", "Street Fighter", "Tekken"],
            respuestaCorrecta: "Street Fighter"
        },
        {
            pregunta: "¿Qué juego de supervivencia es famoso por permitir a los jugadores cazar dinosaurios en un mundo abierto?",
            opciones: ["Fallout", "Ark: Survival Evolved", "DayZ"],
            respuestaCorrecta: "Ark: Survival Evolved"
        },
        {
            pregunta: "¿Qué videojuego de construcción y supervivencia permite a los jugadores crear sus propios mundos y defenderse de hordas de monstruos?",
            opciones: ["Terraria", "Fortnite", "Minecraft"],
            respuestaCorrecta: "Minecraft"
        },
        {
            pregunta: "¿En qué juego de aventuras un joven guerrero llamado Kratos lucha contra los dioses del Olimpo?",
            opciones: ["God of War", "Assassin's Creed", "The Witcher 3"],
            respuestaCorrecta: "God of War"
        },
        {
            pregunta: "¿Cómo se llama la hija de Don Cangrejo?",
            opciones: ["Perla", "Arenita", "Pati"],
            respuestaCorrecta: "Perla"
        },
        {
            pregunta: "¿Qué instrumento musical toca Calamardo?",
            opciones: ["Guitarra", "Piano", "Clarinete"],
            respuestaCorrecta: "Clarinete"
        },
        {
            pregunta: "¿Quién es el protagonista principal de Dragon Ball?",
            opciones: ["Goku", "Vegeta", "Piccolo"],
            respuestaCorrecta: "Goku"
        },
        {
            pregunta: "¿Cuál es el nombre de la ciudad donde vive Naruto Uzumaki?",
            opciones: ["Konoha", "Suna", "Kiri"],
            respuestaCorrecta: "Konoha"
        },
        {
            pregunta: "¿Qué animal es el compañero de Luffy en One Piece?",
            opciones: ["Un pájaro", "Un perro", "Un zorro"],
            respuestaCorrecta: "Un pájaro"
        },
        {
            pregunta: "¿Qué poder tiene el protagonista de My Hero Academia, Izuku Midoriya?",
            opciones: ["Telequinesis", "Fuerza aumentada", "El poder de All Might"],
            respuestaCorrecta: "El poder de All Might"
        },
        {
            pregunta: "¿Cómo se llama la espada de Ichigo Kurosaki en Bleach?",
            opciones: ["Zangetsu", "Tensa Zangetsu", "Kusanagi"],
            respuestaCorrecta: "Tensa Zangetsu"
        },
        {
            pregunta: "¿Cuál es el sueño de Gon Freecss en Hunter x Hunter?",
            opciones: ["Ser el más fuerte", "Encontrar a su padre", "Ser el presidente del gremio"],
            respuestaCorrecta: "Encontrar a su padre"
        },
        {
            pregunta: "¿Cómo se llama el hermano de Edward Elric en Fullmetal Alchemist?",
            opciones: ["Alphonse Elric", "Roy Mustang", "Scar"],
            respuestaCorrecta: "Alphonse Elric"
        },
        {
            pregunta: "¿Quién es el creador de la serie de anime Attack on Titan?",
            opciones: ["Masashi Kishimoto", "Hajime Isayama", "Yoshihiro Togashi"],
            respuestaCorrecta: "Hajime Isayama"
        },
        {
            pregunta: "¿Qué habilidad tiene el protagonista de Death Note, Light Yagami?",
            opciones: ["Superfuerza", "Invulnerabilidad", "Poder de la muerte"],
            respuestaCorrecta: "Poder de la muerte"
        },
        {
            pregunta: "¿Cuál es el apellido de la protagonista de Sailor Moon?",
            opciones: ["Tsukino", "Aino", "Hino"],
            respuestaCorrecta: "Tsukino"
        },
        {
            pregunta: "¿Qué nombre recibe el perro robot de los Jetsons?",
            opciones: ["Astroboy", "Rocco", "Astro"],
            respuestaCorrecta: "Astro"
        },
        {
            pregunta: "¿Quién es el mejor amigo de Scooby-Doo?",
            opciones: ["Shaggy", "Fred", "Velma"],
            respuestaCorrecta: "Shaggy"
        },
        {
            pregunta: "¿Cómo se llama el amigo de Bob Esponja que es una estrella de mar?",
            opciones: ["Calamardo", "Patricio", "Arenita"],
            respuestaCorrecta: "Patricio"
        },
        {
            pregunta: "¿En qué ciudad vive el detective Conan?",
            opciones: ["Tokio", "Osaka", "Kyoto"],
            respuestaCorrecta: "Tokio"
        },
        {
            pregunta: "¿Cuál es el nombre de la nave espacial de los Picapiedra?",
            opciones: ["El Pedrero", "El Pedestal", "La Piedra Voladora"],
            respuestaCorrecta: "El Pedrero"
        },
        {
            pregunta: "¿Cómo se llama la hermana menor de Bart Simpson?",
            opciones: ["Maggie", "Lisa", "Marge"],
            respuestaCorrecta: "Maggie"
        },
        {
            pregunta: "¿Qué tipo de animal es el protagonista de One Punch Man?",
            opciones: ["Un humano", "Un cyborg", "Un extraterrestre"],
            respuestaCorrecta: "Un humano"
        },
        {
            pregunta: "¿Cómo se llama la maestra de Naruto Uzumaki en la academia ninja?",
            opciones: ["Tsunade", "Hinata", "Iruka"],
            respuestaCorrecta: "Iruka"
        },
        {
            pregunta: "¿Qué fruta come Monkey D. Luffy para ganar sus poderes en One Piece?",
            opciones: ["Gomu Gomu", "Hito Hito", "Mera Mera"],
            respuestaCorrecta: "Gomu Gomu"
        },
        {
            pregunta: "¿Cuál es el poder de la protagonista de Cardcaptor Sakura?",
            opciones: ["Controlar el viento", "Capturar cartas mágicas", "Transformarse en otros seres"],
            respuestaCorrecta: "Capturar cartas mágicas"
        },
        {
            pregunta: "¿Cómo se llama el hermano de Goku?",
            opciones: ["Vegeta", "Raditz", "Trunks"],
            respuestaCorrecta: "Raditz"
        },
        {
            pregunta: "¿Qué nombre tiene la espada de Inuyasha?",
            opciones: ["Kusanagi", "Tessaiga", "Excalibur"],
            respuestaCorrecta: "Tessaiga"
        },
        {
            pregunta: "¿Cuál es el nombre de la protagonista de El viaje de Chihiro?",
            opciones: ["Chihiro", "Haku", "Satsuki"],
            respuestaCorrecta: "Chihiro"
        },
        {
            pregunta: "¿Quién es el líder de los Vengadores en la serie de anime?",
            opciones: ["Iron Man", "Capitán América", "Thor"],
            respuestaCorrecta: "Capitán América"
        },
        {
            pregunta: "¿Quién es el villano principal en el anime Dragon Ball Z?",
            opciones: ["Freezer", "Cell", "Majin Buu"],
            respuestaCorrecta: "Freezer"
        },
        {
            pregunta: "¿Qué tipo de criatura es el protagonista de Digimon?",
            opciones: ["Un dragón", "Un dinosaurio", "Un Greymon"],
            respuestaCorrecta: "Un Greymon"
        },
        {
            pregunta: "¿Cómo se llama la ciudad donde viven los personajes de Los Simpsons?",
            opciones: ["Springfield", "Shelbyville", "Riverton"],
            respuestaCorrecta: "Springfield"
        },
        {
            pregunta: "¿Cómo se llama el personaje principal de la serie Bleach?",
            opciones: ["Rukia Kuchiki", "Ichigo Kurosaki", "Renji Abarai"],
            respuestaCorrecta: "Ichigo Kurosaki"
        },
        {
            pregunta: "¿Quién es el protagonista de la serie de anime Demon Slayer?",
            opciones: ["Tanjiro Kamado", "Nezuko Kamado", "Zenitsu Agatsuma"],
            respuestaCorrecta: "Tanjiro Kamado"
        },
        {
            pregunta: "¿Qué anime es conocido por la frase '¡Mi amigo es el mejor del mundo!'?",
            opciones: ["Naruto", "Bleach", "One Piece"],
            respuestaCorrecta: "One Piece"
        },
        {
            pregunta: "¿Cuál es el nombre de la nave de los Vengadores en el anime Marvel?",
            opciones: ["La Quinjet", "La Helicarrier", "La Stark Jet"],
            respuestaCorrecta: "La Helicarrier"
        },
        {
            pregunta: "¿En qué anime aparece un robot llamado Doraemon?",
            opciones: ["Dragon Ball", "Doraemon", "Digimon"],
            respuestaCorrecta: "Doraemon"
        },
        {
            pregunta: "¿Cómo se llama la mascota de Ash en Pokémon?",
            opciones: ["Pikachu", "Charmander", "Bulbasaur"],
            respuestaCorrecta: "Pikachu"
        },
        {
            pregunta: "¿Cómo se llama el segundo Hokage en Naruto?",
            opciones: ["Hashirama Senju", "Tobirama Senju", "Minato Namikaze"],
            respuestaCorrecta: "Tobirama Senju"
        },
        {
            pregunta: "¿Cómo se llama el último miembro de la tripulación de Luffy en One Piece?",
            opciones: ["Nami", "Chopper", "Jinbe"],
            respuestaCorrecta: "Jinbe"
        },
        {
            pregunta: "¿Cuál es el nombre del espíritu malvado que lucha contra los Guerreros Z en Dragon Ball Z?",
            opciones: ["Frieza", "Cell", "Majin Buu"],
            respuestaCorrecta: "Majin Buu"
        },
        {
            pregunta: "¿Qué hace el personaje de Luffy en One Piece con su poder de goma?",
            opciones: ["Estirar su cuerpo", "Crear fuego", "Controlar el agua"],
            respuestaCorrecta: "Estirar su cuerpo"
        },
        {
            pregunta: "¿Cuál es el nombre de la nave espacial que usa Goku para viajar al planeta Namek?",
            opciones: ["La Nave de la Esperanza", "La Nave de Goku", "La Nave Saiyajin"],
            respuestaCorrecta: "La Nave de Goku"
        },
        {
            pregunta: "¿Quién es el villano que se fusiona con el cuerpo de Goku durante la saga de Majin Buu?",
            opciones: ["Babidi", "Vegeta", "Majin Vegeta"],
            respuestaCorrecta: "Majin Vegeta"
        },
        {
            pregunta: "¿Quién fue el primer gran enemigo de Goku en Dragon Ball?",
            opciones: ["Piccolo", "King Piccolo", "Yamcha"],
            respuestaCorrecta: "King Piccolo"
        },
        {
            pregunta: "¿Cómo se llama el padre de Trunks?",
            opciones: ["Vegeta", "Goku", "Piccolo"],
            respuestaCorrecta: "Vegeta"
        },
        {
            pregunta: "¿Qué nombre tiene el hombre que se convierte en el nuevo dios del universo tras la muerte de Kami?",
            opciones: ["Mr. Popo", "Dende", "King Kai"],
            respuestaCorrecta: "Dende"
        },
        {
            pregunta: "¿Cómo se llama el compañero de Goku en Dragon Ball Z que tiene la habilidad de transformarse en un gran mono gigante?",
            opciones: ["Goten", "Goku", "Oozaru"],
            respuestaCorrecta: "Oozaru"
        },
        {
            pregunta: "¿Cuál es el nombre de la madre de Goku?",
            opciones: ["Gine", "Chi-Chi", "Maki"],
            respuestaCorrecta: "Gine"
        },
        {
            pregunta: "¿Cómo se llama el nombre verdadero de 'Android 18' en Dragon Ball?",
            opciones: ["Lazuli", "Krillin", "C-18"],
            respuestaCorrecta: "Lazuli"
        },
        {
            pregunta: "¿Qué nombre tiene el hermano de Goku, que aparece en la saga de los Saiyajins?",
            opciones: ["Raditz", "Bardock", "Vegeta"],
            respuestaCorrecta: "Raditz"
        },
        {
            pregunta: "¿Cómo se llama el dios de la destrucción de la 12ª dimensión?",
            opciones: ["Beerus", "Jiren", "Majin Buu"],
            respuestaCorrecta: "Beerus"
        },
        {
            pregunta: "¿Qué nombre tiene la fuerza especial que Goku utiliza para luchar contra sus enemigos más poderosos?",
            opciones: ["Kamehameha", "Genki Dama", "Rasengan"],
            respuestaCorrecta: "Kamehameha"
        },
        {
            pregunta: "¿Cómo se llama el padre de Goten y Gohan?",
            opciones: ["Goku", "Piccolo", "Vegeta"],
            respuestaCorrecta: "Goku"
        },
        {
            pregunta: "¿Cómo se llama la técnica que Goku utiliza para concentrar su energía en una esfera de poder?",
            opciones: ["Kamehameha", "Genki Dama", "Final Flash"],
            respuestaCorrecta: "Genki Dama"
        },
        {
            pregunta: "¿Cómo se llama el maestro de artes marciales que entrena a Goku al principio de Dragon Ball?",
            opciones: ["Muten Roshi", "King Kai", "Tien Shinhan"],
            respuestaCorrecta: "Muten Roshi"
        },
        {
            pregunta: "¿Cuál es el apellido de Naruto?",
            opciones: ["Uchiha", "Namikaze", "Uzumaki"],
            respuestaCorrecta: "Uzumaki"
        },
        {
            pregunta: "¿Cómo se llama el mejor amigo de Naruto?",
            opciones: ["Sasuke Uchiha", "Kakashi Hatake", "Neji Hyuga"],
            respuestaCorrecta: "Sasuke Uchiha"
        },
        {
            pregunta: "¿Quién es el líder del Equipo 7, el sensei de Naruto, Sasuke y Sakura?",
            opciones: ["Jiraiya", "Minato Namikaze", "Kakashi Hatake"],
            respuestaCorrecta: "Kakashi Hatake"
        },
        {
            pregunta: "¿Cuál es el apodo de Naruto después de dominar el poder del Zorro de Nueve Colas?",
            opciones: ["El Sabio de los Seis Caminos", "El Último Uchiha", "El Hokage"],
            respuestaCorrecta: "El Hokage"
        },
        {
            pregunta: "¿Cuál es el verdadero nombre de la amiga y compañera de Naruto en el Equipo 7?",
            opciones: ["Sakura Haruno", "Hinata Hyuga", "Temari"],
            respuestaCorrecta: "Sakura Haruno"
        },
        {
            pregunta: "¿Qué nombre recibe el jutsu más poderoso de Sasuke Uchiha?",
            opciones: ["Chidori", "Susanoo", "Amaterasu"],
            respuestaCorrecta: "Susanoo"
        },
        {
            pregunta: "¿Qué animal es el compañero de Naruto durante su entrenamiento?",
            opciones: ["Un sapo", "Una serpiente", "Un cuervo"],
            respuestaCorrecta: "Un sapo"
        },
        {
            pregunta: "¿Qué es el Rinnegan, la habilidad ocular de Pain?",
            opciones: ["Un Sharingan", "Un Dojutsu", "Un Kekkei Genkai"],
            respuestaCorrecta: "Un Dojutsu"
        },
        {
            pregunta: "¿Cuál es el apellido de Sasuke?",
            opciones: ["Uchiha", "Hyuga", "Senju"],
            respuestaCorrecta: "Uchiha"
        },
        {
            pregunta: "¿Qué animal tiene como compañero Sakura?",
            opciones: ["Una rana", "Una paloma", "Un león"],
            respuestaCorrecta: "Una paloma"
        },
        {
            pregunta: "¿Cómo se llama el líder de la organización Akatsuki que tiene la capacidad de controlar a los muertos?",
            opciones: ["Pain", "Madara Uchiha", "Itachi Uchiha"],
            respuestaCorrecta: "Pain"
        },
        {
            pregunta: "¿Cuál es el apodo de la madre de Naruto, Kushina?",
            opciones: ["La Luna Roja", "La Diosa del Fuego", "La Mujer del Viento"],
            respuestaCorrecta: "La Luna Roja"
        },
        {
            pregunta: "¿Qué jutsu usa Naruto para invocar a los sapos del Monte Myoboku?",
            opciones: ["Kage Bunshin", "Summoning Jutsu", "Rasengan"],
            respuestaCorrecta: "Summoning Jutsu"
        },
        {
            pregunta: "¿Cómo se llama la hermana de Sasuke Uchiha?",
            opciones: ["Karin", "Mikoto", "Sakura"],
            respuestaCorrecta: "Mikoto"
        },
        {
            pregunta: "¿Qué habilidad tiene el Sharingan de Sasuke?",
            opciones: ["Leer mentes", "Predecir los movimientos del oponente", "Controlar el tiempo"],
            respuestaCorrecta: "Predecir los movimientos del oponente"
        },
        {
            pregunta: "¿Cuál es el objetivo de la organización Akatsuki?",
            opciones: ["Destruir Konoha", "Capturar las Bestias con Cola", "Obtener la inmortalidad"],
            respuestaCorrecta: "Capturar las Bestias con Cola"
        },
        {
            pregunta: "¿Quién es el líder de la Aldea Oculta de la Niebla?",
            opciones: ["Zabuza Momochi", "Mei Terumi", "Raikage"],
            respuestaCorrecta: "Mei Terumi"
        },
        {
            pregunta: "¿Cómo se llama la técnica más poderosa de Naruto, que usa el poder del Zorro de Nueve Colas?",
            opciones: ["Rasengan", "Kyubi Mode", "Chidori"],
            respuestaCorrecta: "Kyubi Mode"
        },
        {
            pregunta: "¿Cuál es el nombre del mejor amigo de Naruto que se convierte en su enemigo?",
            opciones: ["Neji", "Sasuke", "Shikamaru"],
            respuestaCorrecta: "Sasuke"
        },
        {
            pregunta: "¿Qué es el Chidori, una de las técnicas más utilizadas por Sasuke?",
            opciones: ["Una técnica de invocación", "Un jutsu de viento", "Una técnica de rayos"],
            respuestaCorrecta: "Una técnica de rayos"
        },
        {
            pregunta: "¿Cómo se llama el líder de la organización Akatsuki que tiene el poder del Mangekyo Sharingan?",
            opciones: ["Madara Uchiha", "Itachi Uchiha", "Nagato"],
            respuestaCorrecta: "Itachi Uchiha"
        },
        {
            pregunta: "¿Cómo se llama la Aldea Oculta que es conocida por su habilidad con el agua?",
            opciones: ["Konoha", "Suna", "Kirigakure"],
            respuestaCorrecta: "Kirigakure"
        },
        {
            pregunta: "¿Quién fue el primer Hokage de la Aldea de la Hoja?",
            opciones: ["Tobirama Senju", "Hiruzen Sarutobi", "Hashirama Senju"],
            respuestaCorrecta: "Hashirama Senju"
        },
        {
            pregunta: "¿Qué país latinoamericano tiene la tradición de 'La Fiesta de la Virgen de la Candelaria'?",
            opciones: ["Perú", "Bolivia", "Ecuador"],
            respuestaCorrecta: "Bolivia"
        },
        {
            pregunta: "¿En qué país se celebra el 'Carnaval de Oruro', considerado uno de los más grandes del mundo?",
            opciones: ["Bolivia", "Brasil", "Venezuela"],
            respuestaCorrecta: "Bolivia"
        },
        {
            pregunta: "¿En qué país se encuentra la famosa ciudad de Santiago de Chile?",
            opciones: ["Perú", "Chile", "Ecuador"],
            respuestaCorrecta: "Chile"
        },
        {
            pregunta: "¿En qué país se encuentra el famoso Carnaval de Barranquilla?",
            opciones: ["Colombia", "Venezuela", "Brasil"],
            respuestaCorrecta: "Colombia"
        },
        {
            pregunta: "¿Qué ciudad es conocida como la 'Perla del Caribe'?",
            opciones: ["Cartagena", "Cancún", "La Habana"],
            respuestaCorrecta: "Cartagena"
        },
        {
            pregunta: "¿Qué país tiene la mayor población de habla hispana en el mundo?",
            opciones: ["Argentina", "México", "España"],
            respuestaCorrecta: "México"
        },
        {
            pregunta: "¿Quién fue el famoso líder de la revolución cubana?",
            opciones: ["Simón Bolívar", "Ernesto 'Che' Guevara", "Fidel Castro"],
            respuestaCorrecta: "Fidel Castro"
        },
        {
            pregunta: "¿Qué país latinoamericano es famoso por la producción de café y las montañas del Andes?",
            opciones: ["Colombia", "Venezuela", "Bolivia"],
            respuestaCorrecta: "Colombia"
        },
        {
            pregunta: "¿Quién es el youtuber conocido por el canal 'El Rubius'?",
            opciones: ["Rubén Doblas", "Germán Garmendia", "Daniel González"],
            respuestaCorrecta: "Rubén Doblas"
        },
        {
            pregunta: "¿Quién es el youtuber conocido por el canal 'AuronPlay'?",
            opciones: ["Raúl Álvarez Genes", "David Cañas", "José Antonio Ramos"],
            respuestaCorrecta: "Raúl Álvarez Genes"
        },
        {
            pregunta: "¿Quién es el youtuber conocido por el canal 'Vegetta777'?",
            opciones: ["Manuel González", "Samuel de Luque", "Javier Ramos"],
            respuestaCorrecta: "Samuel de Luque"
        },
        {
            pregunta: "¿Quién es el youtuber conocido por el canal 'Willyrex'?",
            opciones: ["Guillermo Díaz", "Willy Fernández", "José Martínez"],
            respuestaCorrecta: "Guillermo Díaz"
        },
        {
            pregunta: "¿Quién es el youtuber conocido por el canal 'TheGrefg'?",
            opciones: ["David Rodríguez", "Pablo Martínez", "Gerard Piqué"],
            respuestaCorrecta: "David Rodríguez"
        },
        {
            pregunta: "¿Quién es el youtuber conocido por el canal 'Dross'?",
            opciones: ["Ángel David Revilla", "Daniel Sosa", "Andrés Díaz"],
            respuestaCorrecta: "Ángel David Revilla"
        },
        {
            pregunta: "¿Quién es el youtuber conocido por el canal 'LuzuGames'?",
            opciones: ["Luzu", "Luis Miguel González", "Luis Fernández"],
            respuestaCorrecta: "Luis Miguel González"
        },
        {
            pregunta: "¿Quién es el youtuber conocido por el canal 'Javi G'?",
            opciones: ["Javier González", "Javier Moya", "Javier Zafra"],
            respuestaCorrecta: "Javier González"
        },
        {
            pregunta: "¿Quién es el youtuber conocido por el canal 'LosPolinesios'?",
            opciones: ["Roberto Martínez", "Karen, Lesslie y Rafael", "Sebastián González"],
            respuestaCorrecta: "Karen, Lesslie y Rafael"
        },
        {
            pregunta: "¿Quién es el youtuber conocido por el canal 'Yosoyplex'?",
            opciones: ["Pablo Rodríguez", "José Luis López", "Alex Sánchez"],
            respuestaCorrecta: "Alex Sánchez"
        },
        {
            pregunta: "¿Cuál es el nombre real de 'Goku' en Dragon Ball?",
            opciones: ["Kakarotto", "Son Goku", "Gohan"],
            respuestaCorrecta: "Kakarotto"
        },
        {
            pregunta: "¿Qué nombre tiene el padre de Goku?",
            opciones: ["Bardock", "Goku Sr.", "Vegeta"],
            respuestaCorrecta: "Bardock"
        },
        {
            pregunta: "¿Cuál es el verdadero nombre de 'Vegeta', el príncipe de los Saiyajin?",
            opciones: ["Bardock", "Vegeta Jr.", "Prince Vegeta"],
            respuestaCorrecta: "Vegeta Jr."
        },
        {
            pregunta: "¿Cómo se llama el hijo de Vegeta y Bulma?",
            opciones: ["Trunks", "Goten", "Gohan"],
            respuestaCorrecta: "Trunks"
        },
        {
            pregunta: "¿Cuál es el nombre real de 'Piccolo'?",
            opciones: ["Piccolo Jr.", "Piccolo Daimao", "Piccolo-sama"],
            respuestaCorrecta: "Piccolo Jr."
        },
        {
            pregunta: "¿Cuál es el nombre verdadero de 'Frieza', el emperador del universo?",
            opciones: ["Freezer", "Frieza Zarbon", "Prince Frieza"],
            respuestaCorrecta: "Freezer"
        },
        {
            pregunta: "¿Cómo se llama la esposa de Goku?",
            opciones: ["Chi-Chi", "Bulma", "Videl"],
            respuestaCorrecta: "Chi-Chi"
        },
        {
            pregunta: "¿Quién es el mejor amigo de Goku y su nombre verdadero es 'Kuririn'?",
            opciones: ["Krillin", "Tien Shinhan", "Yamcha"],
            respuestaCorrecta: "Krillin"
        },
        {
            pregunta: "¿Cómo se llama el hijo de Goku y Chi-Chi?",
            opciones: ["Goten", "Gohan", "Trunks"],
            respuestaCorrecta: "Goten"
        },
        {
            pregunta: "¿Cuál es el nombre real de 'Majin Buu'?",
            opciones: ["Bibidi", "Majin Buu", "Uub"],
            respuestaCorrecta: "Majin Buu"
        },
        {
            pregunta: "¿Cómo se llama el anciano Maestro que entrena a Goku?",
            opciones: ["Roshi", "Kami", "Mr. Popo"],
            respuestaCorrecta: "Roshi"
        },
        {
            pregunta: "¿Quién es el hijo de Vegeta y qué nombre tiene?",
            opciones: ["Trunks", "Goten", "Bra"],
            respuestaCorrecta: "Trunks"
        },
        {
            pregunta: "¿Cómo se llama la hermana de Goku?",
            opciones: ["Chi-Chi", "Gine", "Maki"],
            respuestaCorrecta: "Gine"
        },
        {
            pregunta: "¿Qué nombre tiene el maestro de Goku en Dragon Ball?",
            opciones: ["Muten Roshi", "King Kai", "Yamcha"],
            respuestaCorrecta: "Muten Roshi"
        },
        {
            pregunta: "¿Cómo se llama el personaje que fue uno de los villanos principales durante la saga de los Androides?",
            opciones: ["Cell", "Frieza", "Raditz"],
            respuestaCorrecta: "Cell"
        },
        {
            pregunta: "¿Cómo se llama el rival de Goku en Dragon Ball Z que proviene de otro universo?",
            opciones: ["Jiren", "Broly", "Hit"],
            respuestaCorrecta: "Jiren"
        },
        {
            pregunta: "¿Cómo se llama el gran luchador que entrenó a Goku en la saga de los Saiyajins?",
            opciones: ["Whis", "Vegeta", "Master Roshi"],
            respuestaCorrecta: "Whis"
        },
        {
            pregunta: "¿Cómo se llama el exnovio de Bulma y mejor amigo de Goku?",
            opciones: ["Yamcha", "Goku", "Piccolo"],
            respuestaCorrecta: "Yamcha"
        },
        {
            pregunta: "¿Qué nombre tiene el hijo de Gohan y Videl?",
            opciones: ["Pan", "Uub", "Trunks"],
            respuestaCorrecta: "Pan"
        },
        {
            pregunta: "¿Qué estado mexicano es conocido por su producción de mezcal?",
            opciones: ["Oaxaca", "Jalisco", "Veracruz"],
            respuestaCorrecta: "Oaxaca"
        },
        {
            pregunta: "¿Qué escritor mexicano ganó el Premio Nobel de Literatura en 1990?",
            opciones: ["Octavio Paz", "Carlos Fuentes", "Juan Rulfo"],
            respuestaCorrecta: "Octavio Paz"
        },
        {
            pregunta: "¿Qué es el 'chili' en la comida mexicana?",
            opciones: ["Un tipo de queso", "Un tipo de chile picante", "Un tipo de pan"],
            respuestaCorrecta: "Un tipo de chile picante"
        },
        {
            pregunta: "¿Qué animal aparece en el escudo nacional de México?",
            opciones: ["Lobo", "Águila", "Jaguar"],
            respuestaCorrecta: "Águila"
        },
        {
            pregunta: "¿Quién pintó el mural 'Man at the Crossroads', que se encuentra en el Rockefeller Center de Nueva York?",
            opciones: ["David Alfaro Siqueiros", "Diego Rivera", "José Clemente Orozco"],
            respuestaCorrecta: "Diego Rivera"
        },
        {
            pregunta: "¿Qué lugar es conocido como la cuna del mariachi?",
            opciones: ["Ciudad de México", "Guadalajara", "Cancún"],
            respuestaCorrecta: "Guadalajara"
        },
        {
            pregunta: "¿Qué es un 'chamaco' en México?",
            opciones: ["Un tipo de plato tradicional", "Un niño", "Una bebida alcohólica"],
            respuestaCorrecta: "Un niño"
        },
        {
            pregunta: "¿En qué país se originó el tango?",
            opciones: ["Argentina", "Uruguay", "Brasil"],
            respuestaCorrecta: "Argentina"
        },
        {
            pregunta: "¿Cuál es la capital de Colombia?",
            opciones: ["Medellín", "Bogotá", "Caracas"],
            respuestaCorrecta: "Bogotá"
        },
        {
            pregunta: "¿Qué país latinoamericano es conocido por su famosa celebración del 'Carnaval de Río'?",
            opciones: ["Brasil", "Argentina", "Venezuela"],
            respuestaCorrecta: "Brasil"
        },
        {
            pregunta: "¿En qué país se encuentra el Machu Picchu?",
            opciones: ["Chile", "Perú", "Bolivia"],
            respuestaCorrecta: "Perú"
        },
        {
            pregunta: "¿Quién fue el líder de la independencia de Venezuela?",
            opciones: ["Simón Bolívar", "José de San Martín", "Bernardo O'Higgins"],
            respuestaCorrecta: "Simón Bolívar"
        },
        {
            pregunta: "¿En qué país se originó la comida conocida como 'ceviche'?",
            opciones: ["Colombia", "Perú", "Ecuador"],
            respuestaCorrecta: "Perú"
        },
        {
            pregunta: "¿En qué país se encuentra la isla de Pascua?",
            opciones: ["Chile", "Argentina", "Perú"],
            respuestaCorrecta: "Chile"
        },
        {
            pregunta: "¿Quién es conocido como 'El Libertador' de Sudamérica?",
            opciones: ["Francisco de Miranda", "Simón Bolívar", "Manuel Belgrano"],
            respuestaCorrecta: "Simón Bolívar"
        },
        {
            pregunta: "¿Qué comida es típica de México y se hace con masa de maíz rellena de carne o frijoles?",
            opciones: ["Burrito", "Tacos", "Arepa"],
            respuestaCorrecta: "Tacos"
        },
        {
            pregunta: "¿En qué país se celebran los famosos 'Quinceañeras'?",
            opciones: ["México", "Argentina", "Cuba"],
            respuestaCorrecta: "México"
        },
        {
            pregunta: "¿Qué bebida alcohólica se elabora principalmente en México a base de agave?",
            opciones: ["Tequila", "Ron", "Pisco"],
            respuestaCorrecta: "Tequila"
        },
        {
            pregunta: "¿En qué país latinoamericano se habla el idioma guaraní como lengua oficial junto con el español?",
            opciones: ["Paraguay", "Uruguay", "Bolivia"],
            respuestaCorrecta: "Paraguay"
        },
        {
            pregunta: "¿Cuál es el nombre del famoso escritor argentino conocido por su obra 'Ficciones'?",
            opciones: ["Gabriel García Márquez", "Mario Vargas Llosa", "Jorge Luis Borges"],
            respuestaCorrecta: "Jorge Luis Borges"
        },
        {
            pregunta: "¿Qué país es el mayor productor de café en el mundo?",
            opciones: ["Colombia", "Brasil", "Venezuela"],
            respuestaCorrecta: "Brasil"
        },
        {
            pregunta: "¿Qué país es famoso por la carne de res y el tango?",
            opciones: ["Argentina", "Uruguay", "Chile"],
            respuestaCorrecta: "Argentina"
        },
        {
            pregunta: "¿Qué ciudad es la capital de Costa Rica?",
            opciones: ["San Salvador", "Managua", "San José"],
            respuestaCorrecta: "San José"
        },
        {
            pregunta: "¿Qué río es el más largo de América Latina?",
            opciones: ["Río Paraná", "Río Amazonas", "Río Magdalena"],
            respuestaCorrecta: "Río Amazonas"
        },
        {
            pregunta: "¿En qué país se celebra el famoso 'Día de los Muertos'?",
            opciones: ["México", "Perú", "Colombia"],
            respuestaCorrecta: "México"
        },
        {
            pregunta: "¿En qué país se encuentra la ciudad de Cartagena, famosa por su ciudad amurallada?",
            opciones: ["Venezuela", "Ecuador", "Colombia"],
            respuestaCorrecta: "Colombia"
        },
        {
            pregunta: "¿Qué famoso futbolista brasileño es conocido como 'O Rei' (El Rey)?",
            opciones: ["Pelé", "Ronaldo", "Neymar"],
            respuestaCorrecta: "Pelé"
        },
        {
            pregunta: "¿En qué país se encuentra el famoso Lago Titicaca?",
            opciones: ["Chile y Bolivia", "Perú y Bolivia", "Argentina y Chile"],
            respuestaCorrecta: "Perú y Bolivia"
        },
        {
            pregunta: "¿Qué país latinoamericano es conocido por su carnaval y su arquitectura colonial en ciudades como Salvador de Bahía?",
            opciones: ["Brasil", "Perú", "Venezuela"],
            respuestaCorrecta: "Brasil"
        },
        {
            pregunta: "¿Qué famoso escritor colombiano ganó el Premio Nobel de Literatura en 1982?",
            opciones: ["Mario Vargas Llosa", "Gabriel García Márquez", "Juan Carlos Onetti"],
            respuestaCorrecta: "Gabriel García Márquez"
        },
        {
            pregunta: "¿En qué país se originó la salsa como género musical?",
            opciones: ["Cuba", "Colombia", "Puerto Rico"],
            respuestaCorrecta: "Cuba"
        },
        {
            pregunta: "¿Qué isla caribeña es conocida por su famoso cigarro cubano?",
            opciones: ["Cuba", "República Dominicana", "Jamaica"],
            respuestaCorrecta: "Cuba"
        },
        {
            pregunta: "¿Qué país tiene la famosa tradición de los 'Santos Reyes'?",
            opciones: ["México", "Guatemala", "Venezuela"],
            respuestaCorrecta: "México"
        },
        {
            pregunta: "¿Qué bebida alcohólica se produce en Colombia, famosa por su sabor a caña de azúcar?",
            opciones: ["Tequila", "Pisco", "Aguardiente"],
            respuestaCorrecta: "Aguardiente"
        },
        {
            pregunta: "¿En qué país se originó el flamenco?",
            opciones: ["México", "España", "Argentina"],
            respuestaCorrecta: "España"
        },
        {
            pregunta: "¿En qué país latinoamericano se celebra la fiesta de la 'Tomatina'?",
            opciones: ["México", "España", "Venezuela"],
            respuestaCorrecta: "España"
        },
        {
            pregunta: "¿En qué país se originó el mariachi?",
            opciones: ["Colombia", "México", "Chile"],
            respuestaCorrecta: "México"
        },
        {
            pregunta: "¿En qué país se encuentra el desierto de Atacama?",
            opciones: ["Chile", "Perú", "Argentina"],
            respuestaCorrecta: "Chile"
        },
        {
            pregunta: "¿Quién fue el primer presidente de Argentina?",
            opciones: ["Juan Domingo Perón", "Bernardino Rivadavia", "Hipólito Yrigoyen"],
            respuestaCorrecta: "Bernardino Rivadavia"
        },
        {
            pregunta: "¿Qué artista cubano es famoso por su salsa y la interpretación de 'Guantanamera'?",
            opciones: ["Juan Gabriel", "Celia Cruz", "Rubén Blades"],
            respuestaCorrecta: "Celia Cruz"
        },
        {
            pregunta: "¿Qué país es conocido por el famoso balneario de Punta Cana?",
            opciones: ["Cuba", "República Dominicana", "Puerto Rico"],
            respuestaCorrecta: "República Dominicana"
        },
        {
            pregunta: "¿Qué país latinoamericano es conocido por la producción de cacao y chocolate?",
            opciones: ["Ecuador", "Perú", "Colombia"],
            respuestaCorrecta: "Ecuador"
        },
        {
            pregunta: "¿Quién pintó la Mona Lisa?",
            opciones: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci"],
            respuestaCorrecta: "Leonardo da Vinci"
        },
        {
            pregunta: "¿Qué animal es conocido como el rey de la selva?",
            opciones: ["Tigre", "Elefante", "León"],
            respuestaCorrecta: "León"
        },
        {
            pregunta: "¿En qué país se encuentran las pirámides de Egipto?",
            opciones: ["Grecia", "Egipto", "México"],
            respuestaCorrecta: "Egipto"
        },
        {
            pregunta: "¿Qué instrumento se usa para medir la temperatura?",
            opciones: ["Termómetro", "Barómetro", "Cronómetro"],
            respuestaCorrecta: "Termómetro"
        },
        {
            pregunta: "¿Quién fue Albert Einstein?",
            opciones: ["Un filósofo", "Un físico", "Un escritor"],
            respuestaCorrecta: "Un físico"
        },
        {
            pregunta: "¿Cuántos jugadores tiene un equipo de fútbol?",
            opciones: ["11", "9", "12"],
            respuestaCorrecta: "11"
        },
        {
            pregunta: "¿Qué es un ecosistema?",
            opciones: ["Un conjunto de organismos y su entorno", "Una especie de animal", "Un tipo de animal acuático"],
            respuestaCorrecta: "Un conjunto de organismos y su entorno"
        },
        {
            pregunta: "¿De qué color es la bandera de Italia?",
            opciones: ["Azul, blanco y rojo", "Rojo, blanco y verde", "Verde, amarillo y azul"],
            respuestaCorrecta: "Rojo, blanco y verde"
        },
        {
            pregunta: "¿Qué significa 'sos' en mensajes de auxilio?",
            opciones: ["Salva Oportunamente a Todos", "Socorro, Ocurre Siempre", "Save Our Souls"],
            respuestaCorrecta: "Save Our Souls"
        },
        {
            pregunta: "¿Qué tipo de animal es una ballena?",
            opciones: ["Mamífero", "Pez", "Reptil"],
            respuestaCorrecta: "Mamífero"
        },
        {
            pregunta: "¿En qué año se firmó la independencia de Estados Unidos?",
            opciones: ["1776", "1800", "1492"],
            respuestaCorrecta: "1776"
        },
        {
            pregunta: "¿Cuál es la capital de Japón?",
            opciones: ["Seúl", "Tokio", "Pekín"],
            respuestaCorrecta: "Tokio"
        },
        {
            pregunta: "¿Cuántos planetas hay en el sistema solar?",
            opciones: ["7", "8", "9"],
            respuestaCorrecta: "8"
        },
        {
            pregunta: "¿Qué significa la palabra 'wifi'?",
            opciones: ["Conexión al agua", "Conexión sin cables", "Red de comunicación"],
            respuestaCorrecta: "Conexión sin cables"
        },
        {
            pregunta: "¿Qué gas es el más abundante en la atmósfera terrestre?",
            opciones: ["Oxígeno", "Nitrógeno", "Dióxido de carbono"],
            respuestaCorrecta: "Nitrógeno"
        },
        {
            pregunta: "¿Quién es el creador de Microsoft?",
            opciones: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg"],
            respuestaCorrecta: "Bill Gates"
        },
        {
            pregunta: "¿Qué es la democracia?",
            opciones: ["Un tipo de gobierno donde el poder lo tiene una persona", "Un tipo de gobierno en el que el poder es del pueblo", "Un sistema de gobierno sin leyes"],
            respuestaCorrecta: "Un tipo de gobierno en el que el poder es del pueblo"
        },
        {
            pregunta: "¿En qué continente se encuentra el desierto del Sahara?",
            opciones: ["América", "África", "Asia"],
            respuestaCorrecta: "África"
        },
        {
            pregunta: "¿Qué es una célula?",
            opciones: ["Una estructura que forma los tejidos en los seres vivos", "Una parte del cuerpo humano", "Un tipo de virus"],
            respuestaCorrecta: "Una estructura que forma los tejidos en los seres vivos"
        },
        {
            pregunta: "¿Cuál es el planeta más cercano al Sol?",
            opciones: ["Venus", "Mercurio", "Marte"],
            respuestaCorrecta: "Mercurio"
        },
        {
            pregunta: "¿Qué significa el término 'cultura'?",
            opciones: ["Un tipo de comida", "Conjunto de costumbres, creencias y tradiciones de un grupo", "Un deporte"],
            respuestaCorrecta: "Conjunto de costumbres, creencias y tradiciones de un grupo"
        },
        {
            pregunta: "¿Qué es un agujero negro?",
            opciones: ["Una estrella en explosión", "Un fenómeno cósmico con gravedad extrema", "Un agujero en el espacio vacío"],
            respuestaCorrecta: "Un fenómeno cósmico con gravedad extrema"
        },
        {
            pregunta: "¿Cómo se llama el fundador de Apple?",
            opciones: ["Mark Zuckerberg", "Steve Jobs", "Bill Gates"],
            respuestaCorrecta: "Steve Jobs"
        },
        {
            pregunta: "¿Cuál es el río más largo del mundo?",
            opciones: ["Amazonas", "Nilo", "Yangtsé"],
            respuestaCorrecta: "Amazonas"
        },
        {
            pregunta: "¿Qué es un poeta?",
            opciones: ["Alguien que canta canciones", "Alguien que escribe versos", "Alguien que pinta cuadros"],
            respuestaCorrecta: "Alguien que escribe versos"
        },
        {
            pregunta: "¿Cuál es el continente con más países?",
            opciones: ["Asia", "África", "Europa"],
            respuestaCorrecta: "África"
        },
        {
            pregunta: "¿Qué es el cambio climático?",
            opciones: ["Un fenómeno natural sin consecuencias", "Un proceso de alteración de los patrones climáticos a largo plazo", "Un cambio en las estaciones del año"],
            respuestaCorrecta: "Un proceso de alteración de los patrones climáticos a largo plazo"
        },
        {
            pregunta: "¿Cuál es la principal fuente de energía del Sol?",
            opciones: ["Fusión nuclear", "Quema de gases", "Combustión de átomos"],
            respuestaCorrecta: "Fusión nuclear"
        },
        {
            pregunta: "¿En qué continente se encuentra Australia?",
            opciones: ["Asia", "Oceanía", "África"],
            respuestaCorrecta: "Oceanía"
        },
        {
            pregunta: "¿Cuántas horas tiene un día?",
            opciones: ["24", "25", "23"],
            respuestaCorrecta: "24"
        },
        {
            pregunta: "¿Cómo se llama la nave espacial que llevó al hombre a la Luna?",
            opciones: ["Apollo 11", "Soyuz", "Challenger"],
            respuestaCorrecta: "Apollo 11"
        },
        {
            pregunta: "¿Cuál es el idioma oficial de Brasil?",
            opciones: ["Portugués", "Español", "Inglés"],
            respuestaCorrecta: "Portugués"
        },
        {
            pregunta: "¿Qué tipo de animal es un delfín?",
            opciones: ["Mamífero", "Pez", "Reptil"],
            respuestaCorrecta: "Mamífero"
        },
        {
            pregunta: "¿Quién pintó la 'Última Cena'?",
            opciones: ["Miguel Ángel", "Leonardo da Vinci", "Pablo Picasso"],
            respuestaCorrecta: "Leonardo da Vinci"
        },
        {
            pregunta: "¿Qué metal es conocido por ser el más ligero?",
            opciones: ["Hierro", "Aluminio", "Cobre"],
            respuestaCorrecta: "Aluminio"
        },
        {
            pregunta: "¿Quién fue el primer presidente de los Estados Unidos?",
            opciones: ["Abraham Lincoln", "George Washington", "Thomas Jefferson"],
            respuestaCorrecta: "George Washington"
        },
        {
            pregunta: "¿Cuál es el símbolo químico del oro?",
            opciones: ["Ag", "Au", "O"],
            respuestaCorrecta: "Au"
        },
        {
            pregunta: "¿Qué es la fotosíntesis?",
            opciones: ["El proceso de respiración de las plantas", "El proceso por el cual las plantas producen su alimento usando luz solar", "El proceso de absorción de agua por las raíces"],
            respuestaCorrecta: "El proceso por el cual las plantas producen su alimento usando luz solar"
        },
        {
            pregunta: "¿Qué se celebra el 14 de febrero?",
            opciones: ["Día del Trabajo", "Día de la Independencia", "Día de San Valentín"],
            respuestaCorrecta: "Día de San Valentín"
        },
        {
            pregunta: "¿Quién fue el autor de 'Cien años de soledad'?",
            opciones: ["Mario Vargas Llosa", "Gabriel García Márquez", "Julio Cortázar"],
            respuestaCorrecta: "Gabriel García Márquez"
        },
        {
            pregunta: "¿Qué es un agujero negro?",
            opciones: ["Una estrella apagada", "Una región en el espacio donde la gravedad es tan fuerte que nada puede escapar", "Un agujero en el espacio vacío"],
            respuestaCorrecta: "Una región en el espacio donde la gravedad es tan fuerte que nada puede escapar"
        },
        {
            pregunta: "¿Qué es el Internet?",
            opciones: ["Una red de cables que conecta todos los países del mundo", "Una red global que permite el acceso a información y la comunicación", "Una aplicación de mensajería"],
            respuestaCorrecta: "Una red global que permite el acceso a información y la comunicación"
        },
        {
            pregunta: "¿Quién pintó la 'Guernica'?",
            opciones: ["Salvador Dalí", "Pablo Picasso", "Vincent van Gogh"],
            respuestaCorrecta: "Pablo Picasso"
        },
        {
            pregunta: "¿En qué país se originó el fútbol?",
            opciones: ["Francia", "Italia", "Inglaterra"],
            respuestaCorrecta: "Inglaterra"
        },

    ];

    // Iniciar la trivia con el comando .trivia2
    if (command === 'trivia2') {
        if (gameActive) {
            return conn.reply(m.chat, '¡Ya hay una trivia en curso! Espera a que termine.', m);
        }

        const preguntaAleatoria = preguntas[Math.floor(Math.random() * preguntas.length)];
        currentQuestion = preguntaAleatoria; // Guardamos la pregunta actual
        winner = null; // Reseteamos el ganador al iniciar un nuevo juego
        gameActive = true; // Marcamos el juego como activo

        const opciones = preguntaAleatoria.opciones
            .map((opcion, i) => `${i + 1}. ${opcion}`)
            .join('\n'); // Usamos salto de línea para separar las opciones de manera ordenada

        // Formateamos el mensaje para que la pregunta y opciones estén bien ordenadas
        const mensaje = `
*Pregunta:* ${preguntaAleatoria.pregunta}
*Opciones:*
${opciones}

Responde con el comando ${usedPrefix}responder [número de opción o respuesta]. 
Ejemplo: ${usedPrefix}responder 1 o ${usedPrefix}responder Amazonas
`;

        conn.reply(m.chat, mensaje, m);

        // Establecemos un temporizador de 30 segundos para finalizar el juego
        gameTimer = setTimeout(() => {
            if (!winner) {
                conn.reply(m.chat, `El tiempo ha expirado y nadie ha respondido correctamente. El juego ha terminado. 😞`, m);
            }
            gameActive = false; // Desactivamos el juego
            currentQuestion = null; // Limpiamos la pregunta
        }, 30000); // 30 segundos
    }

    // Responder con el comando .responder
    if (command === 'responder') {
        if (!gameActive) {
            return conn.reply(m.chat, `¡No hay una trivia activa! Usa el comando ${usedPrefix}trivia2 para comenzar el juego.`, m);
        }

        if (!text) {
            return conn.reply(m.chat, `Por favor, responde con el número de la opción o el nombre de la respuesta. Ejemplo: ${usedPrefix}responder 1 o ${usedPrefix}responder Amazonas`, m);
        }

        if (winner) {
            return conn.reply(m.chat, `¡El juego ya ha terminado! ${winner} ha ganado el diamante. 🎉`, m);
        }

        const respuestaUsuario = text.trim().toLowerCase();
        const respuestaCorrecta = currentQuestion.respuestaCorrecta.toLowerCase();

        // Verificar si la respuesta es un número y dentro del rango de opciones
        const numeroRespuesta = parseInt(respuestaUsuario);
        if (!isNaN(numeroRespuesta) && numeroRespuesta >= 1 && numeroRespuesta <= currentQuestion.opciones.length) {
            const respuestaSeleccionada = currentQuestion.opciones[numeroRespuesta - 1].toLowerCase();
            if (respuestaSeleccionada === respuestaCorrecta) {
                winner = m.sender; // El jugador que respondió correctamente es el ganador
                clearTimeout(gameTimer); // Detenemos el temporizador
                conn.reply(m.chat, `¡Correcto! La respuesta es ${currentQuestion.respuestaCorrecta}. 🎉 ${m.pushName} ha ganado el juego y recibe un diamante. 💎`, m);
                // Otorgamos el diamante al ganador
                global.db.data.users[m.sender].limit += 1;
                gameActive = false; // Terminamos el juego
                currentQuestion = null; // Limpiamos la pregunta
            } else {
                return conn.reply(m.chat, `¡Incorrecto!😞`, m);
            }
        } else if (currentQuestion.opciones.some(opcion => opcion.toLowerCase() === respuestaUsuario)) {
            // Verificar si la respuesta es el texto completo de una opción
            if (respuestaUsuario === respuestaCorrecta) {
                winner = m.sender; // El jugador que respondió correctamente es el ganador
                clearTimeout(gameTimer); // Detenemos el temporizador
                conn.reply(m.chat, `¡Correcto! La respuesta es ${currentQuestion.respuestaCorrecta}. 🎉 ${m.pushName} ha ganado el juego y recibe un diamante. 💎`, m);
                // Otorgamos el diamante al ganador
                global.db.data.users[m.sender].limit += 1;
                gameActive = false; // Terminamos el juego
                currentQuestion = null; // Limpiamos la pregunta
            } else {
                return conn.reply(m.chat, `¡Incorrecto! La respuesta correcta era ${currentQuestion.respuestaCorrecta}. 😞`, m);
            }
        } else {
            return conn.reply(m.chat, `Por favor, responde con el número de la opción o el nombre de la respuesta. Ejemplo: ${usedPrefix}responder 1 o ${usedPrefix}responder Amazonas`, m);
        }
    }
};

handler.command = ['trivia2', 'responder']; // Comandos para iniciar la trivia y para responder
handler.help = ['trivia2', 'responder']; // Ayuda para ambos comandos
handler.tags = ['juegos']; // Etiqueta de juegos

export default handler;