-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-8.2
-- Время создания: Июн 18 2025 г., 18:35
-- Версия сервера: 8.2.0
-- Версия PHP: 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `MetroMos`
--

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `telegram_id` bigint NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `first_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo` text,
  `username` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ref` json DEFAULT NULL,
  `myref` bigint DEFAULT NULL,
  `refcount` int NOT NULL DEFAULT '0',
  `countroutes` int NOT NULL DEFAULT '0',
  `showtop` tinyint(1) NOT NULL DEFAULT '0',
  `last_time` bigint DEFAULT NULL,
  `time` bigint NOT NULL DEFAULT '0',
  `typenodes` tinyint NOT NULL DEFAULT '0',
  `filterbank` tinyint(1) NOT NULL DEFAULT '0',
  `filtercoffee` tinyint(1) NOT NULL DEFAULT '0',
  `filtersales` tinyint(1) NOT NULL DEFAULT '0',
  `filterparking` tinyint(1) NOT NULL DEFAULT '0',
  `filtercandy` tinyint(1) NOT NULL DEFAULT '0',
  `filterelevator` tinyint(1) NOT NULL DEFAULT '0',
  `filterbattery` tinyint(1) NOT NULL DEFAULT '0',
  `filterfood` tinyint(1) NOT NULL DEFAULT '0',
  `filterflowers` tinyint(1) NOT NULL DEFAULT '0',
  `filtercarrier` tinyint(1) NOT NULL DEFAULT '0',
  `filtervending` tinyint(1) NOT NULL DEFAULT '0',
  `filterinvalid` tinyint(1) NOT NULL DEFAULT '0',
  `filtertoilet` tinyint(1) NOT NULL DEFAULT '0',
  `filterinfo` tinyint(1) NOT NULL DEFAULT '0',
  `filterprint` tinyint(1) NOT NULL DEFAULT '0',
  `filteroptics` tinyint(1) NOT NULL DEFAULT '0',
  `filtertheatre` tinyint(1) NOT NULL DEFAULT '0',
  `routesave` json DEFAULT NULL,
  `favoritessave` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`telegram_id`, `created_at`, `first_name`, `last_name`, `photo`, `username`, `ref`, `myref`, `refcount`, `countroutes`, `showtop`, `last_time`, `time`, `typenodes`, `filterbank`, `filtercoffee`, `filtersales`, `filterparking`, `filtercandy`, `filterelevator`, `filterbattery`, `filterfood`, `filterflowers`, `filtercarrier`, `filtervending`, `filterinvalid`, `filtertoilet`, `filterinfo`, `filterprint`, `filteroptics`, `filtertheatre`, `routesave`, `favoritessave`) VALUES
(1619511344, '2025-03-27 12:00:40', 'Александр', 'Федорович', NULL, 'shishkin666', NULL, NULL, 0, 0, 1, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL),
(5581211844, '2025-03-27 12:00:40', 'Карина', NULL, NULL, NULL, NULL, NULL, 0, 0, 1, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, NULL),
(7220941214, '2025-05-09 21:42:37', 'Алексей', '', 'https://t.me/i/userpic/320/k0us6NAYIrYlN9cN0gcrPPqQz1uDk_J2zgmXBKheAOM9LVVTRHBSnBgpzssku1L-.svg', 'xyetadarknet', NULL, NULL, 0, 89, 0, 1750246839, 37140, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '{\"mos\": [{\"end\": 156, \"start\": 46}]}', '{\"mos\": [628]}');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`telegram_id`),
  ADD UNIQUE KEY `telegramid` (`telegram_id`),
  ADD UNIQUE KEY `telegram_id` (`telegram_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
