package hello

import "net/http"

func main() {
	// Mapeia função Hello para a rota principal
	http.HandleFunc("/", Hello)
	// monitora requisições na porta 80
	http.ListenAndServe(":80", nil)
}

func Hello(w http.ResponseWriter, r *http.Request) {
	// retorna os bytes da mensagem
	w.Write([]byte("<h1>Hello</h1>"))
}
