import mongoose from 'mongoose';
import dotenv from 'dotenv';

const local = dotenv.config();

const URI = `mongodb+srv://mern-test:${local.parsed.MONGO_KEY}@cluster0.emt6b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(db => console.log('DB conected'))
  .catch(e => console.error(e));

export default mongoose;
