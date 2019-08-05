const routes = { 

    createOne: async (req, res) => { return res.status(200).json({msg:'createOne'}) },
    createMany: async (req, res) => { return res.status(200).json({msg:'createMany'}) },
    getAll: async (req, res) => { return res.status(200).json({msg:'getAll'}) },
    getOne: async (req, res) => { return res.status(200).json({msg:'getOne'}) },
    updateOne: async (req, res) => { return res.status(200).json({msg:'updateOne'}) },
    deleteOne: async (req, res) => { return res.status(200).json({msg:'deleteOne'}) },
}

module.exports = routes