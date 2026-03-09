const Order = require("./orders");

// criar pedido
exports.createOrder = async (req, res) => {

    try {

        const body = req.body;

        const order = new Order({
            orderId: body.numeroPedido,
            value: body.valorTotal,
            creationDate: body.dataCriacao,
            items: body.items.map(item => ({
                productId: Number(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        });

        await order.save();

        res.status(201).json(order);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
};


// buscar pedido
exports.getOrder = async (req,res)=>{

    try{

        const order = await Order.findOne({orderId:req.params.id});

        if(!order){
            return res.status(404).json({message:"Pedido não encontrado"});
        }

        res.json(order);

    }catch(error){
        res.status(500).json({message:error.message});
    }

};


// listar pedidos
exports.listOrders = async (req,res)=>{

    try{

        const orders = await Order.find();

        res.json(orders);

    }catch(error){
        res.status(500).json({message:error.message});
    }

};


// atualizar pedido
exports.updateOrder = async (req,res)=>{

    try{

        const order = await Order.findOneAndUpdate(
            {orderId:req.params.id},
            req.body,
            {new:true}
        );

        if(!order){
            return res.status(404).json({message:"Pedido não encontrado"});
        }

        res.json(order);

    }catch(error){
        res.status(500).json({message:error.message});
    }

};


// deletar pedido
exports.deleteOrder = async (req,res)=>{

    try{

        const order = await Order.findOneAndDelete({orderId:req.params.id});

        if(!order){
            return res.status(404).json({message:"Pedido não encontrado"});
        }

        res.json({message:"Pedido deletado com sucesso"});

    }catch(error){
        res.status(500).json({message:error.message});
    }

};