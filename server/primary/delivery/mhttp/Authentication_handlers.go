package mhttp

import (
	"gmd/entities"
)

func Authenticate(input entities.User) (string, error) {
	if input.Username == "ducthang" && input.Password == "12345678910" {
		return "correct", nil
	}

	return "incorrect", nil
}
