package setting

import (
	"io/ioutil"
	"time"

	"gopkg.in/yaml.v2"
)

type Server struct {
	Host              string        `yaml:"Host"`
	Port              string        `yaml:"Port"`
	TLSConfig         string        `yaml:"TLSConfig"`
	ReadTimeout       time.Duration `yaml:"ReadTimeout"`
	ReadHeaderTimeout time.Duration `yaml:"ReadHeaderTimeout"`
	WriteTimeout      time.Duration `yaml:"WriteTimeout"`
	IdleTimeout       time.Duration `yaml:"IdleTimeout"`
	MaxHeaderBytes    int           `yaml:"MaxHeaderBytes"`
}

type Database struct {
	Type     string `yaml:"Type"`
	User     string `yaml:"User"`
	Password string `yaml:"Password"`
	Host     string `yaml:"Host"`
	Name     string `yaml:"Name"`
}

type Config struct {
	Server
	Database
}

func ReadConfig() (Config, error) {
	yamlFile, err := ioutil.ReadFile("config.yaml")
	if err != nil {
		return Config{}, err
	}

	var config Config
	err = yaml.Unmarshal(yamlFile, &config)
	if err != nil {
		return Config{}, err
	}

	return config, nil
}
