const increaseBtn = document.getElementById("increaseBtn")
const resetBtn = document.getElementById("resetBtn")
const decreaseBtn = document.getElementById("decreaseBtn")
const couterLable = document.getElementById("couterLable")

let count = 0;


increaseBtn.onclick = function(){
  count++;
  couterLable.textContent = count;
}
resetBtn.onclick = function(){
  count = 0;
  couterLable.textContent = count;
}
decreaseBtn.onclick = function(){
  count--;
  couterLable.textContent = count;
}