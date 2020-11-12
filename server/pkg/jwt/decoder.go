package jwt

import "golang.org/x/crypto/bcrypt"

func DecoderBcrypt(value []byte, notdecodedvalue []byte) error {
	return bcrypt.CompareHashAndPassword(value, notdecodedvalue)
}
