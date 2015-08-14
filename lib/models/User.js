var bcrypt = require('bcrypt');

function User(u) {
  this.email = u.email;
  this.hashedPassword = u.hashedPassword;

}

User.create = function (u, cb) {
  if (u.password !== u.password_confirm) {
    cb("passwords do not match")

  }
    bcrypt.hash(u.password, 8, function(err, hash) {
      u.hashedPassword = hash;
      var user = new User(u);
      User.collection.save(user, cb)
  });

}

User.findByEmail = function (email, cb) {
  User.collection.findOne({email: email}, cb)
};

User.login = function (u, cb) {
  User.findByEmail(u.email, function (err, user) {
    if (user){
      //email found
      bcrypt.compare(u.password, user.hashedPassword, function (err, match) {
        if (match) {
          cb(null, user);
        } else {
          cb('Bad email or password')
        }
      })
    } else {
      //email not found
      cb('Bad email or password')
    }
  })
}


//what the heck does this do..........
//lazy load doesn't try to set property collection until global.db is defined.
Object.defineProperty(User, 'collection', {
  get: function () {
    return global.db.collection('user')
  }
});


module.exports = User;
