
export function capitalizeFirstLetter(value) {
    return value.replace(/\w\S*/g, text => {
      return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase();
    });
  }