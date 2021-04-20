module.exports = {
  validateInputs(request, response, next) {
    const {name, email, password} = request.body;
    const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!name || !email || !password || !regex.test(email)) {
      return response.status(400).json({message: 'Invalid entries. Try again.'});
    }
    next();
  }
};