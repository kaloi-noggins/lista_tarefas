ALTER USER 'ademir' IDENTIFIED WITH mysql_native_password BY 'SenhaForte@123';
FLUSH PRIVILEGES;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema lista_tarefas
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema lista_tarefas
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `lista_tarefas` ;
USE `lista_tarefas` ;

-- -----------------------------------------------------
-- Table `lista_tarefas`.`tarefas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `lista_tarefas`.`tarefas` (
  `id` CHAR(36) NOT NULL,
  `descricao` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;