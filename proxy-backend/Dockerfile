FROM golang:1.17-bullseye AS builder

WORKDIR /go/src/github.com/wan-nyan-wan/yumemi-frontend-task/proxy-backend

COPY go.mod go.mod
COPY go.sum go.sum
RUN go mod download

COPY . .
RUN go build -o /usr/bin/proxy ./

CMD ["/usr/bin/proxy"]
