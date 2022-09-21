FROM golang:1.19.1 as builder
WORKDIR /build
ADD main.go .
RUN go build -o app main.go

FROM scratch
WORKDIR app
COPY --from=builder /build/app .
ENTRYPOINT ["./app"]