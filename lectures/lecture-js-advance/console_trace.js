function callThird() {
  console.trace("Hello! Who called me?");
  console.error("Hello! Who called me?");
}

function callSecond() {
  callThird();
}

function callFirst() {
  callSecond();
}

callFirst();
