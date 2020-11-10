package API

import (
	"gmd/entities"
	response "gmd/external/ginf/Response"
	"gmd/primary/delivery/mhttp"

	"github.com/gin-gonic/gin"
)

func Authentication(c *gin.Context) {
	appG := response.Gin{C: c}
	var user entities.User

	c.BindJSON(&user)
	res, err := mhttp.Authenticate(user)
	if err != nil {
		appG.Response(400, 404, err)
		return
	}

	appG.Response(200, 404, res)
}

func Register(c *gin.Context) {
	c.JSON(200, gin.H{"msg": "hell boiz"})
}
