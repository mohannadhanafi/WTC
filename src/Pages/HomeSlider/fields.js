import { v4 as uuid } from 'uuid';

const fields = [
  // {
  //   id: uuid(),
  //   tag: 'upload',
  //   name: 'picture',
  //   label: 'Picture',
  //   rules: [{ required: true }],
  // },
  {
    id: uuid(),
    label: 'Title',
    tag: 'input',
    name: 'title',
    placeholder: 'Title',
    type: 'text',
    rules: [{ required: true }],
    initialValue: '',
  },
  {
    id: uuid(),
    label: 'Description',
    tag: 'input',
    name: 'description',
    placeholder: 'description',
    type: 'textarea',
    rules: [{ required: true }],
    initialValue: '',
  },
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
