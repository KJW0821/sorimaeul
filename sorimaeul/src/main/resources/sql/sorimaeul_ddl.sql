-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sorimaeul
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sorimaeul
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sorimaeul` DEFAULT CHARACTER SET utf8 ;
USE `sorimaeul` ;

-- -----------------------------------------------------
-- Table `sorimaeul`.`user_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sorimaeul`.`user_tb` (
  `user_code` BIGINT NOT NULL,
  `nickname` VARCHAR(10) NOT NULL,
  `profile_image` VARCHAR(200) NULL,
  `social_type` VARCHAR(6) NOT NULL,
  `join_date` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  `learn_count` TINYINT NOT NULL,
  PRIMARY KEY (`user_code`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sorimaeul`.`cover_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sorimaeul`.`cover_tb` (
  `cover_code` INT NOT NULL AUTO_INCREMENT,
  `user_code` BIGINT NOT NULL,
  `cover_name` VARCHAR(100) NOT NULL,
  `cover_singer` VARCHAR(100) NOT NULL,
  `singer` VARCHAR(100) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `cover_detail` TEXT NULL,
  `storage_path` VARCHAR(200) NOT NULL,
  `is_public` TINYINT NOT NULL,
  `created_time` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  `updated_time` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  `thumbnail_path` VARCHAR(200) NULL,
  `like_count` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`cover_code`),
  INDEX `fk_cover_tb_user_tb_idx` (`user_code` ASC) VISIBLE,
  CONSTRAINT `fk_cover_tb_user_tb`
    FOREIGN KEY (`user_code`)
    REFERENCES `sorimaeul`.`user_tb` (`user_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sorimaeul`.`video_source_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sorimaeul`.`video_source_tb` (
  `video_source_code` INT NOT NULL AUTO_INCREMENT,
  `storage_path` VARCHAR(200) NULL,
  `source_name` VARCHAR(100) NULL,
  `created_time` TIMESTAMP NULL DEFAULT current_timestamp,
  `thumbnail_path` VARCHAR(200) NULL,
  PRIMARY KEY (`video_source_code`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sorimaeul`.`dub_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sorimaeul`.`dub_tb` (
  `dub_code` INT NOT NULL AUTO_INCREMENT,
  `user_code` BIGINT NOT NULL,
  `video_source_code` INT NOT NULL,
  `dub_name` VARCHAR(100) NOT NULL,
  `dub_detail` TEXT NULL,
  `storage_path` VARCHAR(200) NULL,
  `is_public` TINYINT NULL,
  `created_time` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  `updated_time` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  `like_count` INT NOT NULL,
  PRIMARY KEY (`dub_code`),
  INDEX `fk_dub_tb_user_tb1_idx` (`user_code` ASC) VISIBLE,
  INDEX `fk_dub_tb_video_source_tb1_idx` (`video_source_code` ASC) VISIBLE,
  CONSTRAINT `fk_dub_tb_user_tb1`
    FOREIGN KEY (`user_code`)
    REFERENCES `sorimaeul`.`user_tb` (`user_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_dub_tb_video_source_tb1`
    FOREIGN KEY (`video_source_code`)
    REFERENCES `sorimaeul`.`video_source_tb` (`video_source_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sorimaeul`.`voice_model_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sorimaeul`.`voice_model_tb` (
  `model_code` INT NOT NULL AUTO_INCREMENT,
  `user_code` BIGINT NOT NULL,
  `video_source_code` INT NULL,
  `model_name` VARCHAR(40) NULL,
  `storage_path` VARCHAR(200) NOT NULL,
  `image_path` VARCHAR(200) NULL,
  `state` TINYINT NULL DEFAULT 0,
  `record_count` INT NOT NULL DEFAULT 0,
  `created_time` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`model_code`),
  INDEX `fk_voice_model_tb_user_tb1_idx` (`user_code` ASC) VISIBLE,
  INDEX `fk_voice_model_tb_video_source_tb1_idx` (`video_source_code` ASC) VISIBLE,
  CONSTRAINT `fk_voice_model_tb_user_tb1`
    FOREIGN KEY (`user_code`)
    REFERENCES `sorimaeul`.`user_tb` (`user_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_voice_model_tb_video_source_tb1`
    FOREIGN KEY (`video_source_code`)
    REFERENCES `sorimaeul`.`video_source_tb` (`video_source_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sorimaeul`.`voice_source_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sorimaeul`.`voice_source_tb` (
  `voice_source_code` INT NOT NULL AUTO_INCREMENT,
  `video_source_code` INT NOT NULL,
  `model_code` INT NOT NULL,
  `voice_path` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`voice_source_code`),
  INDEX `fk_voice_source_tb_video_source_tb1_idx` (`video_source_code` ASC) VISIBLE,
  INDEX `fk_voice_source_tb_voice_model_tb1_idx` (`model_code` ASC) VISIBLE,
  CONSTRAINT `fk_voice_source_tb_video_source_tb1`
    FOREIGN KEY (`video_source_code`)
    REFERENCES `sorimaeul`.`video_source_tb` (`video_source_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_voice_source_tb_voice_model_tb1`
    FOREIGN KEY (`model_code`)
    REFERENCES `sorimaeul`.`voice_model_tb` (`model_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sorimaeul`.`alert_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sorimaeul`.`alert_tb` (
  `alert_code` INT NOT NULL AUTO_INCREMENT,
  `user_code` BIGINT NOT NULL,
  `alert_content` VARCHAR(200) NOT NULL,
  `is_checked` TINYINT NOT NULL,
  `created_time` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`alert_code`),
  INDEX `fk_alert_tb_user_tb1_idx` (`user_code` ASC) VISIBLE,
  CONSTRAINT `fk_alert_tb_user_tb1`
    FOREIGN KEY (`user_code`)
    REFERENCES `sorimaeul`.`user_tb` (`user_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sorimaeul`.`comment_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sorimaeul`.`comment_tb` (
  `comment_code` INT NOT NULL AUTO_INCREMENT,
  `user_code` BIGINT NOT NULL,
  `cover_code` INT NULL,
  `dub_code` INT NULL,
  `content` TEXT NOT NULL,
  `created_time` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  `comment_tbcol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`comment_code`),
  INDEX `fk_comment_tb_dub_tb1_idx` (`dub_code` ASC) VISIBLE,
  INDEX `fk_comment_tb_cover_tb1_idx` (`cover_code` ASC) VISIBLE,
  INDEX `fk_comment_tb_user_tb1_idx` (`user_code` ASC) VISIBLE,
  CONSTRAINT `fk_comment_tb_dub_tb1`
    FOREIGN KEY (`dub_code`)
    REFERENCES `sorimaeul`.`dub_tb` (`dub_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_tb_cover_tb1`
    FOREIGN KEY (`cover_code`)
    REFERENCES `sorimaeul`.`cover_tb` (`cover_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_tb_user_tb1`
    FOREIGN KEY (`user_code`)
    REFERENCES `sorimaeul`.`user_tb` (`user_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sorimaeul`.`like_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sorimaeul`.`like_tb` (
  `like_code` INT NOT NULL AUTO_INCREMENT,
  `cover_code` INT NULL,
  `dub_code` INT NULL,
  `user_code` BIGINT NOT NULL,
  `created_time` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`like_code`),
  INDEX `fk_like_tb_cover_tb1_idx` (`cover_code` ASC) VISIBLE,
  INDEX `fk_like_tb_dub_tb1_idx` (`dub_code` ASC) VISIBLE,
  INDEX `fk_like_tb_user_tb1_idx` (`user_code` ASC) VISIBLE,
  CONSTRAINT `fk_like_tb_cover_tb1`
    FOREIGN KEY (`cover_code`)
    REFERENCES `sorimaeul`.`cover_tb` (`cover_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_like_tb_dub_tb1`
    FOREIGN KEY (`dub_code`)
    REFERENCES `sorimaeul`.`dub_tb` (`dub_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_like_tb_user_tb1`
    FOREIGN KEY (`user_code`)
    REFERENCES `sorimaeul`.`user_tb` (`user_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sorimaeul`.`script_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sorimaeul`.`script_tb` (
  `script_code` INT NOT NULL AUTO_INCREMENT,
  `script` TEXT NOT NULL,
  PRIMARY KEY (`script_code`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sorimaeul`.`req_board_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sorimaeul`.`req_board_tb` (
  `board_code` INT NOT NULL AUTO_INCREMENT,
  `user_code` BIGINT NOT NULL,
  `type_code` INT NOT NULL,
  `title` VARCHAR(40) NOT NULL,
  `content` TEXT NOT NULL,
  `created_time` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`board_code`),
  INDEX `fk_req_board_tb_user_tb1_idx` (`user_code` ASC) VISIBLE,
  CONSTRAINT `fk_req_board_tb_user_tb1`
    FOREIGN KEY (`user_code`)
    REFERENCES `sorimaeul`.`user_tb` (`user_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sorimaeul`.`playlist_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sorimaeul`.`playlist_tb` (
  `playlist_code` INT NOT NULL AUTO_INCREMENT,
  `user_code` BIGINT NOT NULL,
  `playlist_name` VARCHAR(40) NOT NULL,
  `created_time` TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`playlist_code`),
  INDEX `fk_playlist_tb_user_tb1_idx` (`user_code` ASC) VISIBLE,
  CONSTRAINT `fk_playlist_tb_user_tb1`
    FOREIGN KEY (`user_code`)
    REFERENCES `sorimaeul`.`user_tb` (`user_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sorimaeul`.`playlist_cover_tb`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `sorimaeul`.`playlist_cover_tb` (
  `list_cover_code` INT NOT NULL AUTO_INCREMENT,
  `playlist_code` INT NOT NULL,
  `cover_code` INT NOT NULL,
  `cover_index` INT NOT NULL,
  PRIMARY KEY (`list_cover_code`),
  INDEX `fk_playlist_cover_tb_playlist_tb1_idx` (`playlist_code` ASC) VISIBLE,
  INDEX `fk_playlist_cover_tb_cover_tb1_idx` (`cover_code` ASC) VISIBLE,
  CONSTRAINT `fk_playlist_cover_tb_playlist_tb1`
    FOREIGN KEY (`playlist_code`)
    REFERENCES `sorimaeul`.`playlist_tb` (`playlist_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_playlist_cover_tb_cover_tb1`
    FOREIGN KEY (`cover_code`)
    REFERENCES `sorimaeul`.`cover_tb` (`cover_code`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
