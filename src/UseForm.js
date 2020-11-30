import { useState, useEffect } from 'react';

const UseForm = (callback, validate) => {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setIsSubmitting(false);
      callback();
    }
  }, [callback, errors, isSubmitting]);

  const handleSubmit = (event) => {
        if (event) event.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    event.persist();
    console.log("ONCHANGE; " + event.target.name + " :: " + event.target.value);
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  }
};

export default UseForm;