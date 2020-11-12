package repository

import (
	"errors"
	"gmd/app/domain/entities"
	"gmd/pkg/cvalidation"
)

type User entities.User
type Friend entities.Friend

func (u *User) CreateUserProfile() error {
	var user entities.User
	user = entities.User{
		Username: u.Username,
		Password: u.Password,
	}

	err := cvalidation.ValidateUser(user.Username, user.Password)
	if err != nil {
		return err
	}

	result := db.Create(&user)
	if result.RowsAffected == 1 {
		return nil
	}

	return errors.New("Create not successful")
}

func (u *User) QueryUserByID(ID int) (User, error) {
	var user entities.User
	if err := db.Model(&entities.User{}).Where("ID = ?", ID).First(&user); err != nil {
		return User{}, errors.New("Query By ID not successful")
	}

	return User{
		Username:   user.Username,
		UserFriend: user.UserFriend,
	}, nil
}

func (u *User) QueryUserProfile() (User, error) {
	var user entities.User

	if err := db.Where(&entities.User{Username: u.Username, Password: u.Password}).First(&user); err != nil {
		return User{}, errors.New("Query not successful")
	}

	return User{
		Username:   user.Username,
		UserFriend: user.UserFriend,
	}, nil
}

func (u *User) QueryUserFriends() ([]User, error) {
	var user entities.User
	var users []User
	var status bool = true

	for _, v := range u.UserFriend {
		if err := db.Where("ID = ?", v.ID).First(&user); err != nil {
			status = false
		}
		if status {
			users = append(users, User{
				Username:   user.Username,
				UserFriend: user.UserFriend,
			})
		}
		status = true
	}
	if len(users) == 0 {
		return []User{}, errors.New("Query user friends not successful")
	}

	return users, nil
}

func (u *User) EditUserProfile(field string) error {
	if err := db.Model(&entities.User{}).Where("ID = ?", u.ID).Select(field).Updates(entities.User{
		Username:   u.Username,
		Password:   u.Password,
		UserFriend: u.UserFriend,
	}); err != nil {
		return errors.New("Edit user profile failed")
	}

	return nil
}

func (u *User) DeleteProfile() error {
	if err := db.Where("ID = ?", u.ID).Delete(&entities.User{}); err != nil {
		return errors.New("Delete not successful")
	}

	return nil
}

func (u *User) FindDeleteProfile() bool {
	var user entities.User

	if err := db.Unscoped().Where("ID = ?", u.ID).First(&user); err != nil {
		return false
	}

	return true
}
