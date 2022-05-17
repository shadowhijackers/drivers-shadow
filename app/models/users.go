package models

import (
	"encoding/json"
	"io/ioutil"
	"log"
)

type user struct {
	Id       string `json: "_id"`
	Name     string `json: "name"`
	password string `json: "password"`
}

type users map[string]user

var USERS = make(users)

func addOrUpdateUser(u *user) {
	if u != nil {
		USERS[u.Id] = *u
	}
}

func updateUsersDB() {
	content, err := json.Marshal(USERS)
	if err != nil {
		err = ioutil.WriteFile("users.json", content, 644)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func restoreUsersDB() {
	content, err := ioutil.ReadFile("users.json")
	if err != nil {
		err = json.Unmarshal(content, &USERS)
		if err != nil {
			log.Fatal(err)
		}
	}
}
