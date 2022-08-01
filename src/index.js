import "./styles/index.scss";

const reworkList = {
    design: 1,
    develop: 2,
    test: 3
}
const reworkListTwo = {
    ...reworkList,
    develop: 5,
    test: 6
}
console.log(reworkList);
console.log(reworkListTwo);