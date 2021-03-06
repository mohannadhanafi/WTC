import { v4 as uuid } from 'uuid';

const fields = [
  {
    id: uuid(),
    tag: 'input',
    name: 'firstName',
    placeholder: 'Name',
    type: 'text',
    rules: [],
    initialValue: undefined,
  },
  {
    id: uuid(),
    tag: 'input',
    name: 'companyName',
    placeholder: 'Company Name',
    type: 'text',
    rules: [],
    initialValue: undefined,
  },
  {
    id: uuid(),
    tag: 'select',
    name: 'clientTypeId',
    placeholder: 'Client Type',
    type: 'drop-down',
    enableAddItem: true,
    getURL: '/clientTypes',
    postURL: '/clientTypes',
    rules: [],
    items: ['individual', 'Corporate'],
    initialValue: undefined,
  },
  {
    id: uuid(),
    tag: 'select',
    name: 'countryId',
    placeholder: 'Country',
    type: 'drop-down',
    enableAddItem: true,
    getURL: '/countries',
    postURL: '/countries',
    rules: [{ required: true }],
    items: [],
    initialValue: undefined,
  },
  {
    id: uuid(),
    tag: 'select',
    name: 'cityId',
    placeholder: 'City',
    type: 'drop-down',
    enableAddItem: true,
    getURL: '/cities',
    postURL: '/cities',
    rules: [{ required: true }],
    items: [],
    initialValue: undefined,
  },
  {
    id: uuid(),
    tag: 'input',
    name: 'street',
    placeholder: 'street',
    type: 'text',
    rules: [],
    initialValue: '',
  },
  {
    id: uuid(),
    tag: 'input',
    name: 'district',
    placeholder: 'District',
    type: 'text',
    rules: [],
    initialValue: '',
  },
  {
    id: uuid(),
    tag: 'input',
    name: 'landLine',
    placeholder: 'Land line',
    type: 'text',
    rules: [],
    initialValue: '',
  },
  {
    id: uuid(),
    tag: 'input',
    name: 'fax',
    placeholder: 'Fax',
    type: 'text',
    rules: [],
    initialValue: '',
  },
  {
    id: uuid(),
    tag: 'input',
    name: 'email',
    placeholder: 'Email',
    type: 'text',
    rules: [],
    initialValue: '',
  },
  {
    id: uuid(),
    tag: 'input',
    name: 'website',
    placeholder: 'Web site',
    type: 'text',
    rules: [],
    initialValue: '',
  },
  {
    id: uuid(),
    tag: 'input',
    name: 'vat',
    placeholder: 'VAT NO',
    type: 'text',
    rules: [],
    initialValue: '',
  },
  {
    id: uuid(),
    tag: 'input',
    name: 'cr',
    placeholder: 'CR NO',
    type: 'text',
    rules: [],
    initialValue: '',
  },
  {
    id: uuid(),
    tag: 'input',
    name: 'contactPerson',
    placeholder: 'Contact Person',
    type: 'text',
    rules: [],
    initialValue: '',
  },
  {
    id: uuid(),
    tag: 'input',
    name: 'username',
    placeholder: 'Username.',
    type: 'text',
    rules: [],
    initialValue: '',
  },
  // {
  //   id: uuid(),
  //   tag: 'input',
  //   name: 'password',
  //   placeholder: 'Password.',
  //   type: 'password',
  //   rules: [],
  //   initialValue: '',
  // },
  {
    id: uuid(),
    tag: 'input',
    name: 'phoneNumber',
    placeholder: 'Mobile phone.',
    type: 'text',
    rules: [{ required: true }],
    initialValue: '',
  },
  {
    id: uuid(),
    tag: 'input',
    name: 'personEmail',
    placeholder: 'Person Email',
    type: 'text',
    rules: [],
    initialValue: '',
  },
  {
    id: uuid(),
    tag: 'upload',
    name: 'contract',
    label: 'Upload file of contract',
  },
  {
    id: uuid(),
    tag: 'upload',
    name: 'crPhoto',
    label: 'Upload photo of CR / Id',
  },
  {
    id: uuid(),
    tag: 'upload',
    name: 'vatPhoto',
    label: 'Upload photo of Vat Reg',
  },
  {
    id: uuid(),
    tag: 'input',
    name: 'amountCreditLimit',
    placeholder: 'Amount Credit Limit',
    type: 'text',
    prefix: '$',
    rules: [],
    initialValue: '',
  },
  {
    id: uuid(),
    tag: 'input',
    name: 'daysCreditLimit',
    placeholder: 'Days of Credit Limit',
    type: 'text',
    rules: [],
    initialValue: '',
  },
  //   {
  //     Generate payment request on select date (value of this input will be generate
  //         invoice date + daus of credit limit)
  //   },
  {
    id: uuid(),
    tag: 'select',
    name: 'paymentMethod',
    placeholder: 'Payment methods',
    type: 'drop-down',
    enableAddItem: true,
    rules: [],
    items: ['Bank transfer', 'credit card'],
    initialValue: undefined,
  },
  {
    id: uuid(),
    tag: 'input',
    name: 'ibanNo',
    placeholder: 'IBAN Number',
    type: 'text',
    rules: [],
    dependency: 'paymentMethod',
    dependencyValue: 'Bank transfer',
    initialValue: '',
  },
  {
    id: uuid(),
    tag: 'select',
    name: 'clientAvailabilityId',
    placeholder: 'Client Availability',
    getURL: '/clientAvailability',
    postURL: '/clientAvailability',
    type: 'drop-down',
    enableAddItem: true,
    rules: [],
    items: ['active', 'inactive'],
    initialValue: undefined,
  },
  //   {
  //     nn. can add pricing for the services[one way, per hour, airport]. (point to point match
  //         with Km) Hourly matched with Km and all of them matched with car type or fleet
  //         type. مطابقة للخدمات المقدمه من الشركة
  //         oo. One way (From point to point) optional in App or client linked with area
  //         pp. Hourly matched km 20 Km per hour valid to 24 hours optional in App or client linked
  //         with area
  //         Page 14 of
  //         qq. Delivery it for parcel or grocery or pharmacy optional in App or client linked with
  //         area
  //   },
];

const initialValues = fields.reduce((values, cuuField) => {
  let initialValuesObj = values;

  initialValuesObj = {
    ...initialValuesObj,
    [cuuField.name]: cuuField.initialValue,
  };

  return initialValuesObj;
}, {});

export {
  initialValues,
  fields,
};
