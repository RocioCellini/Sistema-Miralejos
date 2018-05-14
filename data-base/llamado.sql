-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-05-2018 a las 17:36:32
-- Versión del servidor: 5.7.14
-- Versión de PHP: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema_miralejos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `llamado`
--

CREATE TABLE `llamado` (
  `id_llamado` int(11) NOT NULL,
  `id_vendedor` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha_llamado` date NOT NULL,
  `hora_llamado` time NOT NULL,
  `id_edificio` int(11) NOT NULL,
  `id_planta` int(11) NOT NULL,
  `id_dpto` int(11) NOT NULL,
  `grado_interes` int(11) NOT NULL,
  `id_origen_dato` int(11) NOT NULL,
  `fecha_origen_dato` date NOT NULL,
  `anotaciones` text COLLATE latin1_spanish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `llamado`
--

INSERT INTO `llamado` (`id_llamado`, `id_vendedor`, `id_cliente`, `fecha_llamado`, `hora_llamado`, `id_edificio`, `id_planta`, `id_dpto`, `grado_interes`, `id_origen_dato`, `fecha_origen_dato`, `anotaciones`) VALUES
(1, 2, 3, '2011-03-14', '17:00:01', 2, 1, 5, 2, 1, '2018-03-06', 'respondió en forma cortante'),
(2, 3, 3, '2018-02-07', '03:30:00', 3, 2, 1, 3, 2, '2018-03-06', 're bien'),
(3, 2, 1, '2018-04-17', '12:02:00', 5, 5, 29, 1, 2, '2018-04-16', 'bien'),
(4, 5, 1, '2018-04-27', '23:00:00', 4, 8, 1, 1, 5, '2018-04-24', 'maso'),
(5, 5, 1, '2018-04-27', '23:00:00', 4, 8, 1, 0, 5, '2018-04-24', 'maso'),
(6, -1, 1, '2018-05-08', '02:02:00', 8, 6, 7, 2, 15, '2018-05-09', 'rejft yti'),
(7, 2, 1, '2018-05-02', '20:00:00', 9, 7, 1, 2, 7, '2018-04-29', 'tiene que vender propiedad'),
(8, 5, 1, '2018-05-22', '02:03:00', 4, 5, 1, 2, 6, '2018-05-13', 'fwefw'),
(9, 4, 1, '2018-05-29', '03:04:00', 5, 5, 29, 3, 10, '2018-05-13', 'wt3t4'),
(10, 3, 25, '2018-05-22', '03:04:00', 7, 4, 32, 2, 10, '2018-05-06', 'gerwe'),
(11, 4, 1, '2018-05-29', '03:04:00', 5, 5, 29, 2, 10, '2018-05-13', 'wt3t4'),
(12, 5, 1, '2018-05-22', '05:00:00', 4, 5, 1, 1, 6, '2018-05-13', 'fwefw'),
(13, 5, 1, '2018-05-22', '05:00:00', 3, 5, 29, 1, 6, '2018-05-13', 'fwefw'),
(14, 5, 1, '2018-05-22', '05:00:00', 3, 5, 29, 0, 6, '2018-05-13', 'fwefw');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `llamado`
--
ALTER TABLE `llamado`
  ADD PRIMARY KEY (`id_llamado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `llamado`
--
ALTER TABLE `llamado`
  MODIFY `id_llamado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
