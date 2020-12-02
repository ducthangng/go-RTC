package API

import (
	"gmd/app/domain/entities"
	response "gmd/app/external/ginf/Response"
	"gmd/app/interface/restful/handlers"
	"gmd/pkg/e"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Authentication(c *gin.Context) {
	appG := response.Gin{C: c}
	var user entities.User

	c.BindJSON(&user)
	_, err := handlers.Authenticate(user)
	if err != nil {
		appG.Response(http.StatusBadRequest, 404, err)
		return
	}

	appG.Response(http.StatusOK, e.SUCCESS, nil)
}

func Register(c *gin.Context) {
	appG := response.Gin{C: c}
	var user entities.User

	c.ShouldBindJSON(&user)
	if err := handlers.Register(user); err != nil {
		appG.Response(http.StatusInternalServerError, e.ERROR_ADD_USER_FAIL, err)
		return
	}

	appG.Response(http.StatusOK, e.SUCCESS, nil)
}
