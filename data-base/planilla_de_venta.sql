-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-04-2018 a las 13:32:33
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
-- Estructura de tabla para la tabla `planilla_de_venta`
--

CREATE TABLE `planilla_de_venta` (
  `id_planilla` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `tipo_cliente` text COLLATE latin1_spanish_ci NOT NULL,
  `id_vendedor` int(11) NOT NULL,
  `id_inmobiliaria` int(11) NOT NULL,
  `fecha_cierre_operacion` date NOT NULL,
  `id_edificio` int(11) NOT NULL,
  `id_planta` int(11) NOT NULL,
  `id_dpto` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `planilla_de_venta`
--

INSERT INTO `planilla_de_venta` (`id_planilla`, `id_cliente`, `tipo_cliente`, `id_vendedor`, `id_inmobiliaria`, `fecha_cierre_operacion`, `id_edificio`, `id_planta`, `id_dpto`) VALUES
(1, 15, 'Comprador', 0, 1, '2018-03-12', 0, 0, 0),
(2, 3, 'Comprador', 0, 2, '2018-04-25', 0, 0, 0),
(3, 15, 'Comprador', 2, 3, '2018-04-27', 4, 7, 1),
(4, 4, 'Comprador', 5, 3, '2018-04-16', 5, 7, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `planilla_de_venta`
--
ALTER TABLE `planilla_de_venta`
  ADD PRIMARY KEY (`id_planilla`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `planilla_de_venta`
--
ALTER TABLE `planilla_de_venta`
  MODIFY `id_planilla` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
