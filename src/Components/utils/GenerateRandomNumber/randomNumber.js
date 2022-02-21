export default function pickRandomNumber (min = 1, max = 11, toInteger = false) {
    const randomValue = (Math.random() * (max - min) + min).toFixed(1);
    return toInteger ? parseInt(randomValue) : randomValue;
}