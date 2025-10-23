import React, { useState } from "react";

const Review = () => {
  const [newReview, setNewReview] = useState({
    name: "",
    image: "",
    reviewImg: "",
    text: "",
  });

  // Placeholder reviews
  const placeholderReviews = [
    {
      id: 1,
      name: "Alice Johnson",
      image: "https://i.pravatar.cc/50?img=1",
      reviewImg: "https://i.ibb.co/3y8kV6Q/coconut.jpg",
      text: "I love Coconut Hub! Fresh products and fast delivery.",
    },
    {
      id: 2,
      name: "David Smith",
      image: "https://i.pravatar.cc/50?img=2",
      reviewImg: "https://i.ibb.co/Q8rG4k7/dry-coconut.jpg",
      text: "High quality coconut products. Will order again!",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Backend integration goes here later
    console.log("New review submitted:", newReview);
    setNewReview({ name: "", image: "", reviewImg: "", text: "" });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Customer Reviews</h1>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border p-6 rounded-lg shadow-md mb-10"
      >
        <input
          type="text"
          name="name"
          value={newReview.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="image"
          value={newReview.image}
          onChange={handleChange}
          placeholder="Profile Image URL"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="reviewImg"
          value={newReview.reviewImg}
          onChange={handleChange}
          placeholder="Review Image URL (optional)"
          className="border p-2 rounded"
        />
        <textarea
          name="text"
          value={newReview.text}
          onChange={handleChange}
          placeholder="Your Review"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-all duration-300"
        >
          Submit Review
        </button>
      </form>

      {/* Reviews List */}
      <div className="grid gap-6 md:grid-cols-2">
        {placeholderReviews.map((review) => (
          <div
            key={review.id}
            className="border p-4 rounded-lg shadow-md flex flex-col items-center"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={review.image}
                alt={review.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <h3 className="font-semibold">{review.name}</h3>
            </div>
            {review.reviewImg && (
              <img
                src={review.reviewImg}
                alt="Review"
                className="w-full h-40 object-cover rounded mb-3"
              />
            )}
            <p className="text-gray-700 text-center">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
