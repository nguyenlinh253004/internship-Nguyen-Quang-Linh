exports.getAllProducts = (req, res) => {
    res.json([
      { id: 1, name: 'Product A' },
      { id: 2, name: 'Product B' }
    ]);
  };