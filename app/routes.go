package app

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/shadowhijackers/drivers-shadow/app/ws"
)

type App struct {
	Router *gin.Engine
}

func (a *App) Initializer() {
	go ws.SocketHub.Listener()
	a.Router = gin.New()
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true // no cors
	a.Router.Use(cors.New(config))
	a.setupRouters()
}

func (a *App) setupRouters() {
	a.Router.Delims("<?go", "?>")
	a.Router.Static("/assets", "./public/assets")
	a.Router.LoadHTMLGlob("public/views/*.html")

	a.Router.GET("/", indexHandler)
	a.Router.POST("/signup", signUpHandler)
	a.Router.POST("/login", loginHandler)
	a.Router.GET("/gangs/:gangId/locations", gangLocationsHandler)
	a.Router.GET("/ws/gangs/:gangId/locations", ws.ServeWS)
}
