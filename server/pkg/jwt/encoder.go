package jwt

import (
	"crypto/md5"
	"encoding/hex"

	"golang.org/x/crypto/bcrypt"
)

func EncoderMD5(value string) string {
	m := md5.New()
	m.Write([]byte(value))

	return hex.EncodeToString(m.Sum(nil))
}

func EncoderBcrypt(value string) ([]byte, error) {
	password := []byte(value)
	hashedPassword, err := bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)

	if err != nil {
		return []byte{}, err
	}

	return hashedPassword, nil
}
