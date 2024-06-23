package backend

// Product data
type Product struct {
	Id          int     `json:"id"`
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
	ProductId   int    `json:"productId"`
	ProductName string `json:"productName"`
	Quantity    int    `json:"quantity"`
}

// Result data
type Result struct {
	Id int `json:"id"`
}
