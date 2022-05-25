package app

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/shadowhijackers/drivers-shadow/app/models"
)

func indexHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "index.html", gin.H{
		"Id": GenerateUId(),
	})
}

func gangLocationsHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "locations.html", nil)
}

func signUpHandler(c *gin.Context) {
	var userInfo struct {
		Name     string `json: name`
		Password string `json: password`
		Type     string `json: type`
	}
	err := c.BindJSON(&userInfo)
	if err != nil {
		c.IndentedJSON(http.StatusForbidden, map[string]interface{}{"status": "error", "message": "Send proper data"})
		return
	}

	if userInfo.Name != "" && userInfo.Password != "" {
		err = models.AddUser(&models.User{Name: userInfo.Name, Password: []byte(userInfo.Password), Type: userInfo.Type})
		if err != nil {
			c.IndentedJSON(http.StatusForbidden, map[string]interface{}{"status": "error", "message": err.Error()})
			return
		}
		c.IndentedJSON(http.StatusOK, map[string]interface{}{"status": "success"})
	}
}

func loginHandler(c *gin.Context) {

	var userInfo struct {
		Name     string `json: name`
		Password string `json: password`
	}
	err := c.BindJSON(&userInfo)

	if err != nil {
		c.IndentedJSON(http.StatusForbidden, map[string]interface{}{"status": "error"})
		return
	}

	var user models.User
	if user, err = models.ValidateUser(userInfo.Name, userInfo.Password); err == nil {
		c.IndentedJSON(http.StatusOK, map[string]interface{}{"status": "success", "user": user})
	}

}
