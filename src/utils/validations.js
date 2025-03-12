export const validateRequiredFields = (fields) => {
  for (const field of fields) {
    if (!field.value.trim()) {
      alert(`El campo ${field.name} es obligatorio.`);
      return false;
    }
  }
  return true;
};

export const validateDNI = (dni) => {
  const dniRegex = /^\d{7,8}$/;
  if (!dniRegex.test(dni)) {
    alert("El DNI debe tener entre 7 y 8 dígitos.");
    return false;
  }
  return true;
};

export const validateDate = (date) => {
  const fechaActual = new Date();
  const fechaIngresada = new Date(date);
  const seisMesesAtras = new Date();
  seisMesesAtras.setMonth(fechaActual.getMonth() - 6);

  if (fechaIngresada > fechaActual) {
    alert("La fecha no puede ser mayor a la fecha actual.");
    return false;
  }

  if (fechaIngresada < seisMesesAtras) {
    alert("La fecha no puede ser menor a 6 meses antes de la fecha actual.");
    return false;
  }

  return true;
};

export const validateFile = (file, tiposPermitidos, tamanoMaximo) => {
  if (!tiposPermitidos.includes(file.type)) {
    alert("Solo se permiten archivos PDF o imágenes (JPEG, PNG).");
    return false;
  }

  if (file.size > tamanoMaximo) {
    alert("El archivo no puede superar los 25 MB.");
    return false;
  }

  return true;
};

export const validateMonto = (monto) => {
  if (monto <= 49) {
    alert("El monto debe ser válido.");
    return false;
  }
  return true;
};