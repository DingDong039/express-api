const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    prefix: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    birthdate: { type: Date },
    position: { type: String },
    department: { type: String },
    email: { type: String },
    tel: { type: String },
    address: { type: String },
    salary: { type: Number },
    startdate: { type: Date, default: Date.now},
    effectenddate: { type: Date, default : null},
    status: { type: String,default:'A' }
}, 
{ collection: 'Employee' },
{ timestamps: true },
{ versionKey: false },

);

module.exports = mongoose.model('Employee', EmployeeSchema);
