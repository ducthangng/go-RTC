# SERVER COMPONENTS

---

## ROUTES

PORT: 8080
List of APIs:

```sh
/register : for user to register [GET][POST]
/login : for user to log-in [GET][POST]
/logout : just a button [POST]
/:user_id : a user dashboard will content the following feature: Make Friend, Call Your Friend, Call a Stranger [GET]
/call/:call_id : create a calling ID so that we know who is in the call. [POST]
```

---

## ARCHITECTURE

Each service will have one separated folder. In that folder, where will be everything except Entities, as Entities (or Models - the struct of the database) should be defined outside in a folder for keeping the "best of Package System".

Therefore, calling_service will consist all the related to calling service.

---

## WebRTC connection:

### STUN 
- Caller send a request to a STUN server to identify its public IP and NAT type.
- - If caller is behind a symmetric NAT, then TURN is needed.
- - Else, caller can use its public IP as an ICE candidate.

### TURN SERVER:
![Img](/webrtc-complete-diagram.png) 
( taken from Mozilla  webRTC explanation)
- TURN Server is used when the caller is behind Symmetric NAT.
- Step:
  - User send an allocation request to TURN server, providing:
    - Username / Password
    - Allocation Transport : what protocol will the Relayed Address use, UDP or TCP
    - Even-Port : Allow client to request an even port , and reserve the next higher port number

  - On Success : return response including:
    - XOR-MAPPED-ADDRESS: Mapped Address of Turn client.
    - RELAYED-ADDRESS: proxy address ,traffic sent by other clients to this client will pass through this address.
  - Client will use this Address as an ICE candidate.

### ICE :
- After exchanging info, caller and callee send their candidates to the other. Candidate can be:
  - Local IP.
  - NAT mapping of clients. 
  - Relayed Transport Address sent by TURN.

- Caller match each candidate he chose with another candidate from the callee and attempts to connect. Similar fashion for callee.
- If connected successfully , media can begin to flow.
