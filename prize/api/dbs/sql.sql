-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Aug 27, 2017 at 05:38 PM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `shuxi_choujiang`
--

-- --------------------------------------------------------

--
-- Table structure for table `choujiang_zhuli`
--

CREATE TABLE `choujiang_zhuli` (
  `id` int(12) NOT NULL,
  `wxid` varchar(128) NOT NULL,
  `towxid` varchar(128) NOT NULL,
  `create_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `choujiang_zhuli`
--
ALTER TABLE `choujiang_zhuli`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `choujiang_zhuli`
--
ALTER TABLE `choujiang_zhuli`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT;


-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Aug 27, 2017 at 06:21 PM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `shuxi_choujiang`
--

-- --------------------------------------------------------

--
-- Table structure for table `choujiang_user`
--

CREATE TABLE `choujiang_user` (
  `id` int(12) NOT NULL,
  `wxid` varchar(60) NOT NULL,
  `nickname` varchar(128) NOT NULL,
  `headimage` varchar(256) NOT NULL,
  `choujiang_count` int(10) NOT NULL DEFAULT '3',
  `create_date` datetime NOT NULL,
  `name` varchar(60) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `school` varchar(256) NOT NULL,
  `share_date` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `choujiang_user`
--

INSERT INTO `choujiang_user` (`id`, `wxid`, `nickname`, `headimage`, `choujiang_count`, `create_date`, `name`, `mobile`, `school`, `share_date`) VALUES
(3, 'wxopidtest1212', 'WXtest', 'http://wx.qlogo.cn/mmopen/Q3auHgzwzM46TsQsB1a7aL2eGiaicexiavzR6VEQgvOiaEyqLefVlXZyrGtZ3t7psIEjLu9Nq2S0rn8aQbvkX1LyWws29nyeh6QvIq2dia17Zzaw/', 3, '2017-08-27 02:02:50', '', '', '', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `choujiang_user`
--
ALTER TABLE `choujiang_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `choujiang_user`
--
ALTER TABLE `choujiang_user`
  MODIFY `id` int(12) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;




  -- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Aug 27, 2017 at 06:22 PM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `shuxi_choujiang`
--

-- --------------------------------------------------------

--
-- Table structure for table `choujiang_share`
--

CREATE TABLE `choujiang_share` (
  `id` int(11) NOT NULL,
  `wxid` varchar(128) NOT NULL,
  `create_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `choujiang_share`
--
ALTER TABLE `choujiang_share`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `choujiang_share`
--
ALTER TABLE `choujiang_share`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;



  -- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Aug 27, 2017 at 06:22 PM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `shuxi_choujiang`
--

-- --------------------------------------------------------

--
-- Table structure for table `choujiang_jiangpin`
--

CREATE TABLE `choujiang_jiangpin` (
  `id` int(11) NOT NULL,
  `wxid` varchar(128) NOT NULL,
  `jiangpin` varchar(128) NOT NULL,
  `create_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `choujiang_jiangpin`
--
ALTER TABLE `choujiang_jiangpin`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `choujiang_jiangpin`
--
ALTER TABLE `choujiang_jiangpin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

