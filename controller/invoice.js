import Invoice from '../models/invoice.js';

export const getInvoices = async (_, reply) => {
  try {
    const invoices = await Invoice.find();
    if (!invoices) throw { name: 'Internal Error', message: 'please try again later' };

    reply.code(200).send({
      status: 'success',
      statusCode: 200,
      invoices,
    });
  } catch (error) {
    reply.code(404).send({
      status: 'error',
      statusCode: 404,
      error: error.name,
      message: error.message,
    });
  }
};

export const getInvoice = async (request, reply) => {
  try {
    const invoice = await Invoice.findById(request.params.id);
    if (!invoice) throw { name: 'Not Found', message: `No Invoice with id '${request.params.id}' found.` };

    reply.send({
      status: 'success',
      statusCode: 200,
      invoice,
    });
  } catch (error) {
    reply.code(404).send({
      status: 'error',
      statusCode: 404,
      error: error.name,
      message: error.message,
    });
  }
};

export const addInvoice = async (request, reply) => {
  const invoice = new Invoice(request.body);

  try {
    const newInvoice = await invoice.save();
    if (!newInvoice) throw { name: 'Internal Error', message: 'please try again later' };

    reply.code(201).send({
      status: 'success',
      statusCode: 201,
      message: 'Invoice Created Successfully!',
      invoice: newInvoice,
    });
  } catch (error) {
    reply.code(400).send({
      status: 'error',
      statusCode: 400,
      error: error.name,
      message: error.message,
    });
  }
};

export const updateInvoice = async (request, reply) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(request.params.id, request.body, { runValidators: true });
    if (!updatedInvoice) throw { name: 'Not Found', message: `No Invoice with id '${request.params.id}' found.` };

    const returnInvoice = await Invoice.findById(request.params.id);

    reply.code(201).send({
      status: 'success',
      statusCode: 201,
      message: 'Invoice Updated Successfully!',
      invoice: returnInvoice,
    });
  } catch (error) {
    reply.code(400).send({
      status: 'error',
      statusCode: 400,
      error: error.name,
      message: error.message,
    });
  }
};

export const removeInvoice = async (request, reply) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(request.params.id);
    if (!deletedInvoice) throw { name: 'Not Found', message: `No Invoice with id '${request.params.id}' found.` };

    reply.code(200).send({
      status: 'success',
      statusCode: 200,
      message: 'Invoice Deleted Successfully!',
      data: null,
    });
  } catch (error) {
    reply.code(404).send({
      status: 'error',
      statusCode: 404,
      error: error.name,
      message: error.message,
    });
  }
};
