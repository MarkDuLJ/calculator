// const grandparent = document.getElementById("1");
// const grandparent = document.querySelector(".grandparent");
// const children = grandparent.querySelectorAll(".child");
const child = document.querySelector(".child");
const grandparent = child.closest(".grandparent");
const childSibling = child.nextElementSibling;

// const parents = Array.from(document.getElementsByClassName("parent"));
// const parents = Array.from(grandparent);
// changeBackground(grandparent);
changeBackground(childSibling.previousElementSibling);
console.log(childSibling);
// parents.forEach((element) => {
//   changeBackground(element);
// });

// parents.forEach(changeBackground);

// for (let i = 0; i < parents.length; i++) {
//   changeBackground(parents[i]);
// }
function changeBackground(el) {
  el.style.backgroundColor = "purple";
}
