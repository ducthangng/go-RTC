package e

var MsgFlags = map[int]string{
	SUCCESS:                     "OK",
	ERROR:                       "FAIL",
	ERROR_NOT_EXIST_USER:        "ERROR NOT EXIST USER",
	ERROR_CHECK_EXIST_USER_FAIL: "ERROR CHECK USER EXIST FAIL",
	ERROR_ADD_USER_FAIL:         "ERROR ADD USER FAIL",
	ERROR_DELETE_USER_FAIL:      "ERROR DELETE USER FAIL",
	ERROR_EDIT_USER_FAIL:        "ERROR EDIT USER FAIL",
	ERROR_COUNT_USER_FAIL:       "ERROR COUNT USER FAIL",
	ERROR_GET_USER_FAIL:         "ERROR GET USER FAIL",
	ERROR_GEN_USER_POSTER_FAIL:  "ERROR GEN USER POST",

	ERROR_AUTH_CHECK_TOKEN_FAIL:    "ERROR AUTH CHECK TOKEN FAIL",
	ERROR_AUTH_CHECK_TOKEN_TIMEOUT: "ERROR AUTH CHECK TOKEN TIMEOUT",
	ERROR_AUTH_TOKEN:               "ERROR AUTH TOKEN",
	ERROR_AUTH:                     "ERROR AUTH",
}

// GetMsg get error information based on Code
func GetMsg(code int) string {
	msg, ok := MsgFlags[code]
	if ok {
		return msg
	}

	return MsgFlags[ERROR]
}
