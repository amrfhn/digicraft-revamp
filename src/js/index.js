import Vue from "vue";
// Import our custom CSS
import "../styles/index.scss";
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'


// Import the JS components
// import "./components/scrollmagic";
import "./components/navigation";
import "./components/form";

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
