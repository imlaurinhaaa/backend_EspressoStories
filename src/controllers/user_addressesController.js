const user_addressesModel = require('../models/user_addressesModel');

// Rota para buscar endereços de usuários pela cidade
const getUsersAddresses = async (req, res) => {
    try {
        const { city } = req.query;
        const addresses = await user_addressesModel.getUsersAddresses(city);
        res.status(200).json({ message: "Endereço(s) recuperado(s) com sucesso.", addresses });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: `Erro ao recuperar endereços: ${error.message}` });
    }
};

const getUserAddresses = async (req, res) => {
    try {
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).json({ message: "O parâmetro user_id é obrigatório." });
        }

        const addresses = await userAddressesModel.getUserAddressesByUserId(user_id);

        if (addresses.length === 0) {
            return res.status(404).json({ message: "Nenhum endereço encontrado para este usuário." });
        }

        return res.status(200).json(addresses);
    } catch (error) {
        console.error("Erro ao buscar endereços do usuário:", error);
        return res.status(500).json({ message: "Erro ao buscar endereços do usuário.", error: error.message });
    }
};

// Rota para buscar um endereço de usuário pelo ID
const getUserAddressById = async (req, res) => {
    try {
        const user_addresses = await user_addressesModel.getUserAddressById(req.params.id);
        if (!user_addresses) {
            return res.status(404).json({ message: "Endereço de usuário não encontrado." });
        }
        res.status(200).json({ message: "Endereço de usuário recuperado com sucesso.", user_addresses });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: `Erro ao recuperar endereço pelo ID: ${error.message}` });
    }
};

// Rota para criar um novo endereço de usuário
const createUserAddress = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: "O corpo da requisição está vazio." });
        }

        const { user_id, cep, street, number, neighborhood, city, state, complement, reference_point, is_default } = req.body;

        // Valida os campos obrigatórios
        if (!user_id || !cep || !street || !number || !neighborhood || !city || !state) {
            return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
        }

        const is_default_bool = is_default !== undefined ? Boolean(is_default) : undefined;
        const newUserAddress = await user_addressesModel.createUserAddress(user_id, cep, street, number, neighborhood, city, state, complement, reference_point, is_default_bool);

        return res.status(201).json({ message: "Endereço criado com sucesso.", newUserAddress });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Erro ao criar endereço: ${error.message}` });
    }
};

// Rota para atualizar os dados de um endereço de usuário
const updateUserAddress = async (req, res) => {
    try {
        const { cep, street, number, neighborhood, city, state, complement, reference_point, is_default } = req.body;
        const is_default_bool = is_default !== undefined ? Boolean(is_default) : undefined;

        const updatedUserAddress = await user_addressesModel.updateUserAddress(
            req.params.id,
            cep,
            street,
            number,
            neighborhood,
            city,
            state,
            complement,
            reference_point,
            is_default_bool
        );

        if (!updatedUserAddress) {
            return res.status(404).json({ message: "Endereço de usuário não encontrado para atualização." });
        }
        res.status(200).json({ message: "Endereço de usuário atualizado com sucesso.", updatedUserAddress });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao atualizar endereço: ${error.message}` });
    }
};

// Rota para deletar um endereço.
const deleteUserAddress = async (req, res) => {
    try {
        const deletedAddress = await user_addressesModel.deleteUserAddress(req.params.id);
        if (!deletedAddress) {
            return res.status(404).json({ message: "Endereço de usuário não encontrado para exclusão." });
        }
        res.status(200).json({ message: "Endereço de usuário deletado com sucesso.", details: deletedAddress });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao deletar endereço: ${error.message}` });
    }
};

module.exports = {
    getUsersAddresses,
    getUserAddressById,
    createUserAddress,
    updateUserAddress,
    deleteUserAddress,
    getUserAddresses
};