package main

import (
	"gmd/external/ginf"
	"gmd/setting"
	"log"
	"net/http"
	"time"
)

func main() {

	config, err := setting.ReadConfig()
	if err != nil {
		log.Panicf("Unmarshal: %v", err)
	}

	routers := ginf.Routing()

	s := &http.Server{
		Handler:           routers,
		Addr:              ":8080",
		ReadTimeout:       config.ReadTimeout * time.Second,
		ReadHeaderTimeout: config.ReadHeaderTimeout * time.Second,
		WriteTimeout:      config.WriteTimeout * time.Second,
		IdleTimeout:       config.IdleTimeout * time.Second,
		MaxHeaderBytes:    config.MaxHeaderBytes,
		// TLS configuration
	}

	s.ListenAndServe()
}
