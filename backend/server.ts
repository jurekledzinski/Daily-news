import app from './main';
import { connectDB } from './config';

const PORT = process.env.PORT || 5000;

const runServer = async () => {
  await connectDB();

  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log('Server start error', err);
  }
};

runServer();
