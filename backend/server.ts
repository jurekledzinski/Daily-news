import app from './main';
import { connectDB } from './config';
import logger from './helpers/logger';

const PORT = process.env.PORT || 5000;

const runServer = async () => {
  await connectDB();

  try {
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Server start error', error);
  }
};

runServer();
