package cvalidation

import (
	"errors"
	"gmd/domain/entities"
	"regexp"

	validation "github.com/go-ozzo/ozzo-validation"
)

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

func ValidateUser(user *entities.User) error {
	return validation.ValidateStruct(user,
		validation.Field(&user.Username, validation.Required, validation.Length(5, 100)),
		validation.Field(&user.Password, validation.Required, validation.Max(regexp.MustCompile("^[0-9]{5}$"))),
	)
}
