-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: MySQL-8.2
-- Время создания: Апр 06 2025 г., 16:33
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
-- Структура таблицы `statsday`
--

CREATE TABLE `statsday` (
  `id` int NOT NULL,
  `alluser` int NOT NULL DEFAULT '0',
  `countday` int NOT NULL DEFAULT '0',
  `listuser` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `statsday`
--
ALTER TABLE `statsday`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`telegram_id`),
  ADD UNIQUE KEY `telegramid` (`telegram_id`),
  ADD UNIQUE KEY `telegram_id` (`telegram_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `statsday`
--
ALTER TABLE `statsday`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
