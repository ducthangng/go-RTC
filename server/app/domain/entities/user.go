package entities

import "gorm.io/gorm"

type Friend struct {
	ID int
}

type User struct {
	gorm.Model
	Username   string   `gorm:"unique"`
	Password   string   `gorm:"Password"`
	UserFriend []Friend `gorm:"userfriend"`
}
