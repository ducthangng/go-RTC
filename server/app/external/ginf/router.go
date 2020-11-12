package ginf

import (
	"gmd/external/ginf/API"

	"github.com/gin-gonic/gin"
)

func Routing() *gin.Engine {
	r := gin.New()
	r.Use(gin.Recovery(), gin.Logger())

	r.POST("/auth", API.Authentication)
	r.POST("/register", API.Register)

	service := r.Group("serivce")
	{
		service.GET("/GetFriendList")
		service.GET("/GetUserInfo")
	}
	return r
}
