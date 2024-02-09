import Post from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().populate('user').exec();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не удалось получить заявки' });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId).populate('user');

    if (!post) {
      return res.status(404).json({ message: 'Заявка не найдена' });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не удалось получить заявку' });
  }
};

export const create = async (req, res) => {
  try {
    const {
      action,
      productName,
      volume,
      priceWithVAT,
      deliveryBasis,
      deliveryPlace,
      counterpartyOption,
      binIin,
      additionalInfo,
    } = req.body;

    const newPost = new Post({
      action,
      productName,
      volume,
      priceWithVAT,
      deliveryBasis,
      deliveryPlace,
      counterpartyOption,
      binIin,
      additionalInfo,
      user: req.userId,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не удалось создать заявку' });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    const {
      action,
      productName,
      volume,
      priceWithVAT,
      deliveryBasis,
      deliveryPlace,
      counterpartyOption,
      binIin,
      additionalInfo,
    } = req.body;

    await Post.findByIdAndUpdate(
      postId,
      {
        action,
        productName,
        volume,
        priceWithVAT,
        deliveryBasis,
        deliveryPlace,
        counterpartyOption,
        binIin,
        additionalInfo,
      },
      { new: true }
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не удалось обновить заявку' });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findByIdAndDelete(postId);

    if (!post) {
      return res.status(404).json({ message: 'Заявка не найдена' });
    }

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Не удалось удалить заявку' });
  }
};
