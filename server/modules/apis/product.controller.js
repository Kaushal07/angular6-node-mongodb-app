const Product = require('../../models/productModel');

class ProductContoller {
  constructor(app) {
    app.get('/getProducts', this.getAllProducts);
    app.post('/addProduct', this.addProduct);
    app.get('/singleProduct/:id', this.getProduct);
    app.put('/updateProduct', this.updateProduct);
    app.delete('/singleProduct', this.deleteProduct);
    app.post('/imageUpload', this.uploadSingleImage);
    app.post('/moreImagesUpload', this.uploadMultipleImage);
  }

  getAllProducts(req, res) {
    Product.find({})
      .then((products) => {
      res.send(products);
    })
      .catch((e) => {
      res.send({
        error: e,
        success: false,
        message: "Error while getting products."
      });
    })
  }

  addProduct(req, res) {
    let product = new Product({
      ProductName: req.body.ProductName,
      ProductPrice: req.body.ProductPrice,
      ProductImage: req.body.ProductImage,
      MoreProductImages: req.body.MoreProductImages
    });
    product.save()
      .then((createdProduct) => {
      res.send({
        success: true,
        message: "Product successfully added",
        product: createdProduct
      });
    })
      .catch((e) => {
      res.send({
        error: e,
        success: false,
        message: "Error while adding product."
      });
    })
  }

  getProduct(req, res) {
    let id = req.params.id;
    Product.find({_id: id})
      .then((product) => {
      res.send(product[0]);
    })
      .catch((e) => {
      res.send({
        error: e,
        success: false,
        message: "Error while getting product."
      });
    })
  }

  updateProduct(req, res) {
    const productData = req.body;
    Product.findById(productData._id)
      .then((product) => {
        product.ProductName = productData.ProductName;
        product.ProductPrice = productData.ProductPrice;
        product.ProductImage = productData.ProductImage;
        product.MoreProductImages = req.body.MoreProductImages;
        return product;
      })
      .then((updatedProductObj) => {
        return updatedProductObj.save();
      })
      .then((updatedItem) => {
        res.send({
          success: true,
          product: updatedItem,
          message: "Product successfully updated"
        });
      })
      .catch((e) => {
        res.send({
          error: e,
          success: false,
          message: "Error while updating product."
        });
      })
  }

  deleteProduct(req, res) {
    let productId = req.query.productId;

    Product.findById(productId)
      .then((foundItem) => {
      if (!foundItem) {
        return res.send({
          success: false,
          message: "Product not found.",
          id: productId
        });
      } else {
        return foundItem;
      }
    })
      .then((item) => {
        return Product.remove({_id: item._id})
      })
      .then(() => {
        res.send({
          success: true,
          message: "Product successfully deleted",
          id: productId
        })
      })
      .catch(() => {
        res.send({
          success: false,
          message: "The request was not completed. Product with id " + productId + " is not successfully deleted"
        });
      })
  }

  uploadSingleImage(req, res) {
    global.upload(req, res,  (err) => {
      if (err) {
        return res.send({status: 'error', message: "Something went wrong!", error: err});
      }
      return res.send({
        status: 'success',
        message: "File uploaded successfully!.",
        fileName: req.files[0].originalname
      });
    });
  }


  uploadMultipleImage(req, res) {
    global.moreImagesUpload(req, res, (err) => {
      if (err) {
        return res.send({status: 'error', message: "Something went wrong!", error: err});
      }
      return res.send({status: 'success', message: "File uploaded successfully!.", files: req.files});
    });
  }
}

module.exports = ProductContoller;
