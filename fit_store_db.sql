-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-02-2023 a las 16:10:33
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fit_store_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `image`) VALUES
(1, 'Hogar', 'plan_hogar.png'),
(2, 'Empresas', 'plan_empresas.png'),
(3, 'Equipos', 'equipos.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `income`
--

CREATE TABLE `income` (
  `income_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `income_reference` varchar(50) NOT NULL,
  `income_date` date NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `income`
--

INSERT INTO `income` (`income_id`, `user_id`, `income_reference`, `income_date`, `status`) VALUES
(1, 5, 'FAC0000001', '2023-02-22', 0),
(2, 5, 'FAC0000002', '2023-02-21', 0),
(3, 5, 'FAC0000003', '2023-02-21', 0),
(4, 5, 'FAC0000004', '2023-02-06', 0),
(5, 5, 'sasa', '2023-02-22', 0),
(6, 5, 'qqqqqqqqqqqqq', '2023-02-07', 0),
(7, 5, 'sasa', '2023-01-30', 0),
(8, 5, 'nueva', '2023-02-09', 0),
(9, 5, '3444', '2023-02-07', 0),
(10, 5, 'FAC0000005', '2023-02-23', 0),
(11, 5, 'FAC0000006', '2023-02-24', 0),
(12, 5, 'FAC0000007', '2023-02-15', 0),
(13, 5, 'FAC0000008', '2023-02-01', 0),
(14, 5, '3444', '2023-02-13', 0),
(15, 5, '3444', '2023-02-14', 0),
(16, 5, 'FAC0000010', '2023-02-24', 0),
(17, 5, 'FAC0000011', '2023-02-24', 0),
(18, 5, 'FAC0000012', '2023-02-24', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `income_details`
--

CREATE TABLE `income_details` (
  `income_detail_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `income_id` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `income_details`
--

INSERT INTO `income_details` (`income_detail_id`, `product_id`, `income_id`, `price`, `quantity`) VALUES
(1, 5, 9, '123000', 50),
(2, 6, 9, '80000', 30),
(3, 7, 9, '2500000', 10),
(4, 8, 10, '1500000', 50),
(5, 7, 10, '232423223', 525),
(8, 7, 16, '2300000', 5),
(9, 5, 16, '234523523', 4),
(10, 5, 16, '312313', 3),
(11, 5, 16, '123123', 1231),
(12, 3, 17, '80000', 12),
(13, 5, 17, '90000', 20),
(14, 3, 18, '34343434', 5),
(15, 8, 18, '3423423', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `reference` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `stock` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`product_id`, `category_id`, `reference`, `name`, `description`, `price`, `stock`, `image`) VALUES
(1, 1, 'REF1000001', 'Plan super velocidad', '150 mb de velocidad - Llamadas nacionales ilimitadas - 80 canales de Televisión ', '95000', 1000, 'image1_product.png'),
(2, 1, 'REF1000002', 'Plan super velocidad + TV HD', '150 mb de velocidad - Llamadas nacionales ilimitadas - 100 canales de Televisión + 50 canales HD', '110000', 1000, 'image2_product.png'),
(3, 1, 'REF1000003', 'Plan Básico', '50 mb de velocidad - Llamadas nacionales ilimitadas - 80 canales de Televisión ', '85000', 1000, 'image3_product.png'),
(4, 2, 'REF2000001', 'Plan super velocidad', '300 mb de velocidad - Llamadas nacionales ilimitadas e internacionales', '250000', 1000, 'image4_product.png'),
(5, 2, 'REF2000002', 'Plan plus', '300 mb de velocidad - Llamadas nacionales ilimitadas e internacionales - soporte las 24 horas del día - Router especializado - IP pública', '350000', 1000, 'image5_product.png'),
(6, 2, 'REF2000003', 'Plan Básico', '150 mb de velocidad - Llamadas nacionales ilimitadas', '85000', 1000, 'image6_product.png'),
(7, 3, 'REF3000001', 'Serie Samsung Galaxy S22', 'Cámara cuádruple de hasta 108 MP y una pantalla muy brillante de 6,8″ pulgadas, con resolución Quad HD. tienen cámara triple de hasta 50 MP y una pantalla Full HD+', '3000000', 10, 'image7_product.png'),
(8, 3, 'REF3000002', 'Serie Samsung Galaxy S21', 'Cámara cuádruple de hasta 80 MP y una pantalla muy brillante de 5,6″ pulgadas, con resolución Quad HD. tienen cámara triple de hasta 50 MP y una pantalla Full HD+', '2500000', 10, 'image8_product.png'),
(9, 3, 'REF3000003', 'Serie Samsung Galaxy S21+', 'Cámara cuádruple de hasta 108 MP y una pantalla muy brillante de 6,8″ pulgadas, con resolución Quad HD. tienen cámara triple de hasta 50 MP y una pantalla Full HD+ de 6,8″ pulgadas', '2800000', 10, 'image9_product.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `rol_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`rol_id`, `name`) VALUES
(1, 'Administrador'),
(2, 'Vendedor'),
(3, 'Cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `sale_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `sale_reference` varchar(50) NOT NULL,
  `sale_date` date NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`sale_id`, `user_id`, `sale_reference`, `sale_date`, `status`) VALUES
(1, 3, 'SALE100001', '2023-02-15', 1),
(4, 3, 'SALE100004', '2023-02-17', 1),
(5, 5, 'STIF1677275440681', '2023-02-24', 1),
(6, 5, 'STIF1677275790304', '2023-02-24', 1),
(7, 5, 'STIF1677284593462', '2023-02-25', 1),
(8, 5, 'STIF1677284792283', '2023-02-25', 1),
(9, 5, 'STIF1677284952501', '2023-02-25', 1),
(10, 5, 'STIF1677285094003', '2023-02-25', 1),
(11, 5, 'STIF1677285140076', '2023-02-25', 1),
(12, 5, 'STIF1677285251673', '2023-02-25', 1),
(13, 5, 'STIF1677286020289', '2023-02-25', 1),
(14, 5, 'STIF1677286174811', '2023-02-25', 1),
(15, 5, 'STIF1677286234867', '2023-02-25', 1),
(16, 5, 'STIF1677286796305', '2023-02-25', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sale_details`
--

CREATE TABLE `sale_details` (
  `sale_detail_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `sale_id` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sale_details`
--

INSERT INTO `sale_details` (`sale_detail_id`, `product_id`, `sale_id`, `price`, `quantity`) VALUES
(1, 8, 1, '2500000', 1),
(4, 3, 4, '85000', 1),
(8, 1, 6, '95000', 1),
(9, 2, 6, '110000', 3),
(10, 3, 6, '85000', 1),
(11, 1, 10, '95000', 1),
(12, 2, 10, '110000', 1),
(13, 1, 16, '95000', 1),
(14, 2, 16, '110000', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `url` varchar(255) NOT NULL,
  `message` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `status`
--

INSERT INTO `status` (`id`, `date`, `url`, `message`) VALUES
(1, '2023-02-25', '/', 'Unknown column \'NaN\' in \'field list\''),
(2, '2023-02-25', '/', 'Cannot read properties of undefined (reading \'length\')'),
(3, '2023-02-25', 'http://localhost:3001/cart', 'Cannot read properties of undefined (reading \'length\')'),
(4, '2023-02-25', 'http://localhost:3001/cart', 'OK'),
(5, '2023-02-25', 'http://localhost:3001/users/login', 'Login con exito'),
(6, '2023-02-25', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(7, '2023-02-25', 'http://localhost:3001/users/logout', 'Sesión cerrada'),
(8, '2023-02-25', 'http://localhost:3001/users/login', 'Login con exito'),
(9, '2023-02-25', 'http://localhost:3001/users/login', 'Login con exito'),
(10, '2023-02-25', 'http://localhost:3001/users/login', 'Login con exito'),
(11, '2023-02-25', 'http://localhost:3001/users/login', 'Login con exito'),
(12, '2023-02-25', 'http://localhost:3001/users/login', 'Login con exito'),
(13, '2023-02-25', 'http://localhost:3001/users/login', 'Login con exito'),
(14, '2023-02-25', 'http://localhost:3001/users/login', 'Login con exito'),
(15, '2023-02-26', 'http://localhost:3001/users/login', 'Login con exito'),
(16, '2023-02-26', 'http://localhost:3001/users/login', 'Login con exito'),
(17, '2023-02-26', 'http://localhost:3001/users/login', 'Login con exito'),
(18, '2023-02-26', 'http://localhost:3001/users/login', 'Login con exito'),
(19, '2023-02-26', 'http://localhost:3001/users/login', 'Login con exito'),
(20, '2023-02-26', 'http://localhost:3001/users/login', 'Login con exito'),
(21, '2023-02-26', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(22, '2023-02-26', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(23, '2023-02-27', 'http://localhost:3001/users/login', 'Login con exito'),
(24, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(25, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(26, '2023-02-27', 'http://localhost:3001/users/login', 'Login con exito'),
(27, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(28, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(29, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(30, '2023-02-27', 'http://localhost:3001/users/logout', 'Sesión cerrada'),
(31, '2023-02-27', 'http://localhost:3001/users/login', 'Login con exito'),
(32, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(33, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(34, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(35, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(36, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(37, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(38, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(39, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(40, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(41, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(42, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(43, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(44, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(45, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(46, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración'),
(47, '2023-02-27', 'http://localhost:3001/products/adminProductUser', 'Ingreso al panel de administración');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `rol_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `identification_type` varchar(50) NOT NULL,
  `identification` varchar(50) NOT NULL,
  `address` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `rol_id`, `name`, `user_name`, `identification_type`, `identification`, `address`, `phone`, `email`, `password`, `image`) VALUES
(1, 1, 'Deymer Espinosa', 'deymer.espinosa', 'CC', '123456789', 'Barrio El Laguito', '+573105489865', 'deymer@gmail.com', 'deymer123', 'user_01.png'),
(3, 3, 'Juan López', 'juan.lopez', 'CC', '921545861', 'Barrio Miraflores', '+573214568532', 'juan@gmail.com', 'juan123', 'user_01.png'),
(5, 2, 'Camila Perez', 'camila.perez', 'CC', '1064852369', 'Mz 77 lote 134', '+573005896532', 'camila@gmail.com', '$2a$10$CKVcFv7sbm1b0kv.XDn4hOy1KQwMhcVsHZS/t6y7DAWYwf4y8woCS', 'user_01.png');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indices de la tabla `income`
--
ALTER TABLE `income`
  ADD PRIMARY KEY (`income_id`),
  ADD KEY `fk_income_user` (`user_id`);

--
-- Indices de la tabla `income_details`
--
ALTER TABLE `income_details`
  ADD PRIMARY KEY (`income_detail_id`),
  ADD KEY `fk_incomedetail_income` (`income_id`),
  ADD KEY `fk_incomedetail_product` (`product_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `fk_product_category` (`category_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`rol_id`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`sale_id`),
  ADD KEY `fk_sale_user` (`user_id`);

--
-- Indices de la tabla `sale_details`
--
ALTER TABLE `sale_details`
  ADD PRIMARY KEY (`sale_detail_id`),
  ADD KEY `fk_saledetail_product` (`product_id`),
  ADD KEY `fk_saledetail_sale` (`sale_id`);

--
-- Indices de la tabla `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `fk_user_rol` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `income`
--
ALTER TABLE `income`
  MODIFY `income_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `income_details`
--
ALTER TABLE `income_details`
  MODIFY `income_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `rol_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `sale_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `sale_details`
--
ALTER TABLE `sale_details`
  MODIFY `sale_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `income`
--
ALTER TABLE `income`
  ADD CONSTRAINT `fk_income_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `income_details`
--
ALTER TABLE `income_details`
  ADD CONSTRAINT `fk_incomedetail_income` FOREIGN KEY (`income_id`) REFERENCES `income` (`income_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_incomedetail_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_product_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `fk_sale_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sale_details`
--
ALTER TABLE `sale_details`
  ADD CONSTRAINT `fk_saledetail_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_saledetail_sale` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`sale_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_rol` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`rol_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
