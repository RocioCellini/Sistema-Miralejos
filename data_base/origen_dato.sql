-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-03-2018 a las 17:04:11
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
-- Estructura de tabla para la tabla `origen_dato`
--

CREATE TABLE `origen_dato` (
  `id_origen_dato` int(11) NOT NULL,
  `origen_dato` text COLLATE latin1_spanish_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `origen_dato`
--

INSERT INTO `origen_dato` (`id_origen_dato`, `origen_dato`) VALUES
(1, 'Letrero'),
(2, 'Oficina'),
(3, 'w.p.p.'),
(4, 'Temp L Lopez'),
(5, 'Ex AA'),
(6, 'Inm. Chaves'),
(7, 'Grupo Miralejos'),
(11, 'Cesión'),
(9, 'Eliseo'),
(10, 'Comincini');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `origen_dato`
--
ALTER TABLE `origen_dato`
  ADD PRIMARY KEY (`id_origen_dato`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `origen_dato`
--
ALTER TABLE `origen_dato`
  MODIFY `id_origen_dato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
