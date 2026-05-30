package main

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type Response struct {
	Message   string    `json:"message"`
	Timestamp time.Time `json:"timestamp"`
}

func main() {
	r := gin.Default()

	r.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Content-Type")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}
		c.Next()
	})

	r.GET("/api/hello", func(c *gin.Context) {
		c.JSON(http.StatusOK, Response{
			Message:   "Hello from Gin backend!",
			Timestamp: time.Now(),
		})
	})

	r.Run(":8080")
}
