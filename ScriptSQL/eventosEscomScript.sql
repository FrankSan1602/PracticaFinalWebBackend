-- MySQL dump 10.13  Distrib 8.1.0, for Win64 (x86_64)
--
-- Host: localhost    Database: eventosescom
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `eventosescom`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `eventosescom` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `eventosescom`;

--
-- Table structure for table `asistente`
--

DROP TABLE IF EXISTS `asistente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asistente` (
  `idasistente` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(200) NOT NULL,
  `fechaRegistro` date NOT NULL,
  `materno` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `paterno` varchar(100) NOT NULL,
  `idEvento` bigint DEFAULT NULL,
  PRIMARY KEY (`idasistente`),
  KEY `FKiuba8ky6inxv0u42xqnuaqhye` (`idEvento`),
  CONSTRAINT `FKiuba8ky6inxv0u42xqnuaqhye` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`idEvento`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asistente`
--

LOCK TABLES `asistente` WRITE;
/*!40000 ALTER TABLE `asistente` DISABLE KEYS */;
INSERT INTO `asistente` VALUES (1,'billylopezln@gmail.com','2024-01-07','Lin','Billy Yong Le','López',11),(2,'billylopezln2cv12@gmail.com','2024-01-03','Garcia','Billy','Lopez',4),(7,'johndoe@timemail.com','2099-09-09','Titor','John','Doe',15),(8,'jiapzquin953@gmail.com','2024-01-07','Hernandez','David','Lopez',12),(9,'jiapzquin953@gmail.com','2024-01-07','Hernández','David','García',1),(10,'laantitesis616@gmail.com','2024-01-10','Grande','Antitesis','El ',9);
/*!40000 ALTER TABLE `asistente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evento`
--

DROP TABLE IF EXISTS `evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evento` (
  `idEvento` bigint NOT NULL AUTO_INCREMENT,
  `descripcionEvento` varchar(250) NOT NULL,
  `fechaCreacion` date NOT NULL,
  `nombreEvento` varchar(250) NOT NULL,
  PRIMARY KEY (`idEvento`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
INSERT INTO `evento` VALUES (1,'Prueba que debería ser exitosa','2024-01-03','Prueba exitosa'),(2,'cambié el service.save(evento) por service.save(c)','2024-01-03','si o que???'),(4,'me voy a volver loco a este paso','2024-01-03','dia para locos'),(7,'debido al cambio de la api, se creará y no se cambiará','2024-01-04','evento 8'),(8,'este cambio funcionó','2023-01-05','funcionó'),(9,'cambié la fecha a 1 de febrero','2024-01-31','fecha 1 de febrero'),(10,'esta fecha no deberia cambiar a como es realmente','2024-01-04','segunda prueba de fecha'),(11,'venga va ultima','2024-01-04','again'),(12,'dia 5 de enero','1969-12-31','5 de enero'),(14,'todas las funciones de eventos funcionan','2024-01-06','fin de prueba de eventos'),(15,'regresar al 2012','2099-09-09','viajar en el tiempo');
/*!40000 ALTER TABLE `evento` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-09  1:41:57
