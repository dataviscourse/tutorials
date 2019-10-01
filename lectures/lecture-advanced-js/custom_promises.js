const status = true;

function statusCheckWithCallbacks(ifStatusPassed, ifStatusFailed) {
  if (status) {
    ifStatusPassed("Status has passed");
  } else {
    ifStatusFailed("Status has failed");
  }
}

statusCheckWithCallbacks(
  passMessage => {
    console.log(passMessage);
    console.log("We can now render our visualization!");
  },
  failMessage => {
    console.error(failMessage);
    console.log("Please handle the error!");
  }
);

function statusCheckWithPromise() {
  return new Promise((resolve, reject) => {
    if (status) {
      resolve("Status has passed");
    } else {
      reject("Status has failed");
    }
  });
}

statusCheckWithPromise()
  .then(passMessage => {
    console.log(passMessage);
    console.log("We can now render our visualization!");
  })
  .catch(failMessage => {
    console.error(failMessage);
    console.log("Please handle the error!");
  });
