import { getInvoices, addInvoice, getInvoice, updateInvoice, removeInvoice } from '../../controller/invoice.js';

export default async function (fastify) {
  // @route     GET api/invoice
  // @desc      Get All Invoices
  // @access    public
  const getInvoicesOps = {
    schema: {
      200: {
        type: 'object',
        properties: {
          status: { type: 'string' },
          statusCode: { type: 'number' },

          invoices: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                createdAt: { type: 'string' },

                clientDetails: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                  },
                },

                invoiceDetails: {
                  type: 'object',
                  properties: {
                    status: { type: 'string' },
                    paymentDate: { type: 'string' },
                    itemList: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          qty: { type: 'number' },
                          price: { type: 'number' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    handler: getInvoices,
  };

  fastify.get('/invoice', getInvoicesOps);

  // @route     GET api/invoice/:id
  // @desc      Get Single Invoice
  // @access    public
  const getInvoiceOps = {
    schema: {},
    handler: getInvoice,
  };

  fastify.get('/invoice/:id', getInvoiceOps);

  // @route     POST api/invoice/:id
  // @desc      Add Single Invoice
  // @access    public
  const postInvoiceOps = {
    schema: {},
    handler: addInvoice,
  };

  fastify.post('/invoice', postInvoiceOps);

  // @route     PATCH api/invoice
  // @desc      Update Invoice
  // @access    public
  const updateInvoiceOps = {
    schema: {},
    handler: updateInvoice,
  };

  fastify.patch('/invoice/:id', updateInvoiceOps);

  // @route     DELETE api/invoice
  // @desc      Remove Single Invoice
  // @access    public
  const removeInvoiceOps = {
    schema: {},
    handler: removeInvoice,
  };

  fastify.delete('/invoice/:id', removeInvoiceOps);
}
