package API

import (
	"gmd/cmd/e"
	"gmd/domain/entities"
	response "gmd/external/ginf/Response"
	"gmd/primary/delivery/primaryhttp"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Authentication(c *gin.Context) {
	appG := response.Gin{C: c}
	var user entities.User

	c.BindJSON(&user)
	res, err := primaryhttp.Authenticate(user)
	if err != nil {
		appG.Response(http.StatusBadRequest, 404, err)
		return
	}

	appG.Response(200, 404, res)
}

func Register(c *gin.Context) {
	appG := response.Gin{C: c}
	var user entities.User

	c.ShouldBindJSON(&user)
	if err := primaryhttp.Register(user); err != nil {
		appG.Response(http.StatusInternalServerError, e.ERROR_ADD_USER_FAIL, err)
		return
	}

	appG.Response(http.StatusOK, e.SUCCESS, nil)
}
