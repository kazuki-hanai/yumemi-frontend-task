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

type PopulationPerYearResponse struct {
	Message string `json:"message"`
	Result  *struct {
		BoundaryYear int32 `json:"boundaryYear"`
		Data         []struct {
			Label string `json:"label"`
			Data  []struct {
				Year  int32    `json:"year"`
				Value int32    `json:"value"`
				Rate  *float32 `json:"rate"`
			} `json:"data"`
		} `json:"data"`
	} `json:"result"`
}

type ResasApiClient struct {
	Endpoint string
	ApiKey   string
}

type ResasApiErrorResponse struct {
	StatusCode  string `json:"statusCode"`
	Message     string `json:"message"`
	Description string `json:"description"`
}

func (e *ResasApiErrorResponse) Error() string {
	return fmt.Sprintf("statusCode: %s, message: %s, description: %s", e.StatusCode, e.Message, e.Description)
}

func (client ResasApiClient) requestToPrefectures() (*PrefecturesResponse, error) {
	path := "/api/v1/prefectures"

	req, err := http.NewRequest("GET", client.Endpoint+path, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Add("Accept", "application/json")
	req.Header.Add("X-API-KEY", client.ApiKey)

	resp, err := (&http.Client{}).Do(req)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != 200 {
		var errorResponse *ResasApiErrorResponse
		if err := json.NewDecoder(resp.Body).Decode(&errorResponse); err != nil {
			errorResponse = &ResasApiErrorResponse{
				StatusCode:  fmt.Sprint(resp.StatusCode),
				Message:     resp.Status,
				Description: "",
			}
			return nil, errorResponse
		}
		return nil, errorResponse
	}

	var prefList *PrefecturesResponse
	if err := json.NewDecoder(resp.Body).Decode(&prefList); err != nil {
		return nil, err
	}

	return prefList, nil
}

func (client ResasApiClient) requestToPopulationPerYear(prefCode string, cityCode string, addArea string) (*PopulationPerYearResponse, error) {
	path := "/api/v1/population/composition/perYear"

	req, err := http.NewRequest("GET", client.Endpoint+path, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Add("Accept", "application/json")
	req.Header.Add("X-API-KEY", client.ApiKey)

	q := req.URL.Query()
	q.Add("prefCode", prefCode)
	q.Add("cityCode", cityCode)
	if len(addArea) != 0 {
		log.Println(addArea)
		q.Add("addArea", addArea)
	}
	req.URL.RawQuery = q.Encode()

	resp, err := (&http.Client{}).Do(req)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != 200 {
		var errorResponse *ResasApiErrorResponse
		if err := json.NewDecoder(resp.Body).Decode(&errorResponse); err != nil {
			errorResponse = &ResasApiErrorResponse{
				StatusCode:  fmt.Sprint(resp.StatusCode),
				Message:     resp.Status,
				Description: "",
			}
			return nil, errorResponse
		}
		return nil, errorResponse
	}

	var population *PopulationPerYearResponse
	if err := json.NewDecoder(resp.Body).Decode(&population); err != nil {
		return nil, err
	}

	return population, nil
}

func setupCORS(w *http.ResponseWriter, req *http.Request) {
	origin := req.Header.Get("Origin")

	if origin != "http://localhost:8080" && origin != "https://wan-nyan-wan.github.io" {
		return
	}

	(*w).Header().Set("Access-Control-Allow-Origin", origin)
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func getPrefectureList(w http.ResponseWriter, req *http.Request) {
	setupCORS(&w, req)
	if (*req).Method == "OPTIONS" {
		return
	}
	w.Header().Set("Content-Type", "application/json")
	prefectureList, err := resasApiClient.requestToPrefectures()
	if err != nil {
		log.Println(err)
		http.Error(w, "Internal Server Error", 503)
		return
	}
	json.NewEncoder(w).Encode(prefectureList)
}

func getPopulationPerYear(w http.ResponseWriter, req *http.Request) {
	setupCORS(&w, req)
	if (*req).Method == "OPTIONS" {
		return
	}

	queries := req.URL.Query()
	prefCode := queries.Get("prefCode")
	if prefCode == "" {
		http.Error(w, "prefCode is required", 400)
		return
	}
	cityCode := queries.Get("cityCode")
	if cityCode == "" {
		http.Error(w, "cityCode is required", 400)
		return
	}
	addArea := queries.Get("addArea")

	w.Header().Set("Content-Type", "application/json")
	prefectureList, err := resasApiClient.requestToPopulationPerYear(prefCode, cityCode, addArea)
	if err != nil {
		log.Println(err)
		http.Error(w, "Internal Server Error", 503)
		return
	}
	json.NewEncoder(w).Encode(prefectureList)
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
