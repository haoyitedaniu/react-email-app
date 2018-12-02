// For saving LinkedIn Receivers from LinkedIn-Chrome Extension

const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
	companyName: String,
	companySize: Date,
	industries: Array,
	liCompanyId: Number
});

mongoose.model('companies', companySchema);