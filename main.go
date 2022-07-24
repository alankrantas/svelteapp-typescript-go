package main

import (
	"main/backend"

	"github.com/gin-gonic/gin"
)

// start Golang backend server/service
func main() {
	gin.SetMode(gin.ReleaseMode)
	backend.Server()
}
