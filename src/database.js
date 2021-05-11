import mongoose from 'mongoose';

const URI = 'mongodb://localhost/dev-test';

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(db => console.log('DB conected'))
  .catch(e => console.error(e));

export default mongoose;
