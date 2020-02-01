/**
 * Flag that tells us if it's the weekend 🎉
 */

const date = new Date();

export default date.getDay() === 6 || date.getDay() === 0;
