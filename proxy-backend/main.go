package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

var (
	RESAS_API_KEY  string
	resasApiClient *ResasApiClient
)

type PrefecturesResponse struct {
	Message string `json:"message"`
	Result  []struct {
		PrefCode int32  `json:"prefCode"`
		PrefName string `json:"prefName"`
	} `json:"result"`
}

type ResasApiClient struct {
	Endpoint string
	ApiKey   string
}

func (client ResasApiClient) requestToPrefectures() (PrefecturesResponse, error) {
	path := "/api/v1/prefectures"

	req, err := http.NewRequest("GET", client.Endpoint+path, nil)
	if err != nil {
		log.Fatal(err)
	}

	req.Header.Add("Accept", "application/json")
	req.Header.Add("X-API-KEY", client.ApiKey)

	resp, err := (&http.Client{}).Do(req)
	if err != nil {
		log.Fatal(err)
	}

	var prefList PrefecturesResponse
	if err := json.NewDecoder(resp.Body).Decode(&prefList); err != nil {
		log.Fatal("Cannot decode body")
	}

	return prefList, nil
}

func getPrefectureList(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	prefectureList, err := resasApiClient.requestToPrefectures()
	if err != nil {
		http.Error(w, "Internal Server Error", 503)
	}
	json.NewEncoder(w).Encode(prefectureList)
}

func getPopulationPerYear(w http.ResponseWriter, req *http.Request) {
}

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	RESAS_API_KEY = os.Getenv("RESAS_API_KEY")
	if len(RESAS_API_KEY) == 0 {
		log.Fatal("RESAS_API_KEY is empty")
	}

	resasApiClient = &ResasApiClient{
		Endpoint: "https://opendata.resas-portal.go.jp",
		ApiKey:   RESAS_API_KEY,
	}

	http.HandleFunc("/prefectures", getPrefectureList)
	http.HandleFunc("/population/composition/perYear", getPopulationPerYear)

	http.ListenAndServe(":8090", nil)
}
