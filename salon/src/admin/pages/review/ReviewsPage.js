"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/Table";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/Dialog";
import StatsCard from "../../components/common/Card";
import { Star, Eye, MessageSquare, ThumbsUp, User } from "lucide-react";
import Swal from "sweetalert2";

const TestimonialsPage = () => {
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showViewDialog, setShowViewDialog] = useState(false);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://jumeirah.premierwebtechservices.com/backend/api/admin/testimonials",
      );

      if (res.data.success) {
        const mapped = res.data.data.map((item) => ({
          id: item.id,
          booking_id: item.booking_id,
          service_id: item.service_id,
          user_id: item.user_id,
          rating: item.rating || 0,
          comment: item.comment || "No Comment",
          verified: item.is_verified === 1,
          status: item.status,
          date: item.created_at,
        }));

        setTestimonials(mapped);
      } else {
        setTestimonials([]);
      }
    } catch (err) {
      console.error("Failed to load testimonials", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInlineStatusUpdate = async (id, status, rating, comment) => {
    try {
      const res = await axios.put(
        `https://jumeirah.premierwebtechservices.com/backend/api/admin/testimonials/${id}`,
        {
          rating,
          review: comment,
          status,
        },
      );

      // Axios automatically parses JSON
      const data = res.data;
      console.log(data);

      // Update local state
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status } : t)),
      );

      Swal.fire("Updated!", `Review ${status}`, "success");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const renderStars = (rating) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  const getStatusBadge = (status) => {
    if (status === "approved")
      return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
    if (status === "pending")
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
    return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
  };

  return (
    <div className="space-y-6 bg-white">
      <div>
        <h1 className="text-3xl font-bold dark:text-white">
          Testimonials Management
        </h1>
        <p className="text-muted-foreground">
          Manage customer testimonials & feedback
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Testimonials"
          value={testimonials.length}
          icon={<MessageSquare />}
        />
        <StatsCard
          title="Approved"
          value={testimonials.filter((t) => t.status === "approved").length}
          icon={<ThumbsUp />}
        />
        <StatsCard
          title="Verified"
          value={testimonials.filter((t) => t.verified).length}
          icon={<User />}
        />
        <StatsCard
          title="Average Rating"
          value={
            testimonials.length
              ? (
                  testimonials.reduce((a, b) => a + b.rating, 0) /
                  testimonials.length
                ).toFixed(1)
              : 0
          }
          icon={<Star />}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Testimonials</CardTitle>
          <CardDescription>Customer service feedback & ratings</CardDescription>
        </CardHeader>

        <CardContent className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-6 text-muted-foreground">
              Loading testimonials...
            </div>
          ) : (
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {testimonials.length > 0 ? (
                  testimonials.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell>#{t.id}</TableCell>
                      <TableCell>{renderStars(t.rating)}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {t.comment}
                      </TableCell>
                      <TableCell>
                        {t.verified ? (
                          <Badge className="bg-green-100 text-green-800">
                            Yes
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-700">
                            No
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <select
                          value={t.status}
                          onChange={(e) =>
                            handleInlineStatusUpdate(
                              t.id,
                              e.target.value,
                              t.rating,
                              t.comment,
                            )
                          }
                          className={`px-3 py-1 rounded-full text-xs font-semibold border outline-none cursor-pointer
      ${
        t.status === "pending"
          ? "bg-yellow-100 text-yellow-700 border-yellow-300 capitalize"
          : t.status === "approved"
            ? "bg-green-100 text-green-700 border-green-300 capitalize"
            : "bg-red-100 text-red-700 border-red-300 capitalize"
      }
    `}
                        >
                          <option value="pending">pending</option>
                          <option value="approved">approved</option>
                          <option value="rejected">rejected</option>
                        </select>
                      </TableCell>

                      <TableCell>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedTestimonial(t);
                            setShowViewDialog(true);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No testimonials found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-lg bg-white">
          <DialogHeader>
            <DialogTitle>Testimonial Details</DialogTitle>
          </DialogHeader>

          {selectedTestimonial && (
            <div className="space-y-2 ">
              <p>
                <strong>ID:</strong> {selectedTestimonial.id}
              </p>
              <p>
                <strong>Rating:</strong> {selectedTestimonial.rating} / 5
              </p>
              <p>
                <strong>Comment:</strong> {selectedTestimonial.comment}
              </p>
              <p>
                <strong>Verified:</strong>{" "}
                {selectedTestimonial.verified ? "Yes" : "No"}
              </p>
              <p>
                <strong>Status:</strong> {selectedTestimonial.status}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedTestimonial.date).toLocaleString()}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setShowViewDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestimonialsPage;
