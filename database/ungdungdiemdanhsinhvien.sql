-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost:3306
-- Thời gian đã tạo: Th1 22, 2026 lúc 04:05 PM
-- Phiên bản máy phục vụ: 10.6.23-MariaDB
-- Phiên bản PHP: 8.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `ungdungdiemdanhsinhvien`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `hoten` varchar(191) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) DEFAULT NULL,
  `chucvu` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `admins`
--

INSERT INTO `admins` (`id`, `hoten`, `email`, `password`, `chucvu`, `created_at`, `updated_at`) VALUES
(1, 'Huỳnh Văn Thảo', 'huynhvanthao@gmail.com', '$2y$12$kIrPtDCHyt/FxOEjO6aIF..0eE8IAZAVY5QPPV.Noj9hoq0StztiW', 'Cán bộ giáo vụ', '2025-10-17 02:47:07', '2025-12-28 04:35:09'),
(2, 'Đỗ Quốc Mai', 'ttranhoang857@gmail.com', '$2y$12$Zkf.4u4CJ.9zGaPyF2qQ5ugaRZUPFQUPQxfjPIYOQXkX7Jau1Kzra', 'Cán bộ giáo vụ', '2025-10-17 02:47:07', '2026-01-19 10:06:12'),
(3, 'Nguyễn Văn A', 'a@gmail.com', '$2y$12$EFoQpCCxZ6avGQrhOS206Ohjqr/bF/alnJ.DV1bClkyJDvF.zd3Ga', 'Cán bộ giáo vụ', '2025-10-17 02:47:07', '2025-12-19 15:51:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cache`
--

CREATE TABLE `cache` (
  `key` varchar(191) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(191) NOT NULL,
  `owner` varchar(191) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chi_tiet_diem_danhs`
--

CREATE TABLE `chi_tiet_diem_danhs` (
  `tinhtrang` tinyint(1) DEFAULT 0,
  `thoigian` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `masv` varchar(100) NOT NULL,
  `madiemdanh` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `chi_tiet_diem_danhs`
--

INSERT INTO `chi_tiet_diem_danhs` (`tinhtrang`, `thoigian`, `created_at`, `updated_at`, `masv`, `madiemdanh`) VALUES
(1, '2026-01-19 21:15:39', '2026-01-19 14:15:39', '2026-01-19 14:15:39', 'DH52200298', 'DD20251229104957769');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `diem_danhs`
--

CREATE TABLE `diem_danhs` (
  `madiemdanh` varchar(191) NOT NULL,
  `malichthi` varchar(191) DEFAULT NULL,
  `soluongdiemdanh` int(11) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `trangthai` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `diem_danhs`
--

INSERT INTO `diem_danhs` (`madiemdanh`, `malichthi`, `soluongdiemdanh`, `created_at`, `updated_at`, `trangthai`) VALUES
('DD20251229104957769', 'L4', 2, '2025-12-29 03:49:57', '2026-01-19 14:17:09', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(191) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `giang_viens`
--

CREATE TABLE `giang_viens` (
  `magv` varchar(191) NOT NULL,
  `hoten` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `sdt` varchar(191) DEFAULT NULL,
  `password` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `manganh` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `giang_viens`
--

INSERT INTO `giang_viens` (`magv`, `hoten`, `email`, `sdt`, `password`, `created_at`, `updated_at`, `manganh`) VALUES
('GV00299', 'Nguyễn Thị Thủy', 'an@gmail.com', '0978451264', '$2y$12$aOBLOAC.4r1bg8JgsQChjejoIhAGgMdFEaSvAglgowz7kOD/0TLTu', '2025-12-19 09:01:38', '2025-12-29 02:10:27', '7480201'),
('GV01043', 'Trần Văn Nhân', 'ly@gmail.com', '0975632186', '$2y$12$t.2jiKi1qvRvEEdFqy0Z1OFW5AkPNoNv9p3EI5U3eQ7a2LyJpyr0O', '2025-11-21 18:13:10', '2025-12-04 07:27:36', '7480201'),
('GV01045', 'Trần Tuệ An', 'ttranhoang857@gmail.com', '0974856321', '$2y$12$RGYOxDhy59R8p1AEdy7yPuk0w/9VahhjjHj9gWRggbd82mYCRriBa', '2025-11-21 18:12:23', '2025-12-19 09:52:45', '7480201'),
('GV894356', 'Dương Văn Nam', 'lmkhanhan@gmail.com', '0978451263', '$2y$12$iUSRMgKCHZ3Jxs9Q/0LHg.C03FeaCL3C0XJ.uwv4IvMzB7foKoWrS', '2025-10-19 05:17:27', '2026-01-19 12:43:55', '7480201'),
('GV89442', 'Lê Văn Dần', 'c@gmail.com', '978451271', '$2y$12$VAOBX0nyyvgs5b2yg9Wtp.7GTHOfY18vqxQdSXctMCUftqdZK54jm', '2026-01-20 14:39:57', '2026-01-20 14:39:57', '7480201');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(191) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lich_this`
--

CREATE TABLE `lich_this` (
  `malichthi` varchar(191) NOT NULL,
  `monthi` varchar(191) DEFAULT NULL,
  `ngaythi` date DEFAULT NULL,
  `giobatdau` time DEFAULT NULL,
  `gioketthuc` time DEFAULT NULL,
  `phongthi` varchar(191) DEFAULT NULL,
  `malop` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `lich_this`
--

INSERT INTO `lich_this` (`malichthi`, `monthi`, `ngaythi`, `giobatdau`, `gioketthuc`, `phongthi`, `malop`, `created_at`, `updated_at`) VALUES
('L4', 'Kiểm thử phần mềm', '2026-01-19', '19:30:00', '20:50:00', 'C703', 'D22_TH01', '2025-11-22 13:54:14', '2026-01-02 16:24:48'),
('L5', 'Lịch sử đảng', '2026-01-20', '19:30:00', '20:50:00', 'C705', 'D22_TH01', '2025-12-19 09:00:21', '2025-12-23 10:08:20'),
('LT01', 'Lập trình Web', '2026-01-21', '19:20:00', '22:20:00', 'C708', 'D22_TH02', '2025-11-20 12:35:43', '2025-12-23 09:28:36');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `lops`
--

CREATE TABLE `lops` (
  `malop` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `manganh` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `lops`
--

INSERT INTO `lops` (`malop`, `created_at`, `updated_at`, `manganh`) VALUES
('D21_CDT01', '2025-10-19 08:29:24', '2025-10-19 08:29:24', '7510203'),
('D21_CDT02', '2025-10-19 08:29:24', '2025-10-19 08:29:24', '7510203'),
('D21_DDT01', '2025-10-19 08:29:24', '2025-10-19 08:29:24', '7510301'),
('D21_DDT02', '2025-10-19 08:29:24', '2025-10-19 08:29:24', '7510301'),
('D21_TH01', '2025-10-19 08:29:24', '2025-10-19 08:29:24', '7480201'),
('D21_TH02', '2025-10-19 08:29:24', '2025-10-19 08:29:24', '7480201'),
('D22_CDT01', '2025-10-19 08:29:24', '2025-10-19 08:29:24', '7510203'),
('D22_CDT02', '2025-10-19 08:29:24', '2025-10-19 08:29:24', '7510203'),
('D22_DDT01', '2025-10-19 08:29:24', '2025-10-19 08:29:24', '7510301'),
('D22_DDT02', '2025-10-19 08:29:24', '2025-10-19 08:29:24', '7510301'),
('D22_TH01', '2025-10-19 08:29:24', '2025-10-19 08:29:24', '7480201'),
('D22_TH02', '2025-10-19 08:29:24', '2025-10-19 08:29:24', '7480201');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_10_13_083648_create_nganhs_table', 1),
(5, '2025_10_13_084618_create_giang_viens_table', 1),
(6, '2025_10_13_084906_create_admins_table', 1),
(7, '2025_10_19_065539_create_lops_table', 2),
(8, '2025_10_19_074911_create_giang_viens_table', 3),
(9, '2025_10_19_075418_add_manganh_to_giang_viens_table', 4),
(10, '2025_10_19_080928_add_manganh_to_giang_viens_table', 5),
(11, '2025_10_19_081536_add_manganh_to_lops_table', 6),
(12, '2025_10_19_083224_create_sinh_viens_table', 7),
(13, '2025_10_19_083821_add_malop_to_sinh_viens_table', 8);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `nganhs`
--

CREATE TABLE `nganhs` (
  `manganh` varchar(191) NOT NULL,
  `tennganh` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `nganhs`
--

INSERT INTO `nganhs` (`manganh`, `tennganh`, `created_at`, `updated_at`) VALUES
('7210402', 'Thiết kế công nghiệp', '2025-10-17 09:44:23', '2025-10-17 09:44:23'),
('7340101', 'Quản trị kinh doanh', '2025-10-17 09:44:23', '2025-10-17 09:44:23'),
('7340115', 'Marketing', '2025-10-17 09:44:23', '2025-10-17 09:44:23'),
('7340120', 'Kinh doanh quốc tế', '2025-10-17 09:44:23', '2025-10-17 09:44:23'),
('7340201', 'Tài chính – Ngân hàng', '2025-10-17 09:44:23', '2025-10-17 09:44:23'),
('7380107', 'Luật kinh tế', '2025-10-17 09:44:23', '2025-10-17 09:44:23'),
('7480106', 'Kỹ thuật máy tính', '2025-10-17 09:44:23', '2025-10-17 09:44:23'),
('7480201', 'Công nghệ thông tin', '2025-10-17 09:44:23', '2025-10-17 09:44:23'),
('7510201', 'Công nghệ kỹ thuật cơ khí', '2025-10-17 09:44:23', '2025-10-17 09:44:23'),
('7510203', 'Công nghệ kỹ thuật cơ điện tử', '2025-10-17 09:44:23', '2025-10-17 09:44:23'),
('7510301', 'Công nghệ kỹ thuật điện, điện tử', '2025-10-17 09:44:23', '2025-10-17 09:44:23'),
('7510302', 'Công nghệ kỹ thuật điện tử - viễn thông', '2025-10-17 09:44:23', '2025-10-17 09:44:23'),
('7510605', 'Logistics và Quản lý chuỗi cung ứng', '2025-10-17 09:44:23', '2025-10-17 09:44:23'),
('7540101', 'Công nghệ thực phẩm', '2025-10-17 09:44:23', '2025-10-17 09:44:23'),
('7540106', 'Đảm bảo chất lượng & an toàn thực phẩm', '2025-10-17 09:44:23', '2025-10-17 09:44:23'),
('7580201', 'Kỹ thuật xây dựng', '2025-10-17 09:44:23', '2025-10-17 09:44:23'),
('7580302', 'Quản lý xây dựng', '2025-10-17 09:44:23', '2025-10-17 09:44:23'),
('7810101', 'Du lịch', '2025-10-17 09:44:23', '2025-10-17 09:44:23');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_ressets`
--

CREATE TABLE `password_ressets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(191) NOT NULL,
  `code` varchar(6) NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `password_ressets`
--

INSERT INTO `password_ressets` (`id`, `email`, `code`, `expires_at`, `created_at`, `updated_at`) VALUES
(5, 'huynhvanthao@gmail.com', '341948', '2025-12-21 17:00:54', '2025-12-21 16:55:54', '2025-12-21 16:55:54'),
(19, 'trucly1674@gmail.com', '224377', '2025-12-23 09:47:30', '2025-12-23 09:42:30', '2025-12-23 09:42:30');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `phan_cong_lich_this`
--

CREATE TABLE `phan_cong_lich_this` (
  `vaitro` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `magv` varchar(100) NOT NULL,
  `malichthi` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `phan_cong_lich_this`
--

INSERT INTO `phan_cong_lich_this` (`vaitro`, `created_at`, `updated_at`, `magv`, `malichthi`) VALUES
('Giám thị 1', '2025-12-19 10:46:46', '2025-12-19 10:46:46', 'GV00299', 'L5'),
('Giám thị 1', '2025-12-22 02:40:06', '2025-12-22 02:40:06', 'GV00299', 'LT01'),
('Giám thị 1', '2025-12-28 03:45:53', '2025-12-28 03:45:53', 'GV01043', 'L4'),
('Giám thị 2', '2025-12-19 11:02:02', '2025-12-19 11:02:02', 'GV01045', 'L4'),
('Giám thị 2', '2025-12-19 11:01:54', '2025-12-19 11:01:54', 'GV01045', 'L5'),
('Giám thị 2', '2025-11-22 04:09:40', '2025-11-22 04:09:40', 'GV01045', 'LT01'),
('Giám thị 3', '2025-12-22 02:40:51', '2025-12-22 02:40:51', 'GV894356', 'L4'),
('Giám thị 3', '2025-12-19 11:01:55', '2025-12-19 11:01:55', 'GV894356', 'L5'),
('Giám thị 3', '2025-11-21 16:48:38', '2025-11-22 04:09:40', 'GV894356', 'LT01');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(191) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('v8N1kCUdV6VypHlqSyTfHWawh5gsghbQujDiTrDE', 1, '14.186.192.118', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiV2FuZTJGajhWdVBXaWY5R25zNUZRWXphbnVvU0hvZm8wdWVEYlI1ZCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuL2FkbWluL2xpc3RndiI7fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1761289482),
('ZzQz5SB7tFjMbQ1qxQMcxEPrDie4utf3lsjKGwrj', NULL, '222.253.91.71', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiZVBxTmlseU9QQVB1Q2hSN2t0STVOblJmUG5uR3RXNnhFVHVaTGs0MiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761298471),
('kl9UOQmACROwRIQH05jcck6ANVQxApqxu7myFLnK', 1, '14.241.229.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiSFcwYVBTZks3NExCTEt6RUl5RFVDbjBvRVpMaVVBMnJlSDBTOWZmWiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuL2FkbWluL2xpc3RzdiI7fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1761040287),
('4wr75nPu4f536V71aUqGge1X3WCwuRhlesc3bTIB', NULL, '14.241.229.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRDRnR2lxU09mOWtrWlRkNHRZUTZrc3NZa0FmZzFyeGIwY0xZN29LMCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuL2FkbWluL2xpc3RndiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761037814),
('hsZB39wDAyF9vccwhpzTetOg4asMhPz5YwU1ikCE', NULL, '14.241.229.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaXdKbmRhWW85RlBuNzNMU0NabmVGMTh2TlZUTElCWGVEa1VKZ0kyMiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuL2FkbWluL2xpc3RndiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761035377),
('SUhmjLbeTPF0Ls5yjWUFx7pDUbWHvz7laM4XHEux', NULL, '14.241.229.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiOGJhUnZPbTZocjBiYWp3ZnVOUWdHWU1jSzhlazlLclFQbmp2MzM0dCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuL2FkbWluL2xpc3RndiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761035377),
('HlM2Nc8mkFJvZMfRqOQCclrGIRWB40jxhlP7wGaB', NULL, '14.241.229.110', 'Mozilla/5.0 (Windows NT; Windows NT 10.0; en-US) WindowsPowerShell/5.1.22621.3672', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaE5hZTFvbGZQZkg0RG1yOURUNWN4dUJXZVc1WVplTHFyaDVqT1QySCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuL2FkbWluL2xpc3RndiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761035622),
('roPUeEWqX9hxF5cyXKxkytfCOulsucL2ICIo1LyM', NULL, '14.241.229.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMmkyMW1EZkhtcHlHN1I3aHhaMlNKc3F6R1lwR0ZCb2lNVHV0RGFPMCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuL2FkbWluL2xpc3RndiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761038323),
('2Dzx7mUDEvm1722Ud3NFwpAMhkSacQSPnJucHzbG', NULL, '14.241.229.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQjBwQ2hYaHYwNXM0d3d4Sm1wb2tqVWs5czdkUjNLR21YUWxzQ2xiZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuL2FkbWluL2xpc3RndiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761038342),
('dLLWQVAuEZBLJ9BGeKoqHvz4GumHdDQ8jbrutYbR', NULL, '14.241.229.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidFlseDFjNDQxR0N2TDVLVlc2Sm5UcmdZUDB6VGVpYmd1TFczamVCdSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuL2FkbWluL2xpc3RndiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761038343),
('SkC1dhAjY7MQ9U8JJjCw0U5PVjuiOso3Dmjdqn9h', NULL, '14.241.229.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU0FxTE9BN3pBRE95UFJzYm4xd0NIVGlDMnh3bEFXRmpGYkRYaldVSCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuL2FkbWluL2xpc3RndiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761038361),
('W6QSwXZU0wOGm1fTlmO6HKByEhwYBM5EPhOmMgmx', NULL, '14.241.229.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMlNjVDh0WEtPNTIyRzloSG00YmQzcmZOOG9SVWh2aThzQmRTcnc5diI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuL2FkbWluL2xpc3RndiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761038362),
('BEqGwsFI6UL89DklAE4WBgnGmotj6TyyoxQrEXT3', NULL, '14.241.229.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUGg5eENBMUQ3QmhsVnplem5KaHc5bjhyaHhRRU9nQkxJd2pHY1c3ZyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuL2FkbWluL2xpc3RndiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761038428),
('erEFC7RMqrjru41muXbkGiXuRgU28FubbXPs7r5Q', NULL, '14.241.229.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieEljS2tHanpWeE5YQVc5MHFVTzU4anFENzR2MkJTdnBlUVNDU3EwdiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuL2FkbWluL2xpc3RndiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761038429),
('59cD9CxxugHJyGGzokTTSLKRS2MqD1soC7NsKJY0', NULL, '14.241.229.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWXpZT2tsckdjdTcyMlJmakFxb0ZnTzB2N1BNMzU1eGRPN3VnOExPeiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuL2FkbWluL2xpc3RndiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761038429),
('CsttqTKvrYo2mVpvJBtXxHa1DTLpu3ZKB1KjmIjn', NULL, '14.241.229.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTk41MXQ1V3hjVm02bXZYaVRqMUdLOFNBTmkzR1dwVEVYdmZSbTkzVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuL2FkbWluL2xpc3RndiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761038430),
('ogSJlG1x0Slg4nYGLNgVsC0RSSzAUnaasuuCdCWd', NULL, '14.241.229.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVktvM01STm5QczBZUGF2dllVWTR2a01IbHZ5YjFaa2x5alFyZmwwWSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuL2FkbWluL2xpc3RndiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761038882),
('xQ36pqqhDr74VI9kP6xGPtUi7R4YZTvbjqBRqBjy', NULL, '14.241.229.110', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36 Edg/141.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidkF1T1N5ODNwZzI3aGdiV0h6U0EyVmJKdjFCNHJYd09pM3ViOFEwNCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuL2FkbWluL2xpc3RndiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761038882),
('c7ei54ZbjYEGnmxTcpdnSGPlzIl9zzgNwWcXWU1Q', NULL, '14.186.192.118', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZXI3Y3hNMWkxeFZVaXRydmwyNUZkQ1h1V053YzVRSm1ORTFWc0g2ciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjk6Imh0dHA6Ly9sdW9uZ21pbmhraGFuaGFuLmlvLnZuIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761282792);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sinh_viens`
--

CREATE TABLE `sinh_viens` (
  `masv` varchar(191) NOT NULL,
  `hoten` varchar(191) DEFAULT NULL,
  `gioitinh` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `sdt` varchar(191) DEFAULT NULL,
  `ngaysinh` date DEFAULT NULL,
  `malop` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sinh_viens`
--

INSERT INTO `sinh_viens` (`masv`, `hoten`, `gioitinh`, `email`, `sdt`, `ngaysinh`, `malop`, `created_at`, `updated_at`) VALUES
('DH52102370', 'Nguyễn Thị B', 'Nữ', 'dh52102370@student.stu.edu.vn', '923957625', '2003-04-05', 'D21_TH02', '2025-12-19 08:09:48', '2025-12-29 01:11:55'),
('DH52102371', 'Trần Văn C', 'Nam', 'dh52102371@student.stu.edu.vn', '923957626', '2003-05-05', 'D21_TH02', '2026-01-22 08:12:54', '2026-01-22 08:12:54'),
('DH52200298', 'Nguyễn Thị A', 'Nữ', 'dh52102369@student.stu.edu.vn', '923957624', '2003-05-02', 'D22_TH01', '2025-10-21 02:51:26', '2025-12-29 01:05:44'),
('DH52201043', 'Trần Tuệ An', 'Nam', 'dh52201037@student.stu.edu.vn', '0985263147', '2004-11-14', 'D22_TH01', '2025-11-03 03:13:31', '2025-12-22 15:26:22'),
('DH52201047', 'Trần Khánh Linh', 'Nữ', 'dh52201047@student.stu.edu.vn', '0145236789', '2004-02-14', 'D22_TH02', '2025-11-20 12:30:08', '2025-11-20 12:30:08'),
('DH52201897', 'Trần Văn Khánh', 'Nam', 'dh52201897@student.stu.edu.vn', '0978451263', '2002-10-22', 'D22_TH01', '2025-12-22 16:22:30', '2025-12-22 16:22:30'),
('DH52201983', 'Nguyễn Trung Nhân', 'Nam', 'dh52201983@student.stu.edu.vn', '0974125368', '2002-10-15', 'D22_TH01', '2025-12-22 16:22:30', '2025-12-22 16:22:30');

-- --------------------------------------------------------

--
-- Cấu trúc đóng vai cho view `svien_diemdanh`
-- (See below for the actual view)
--
CREATE TABLE `svien_diemdanh` (
`masv` varchar(191)
,`hoten` varchar(191)
,`malop` varchar(191)
,`madiemdanh` varchar(191)
,`malichthi` varchar(191)
,`tinhtrang` tinyint(1)
,`trangthai` varchar(14)
);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_unique` (`email`);

--
-- Chỉ mục cho bảng `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Chỉ mục cho bảng `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Chỉ mục cho bảng `chi_tiet_diem_danhs`
--
ALTER TABLE `chi_tiet_diem_danhs`
  ADD PRIMARY KEY (`masv`,`madiemdanh`),
  ADD KEY `chi_tiet_diem_danhs_madiemdanh_foreign` (`madiemdanh`);

--
-- Chỉ mục cho bảng `diem_danhs`
--
ALTER TABLE `diem_danhs`
  ADD PRIMARY KEY (`madiemdanh`),
  ADD KEY `diem_danhs_malichthi_foreign` (`malichthi`);

--
-- Chỉ mục cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Chỉ mục cho bảng `giang_viens`
--
ALTER TABLE `giang_viens`
  ADD PRIMARY KEY (`magv`),
  ADD UNIQUE KEY `giang_viens_email_unique` (`email`),
  ADD KEY `giang_viens_manganh_foreign` (`manganh`);

--
-- Chỉ mục cho bảng `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Chỉ mục cho bảng `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `lich_this`
--
ALTER TABLE `lich_this`
  ADD PRIMARY KEY (`malichthi`),
  ADD KEY `lich_this_malop_foreign` (`malop`);

--
-- Chỉ mục cho bảng `lops`
--
ALTER TABLE `lops`
  ADD PRIMARY KEY (`malop`),
  ADD KEY `lops_manganh_foreign` (`manganh`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `nganhs`
--
ALTER TABLE `nganhs`
  ADD PRIMARY KEY (`manganh`);

--
-- Chỉ mục cho bảng `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Chỉ mục cho bảng `password_ressets`
--
ALTER TABLE `password_ressets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `password_ressets_email_index` (`email`);

--
-- Chỉ mục cho bảng `phan_cong_lich_this`
--
ALTER TABLE `phan_cong_lich_this`
  ADD PRIMARY KEY (`magv`,`malichthi`),
  ADD KEY `phan_cong_lich_this_malichthi_foreign` (`malichthi`);

--
-- Chỉ mục cho bảng `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Chỉ mục cho bảng `sinh_viens`
--
ALTER TABLE `sinh_viens`
  ADD PRIMARY KEY (`masv`),
  ADD UNIQUE KEY `sinh_viens_email_unique` (`email`),
  ADD UNIQUE KEY `sinh_viens_sdt_unique` (`sdt`),
  ADD KEY `sinh_viens_malop_foreign` (`malop`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `password_ressets`
--
ALTER TABLE `password_ressets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

-- --------------------------------------------------------

--
-- Cấu trúc cho view `svien_diemdanh`
--
DROP TABLE IF EXISTS `svien_diemdanh`;

CREATE ALGORITHM=UNDEFINED DEFINER=`luongmin_ungdungdiemdanhsinhvien`@`localhost` SQL SECURITY DEFINER VIEW `svien_diemdanh`  AS SELECT `s`.`masv` AS `masv`, `s`.`hoten` AS `hoten`, `s`.`malop` AS `malop`, `d`.`madiemdanh` AS `madiemdanh`, `d`.`malichthi` AS `malichthi`, `ct`.`tinhtrang` AS `tinhtrang`, CASE WHEN `ct`.`tinhtrang` = 1 THEN 'Đã điểm danh' ELSE 'Chưa điểm danh' END AS `trangthai` FROM (((`diem_danhs` `d` join `lich_this` `lt` on(`lt`.`malichthi` = `d`.`malichthi`)) join `sinh_viens` `s` on(`s`.`malop` = `lt`.`malop`)) left join `chi_tiet_diem_danhs` `ct` on(`ct`.`madiemdanh` = `d`.`madiemdanh` and `ct`.`masv` = `s`.`masv`)) ;

--
-- Ràng buộc đối với các bảng kết xuất
--

--
-- Ràng buộc cho bảng `chi_tiet_diem_danhs`
--
ALTER TABLE `chi_tiet_diem_danhs`
  ADD CONSTRAINT `chi_tiet_diem_danhs_madiemdanh_foreign` FOREIGN KEY (`madiemdanh`) REFERENCES `diem_danhs` (`madiemdanh`) ON DELETE CASCADE,
  ADD CONSTRAINT `chi_tiet_diem_danhs_masv_foreign` FOREIGN KEY (`masv`) REFERENCES `sinh_viens` (`masv`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `diem_danhs`
--
ALTER TABLE `diem_danhs`
  ADD CONSTRAINT `diem_danhs_malichthi_foreign` FOREIGN KEY (`malichthi`) REFERENCES `lich_this` (`malichthi`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `giang_viens`
--
ALTER TABLE `giang_viens`
  ADD CONSTRAINT `giang_viens_manganh_foreign` FOREIGN KEY (`manganh`) REFERENCES `nganhs` (`manganh`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `lich_this`
--
ALTER TABLE `lich_this`
  ADD CONSTRAINT `lich_this_malop_foreign` FOREIGN KEY (`malop`) REFERENCES `lops` (`malop`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `lops`
--
ALTER TABLE `lops`
  ADD CONSTRAINT `lops_manganh_foreign` FOREIGN KEY (`manganh`) REFERENCES `nganhs` (`manganh`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `phan_cong_lich_this`
--
ALTER TABLE `phan_cong_lich_this`
  ADD CONSTRAINT `phan_cong_lich_this_magv_foreign` FOREIGN KEY (`magv`) REFERENCES `giang_viens` (`magv`) ON DELETE CASCADE,
  ADD CONSTRAINT `phan_cong_lich_this_malichthi_foreign` FOREIGN KEY (`malichthi`) REFERENCES `lich_this` (`malichthi`) ON DELETE CASCADE;

--
-- Ràng buộc cho bảng `sinh_viens`
--
ALTER TABLE `sinh_viens`
  ADD CONSTRAINT `sinh_viens_malop_foreign` FOREIGN KEY (`malop`) REFERENCES `lops` (`malop`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
