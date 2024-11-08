const db = require('../db/connection');

// GET 
exports.getItemById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM items WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Item no encontrado' });
    res.status(200).json(results[0]);
  });
};

// POST
exports.createItem = (req, res) => {
  const { name, price, description, image_url } = req.body;
  const query = 'INSERT INTO items (name, price, description, image_url) VALUES (?, ?, ?, ?)';

  db.query(query, [name, price, description, image_url], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({
      id: results.insertId,
      name,
      price,
      description,
      image_url,
      created_at: new Date(),
      modified_at: new Date(),
    });
  });
};

// PUT 
exports.updateItem = (req, res) => {
  const { item_id } = req.params;
  const { name, price, description, image_url } = req.body;
  const query = 'UPDATE items SET name = ?, price = ?, description = ?, image_url = ?, modified_at = NOW() WHERE id = ?';

  db.query(query, [name, price, description, image_url, item_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Item no encontrado' });
    res.status(200).json({
      id: item_id,
      name,
      price,
      description,
      image_url,
      modified_at: new Date(),
    });
  });
};

// DELETE 
exports.deleteItem = (req, res) => {
  const { item_id } = req.params;
  const query = 'DELETE FROM items WHERE id = ?';

  db.query(query, [item_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0) return res.status(404).json({ message: 'Item no encontrado' });
    res.status(200).json({ message: 'Item eliminado con éxito' });
  });
};
