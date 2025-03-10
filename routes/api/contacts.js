const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/contacts');

const { validateBody, isValidId, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/contact');

router.get('/', authenticate, ctrl.listContacts);

router.get('/:contactId', authenticate, isValidId, ctrl.getContactById);

router.post('/', authenticate, validateBody(schemas.addSchema), ctrl.addContact);

router.delete('/:contactId', authenticate, isValidId, ctrl.removeContact);

router.put(
    '/:contactId',
    authenticate,
    isValidId,
    validateBody(schemas.addSchema),
    ctrl.updateContact
);
router.patch(
    '/:contactId/favorite',
    isValidId,
    validateBody(schemas.updateStatusContactSchema),
    ctrl.updateStatusContact
);

module.exports = router;
