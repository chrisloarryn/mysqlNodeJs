const catchAsync = require('./../utils/catchAsync')

exports.signupUser = catchAsync(async (req, res, next, Model) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangedAt: req.body.passwordChangedAt
    })
    console.log(req, req);
    console.log(Model)
  
    const url = `${req.protocol}://${req.get('host')}/me`
    // console.log(url);
    // await new Email(newUser, url).sendWelcome()
  
    // createSendToken(newUser, 201, req, res)
  })