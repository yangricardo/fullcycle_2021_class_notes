package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
)

func main() {
	// Mapeia função Hello para a rota principal
	http.HandleFunc("/", Hello)
	http.HandleFunc("/family", FamilyConfigMap)
	// monitora requisições na porta 80
	http.ListenAndServe(":8000", nil)
}

func Hello(w http.ResponseWriter, r *http.Request) {

	name := os.Getenv("NAME")
	age := os.Getenv("AGE")

	fmt.Fprintf(w, "Hello, I'm %s, I'm %s", name, age)

	// // retorna os bytes da mensagem
	// w.Write([]byte("<h1>Hello!!!</h1>"))
}

func FamilyConfigMap(w http.ResponseWriter, r *http.Request) {

	family, err := ioutil.ReadFile("myfamily/family.txt")
	if err != nil {
		log.Fatalf("Error reading file: ", err)
	}

	fmt.Fprintf(w, "My Family %s", family)

	// // retorna os bytes da mensagem
	// w.Write([]byte("<h1>Hello!!!</h1>"))
}
