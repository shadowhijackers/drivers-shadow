package models

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Id       string `json: "_id,omitempty"`
	Name     string `json: "name"`
	Password []byte `json: "password"`
	Type     string `json: "type"`
}

type users map[string]User

var USERS = make(users)

func AddUser(u *User) error {
	if u != nil {
		password := []byte(u.Password)
		u.Password, _ = bcrypt.GenerateFromPassword(password, bcrypt.DefaultCost)
		if _, exists := USERS[u.Name]; exists {
			return errors.New("User exists")
		}
		USERS[u.Name] = *u
		UpdateUsersDB()
		return nil
	}

	return errors.New("Not valid user")
}

func GetUser(u User) User {
	return USERS[u.Name]
}

func ValidateUser(userName string, password string) (User, error) {
	if user, ok := USERS[userName]; ok {
		passwordBytes := []byte(password)
		err := bcrypt.CompareHashAndPassword(user.Password, passwordBytes)
		if err == nil {
			return user, nil
		}
	}
	return User{}, errors.New("Not valid user")
}

func UpdateUsersDB() {
	content, err := json.Marshal(USERS)
	if err == nil {
		err = ioutil.WriteFile("users.json", content, 644)
		if err != nil {
			log.Fatal(err)
		}
	}
}

func RestoreUsersDB() {
	content, err := ioutil.ReadFile("users.json")
	if err == nil {
		err = json.Unmarshal(content, &USERS)
		if err != nil {
			log.Fatal(err)
		}
	}
}
