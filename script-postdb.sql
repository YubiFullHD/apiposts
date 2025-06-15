CREATE DATABASE `blogdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

CREATE TABLE `autores` (
  `idautor` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `imagen` blob,
  PRIMARY KEY (`idautor`),
  UNIQUE KEY `idautor_UNIQUE` (`idautor`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `posts` (
  `idpost` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(100) NOT NULL,
  `descripcion` varchar(1500) NOT NULL,
  `fecharegistro` datetime NOT NULL,
  `categoria` varchar(20) NOT NULL,
  `idautor` int NOT NULL,
  PRIMARY KEY (`idpost`),
  UNIQUE KEY `idpost_UNIQUE` (`idpost`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


INSERT INTO `autores` (nombre, email, imagen) VALUES ('Juan','juan@gmail.com',''),
('Pedro','pedro@gmail.com',''),
('Ana','ana@gmail.com','');

INSERT INTO `posts` (titulo, descripcion, fecharegistro, categoria, idautor) VALUES 
('La historia de la musica', 'Descripcion post 1', '2025-01-01', 'Musica', 1),
('Mi primer deporte', 'Descripcion post 2', '2025-02-02', 'Deportes', 1),
('Presidente', 'Descripcion post 3', '2025-03-03', 'Politica', 1),
('Los ministros', 'Descripcion post 1', '2025-01-01', 'Politica', 2),
('Equipo campeon', 'Descripcion post 2', '2025-02-02', 'Deportes', 2),
('Plan de ordenamiento', 'Descripcion post 3', '2025-03-03', 'Politica', 2),
('Los mejores del rock', 'Descripcion post 1', '2025-01-01', 'Musica', 3),
('Historia de la musica', 'Descripcion post 2', '2025-02-02', 'Musica', 3),
('Champions league', 'Descripcion post 3', '2025-03-03', 'Deportes', 3);
