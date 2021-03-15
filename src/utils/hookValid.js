import { useState, useCallback } from 'react';
const useFormValid = (initValues) => {
  const [isValid, setIsValid] = useState(false);
  const [values, setValues] = useState(initValues);
  const [errors, setErrors] = useState({});
  const handleChange = (evt) => {
    const { target } = evt;
    const { name, value } = target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest('form').checkValidity());
  };

  const reset = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    isValid, values, errors, handleChange, reset,
  };
};

export default useFormValid;