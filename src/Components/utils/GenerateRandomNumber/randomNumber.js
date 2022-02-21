export default function pickRandomNumber (min = 1, max = 11, toInteger = false) { // 5 11
    const randomValue = (Math.random() * (max - min) + min).toFixed(1);
    return toInteger ? parseInt(randomValue) : randomValue;
}