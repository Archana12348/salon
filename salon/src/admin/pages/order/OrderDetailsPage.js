"use client";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import { ArrowLeft } from "lucide-react";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ page and per_page URL params
  const initialPage = Number.parseInt(searchParams.get("page") || "1", 10);
  const initialPerPage = Number.parseInt(
    searchParams.get("per_page") || "10",
    10
  );
  const [page, setPage] = useState(initialPage);
  const [entriesPerPage, setEntriesPerPage] = useState(initialPerPage);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(
          `https://tyka.premierhostings.com/backend/api/orders/${id}`
        );
        setOrder(res.data);
        console.log(res.data);
        console.log(res.data.data.users);
      } catch (err) {
        console.error("❌ Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Loading Order Details...</p>
      </div>
    );
  }

  if (!order || !order.data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500">Order not found</p>
      </div>
    );
  }

  const orderData = order.data;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Back Button */}
      <Button
        variant="outline"
        onClick={() =>
          navigate(`/orders?page=${page}&per_page=${entriesPerPage}`)
        }
        className="flex items-center gap-2 dark:text-white"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Orders
      </Button>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <p>
            <strong>Order Code:</strong> {orderData.order_code}
          </p>
          <p>
            <strong>Status:</strong> {orderData.order_status}
          </p>
          <p>
            <strong>Payment:</strong> {orderData.payment_status} (
            {orderData.payment_type})
          </p>
          <p>
            <strong>Total:</strong> ₹{orderData.total_amount}
          </p>
          <p>
            <strong>Shipping Charges:</strong> ₹{orderData.shipping_charge}
          </p>
          <p>
            <strong>Final Amount:</strong> ₹{orderData.final_amount}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(orderData.order_date).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      {orderData?.shipping_detail && (
        <Card className="bg-transparent  border border-gray-200 shadow-md">
          {/* --- Shipping Info --- */}
          <CardHeader>
            <CardTitle>Shipping Details</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <p>
              <strong>Carrier:</strong>{" "}
              {orderData.shipping_detail?.carrier_name || "null"}
            </p>
            <p>
              <strong>Consignment #:</strong>{" "}
              {orderData.shipping_detail?.consignment_number || "null"}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              {orderData.shipping_detail?.payload?.consignments?.[0]
                ?.description || "null"}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {orderData.shipping_detail?.status || "-"}
            </p>
            <p>
              <strong>Customer Ref #:</strong>{" "}
              {orderData.shipping_detail?.customer_reference_number || "null"}
            </p>
            <p>
              <strong>COD Amount:</strong> ₹
              {orderData.shipping_detail?.payload?.consignments?.[0]
                ?.cod_amount || "0.00"}
            </p>
            <p>
              <strong>Declared Value:</strong> ₹
              {orderData.shipping_detail?.payload?.consignments?.[0]
                ?.declared_value || "0.00"}
            </p>
            <p>
              <strong>Weight:</strong>{" "}
              {orderData.shipping_detail?.payload?.consignments?.[0]?.weight}{" "}
              {
                orderData.shipping_detail?.payload?.consignments?.[0]
                  ?.weight_unit
              }
            </p>
            <p>
              <strong>Dimensions (L×W×H):</strong>{" "}
              {orderData.shipping_detail?.payload?.consignments?.[0]?.length}×
              {orderData.shipping_detail?.payload?.consignments?.[0]?.width}×
              {orderData.shipping_detail?.payload?.consignments?.[0]?.height}{" "}
              {
                orderData.shipping_detail?.payload?.consignments?.[0]
                  ?.dimension_unit
              }
            </p>
          </CardContent>

          {/* --- Origin --- */}
          <hr className="border-gray-300 my-3" />
          <CardHeader>
            <CardTitle>Origin Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(() => {
              const o =
                orderData.shipping_detail?.payload?.consignments?.[0]
                  ?.origin_details;
              return (
                <>
                  <p>
                    <strong>Name:</strong> {o?.name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {o?.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {o?.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {o?.address_line_1},{" "}
                    {o?.address_line_2}
                  </p>
                  <p>
                    <strong>City:</strong> {o?.city}
                  </p>
                  <p>
                    <strong>State:</strong> {o?.state}
                  </p>
                  <p>
                    <strong>Pincode:</strong> {o?.pincode}
                  </p>
                </>
              );
            })()}
          </CardContent>

          {/* --- Destination --- */}
          <hr className="border-gray-300 my-3" />
          <CardHeader>
            <CardTitle>Destination Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(() => {
              const d =
                orderData.shipping_detail?.payload?.consignments?.[0]
                  ?.destination_details;
              return (
                <>
                  <p>
                    <strong>Name:</strong> {d?.name}
                  </p>
                  <p>
                    <strong>Phone:</strong> {d?.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {d?.email}
                  </p>
                  <p>
                    <strong>Address:</strong> {d?.address_line_1},{" "}
                    {d?.address_line_2}
                  </p>
                  <p>
                    <strong>City:</strong> {d?.city}
                  </p>
                  <p>
                    <strong>State:</strong> {d?.state}
                  </p>
                  <p>
                    <strong>Pincode:</strong> {d?.pincode}
                  </p>
                </>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* Customer + Shipping Info (Merged Layout) */}
      <Card>
        <CardHeader>
          <CardTitle>Customer & Shipping Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Customer Info (Table Layout + Centered Image) */}
            <div className="border rounded-xl p-4 bg-gray-50 dark:bg-gray-800 flex flex-col items-center">
              {/* Customer Image */}
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex justify-center overflow-hidden">
                {orderData.users?.avatar ? (
                  <img
                    src={orderData.users.avatar}
                    alt={orderData.users.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 text-sm">No Image</span>
                )}
              </div>

              {/* Customer Details in Table */}
              <table className="min-w-full text-sm mt-3">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {orderData.users &&
                  Object.keys(orderData.users).length > 0 ? (
                    <>
                      <tr>
                        <td className="font-semibold pr-4 py-2">Name</td>
                        <td className="py-2">
                          {orderData.users?.name || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold pr-4 py-2">Email</td>
                        <td className="py-2">
                          {orderData.users?.email || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold pr-4 py-2">Phone</td>
                        <td className="py-2">
                          {orderData.users?.phone || "N/A"}
                        </td>
                      </tr>
                    </>
                  ) : (
                    <>
                      <tr>
                        <td className="font-semibold pr-4 py-2">Name</td>
                        <td className="py-2">
                          {orderData.guest_name || "Guest"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold pr-4 py-2">Email</td>
                        <td className="py-2">
                          {orderData.guest_email || "N/A"}
                        </td>
                      </tr>
                      <tr>
                        <td className="font-semibold pr-4 py-2">Phone</td>
                        <td className="py-2">
                          {orderData.guest_phone || "N/A"}
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            {/* Right: Shipping Address (Table Layout) */}
            <div className="border rounded-xl p-4 bg-gray-50 dark:bg-gray-800 overflow-x-auto">
              {orderData.users && Object.keys(orderData.users).length > 0 ? (
                <table className="min-w-full text-sm">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="font-semibold pr-4 py-2">Name</td>
                      <td className="py-2">{orderData.user_address.name}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-4 py-2">Email</td>
                      <td className="py-2">{orderData.user_address.email}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-4 py-2">Phone</td>
                      <td className="py-2">
                        {orderData.user_address.phone_number}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-4 py-2">Address</td>
                      <td className="py-2">
                        {orderData.user_address.street},{" "}
                        {orderData.user_address.apartment_suite}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-4 py-2">City</td>
                      <td className="py-2">
                        {orderData.user_address.city?.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-4 py-2">State</td>
                      <td className="py-2">
                        {orderData.user_address.state?.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-4 py-2">Country</td>
                      <td className="py-2">
                        {orderData.user_address.country?.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-4 py-2">Zip Code</td>
                      <td className="py-2">{orderData.user_address.zipcode}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-4 py-2">Address Type</td>
                      <td className="py-2">
                        {orderData.user_address.address_type}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : orderData.guest_shipping_address ||
                orderData.guest_billing_address ? (
                <table className="min-w-full text-sm">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr>
                      <td className="font-semibold pr-4 py-2">
                        Shipping Address
                      </td>
                      <td className="py-2">
                        {orderData.guest_shipping_address || "N/A"}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold pr-4 py-2">
                        Billing Address
                      </td>
                      <td className="py-2">
                        {orderData.guest_billing_address || "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No shipping address provided</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Color</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Subtotal</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderData.order_details?.data?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      src={item.products?.default_image}
                      alt={item.products?.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold">{item.products?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      SKU: {item.products?.sku}
                    </p>
                  </TableCell>
                  <TableCell>
                    {item.colors && (
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-8 h-8 rounded-full border-2 border-gray-400"
                          style={{
                            background: item.colors.hexa_code_2
                              ? `linear-gradient(135deg, ${item.colors.hexa_code} 50%, ${item.colors.hexa_code_2} 50%)`
                              : item.colors.hexa_code,
                          }}
                        ></div>
                        <span>{item.colors.name}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{item.sizes?.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>₹{item.sub_total}</TableCell>
                  <TableCell>{orderData.order_status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetailsPage;
