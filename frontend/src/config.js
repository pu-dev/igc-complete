class Config {
  /**
   * URLs definictions.
   */
  static get url() {
    const backend = () => 'http://glide.3o3.it/backend_igc/api/1.0'
    // const backend = () => 'http://localhost:7000/api/1.0'
    const flights = () => `${backend()}/gql/flights/`;
    const flight = (id) => `${backend()}/flights/${id}/`
    const flightAnalysis = (id) => `${backend()}/flights/${id}/analysis/`

    return {
      backend,
      flights,
      flight,
      flightAnalysis
    };
  }

}

export default Config
