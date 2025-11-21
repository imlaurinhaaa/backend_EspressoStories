const reviewsModel = require("../models/reviewsModel");

const getReviews = async (req, res) => {
    try {
        const { product_id } = req.query;
        const reviews = await reviewsModel.getReviews(product_id);
        res.status(200).json({ message: "Avaliações encontradas com sucesso.", reviews});
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: `Erro ao buscar avaliações: ${error.message}`});
    }
};

const getReviewsById = async (req, res) => {
    try {
        const review = await reviewsModel.getReviewsById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Avaliação não encontrada"});
        }
        res.status(200).json({ message: "Avaliação encontrada com sucesso.", review});
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: `Erro ao encontrar avaliação: ${error.message}`});
    }
};

const createReview = async (req, res) => {
    try {
        const { user_id, product_id, note, comments } = req.body;

        if (!user_id || !product_id || !note || !comments) {
            return res.status(400).json({ message: "Todos os campos devem ser preenchidos."});
        }

        const newReview = await reviewsModel.createReview(user_id, product_id, note, comments);

        return res.status(201).json({ message: "Avaliação criada com sucesso."});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Erro ao criar avaliação: ${error.message}`});
    }
};

const updateReview = async (req, res) => {
    try {
        const { note, comments } = req.body;
        const updateReview = await reviewsModel.updateReview(req.params.id, note, comments);

        if (!updateReview) {
            return res.status(404).json({ message: "Avaliação não encontrada para avaliação."});
        }
        res.status(200).json({ message: "Avaliação atualizada com sucesso.", updateReview});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao atualizar avaliação: ${error.message}`});
    }
};

const deleteReview = async (req, res) => {
    try {
        const deleteReview = await reviewsModel.deleteReview(req.params.id);
        
        if (!deleteReview) {
            return res.status(404).json({ message: "Avaliação não encontrada para exclusão."});
        }
        res.status(200).json({ message: "Avaliação deletada com sucesso.", details: deleteReview});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao deletar avaliação: ${error.message}`});
    }
};

module.exports = {getReviews, getReviewsById, createReview, updateReview, deleteReview};