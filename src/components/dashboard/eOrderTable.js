import React, { useCallback, useEffect, useState } from "react";
import { Toastify } from "../toastify";
import { CustomError } from "../../utils/error";
import { Text } from "../text";
import { Card } from "../card";
import { Requests } from "../../utils/http";
import { Loader } from "../loading";

const EOrderTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  // fetch top 5 e-order data
  const fetchEOrder = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const response = await Requests.EOrder.AllIndex(page, limit);
        if (
          response &&
          response.data &&
          response.data.body &&
          response.status === 200
        ) {
          console.log(response.data.body.order);
          setData(response.data.body.order);
        }
        setLoading(false);
      } catch (error) {
        if (error) {
          setLoading(false);
          if (error.response) {
            await CustomError(error.response);
          } else {
            Toastify.Error("Something going wrong.");
          }
        }
      }
    },
    [limit],
  );

  useEffect(() => {
    fetchEOrder(1);
  }, [fetchEOrder]);

  return (
    <div>
      {/* Main top 5 e-order card */}
      <Card.Simple className="border-0">
        <Card.Body className="p-0">
          <Text className="fs-18 fw-bolder text-center mb-0 pt-2">
            Latest 5 Ecommerce Order
          </Text>

          {loading && !data.length > 0 ? <Loader /> : null}
          {!loading && data.length > 0 ? (
            <div className="table-responsive p-3">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th scope="col" width={150}>
                      Name
                    </th>
                    <th scope="col" className="text-center">
                      Product count
                    </th>
                    <th scope="col" className="text-center">
                      Total price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0
                    ? data.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td className="py-2">
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title={data.name}
                                style={{ cursor: "pointer" }}
                              >
                                {item.name.length > 18
                                  ? item.name.slice(0, 16)
                                  : item.name}
                              </div>
                            </td>
                            <td className="py-2 text-center">
                              {item.products.length}
                            </td>
                            <td className="py-2 text-center">
                              {item.totalPrice}
                            </td>
                          </tr>
                        );
                      })
                    : null}
                </tbody>
              </table>
            </div>
          ) : null}
        </Card.Body>
      </Card.Simple>
    </div>
  );
};

export default EOrderTable;
