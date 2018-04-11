-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-04-2018 a las 00:00:48
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
-- Estructura de tabla para la tabla `tabla_intermedia_planilla`
--

CREATE TABLE `tabla_intermedia_planilla` (
  `id_planilla` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `tipo_cliente` text COLLATE latin1_spanish_ci NOT NULL,
  `fecha_cierre_operacion` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `tabla_intermedia_planilla`
--

INSERT INTO `tabla_intermedia_planilla` (`id_planilla`, `id_cliente`, `tipo_cliente`, `fecha_cierre_operacion`) VALUES
(1, 15, '0', '2018-03-12');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tabla_intermedia_planilla`
--
ALTER TABLE `tabla_intermedia_planilla`
  ADD PRIMARY KEY (`id_planilla`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tabla_intermedia_planilla`
--
ALTER TABLE `tabla_intermedia_planilla`
  MODIFY `id_planilla` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
