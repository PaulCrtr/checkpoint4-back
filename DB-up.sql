-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema recipes
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema recipes
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `recipes` DEFAULT CHARACTER SET utf8 ;
USE `recipes` ;

-- -----------------------------------------------------
-- Table `recipes`.`Ingredient`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipes`.`Ingredient` (
  `id_ingredient` INT NOT NULL AUTO_INCREMENT,
  `name_ingredient` VARCHAR(45) NULL,
  PRIMARY KEY (`id_ingredient`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `recipes`.`Recipe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipes`.`Recipe` (
  `id_recipe` INT NOT NULL AUTO_INCREMENT,
  `name_recipe` VARCHAR(45) NULL,
  `time_recipe` VARCHAR(45) NULL,
  `number_recipe` VARCHAR(45) NULL,
  PRIMARY KEY (`id_recipe`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `recipes`.`Instruction`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipes`.`Instruction` (
  `id_instruction` INT NOT NULL AUTO_INCREMENT,
  `content_instruction` TEXT NULL,
  `order_instruction` INT NULL,
  `Recipe_id_recipe` INT NOT NULL,
  PRIMARY KEY (`id_instruction`, `Recipe_id_recipe`),
  INDEX `fk_Instruction_Recipe_idx` (`Recipe_id_recipe` ASC),
  CONSTRAINT `fk_Instruction_Recipe`
    FOREIGN KEY (`Recipe_id_recipe`)
    REFERENCES `recipes`.`Recipe` (`id_recipe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `recipes`.`Ingredient_has_Recipe`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `recipes`.`Ingredient_has_Recipe` (
  `Ingredient_id_ingredient` INT NOT NULL,
  `Recipe_id_recipe` INT NOT NULL,
  PRIMARY KEY (`Ingredient_id_ingredient`, `Recipe_id_recipe`),
  INDEX `fk_Ingredient_has_Recipe_Recipe1_idx` (`Recipe_id_recipe` ASC),
  INDEX `fk_Ingredient_has_Recipe_Ingredient1_idx` (`Ingredient_id_ingredient` ASC),
  CONSTRAINT `fk_Ingredient_has_Recipe_Ingredient1`
    FOREIGN KEY (`Ingredient_id_ingredient`)
    REFERENCES `recipes`.`Ingredient` (`id_ingredient`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Ingredient_has_Recipe_Recipe1`
    FOREIGN KEY (`Recipe_id_recipe`)
    REFERENCES `recipes`.`Recipe` (`id_recipe`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
