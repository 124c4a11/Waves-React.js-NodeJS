export const validate = (element, formdata = []) => {
  let error = [ true, '' ];

  if (element.validation.email) {
    const valid = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(element.value);
    const message = `${!valid ? 'Must be a valid email' : ''}`;

    error = !valid ? [valid, message] : error;
  }

  if (element.validation.confirm) {
    const valid = element.value.trim() === formdata[element.validation.confirm].value;
    const message = `${!valid ? 'Passwords do not match' : ''}`;

    error = !valid ? [valid, message] : error;
  }

  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = `${!valid ? 'This field is required' : ''}`;

    error = !valid ? [valid, message] : error;
  }

  return error;
};


export const update = (element, formdata, formName) => {
  const newFormData = { ...formdata };
  const newElement = { ...formdata[element.id] };

  newElement.value = element.event.target.value;

  if (element.blur) {
    let validData = validate(newElement, formdata);

    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;

  newFormData[element.id] = newElement

  return newFormData;
};


export const generateData = (formdata, formName) => {
  let dataToSubmit = {};

  for (let key in formdata) {
    if (key !== 'confirmPassword') {
      dataToSubmit[key] = formdata[key].value;
    }
  }

  return dataToSubmit;
};


export const isFormValid = (formdata, formName) => {
  let formIsValid = true;

  for (let key in formdata) {
    formIsValid = formdata[key].valid && formIsValid;
  }

  return formIsValid;
};


export const populateOptionFields = (formdata, arrData = [], field) => {
  const newArr = [];
  const newFormData = { ...formdata };

  arrData.forEach(({ _id, name }) => {
    newArr.push({ key: _id, value: name });
  });

  newFormData[field].config.options = newArr;

  return newFormData;
};


export const resetFields = (formdata, formName) => {
  const newFormData = { ...formdata };

  for (let key in newFormData) {
    if (key === 'images') {
      newFormData[key].value = [];
    } else {
      newFormData[key].value = '';
    }

    newFormData[key].valid = false;
    newFormData[key].touched = false;
    newFormData[key].validationMessage = '';
  }

  return newFormData;
};
