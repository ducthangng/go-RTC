package main

import (
	"gmd/setting"
	"log"
	"net/http"
)

func main() {

	config, err := setting.ReadConfig()
	if err != nil {
		log.Panicf("Unmarshal: %v", err)
	}

	s := &http.Server{
		Addr:              ":" + config.Port,
		ReadTimeout:       config.ReadTimeout,
		ReadHeaderTimeout: config.ReadHeaderTimeout,
		WriteTimeout:      config.WriteTimeout,
		IdleTimeout:       config.IdleTimeout,
		MaxHeaderBytes:    config.MaxHeaderBytes,
		// TLS configuration
		// Handlers
	}

	s.ListenAndServe()
	// Setting up configuration for the server.

	//Initialize the routers

	//Activate the server

}
