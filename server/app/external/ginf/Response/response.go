package response

import "github.com/gin-gonic/gin"

type Response struct {
	Code int         `json:"code"`
	Msg  string      `json:"msg"`
	Data interface{} `json:"data"`
}

type Gin struct {
	C *gin.Context
}

func (g *Gin) Response(httpCode, errorCode int, data interface{}) {
	g.C.JSON(httpCode, Response{
		Code: errorCode, //Default just before the error package
		Msg:  "Log",
		Data: data,
	})
	return
}
