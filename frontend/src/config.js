class Config {
  /**
   * URLs definictions.
   */
  static get url() {
    const backend = () => 'http://localhost:7000/api/1.0'
    const flights = () => `${backend()}/flights/`
    const flight = (id) => `${backend()}/flights/${id}/`

    return {
      backend,
      flights,
      flight
    };
  }

}

export default Config
