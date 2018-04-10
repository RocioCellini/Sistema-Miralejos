-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-04-2018 a las 18:30:05
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
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id_cliente` int(11) NOT NULL,
  `nombre` text COLLATE latin1_spanish_ci NOT NULL,
  `apellido` text COLLATE latin1_spanish_ci NOT NULL,
  `dni` int(11) NOT NULL,
  `telefono1` int(11) NOT NULL,
  `telefono2` int(11) NOT NULL,
  `email` text COLLATE latin1_spanish_ci NOT NULL,
  `id_provincia` int(11) NOT NULL,
  `id_localidad` int(11) NOT NULL,
  `id_actividad` int(11) NOT NULL,
  `conoce` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id_cliente`, `nombre`, `apellido`, `dni`, `telefono1`, `telefono2`, `email`, `id_provincia`, `id_localidad`, `id_actividad`, `conoce`) VALUES
(1, 'Maria', 'Cellini', 555, 54545, 344444, 'maria@miralejos.net', 3, 303, 1, 0),
(3, 'Rocio', 'Cellini', 33444444, 3541222, 332234, 'rcellini@miralejos.net', 3, 303, 1, 0),
(4, 'carlos', 'cellini', 333, 333, 4445, 'carlin@hotmail.com', 1, 5, 2, 0),
(5, 'flor', 'rrr', 77, 77, 6665, 'yuy@hh.com', 1, 5, 4, 0),
(15, 'Rocío', 'cabrera', 33444455, 44444, 33565, 'cabrera@gmail.com', 3, 303, 3, 1),
(22, 'roberto', 'lopez', 555464, 56, 636, 'rob@dfsff', 1, 1, 1, 1),
(23, 'Carlita', 'gonz', 2345678, 6363, 63563, 'gdhrd@dfa', 7, 492, 3, 1),
(24, 'Gonzalo', 'Ferreyra', 4455, 3344444, 53535, 'fsgs@dfsg.com', 1, 1, 1, 0),
(25, 'Franco', 'Mansilla', 44554455, 44353, 554335, 'gear@dgsrg', 1, 1, 1, 1),
(26, 'mary', 'aefa', 44556677, 5636, 3573, 'hdghs@dfag', 5, 369, 3, 1),
(27, 'Marta', 'dafa', 5254434, 626262, 62262, 'dgrdj', 1, 1, 1, 1),
(28, 'Martin', 'fages', 4455667, 6363, 6636, 'sgsgr@dfa', 1, 1, 1, 1),
(29, 'gonza', 'fagsg', 4455667, 5626, 6265, 'srgsr', 1, 1, 1, 0),
(30, 'Silvi', 'dsghsuig', 4455667, 4526, 626, 'tryerer@dsvd.com', 1, 1, 1, 0),
(31, 'Maria Ester', 'Gutuerrez', 2233445, 54552, 5225, 'maria@miralejos.net', 1, 1, 1, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id_cliente`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id_cliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
