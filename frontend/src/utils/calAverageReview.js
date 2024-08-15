function calculateAverageRating(reviews) {
  const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
  const count = reviews.filter((review) => review.rating !== undefined).length;

  return count === 0 ? 0 : (sum / count).toFixed(1);
}

export default calculateAverageRating;
