/**
 * if it has 1 peram then it will extract message status and stack from this single peram obj
 * if it has 2 perams then first perams will be message and second perams will be status
 * if it has 3 perams then 1st will be message 2nd will be status 3rd will be stack
 * if it has 0 peram then it will return a default unknown error
 * @param  {...any} values
 * @returns
 */

function createError(...values) {
  const error = new Error();
  if (values.length == 0) {
    // If there is no perams
    error.message = "Something Went Wrong";
    error.status = 520;
    error.stack = null;
  } else if (values.length == 1) {
    // If there is 1 peram
    const { message, status, stack } = values[0];
    let ErrorStatus = status || 520;
    error.message = message;
    error.status = ErrorStatus;
    error.stack = stack;
  } else if (values.length == 2) {
    // if there is 2 perams
    const message = values[0];
    const status = values[1];
    let ErrorStatus = status || 520;
    error.message = message;
    error.status = ErrorStatus;
    error.stack = null;
  } else if (values.length == 3) {
    // if there is 3 perams
    const message = values[0];
    const status = values[1];
    const stack = values[2];
    let ErrorStatus = status || 520;
    error.message = message;
    error.status = ErrorStatus;
    error.stack = stack;
  } else {
    // If there is so many perams
    error.message = "Something Went Wrong";
    error.status = 520;
    error.stack = null;
  }
  return error;
}

// Export handle erroe Function
export default createError;
