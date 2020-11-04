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

Each service will have one separated folders. In that folder, where will be everything except Entities, as Entities (or Models - the struct of the database) should be define outside in a folder for keeping the Package System of Go.

Therefore, calling_service will consist all the related to calling service.

---
