package jwt

import (
	"gmd/app/domain/repository"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type Claims struct {
	Username string `json:"username"`
	Password []byte `json:"password"`
	jwt.StandardClaims
}

var jwtSecret []byte

func GenerateToken(user *repository.User) (string, error) {
	expireTime := time.Now().Add(3 * time.Hour)
	pas, err := EncoderBcrypt(user.Password)
	if err != nil {
		return "", err
	}

	claims := Claims{
		user.Username,
		pas,
		jwt.StandardClaims{
			ExpiresAt: expireTime.Unix(),
			Issuer:    "ducthang",
		},
	}

	tokenClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	token, err := tokenClaims.SignedString(jwtSecret)

	return token, err
}

func ParseToken(token string) (*Claims, error) {
	tokenClaims, err := jwt.ParseWithClaims(token, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtSecret, nil
	})

	if tokenClaims != nil {
		if claims, ok := tokenClaims.Claims.(*Claims); ok && tokenClaims.Valid {
			return claims, nil
		}
	}

	return nil, err
}
