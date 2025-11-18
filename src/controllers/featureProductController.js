const featureProductModel = require('../models/featureProductModel');

// Rota para buscar produtos pelo nome
const getFeaturedProducts = async (req, res) => {
    try {
        const { name, branchId, categoryId } = req.query;
        const products = await featureProductModel.getFeaturedProducts(name, branchId, categoryId);
        res.status(200).json({ message: "Produtos em destaque encontrados com sucesso.", products });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: `Erro ao encontrar produtos em destaque: ${error.message}` });
    }
};

// Rota para buscar um produto pelo ID
const getFeaturedProductById = async (req, res) => {
    try {
        const product = await featureProductModel.getFeaturedProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Produto em destaque não encontrado." });
        }
        res.status(200).json({ message: "Produto em destaque encontrado com sucesso.", product });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: `Erro ao encontrar produto em destaque: ${error.message}` });
    }
};

// Rota para criar um novo produto
const createFeaturedProduct = async (req, res) => {
    try {
        // Logs para depuração
        console.log("Corpo da requisição recebido:", req.body);
        console.log("Arquivos recebidos:", req.files);

        // Se o body vier vazio (multer não preencheu)
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "Nenhum dado recebido. Verifique se está enviando o formulário como 'form-data'."
            });
        }

        const { branch_id, category_id, name, description, price, inspiration } = req.body;

        if (!branch_id || !category_id || !name || !description || (price === undefined || price === null || String(price).trim() === "")) {
            return res.status(400).json({
                message: "Todos os campos são obrigatórios."
            });
        }

        // Normalização do campo de preço
        const normalizedPriceString = String(price).replace(/\s+/g, '').replace(',', '.').replace(/[^0-9.]/g, '');
        const priceNumber = Number(normalizedPriceString);

        // Validação de preço com o número normalizado
        if (!normalizedPriceString || isNaN(priceNumber) || priceNumber <= 0) {
            return res.status(400).json({
                message: "O campo 'price' deve conter um número válido maior que zero."
            });
        }

        // Captura das imagens enviadas
        const photo = req.files?.photo ? req.files.photo[0].filename : null;
        const photo_inspiration = req.files?.photo_inspiration ? req.files.photo_inspiration[0].filename : null;

        // Verifica se a foto obrigatória foi enviada
        if (!photo) {
            return res.status(400).json({
                message: "O campo 'photo' é obrigatório. Envie uma imagem válida."
            });
        }

        // Criação do produto
        const newProduct = await featureProductModel.createFeaturedProduct(
            branch_id,
            category_id,
            name,
            photo,
            description,
            price,
            inspiration,
            photo_inspiration
        );

        console.log("✅ Produto criado com sucesso:", newProduct);
        return res.status(201).json({
            message: "Produto criado com sucesso.",
            newProduct
        });

    } catch (error) {
        console.error("❌ Erro ao criar produto:", error);
        return res.status(500).json({
            message: `Erro ao criar produto: ${error.message}`
        });
    }
};



// Rota para atualizar os dados de um produto
const updateFeaturedProduct = async (req, res) => {
    try {
        const { branch_id, category_id, name, photo, description, price, inspiration, photo_inspiration } = req.body;
        const updatedFeaturedProduct = await featureProductModel.updateFeaturedProduct(
            req.params.id,
            branch_id,
            category_id,
            name,
            photo,
            description,
            price,
            inspiration,
            photo_inspiration
        );

        if (!updatedFeaturedProduct) {
            return res.status(404).json({ message: "Produto não encontrado para atualização." });
        }
        res.status(200).json({ message: "Produto atualizado com sucesso.", updatedFeaturedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao atualizar produto: ${error.message}` });
    }
};

// Rota para deletar um produto
const deleteFeaturedProduct = async (req, res) => {
    try {
        const deletedFeaturedProduct = await featureProductModel.deleteFeaturedProduct(req.params.id);
        if (!deletedFeaturedProduct) {
            return res.status(404).json({ message: "Produto não encontrado para exclusão." });
        }
        res.status(200).json({ message: "Produto deletado com sucesso.", details: deletedFeaturedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao deletar produto: ${error.message}` });
    }
};

module.exports = {
    getFeaturedProducts,
    getFeaturedProductById,
    createFeaturedProduct,
    updateFeaturedProduct,
    deleteFeaturedProduct
};