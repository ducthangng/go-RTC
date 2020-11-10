package usecase

// This is for hardcoresummer
import (
	"log"
	"net"

	"github.com/pion/turn/v2"
)

// CreateServer return a TURN server with this publicIP
// should be closed manually by `server.Close()`
func CreateServer(publicIP string) *turn.Server {

	udpListener, err := net.ListenUDP("udp4", &net.UDPAddr{IP: net.ParseIP("0.0.0.0"), Port: 0})
	relay := turn.RelayAddressGeneratorPortRange{
		RelayAddress: net.ParseIP(publicIP), //public IP of your TURN server, users will be given this address when the relay is set.
		MinPort:      1500,
		MaxPort:      5000}
	cfg := turn.ServerConfig{
		PacketConnConfigs: []turn.PacketConnConfig{
			{
				PacketConn:            udpListener,
				RelayAddressGenerator: &relay}}}
	server, err := turn.NewServer(cfg)
	if err != nil {
		log.Panic(err)
	}
	return server
}
