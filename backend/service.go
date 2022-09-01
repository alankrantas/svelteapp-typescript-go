package backend

import (
	"database/sql"
	"errors"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

const dbFileName = "./backend/data.sqlite3"

// Service is the backend DB/REST api struct
type Service struct {
}

func (s *Service) getDB() (*sql.DB, error) {
	return sql.Open("sqlite3", dbFileName)
}

// QueryProductsFromDB load product list from DB
func (s *Service) QueryProductsFromDB() (products []Product, err error) {

	db, err := s.getDB()
	if err != nil {
		log.Println(err)
		return
	}
	defer db.Close()

	if err = db.Ping(); err != nil {
		log.Println(err)
		return
	}

	rows, err := db.Query("SELECT * FROM products")
	if err != nil {
		log.Println(err)
		return
	}
	defer rows.Close()

	for rows.Next() {
		p := Product{}
		if err := rows.Scan(&p.ID, &p.Name, &p.Category, &p.Description, &p.Price); err != nil {
			log.Println(err)
			continue
		}
		products = append(products, p)
	}

	log.Printf("Queried %d product(s)", len(products))
	return
}

// AddOrderToDB insert new order into DB
func (s *Service) AddOrderToDB(newOrder Order) (newID int, err error) {

	db, err := s.getDB()
	if err != nil {
		log.Println(err)
		return
	}
	defer db.Close()

	if err = db.Ping(); err != nil {
		log.Println(err)
		return
	}

	rowStmt, err := db.Prepare("SELECT MAX(id) AS id FROM orders")
	if err != nil {
		log.Println(err)
		return
	}
	defer rowStmt.Close()

	// get the last order id

	var id sql.NullInt32
	if err = rowStmt.QueryRow().Scan(&id); err != nil {
		log.Println(err)
		return
	}
	if id.Valid {
		newID = int(id.Int32) + 1
	} else {
		newID = 1
	}

	// write each order line as a row

	insertStmt, err := db.Prepare("INSERT INTO orders (id, product_id, quantity) values (?, ?, ?)")
	if err != nil {
		log.Println(err)
		return
	}
	defer insertStmt.Close()

	var itemCount int
	for _, line := range newOrder.Lines {
		itemCount += line.Quantity
		if _, err = insertStmt.Exec(newID, line.ProductID, line.Quantity); err != nil {
			log.Println(err)
		}
	}

	log.Printf("Order #%d (%d items) added\n", newID, itemCount)
	return
}

// ProductService is the GET service for product list
func (s *Service) ProductService(c *gin.Context) {

	products, err := s.QueryProductsFromDB()
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// return JSON
	c.JSON(http.StatusOK, products)
}

// OrderService is the POST service to add new oerder
func (s *Service) OrderService(c *gin.Context) {

	newOrder := Order{}
	if err := c.BindJSON(&newOrder); err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	newID, err := s.AddOrderToDB(newOrder)
	if err != nil || newID == 0 {
		if newID == 0 {
			err = errors.New("Unable to get new order id")
		}
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// return the new order id
	c.JSON(http.StatusCreated, gin.H{"id": newID})
}
