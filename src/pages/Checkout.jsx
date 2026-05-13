import { useEffect, useState } from "react";

import {
  addAddress,
  getUserAddresses
} from "../services/addressService";

import { placeOrder } from "../services/orderService";

import { useNavigate } from "react-router-dom";

const Checkout = () => {

  const navigate = useNavigate();

  const [addresses, setAddresses] =
    useState([]);

  const [selectedAddress,
    setSelectedAddress] = useState(null);

  const [formData, setFormData] =
    useState({

      fullName: "",
      mobileNumber: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
      country: ""
    });

  useEffect(() => {

    fetchAddresses();

  }, []);

  const fetchAddresses = async () => {

    try {

      const data =
        await getUserAddresses();

      setAddresses(data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    });
  };

  const handleAddAddress =
    async (e) => {

      e.preventDefault();

      try {

        await addAddress(formData);

        alert("Address Added");

        setFormData({

          fullName: "",
          mobileNumber: "",
          addressLine: "",
          city: "",
          state: "",
          pincode: "",
          country: ""
        });

        fetchAddresses();

      } catch (error) {

        console.log(error);
      }
    };

  const handlePlaceOrder =
    async () => {

      if (!selectedAddress) {

        alert("Select Address");

        return;
      }

      try {

        const order =
          await placeOrder(selectedAddress);

        alert("Order Placed");

        navigate("/orders");

      } catch (error) {

        console.log(error);
      }
    };

  return (

    <div className="container mt-4">

      <h2 className="mb-4">
        Checkout
      </h2>

      <div className="row">

        <div className="col-md-6">

          <div className="card p-4 shadow">

            <h4 className="mb-3">
              Add Address
            </h4>

            <form onSubmit={handleAddAddress}>

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="form-control mb-3"
                value={formData.fullName}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="mobileNumber"
                placeholder="Mobile Number"
                className="form-control mb-3"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />

              <textarea
                name="addressLine"
                placeholder="Address"
                className="form-control mb-3"
                value={formData.addressLine}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                className="form-control mb-3"
                value={formData.city}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                className="form-control mb-3"
                value={formData.state}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                className="form-control mb-3"
                value={formData.pincode}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="country"
                placeholder="Country"
                className="form-control mb-3"
                value={formData.country}
                onChange={handleChange}
                required
              />

              <button className="btn btn-dark w-100">

                Add Address

              </button>

            </form>

          </div>

        </div>

        <div className="col-md-6">

          <div className="card p-4 shadow">

            <h4 className="mb-3">
              Select Address
            </h4>

            {

              addresses.length === 0 ? (

                <p>
                  No Address Found
                </p>

              ) : (

                addresses.map((address) => (

                  <div
                    key={address.id}
                    className={`border p-3 mb-3 rounded ${
                      selectedAddress === address.id
                        ? "border-dark"
                        : ""
                    }`}
                    style={{
                      cursor: "pointer"
                    }}
                    onClick={() =>
                      setSelectedAddress(address.id)
                    }
                  >

                    <h6>
                      {address.fullName}
                    </h6>

                    <p className="mb-1">
                      {address.addressLine}
                    </p>

                    <p className="mb-1">
                      {address.city},
                      {" "}
                      {address.state}
                    </p>

                    <p className="mb-1">
                      {address.pincode}
                    </p>

                    <p className="mb-0">
                      {address.country}
                    </p>

                  </div>
                ))
              )
            }

            <button
              className="btn btn-success w-100 mt-3"
              onClick={handlePlaceOrder}
            >

              Place Order

            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;