var crypto = require("crypto");

//console.log(getGravatarUrl("foo@bar.com", ".jpg?s=200"));

module.exports = {

  /**
   * Gets a gravatar image for the specified email address and optional arguments.
   * @param  {String} email The email address to get a profile image from Gravatar.
   * @param  {String} args  Arguments to append to the end of the Gravatar URL. Optional, defaults to "".
   * @return {String}       A fully qualified HREF for a gravatar image.
   */
  getGravatarUrl: function(email, args) {
    args = args || "";
    var BASE_URL = "//www.gravatar.com/avatar/";
    // IE: //www.gravatar.com/avatar/e04f525530dafcf4f5bda069d6d59790.jpg?s=200
    return (BASE_URL + this.md5(email) + args).trim();
  },

  /**
   * MD5 hashes the specified string.
   * @param  {String} str A string to hash.
   * @return {String}     The hashed string.
   */
  md5: function(str) {
    str = str.toLowerCase().trim();
    var hash = crypto.createHash("md5");
    hash.update(str);
    return hash.digest("hex");
  }
};