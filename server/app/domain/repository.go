package domain

import "gmd/app/domain/repository"

type UserInterface interface {
	CreateUserProfile() error
	QueryUserProfile() (repository.User, error)
	QueryUserByID(ID int) (repository.User, error)
	QueryUserFriends() ([]repository.User, error)
	EditUserProfile(field string) error
	DeleteProfile() error
	FindDeleteProfile() error
}
