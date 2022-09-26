exports.validateSuperadmin = (req, res, next) => {
    if(req.user.role === 'superadmin'){
      next()
    }else{
      res.status(401).send('You dont have permission to access this page')
    }
  }

  exports.validatePlayer = (req, res, next) => {
    if(req.user.role === 'player'){
      next()
    }else{
      res.status(401).send('You dont have permission to choose room')
    }
  }