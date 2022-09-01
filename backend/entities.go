package backend

// Product data
type Product struct {
	ID          int     `json:"id"`
	Name        string  `json:"name"`
	Category    string  `json:"category"`
	Description string  `json:"description"`
	Price       float32 `json:"price"`
}

// Order data
type Order struct {
	Lines []Line `json:"lines"`
}

// Line data in an order
type Line struct {
	ProductID   int    `json:"productid"`
	ProductName string `json:"productname"`
	Quantity    int    `json:"quantity"`
}
