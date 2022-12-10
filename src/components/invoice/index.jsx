import { Container } from "../container";
import { Requests } from "../../utils/http";
import { Images } from "../../utils/images";
import moment from "moment";

const Invoice = (props) => {
  return (
    //   <Container.Basic className="d-none" id="test">
    <Container.Basic className="d-none" id="test">
      {/* <Container.Basic id="test"> */}
      <Container.Row>
        <Container.Column className="col-sm-6 col-lg-6">
          <img
            className="img-fluid w-25 mb-3"
            src={Images.Logo}
            alt="Fabign logo."
            // x={window.width >= 992 ? 170 : 140}
            // y={window.width >= 992 ? 75 : 70}
          />
          <p className="fw-bold fst-italic">
            House-32(Ground floor), Road-05, Block- G, Mirpur-1 1216 Dhaka,
            Dhaka Division, Bangladesh
          </p>
        </Container.Column>
        <Container.Column className="col-sm-6 col-lg-6">
          <h4 className="fw-bold fst-italic">INVOICE# 39610</h4>
          <p className="fw-bold fst-italic">
            {`Invoice Date: ${moment(new Date()).format("DD/MMM/YYYY")}`}
          </p>
          <p className="fw-bold fst-italic">Order No.: {props.item.orderId}</p>
          <p className="fw-bold fst-italic">
            {`Order Date: ${moment(props.item.createdAt).format("MM/DD/YYYY")}`}
          </p>
          <p className="fw-bold fst-italic">
            Shipping Method: Regular Delivery (2-3 Working Days)
          </p>
        </Container.Column>
      </Container.Row>
      <Container.Row className="my-4">
        <Container.Column className="col-sm-6 col-lg-6">
          <p className="fw-bold">Billing Address:</p>
          <p className="fw-bold fst-italic">{props.item.name}</p>
          <p className="fw-bold fst-italic">{props.item.deliveryAddress}</p>
          <p className="fw-bold fst-italic">Email: {props.item?.email}</p>
          <p className="fw-bold fst-italic">Phone: {props.item.phone}</p>
        </Container.Column>
      </Container.Row>
      <Container.Row className="my-4">
        <table className="table table-bordered fw-bold fst-italic">
          <thead>
            <tr>
              <th scope="col">IMAGE</th>
              <th scope="col">SKU</th>
              <th scope="col">PRODUCT</th>
              <th scope="col">QUANTITY</th>
              <th scope="col">PRICE</th>
              <th scope="col">TOTAL PRICE</th>
            </tr>
          </thead>
          <tbody>
            {props.item?.products?.map((item, index) => (
              <tr key={index}>
                <th scope="row">
                  <div>
                    <img
                      src={`${Requests.HostUrl + item.thumbnail}`}
                      className={"img-fluid"}
                      alt="Order props.item"
                      width={window.width >= 992 ? 170 : 140}
                      height={window.width >= 992 ? 75 : 70}
                    />
                  </div>
                </th>
                <td>{item.id.sku}</td>
                <td>{item.id.name}</td>
                <td>{item.quantity}</td>
                <td>{item.purchasePrice}</td>
                <td>{item.subTotal}</td>
              </tr>
            ))}
            <tr>
              <th colSpan="4" scope="row"></th>
              <td>Subtotal</td>
              <td>{props.item.subTotalPrice}</td>
            </tr>
            <tr>
              <th colSpan="4" scope="row"></th>
              <td>Shipping</td>
              <td>{props.item.deliveryCharge}</td>
            </tr>
            <tr>
              <th colSpan="4" scope="row"></th>
              <td>Total</td>
              <td>{props.item.totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </Container.Row>
      <Container.Row className="my-4">
        <p>Good received by customer in good condition.</p>
      </Container.Row>
      <Container.Row className="my-4">
        <p className="fw-bold">Payment History</p>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Sl</th>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
              <th scope="col">Transaction ID</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>23-06-2022 03:01 PM</td>
              <td>{props.item.paymentMethod}</td>
              <td>{props.item.paymentMethod !== "cash" ? "Nagad" : ""}</td>
              <td>{props.item.totalPrice}</td>
            </tr>
          </tbody>
        </table>
      </Container.Row>
      <Container.Row className="my-4">
        <p className="fw-bold">Terms & Conditions:</p>
        <p>
          1. At the time of delivery, you must check the goods in front of the
          deliveryman. Otherwise you will not be able to cancel the order later
          but you can exchange which may take 3-7 working days.
        </p>
        <p>
          2. If you need a refund, you must make a refund request within 1-2
          days and you must know about the refund policy. Otherwise the refund
          request will not be accepted. For any query call{" "}
          <span>
            <a href="tel:+88096XXXXX">+88096XXXXX</a>
          </span>
        </p>
      </Container.Row>
      <Container.Row className="my-4 d-flex justify-content-center">
        {props.item.paymentMethod !== "cash" && (
          <img
            className="img-fluid w-25"
            src={Images.Paid}
            alt="Paid"
            // x={window.width >= 992 ? 170 : 140}
            // y={window.width >= 992 ? 75 : 70}
          />
        )}
      </Container.Row>
      <Container.Row className="my-4 text-center">
        <p>
          {`PDF Generated on ${moment(new Date()).format(
            "dddd, MMMM Do, YYYY",
          )}`}
        </p>
      </Container.Row>
    </Container.Basic>
  );
};

export default Invoice;
