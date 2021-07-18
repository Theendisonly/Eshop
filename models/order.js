const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    shippingAddress1: {
        type: String,
        required: true,
    },
    shippingAddress2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending',
    },
    totalPrice: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    }
})

orderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

orderSchema.set('toJSON', {
    virtuals: true,
});

exports.Order = mongoose.model('Order', orderSchema);



/**
Order Example:

{
    "orderItems" : [
        {
            "quantity": 3,
            "product" : "5f9d5de284992b00247682b3"
        },
        {
            "quantity": 2,
            "product" : "5f68fd316170530b7e0afc54"
        }
    ],
    "shippingAddress1" : "Flowers Street , 45",
    "shippingAddress2" : "1-B",
    "city": "Prague",
    "zip": "00000",
    "country": "Czech Republic",
    "phone": "+420702241333",
    "user": "60ec96023de2ea7a19b6c5a8"
}

 */