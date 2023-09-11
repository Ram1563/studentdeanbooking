module.exports = {
    database: {
      url:  '  postgresql://ram:7Dkf9XP_WqdLH0ysFw5QCw@fleet-pika-6173.8nk.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full' },
    server: {
      port: process.env.PORT || 3000,
    },
    
  jwtSecret: 'your-secret-key', // Replace with a strong secret key for JWT

    // Add other configurations as needed
  };
  