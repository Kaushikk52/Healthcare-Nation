import React, { useEffect, useState } from "react";

import { IoIosStar, IoMdThumbsUp } from "react-icons/io";
import { BiSolidComment } from "react-icons/bi";
import { PiShareFatFill } from "react-icons/pi";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

import ReviewModal from './ReviewModal'

// Reviewers Images
import First_Reviewer from "/Images/hospital-details/dynamic-content-images/review-images/second-reviewer-image.jpg";
import axios from "axios";
import { User } from "lucide-react";

const Reviews = ({id,avgRating,addRating}) => {
  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState("newest");
  const [rating, setRating] = useState(null)
  const [hoveredRating, setHoveredRating] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const getReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/v1/api/review/facility/${id}`
      );
      const data = response.data.reviews;
      setReviews(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  addRating = async (selectedRating) => {
    setRating(selectedRating)

    // POST request for rating 
    try {
      const response = await axios.post(`http://localhost:8081/v1/api/facility/${id}/rating`,
        { rating: selectedRating },
        {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
      );

      if (!response.ok) {
        throw new Error("Failed to submit rating")
      }

      console.log("Rating submitted successfully")
    } catch (error) {
      console.error("Error submitting rating:", error)
    }
  }

  useEffect(() => {
    getReviews(id);
  }, [id]);

  const starIcon = Array(5).fill(null);

  const bars = [
    { id: 5, width: "!w-[35%]" },
    { id: 4, width: "!w-[80%]" },
    { id: 3, width: "!w-[60%]" },
    { id: 2, width: "!w-[25%]" },
    { id: 1, width: "!w-[15%]" },
  ];

  const reviewer = [
    {
      id: 1,
      image: First_Reviewer,
      name: "Julia Deep",
      reviewCount: "1 Review",
      relativeTime: "4 days ago",
      reviewedText: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets.`,
    },
  ];

  const [likes, setLikes] = useState(reviewer.map(() => false));

  return (
    <div className="!grid !grid-cols-1 lg:!grid-cols-12 !gap-6 !py-8">
      {/* Left Side  */}
      <div className="lg:!col-span-9">
        {/* Reviews Heading and dropdown */}
        <div className="!flex !items-center !justify-between">
          <h1 className="!text-2xl !font-semibold">Reviews</h1>
          <select
            className="!px-4 !font-semibold !text-gray-500"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Review Box & Bars */}
        <div className="!grid !grid-cols-1 !grid-rows-2 sm:!grid-rows-none sm:!grid-cols-12 !gap-y-4 !py-8">
          {/* Left box */}
          <div className="!row-span-1 sm:!col-span-3 !bg-[#1e90ff] !text-white !bg-opacity-90 !rounded-xl sm:!rounded-2xl !flex !flex-col !items-center !justify-center !space-y-1">
            <h1 className="!text-4xl !font-semibold">{avgRating}</h1>
            <span className="!text-lg !font-semibold">
              {reviews.length} Reviews
            </span>
          </div>
          {/* Right Bars  */}
          <div className="!row-span-1 sm:!col-span-9 !flex">
            <div className="!flex !flex-col !justify-center !w-full">
              {bars.map((bar) => (
                <div key={bar.id} className="!flex !items-center !w-full">
                  <div className="!w-10 sm:!w-16 !flex !justify-center !items-center">
                    <span className="!text-lg !font-semibold !text-gray-600">
                      {bar.id}
                    </span>
                  </div>
                  <div
                    className={`!h-[18px] ${bar.width} !bg-[#1e90ff] !bg-opacity-90 !rounded-2xl`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews by peoples */}
        {[...reviews] // Create a new array to avoid mutating the original
  .sort((a, b) => 
    sort === "newest"
      ? new Date(b.createdAt) - new Date(a.createdAt) 
      : new Date(a.createdAt) - new Date(b.createdAt)
  )
  .map((review, index) => (
    <div key={index} className="!my-4 sm:!my-6">
      {/* Reviewer Information */}
      <div className="!grid !grid-cols-1 !gap-y-2 sm:!grid-cols-7 md:!grid-cols-9 lg:!grid-cols-8 xl:!grid-cols-11">
        <div className="sm:!col-span-1 md:!col-span-1 lg:!col-span-1 xl:!col-span-1">
          <img
            src={First_Reviewer}
            alt="reviewer image"
            className="!h-20 !w-20 !rounded-full !object-cover !object-center"
          />
        </div>
        <div className="sm:!col-span-6 md:!col-span-8 lg:!col-span-7 xl:!col-span-10 sm:!px-2 md:!px-3 lg:!px-0 xl:!px-6 !flex !flex-col !justify-center">
          <h1 className="!text-2xl !font-semibold">
            {review.user.firstName} {review.user.lastName}
          </h1>
          <span className="!text-md !text-gray-600 !font-semibold">
            {review.reviewCount || 5} Review
          </span>
        </div>
      </div>

      {/* Reviewed and Relative Days */}
      <div className="!flex !space-x-4 !py-2.5">
        <div className="!flex !justify-center !items-center">
          {starIcon.map((_, index) => (
            <IoIosStar key={index} className="!h-6 !w-6 !mr-0.5 !text-[#74c365]" />
          ))}
        </div>
        <div>
          <span className="!text-md !font-semibold">
            {new Date(review.createdAt).toLocaleDateString("en-US",{
              month: "short",
              day: "2-digit",
              year: "numeric"
            })}
          </span>
        </div>
      </div>

      {/* Review Text and Like, Comment, Share Buttons */}
      <div className="!flex !flex-col !items-start !py-1">
        <div>
          <span className="!text-base !font-medium !text-gray-400">
            {review.comment}
          </span>
        </div>
        <div className="!flex !items-center !space-x-4 sm:!space-x-6">
          <button
            onClick={() => {
              const updatedLikes = [...likes];
              updatedLikes[review.id - 1] = !updatedLikes[review.id - 1];
              setLikes(updatedLikes);
            }}
            className={`!flex !gap-2 !items-center !text-sm !py-2 sm:!text-base ${
              likes[review.id - 1] ? "!text-[#1e90ff]" : "!text-gray-500"
            } !font-medium !transition-all `}
          >
            <IoMdThumbsUp className="!h-6 !w-6" />
            Like
          </button>
          <button className="!flex !gap-2 !items-center !text-sm !py-2 sm:!text-base !text-gray-500 !font-medium ">
            <BiSolidComment className="!h-5 !w-5" />
            Comment
          </button>
          <button className="!flex !gap-2 !items-center !text-sm !py-2 sm:!text-base !text-gray-500 !font-medium ">
            <PiShareFatFill className="!h-6 !w-6" />
            Share
          </button>
        </div>
      </div>
    </div>
  ))}

       
      </div>

      {/* Right Side  */}
      <div className="lg:!col-span-3">
      <div className="w-full max-w-md p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold text-center mb-4">Rate Your Experience</h2>

        <div className="flex justify-center space-x-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <motion.button
              key={star}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(null)}
              className="focus:outline-none"
            >
              <Star
                size={32}
                fill={(hoveredRating !== null ? star <= hoveredRating : star <= (rating || 0)) ? "#4CAF50" : "none"}
                color={(hoveredRating !== null ? star <= hoveredRating : star <= (rating || 0)) ? "#4CAF50" : "#D1D5DB"}
                strokeWidth={2}
              />
            </motion.button>
          ))}
        </div>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-medium transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            Write a Review
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && <ReviewModal onClose={() => setIsModalOpen(false)} currentRating={rating} id={id} />}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default Reviews;
