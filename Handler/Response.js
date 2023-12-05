class Response {
  constructor(success, data, message) {
    this.success = success || false;
    this.data = data || null;
    this.message = message || '';
  }

  static success(data, message) {
    return new Response(true, data, message);
  }

  static error(message) {
    return new Response(false, null, message);
  }

  send(res) {
    return res.status(this.success ? 200 : 500).json({
      success: this.success,
      data: this.data,
      message: this.message,
    });
  }
}

export default Response;
