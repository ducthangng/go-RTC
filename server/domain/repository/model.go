package repository

import (
	"fmt"
	"gmd/domain/entities"
	"gmd/setting"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var db *gorm.DB

func Setup(config setting.Config) error {
	db, err := gorm.Open(mysql.Open(fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8&parseTime=True&loc=Local",
		config.Database.User,
		config.Database.Password,
		config.Database.Host,
		config.Database.Name,
	)), &gorm.Config{})

	if err != nil {
		return err
	}

	sqlDB, err := db.DB()
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	SetupUserDB()

	return nil
}

func SetupUserDB() {
	db.AutoMigrate(&entities.User{})
}
