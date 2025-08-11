exports.getData = (req, res) => {
  res.json({ message: 'Data fetched successfully' });
};

exports.postData = (req, res) => {
  const { data } = req.body;
  res.json({ message: 'Data posted successfully', data });
};
