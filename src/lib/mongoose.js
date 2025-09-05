import mongoose from 'mongoose';

const connectToDatabase = async (DB_HOST, DB, DB_PARAMETERS = null) => {
  try {
    let dbURI = `${DB_HOST}/${DB}`;

    dbURI += DB_PARAMETERS ? `?${DB_PARAMETERS}` : '';

    mongoose.set('strictQuery', true);
    const info = mongoose.connect(dbURI);
    return info;
  } catch (error) {
    return error;
  }
};

export default connectToDatabase;
