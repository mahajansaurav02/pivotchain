document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');

    const apiUrl = 'http://localhost:5000'; 

    
    const fetchProducts = async () => {
        try {
            const response = await fetch(`http://localhost:5000/getProducts`,{
                method:"GET"
            });
            console.log(response)
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            updateProductList(data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
            productList.innerHTML = '<p>Failed to fetch products.</p>';
        }
    };

    // Function to update the product list
    const updateProductList = (products) => {
        if (products.length === 0) {
            productList.innerHTML = '<p>No products found.</p>';
            return;
        }

        productList.innerHTML = products.map(product => `
            <div class="product">
                <h3>${product.title}</h3>
                <p>${product.description}</p>
                <p>Price: ₹${product.price}</p>
                <img src="${product.productImage}" alt="${product.title}" />
                <button onclick="updateProduct('${product._id}')">Update</button>
                <button onclick="deleteProduct('${product._id}')">Delete</button>
            </div>
        `).join('');
    };

    // Function to create a new product
    const createProduct = async (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const productImage = document.getElementById('productImage').value;
        const price = document.getElementById('price').value;

        try {
            const response = await fetch(`${apiUrl}/createProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, productImage, price })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            productForm.reset();
            window.alert("Product Added Successfully")
            fetchProducts();
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };
  
      // Function to delete a product
      const deleteProduct = async (productId) => {
        try {
            const response = await fetch(`${apiUrl}/deleteP/${productId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
            window.alert("Product Deleted Successfully")

            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };




    
    // Function to update a product
    const updateProduct = async (productId) => {
        const updatedTitle = prompt('Enter the updated title:');
        const updatedDescription = prompt('Enter the updated description:');
        const updatedProductImage = prompt('Enter the updated product image URL:');
        const updatedPrice = parseFloat(prompt('Enter the updated price:'));

        try {
            const response = await fetch(`${apiUrl}/updateP/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: updatedTitle,
                    description: updatedDescription,
                    productImage: updatedProductImage,
                    price: updatedPrice
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
            window.alert("Product Updated Successfully")


            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
    window.updateProduct = updateProduct;
    window.deleteProduct = deleteProduct;

document.addEventListener('DOMContentLoaded', () => {
});


    // Add event listener to the form submit
    productForm.addEventListener('submit', createProduct);
  
    fetchProducts();
});
