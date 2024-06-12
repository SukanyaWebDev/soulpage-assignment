const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const cron = require('node-cron');

const app = express();
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

const adminRouter = require('./routes/admin');
const conversationRouter = require('./routes/conversations');
const fileRouter = require('./routes/files');

app.use('/admin', adminRouter);
app.use('/conversations', conversationRouter);
app.use('/files', fileRouter);

const { cleanupOldConversations } = require('./scripts/cleanupConversations');

// Schedule task to run daily at midnight
cron.schedule('0 0 * * *', () => {
  cleanupOldConversations();
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
