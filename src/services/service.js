function calculateDurationInMinutes(start, end) {
    // Calculate the duration in minutes here and return the result.
    const startTime = new Date(start);
    const endTime = new Date(end);
    const durationInMilliseconds = endTime - startTime;
    const durationInMinutes = durationInMilliseconds / (1000 * 60);
    return durationInMinutes;
};

module.exports = {calculateDurationInMinutes};