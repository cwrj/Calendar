package main

import (
	"fmt"
	"net/http"
)

/*
func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Inside handler")
	fmt.Fprintf(w, "Hello, world from my Go webserver.\n")
}
*/
func main() {
	//http.HandleFunc("/", handler)
	//assets := http.StripPrefix("/", http.FileServer(http.Dir("assets/")))
	assets := http.FileServer(http.Dir("assets/"))

	http.Handle("/", assets)

	fmt.Println("Inside main Bitch!")

	
	http.ListenAndServe("localhost:9999", nil)
}
