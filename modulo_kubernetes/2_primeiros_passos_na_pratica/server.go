package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	// Mapeia função Hello para a rota principal
	http.HandleFunc("/", Hello)
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
