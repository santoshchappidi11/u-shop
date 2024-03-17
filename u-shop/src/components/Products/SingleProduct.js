import React, { useContext, useEffect, useState } from "react";
import "./SingleProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContexts } from "../Context/AuthContext";
import { toast } from "react-hot-toast";
import api from "../../ApiConfig/index";

const SingleProduct = () => {
  const { state } = useContext(AuthContexts);
  const { singleProdId } = useParams();
  const [singleProduct, setSingleProduct] = useState({});
  const [isShowEditBtn, setIsShowEditBtn] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (state?.currentUser?.email) {
      setCurrentUser(state?.currentUser);
      setIsUserLoggedIn(true);
    } else {
      setCurrentUser({});
      setIsUserLoggedIn(false);
    }
  }, [state]);

  useEffect(() => {
    const getSingleProductData = async () => {
      try {
        const response = await api.post("/get-singleproduct-data", {
          productId: singleProdId,
        });

        if (response.data.success) {
          setSingleProduct(response.data.product);
          setIsLoading(false);
        } else {
          setSingleProduct({});
          toast.error(response.data.message);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        toast.error(error.response.data.message);
      }
    };

    getSingleProductData();
  }, [singleProdId]);

  useEffect(() => {
    if (state?.currentUser?.role == "Seller") {
      setIsShowEditBtn(true);
    } else {
      setIsShowEditBtn(false);
    }
  }, [state]);

  const deleteYourProduct = async (productId) => {
    try {
      const token = JSON.parse(localStorage.getItem("MeeshoUserToken"));
      const response = await api.post("/delete-your-product", {
        token,
        productId,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigateTo(`/${response?.data?.product?.category}`);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const addToCart = async (productId) => {
    const token = JSON.parse(localStorage.getItem("MeeshoUserToken"));
    if (token) {
      try {
        const response = await api.post("/add-to-cart", { token, productId });

        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("Please login to add product to cart!");
    }
  };

  return (
    <>
      <div id="single-product-body">
        {isLoading ? (
          <>
            <div id="single-prod-loading">
              <h3>Loading...</h3>
            </div>
          </>
        ) : (
          <>
            <div id="left">
              <div id="small">
                <div class="img">
                  <img src={singleProduct?.image} alt="product" />
                </div>
                <div class="img">
                  <img src={singleProduct?.image} alt="product" />
                </div>
                <div class="img">
                  <img src={singleProduct?.image} alt="product" />
                </div>
                <div class="img">
                  <img src={singleProduct?.image} alt="product" />
                </div>
              </div>
              <div id="main">
                <div id="img">
                  <img src={singleProduct?.image} alt="product" />
                </div>
                <div id="buttons">
                  {isShowEditBtn && (
                    <>
                      <div class="button">
                        <button
                          onClick={() =>
                            navigateTo(`/edit-product/${singleProduct?._id}`)
                          }
                        >
                          <i class="fa-regular fa-pen-to-square fa-xl"></i>Edit
                          Product
                        </button>
                      </div>
                      <div class="button">
                        <button
                          style={{
                            backgroundColor: "white",
                            color: "#09a492",
                            border: "2px solid #09a492",
                          }}
                          onClick={() => deleteYourProduct(singleProduct?._id)}
                        >
                          <i class="fa-solid fa-trash fa-lg"></i>Delete Product
                        </button>
                      </div>
                    </>
                  )}
                  {!isShowEditBtn && (
                    <div class="button">
                      <button
                        style={{
                          backgroundColor: "white",
                          color: "#09a492",
                          border: "2px solid #09a492",
                        }}
                        onClick={() => addToCart(singleProduct?._id)}
                      >
                        <i class="fa-solid fa-cart-shopping fa-lg"></i>Add to
                        Cart
                      </button>
                    </div>
                  )}
                  {!isShowEditBtn && (
                    <div class="button">
                      <button>
                        <i class="fa-solid fa-angles-right fa-xl"></i>Buy Now
                      </button>
                    </div>
                  )}
                </div>
                <div id="similar-products">
                  <h3>5 Similar Products</h3>
                  <div id="similar-product">
                    <div class="similar">
                      <img src={singleProduct?.image} alt="product" />
                    </div>
                    <div class="similar">
                      <img src={singleProduct?.image} alt="product" />
                    </div>
                    <div class="similar">
                      <img src={singleProduct?.image} alt="product" />
                    </div>
                    <div class="similar">
                      <img src={singleProduct?.image} alt="product" />
                    </div>
                    <div class="similar">
                      <img src={singleProduct?.image} alt="product" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="right">
              <div id="sec-1">
                <h3>{singleProduct?.name?.toUpperCase()}</h3>
                <h1>₹{singleProduct?.price?.toLocaleString("en-IN")}</h1>
                <div id="rating-review">
                  <div id="rating">
                    <h4>
                      {singleProduct?.avgRating
                        ? singleProduct?.avgRating
                        : "3.8"}
                    </h4>
                    <i
                      class="fa-solid fa-star"
                      style={{ fontSize: "10px" }}
                    ></i>
                  </div>
                  <p>15809 Ratings, 3698 Reviews</p>
                </div>
                <p>Free Delivery</p>
              </div>
              <div id="sec-2">
                <h3>Select Size</h3>
                <div id="size">
                  <button>XXS</button>
                  <button>S</button>
                  <button>M</button>
                  <button>L</button>
                  <button>XL</button>
                  <button>XXL</button>
                  <button>XXXL</button>
                </div>
              </div>
              <div id="sec-3">
                <h3>Product Details</h3>
                <div id="prod-details">
                  <p>
                    Name : """"Men's Half T-shirt""""" Cotton Blend (Pink And
                    Royalblue) Casual Wear Striped T-shirts"""""Combo Pack Of 2
                  </p>
                  <p>Fabric : Cotton Blend</p>
                  <p>Sleeve Length : Short Sleeves</p>
                  <p>Pattern : Striped</p>
                  <p>Net Quantity (N) : 2</p>
                  <p>Sizes :</p>
                  <p>XXS, S (Chest Size : 36 in, Length Size: 26 in)</p>
                  <p>M (Chest Size : 38 in, Length Size: 27 in)</p>
                  <p>L (Chest Size : 40 in, Length Size: 28 in)</p>
                  <p>XL (Chest Size : 42 in, Length Size: 29 in)</p>
                  <p>XXL, XXXL</p>
                  <p>Country of Origin : India</p>
                  <p>More Information</p>
                </div>
              </div>
              <div id="sec-4">
                <h3>Sold By</h3>
                <div id="shop">
                  <div id="shop-img">
                    <div id="img">
                      <img
                        src="https://images.meesho.com/images/pow/shop_100.webp"
                        alt="product"
                      />
                    </div>
                    <h3>M S FASHION</h3>
                  </div>
                  <div id="shop-button">
                    <button>View Shop</button>
                  </div>
                </div>
                <div id="details">
                  <div id="rating">
                    <div>
                      <h4>
                        {" "}
                        {singleProduct?.avgRating
                          ? singleProduct?.avgRating
                          : "3.8"}
                      </h4>
                      <i
                        class="fa-solid fa-star"
                        style={{ fontSize: "10px" }}
                      ></i>
                    </div>
                    <p>53,398 Ratings</p>
                  </div>
                  <div id="follower">
                    <h4>1,487</h4>
                    <p>Followers</p>
                  </div>
                  <div id="prod">
                    <h4>92</h4>
                    <p>Products</p>
                  </div>
                </div>
              </div>
              <div id="sec-5">
                <h3>Product Ratings & Reviews</h3>
                <div id="prod-reviews">
                  <div id="main-rating">
                    <div>
                      <h4>
                        {singleProduct?.avgRating
                          ? singleProduct?.avgRating
                          : "3.8"}
                      </h4>
                      <i
                        class="fa-solid fa-star fa-lg"
                        style={{ color: "#0a9353" }}
                      ></i>
                    </div>
                    <div>
                      <h5>16003 Ratings</h5>
                      <h5>3737 Reviews</h5>
                    </div>
                  </div>
                  <div id="prod-rating">
                    <div id="all-ratings">
                      <div class="customer-rating">
                        <p>Excellent</p>
                        <div class="progress-bar">
                          <span
                            style={{ width: "45%", backgroundColor: "#06a759" }}
                            class="bar"
                          ></span>
                        </div>
                        <span>7124</span>
                      </div>
                      <div class="customer-rating">
                        <p>Very Good</p>
                        <div class="progress-bar">
                          <span
                            style={{ width: "25%", backgroundColor: "#06a759" }}
                            class="bar"
                          ></span>
                        </div>
                        <span>3059</span>
                      </div>
                      <div class="customer-rating">
                        <p>Good</p>
                        <div class="progress-bar">
                          <span
                            style={{
                              width: "45%",
                              backgroundColor: "rgb(244, 183, 67)",
                            }}
                            class="bar"
                          ></span>
                        </div>
                        <span>2300</span>
                      </div>
                      <div class="customer-rating">
                        <p>Average</p>
                        <div class="progress-bar">
                          <span
                            style={{
                              width: "45%",
                              backgroundColor: "rgb(236, 128, 61)",
                            }}
                            class="bar"
                          ></span>
                        </div>
                        <span>1082</span>
                      </div>
                      <div class="customer-rating">
                        <p>Poor</p>
                        <div class="progress-bar">
                          <span
                            style={{
                              width: "45%",
                              backgroundColor: "rgb(245, 40, 51)",
                            }}
                            class="bar"
                          ></span>
                        </div>
                        <span>2438</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="sec-6">
                <div id="customer-profile">
                  <div id="img">
                    <img
                      src="https://images.meesho.com/images/reseller/profile_image/52e02eb197b0cfe72a9a1cd20195cd17_b53d06bab7975_1642408065312_512.jpg"
                      alt="product"
                    />
                  </div>
                  <h4>Praveena</h4>
                </div>
                <div id="customer-rating">
                  <div id="customer-rated">
                    <h4>5.0</h4>
                    <i class="fa-solid fa-star" style={{ fontSize: "9px" }}></i>
                  </div>
                  <h5>Posted on 13 June 2023</h5>
                </div>
                <div id="customer-comment">
                  <p>
                    Superb tshirt but both size is different..but it is good
                    fabric.so thank you meesho.
                  </p>
                </div>
                <div id="customer-photos">
                  <div>
                    <img
                      src="https://images.meesho.com/images/ratings_reviews/2097124881/2111536395/2097124881_2111536395_5a893ec68b3e4_128.jpeg"
                      alt="product"
                    />
                  </div>
                  <div>
                    <img
                      src="https://images.meesho.com/images/ratings_reviews/2097124881/2111536395/2097124881_2111536395_c9565ca928743_128.jpeg"
                      alt="product"
                    />
                  </div>
                </div>
                <div className="helpful">
                  <i class="fa-solid fa-thumbs-up fa-xl"></i>
                  <span>Helpful (5)</span>
                </div>
              </div>
              <div id="sec-7">
                <div id="customer-profile">
                  <div id="img">
                    <img
                      src="https://images.meesho.com/images/reseller/profile_image/52e02eb197b0cfe72a9a1cd20195cd17_b53d06bab7975_1642408065312_512.jpg"
                      alt="product"
                    />
                  </div>
                  <h4>A Kumar</h4>
                </div>
                <div id="customer-rating">
                  <div id="customer-rated">
                    <h4>4.0</h4>
                    <i class="fa-solid fa-star" style={{ fontSize: "9px" }}></i>
                  </div>
                  <h5>Posted on 14 June 2023</h5>
                </div>
                <div id="customer-comment">
                  <p>It's material is good but not a 100% cotton..</p>
                </div>
                <div id="customer-photos">
                  <div>
                    <img
                      src="https://images.meesho.com/images/ratings_reviews/2089453485/2103832010/2089453485_2103832010_cdf4aeb8889ef_128.jpeg"
                      alt="product"
                    />
                  </div>
                </div>
                <div className="helpful">
                  <i class="fa-solid fa-thumbs-up fa-xl"></i>
                  <span>Helpful (0)</span>
                </div>
              </div>
              <div id="sec-8">
                <div>
                  <h4>VIEW ALL REVIEWS</h4>
                  <i class="fa-solid fa-angle-right fa-lg"></i>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
