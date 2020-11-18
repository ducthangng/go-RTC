package cvalidation

import (
	"errors"

	"regexp"

	validation "github.com/go-ozzo/ozzo-validation"
)

//User inherited from entities.User
type User struct {
	Username string
	Password string
}

func CheckStringNullSpace(value interface{}) error {
	s, err := value.(string)
	if err == false {
		return errors.New("Does not true")
	}
	for _, v := range s {
		if v == 32 {
			return errors.New("Does not enough")
		}
	}

	return nil
}

func ValidateUser(username, password string) error {
	user := User{Username: username, Password: password}
	return validation.ValidateStruct(user,
		validation.Field(&user.Username, validation.Required, validation.Length(5, 100)),
		validation.Field(&user.Password, validation.Required, validation.Max(regexp.MustCompile("^[0-9]{5}$"))),
	)
}
