export default function response(message: string, data: any, errors = null) {
  return {
    message,
    data,
    errors,
  };
}
