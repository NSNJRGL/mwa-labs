module.exports = {
  multiply: function (req, res) {
    const result = parseInt(req.params.id) * parseInt(req.query.number);
    res.status(200).send(String(result));
  },
};
